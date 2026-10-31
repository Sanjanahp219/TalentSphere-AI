const Employee = require('../model/employee.model');
const { Op } = require('sequelize');

/**
 * GET /api/employees
 * Fetches all employee profiles from the database.
 * Supports filtering by department or search terms in the query.
 * Auto-seeds 5 demo employee profiles if the database table is empty.
 */
const getEmployees = async (req, res, next) => {
    try {
        const { department, search } = req.query;
        let whereCondition = {};

        // If department filter is supplied
        if (department && department !== 'All') {
            whereCondition.department = department;
        }

        // If search term is supplied (matches name, email, role, or skills)
        if (search && search.trim() !== '') {
            const searchStr = `%${search.trim()}%`;
            whereCondition[Op.or] = [
                { name: { [Op.iLike]: searchStr } },
                { email: { [Op.iLike]: searchStr } },
                { role: { [Op.iLike]: searchStr } },
                // Check if any element of the array matches the search term
                {
                    skills: {
                        [Op.any]: [search.trim()]
                    }
                }
            ];
        }

        let employees = await Employee.findAll({
            where: whereCondition,
            order: [['createdAt', 'DESC']]
        });

        // Auto-seed demo employee data if table is empty to facilitate user testing
        if (employees.length === 0 && !department && !search) {
            await Employee.bulkCreate([
                {
                    name: "Rahul Sharma",
                    email: "rahul.sharma@talentsphere.ai",
                    role: "React Developer",
                    department: "Engineering",
                    skills: ["React", "JavaScript", "Tailwind CSS", "Redux"],
                    experience: 3,
                    status: "Active",
                    joinedDate: new Date(Date.now() - 24 * 60 * 60 * 1000) // Yesterday
                },
                {
                    name: "Priya Patel",
                    email: "priya.patel@talentsphere.ai",
                    role: "UI/UX Designer",
                    department: "Design",
                    skills: ["Figma", "Sketch", "Prototyping", "User Research"],
                    experience: 4,
                    status: "Active",
                    joinedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 Days Ago
                },
                {
                    name: "Ankit Mehta",
                    email: "ankit.mehta@talentsphere.ai",
                    role: "Backend Engineer",
                    department: "Engineering",
                    skills: ["Node.js", "Express", "PostgreSQL", "Sequelize", "Docker"],
                    experience: 5,
                    status: "Active",
                    joinedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) // 4 Days Ago
                },
                {
                    name: "Sneha Verma",
                    email: "sneha.verma@talentsphere.ai",
                    role: "HR Specialist",
                    department: "HR",
                    skills: ["Recruiting", "Employee Relations", "Onboarding"],
                    experience: 2,
                    status: "Active",
                    joinedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 1 Week Ago
                },
                {
                    name: "Vikram Malhotra",
                    email: "vikram.malhotra@talentsphere.ai",
                    role: "Product Manager",
                    department: "Management",
                    skills: ["Product Strategy", "Agile", "Jira", "Roadmapping"],
                    experience: 6,
                    status: "On Leave",
                    joinedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // 1 Month Ago
                }
            ]);

            // Re-fetch seeded data
            employees = await Employee.findAll({
                order: [['createdAt', 'DESC']]
            });
        }

        return res.status(200).json({
            success: true,
            data: employees
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * GET /api/employees/:id
 * Fetches a single employee profile details.
 */
const getEmployeeById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findByPk(id);

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee profile not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: employee
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * POST /api/employees
 * Creates a new employee profile in the database.
 */
const createEmployee = async (req, res, next) => {
    try {
        const { name, email, role, department, skills, experience, joinedDate, status } = req.body;

        // Verify email uniqueness before saving
        const existing = await Employee.findOne({ where: { email: email.toLowerCase() } });
        if (existing) {
            return res.status(409).json({
                success: false,
                message: "An employee with that email address already exists"
            });
        }

        const employee = await Employee.create({
            name,
            email,
            role,
            department,
            skills: Array.isArray(skills) ? skills : [],
            experience: Number(experience) || 0,
            joinedDate: joinedDate || new Date(),
            status: status || 'Active'
        });

        return res.status(201).json({
            success: true,
            message: "Employee profile created successfully",
            data: employee
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * PUT /api/employees/:id
 * Updates an existing employee profile.
 */
const updateEmployee = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, email, role, department, skills, experience, joinedDate, status } = req.body;

        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee profile not found"
            });
        }

        // Verify email uniqueness if email is changed
        if (email && email.toLowerCase() !== employee.email) {
            const existing = await Employee.findOne({ where: { email: email.toLowerCase() } });
            if (existing) {
                return res.status(409).json({
                    success: false,
                    message: "An employee with that email address already exists"
                });
            }
            employee.email = email;
        }

        if (name) employee.name = name;
        if (role) employee.role = role;
        if (department) employee.department = department;
        if (skills) employee.skills = Array.isArray(skills) ? skills : [];
        if (experience !== undefined) employee.experience = Number(experience) || 0;
        if (joinedDate) employee.joinedDate = joinedDate;
        if (status) employee.status = status;

        await employee.save();

        return res.status(200).json({
            success: true,
            message: "Employee profile updated successfully",
            data: employee
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * DELETE /api/employees/:id
 * Deletes an employee profile.
 */
const deleteEmployee = async (req, res, next) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findByPk(id);

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee profile not found"
            });
        }

        await employee.destroy();

        return res.status(200).json({
            success: true,
            message: "Employee profile deleted successfully"
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * GET /api/employees/stats
 * Computes dynamic metrics and distributions from active employees.
 */
const getEmployeeStats = async (req, res, next) => {
    try {
        const employees = await Employee.findAll({
            attributes: ['id', 'status', 'department', 'experience', 'joinedDate', 'createdAt'],
            raw: true
        });

        const totalEmployees = employees.length;
        const activeEmployees = employees.filter(e => e.status === 'Active').length;
        const uniqueDepts = new Set(employees.map(e => e.department)).size;
        const avgExperience = totalEmployees > 0 
            ? (employees.reduce((acc, curr) => acc + Number(curr.experience), 0) / totalEmployees).toFixed(1)
            : "0.0";

        // Department Distribution
        const deptMap = {};
        employees.forEach(e => {
            deptMap[e.department] = (deptMap[e.department] || 0) + 1;
        });
        const departmentDistribution = Object.keys(deptMap).map(dept => {
            const count = deptMap[dept];
            const pct = totalEmployees > 0 ? ((count / totalEmployees) * 100).toFixed(0) : 0;
            return {
                name: dept,
                count,
                percentage: `${pct}%`
            };
        });

        // Experience Distribution
        let exp0_2 = 0;
        let exp2_5 = 0;
        let exp5_10 = 0;
        let exp10Plus = 0;

        employees.forEach(e => {
            const exp = Number(e.experience) || 0;
            if (exp <= 2) exp0_2++;
            else if (exp <= 5) exp2_5++;
            else if (exp <= 10) exp5_10++;
            else exp10Plus++;
        });

        const totalCount = totalEmployees || 1;
        const experienceDistribution = [
            { label: '0-2 Years', count: exp0_2, percentage: `${((exp0_2 / totalCount) * 100).toFixed(0)}%` },
            { label: '2-5 Years', count: exp2_5, percentage: `${((exp2_5 / totalCount) * 100).toFixed(0)}%` },
            { label: '5-10 Years', count: exp5_10, percentage: `${((exp5_10 / totalCount) * 100).toFixed(0)}%` },
            { label: '10+ Years', count: exp10Plus, percentage: `${((exp10Plus / totalCount) * 100).toFixed(0)}%` }
        ];

        // Recent Employees (fetch latest 4 with full names/roles)
        const dbRecent = await Employee.findAll({
            limit: 4,
            order: [['createdAt', 'DESC']]
        });

        const getRelativeJoinedString = (joinedDate) => {
            const diffTime = Math.abs(new Date() - new Date(joinedDate));
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays <= 1) return 'Today';
            if (diffDays === 2) return 'Yesterday';
            if (diffDays <= 7) return `${diffDays - 1} Days Ago`;
            return '1 Week Ago';
        };

        const recentEmployees = dbRecent.map(e => ({
            id: e.id,
            name: e.name,
            role: e.role,
            department: e.department,
            joined: getRelativeJoinedString(e.joinedDate)
        }));

        // Headcount Trend (past 6 months)
        const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const headcountTrend = [];
        
        const today = new Date();
        for (let i = 5; i >= 0; i--) {
            const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
            const monthLabel = monthsShort[d.getMonth()];
            const yearVal = d.getFullYear();
            
            const endOfMonth = new Date(yearVal, d.getMonth() + 1, 0, 23, 59, 59, 999);
            const countAtMonthEnd = employees.filter(e => new Date(e.joinedDate) <= endOfMonth).length;
            
            headcountTrend.push({
                month: monthLabel,
                headcount: countAtMonthEnd
            });
        }

        return res.status(200).json({
            success: true,
            data: {
                totalEmployees,
                activeEmployees,
                uniqueDepts,
                avgExperience,
                departmentDistribution,
                experienceDistribution,
                recentEmployees,
                headcountTrend
            }
        });
    } catch (error) {
        return next(error);
    }
};

exports = module.exports = {
    getEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeStats
};
