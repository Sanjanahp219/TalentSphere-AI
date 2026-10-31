import { X } from 'lucide-react';

const EmployeeFilter = ({ department, setDepartment, role, setRole, expe, setExpe, handleClearFilter }) => {
  return (
    <>
      <select className="emp-filter-select" value={department} onChange={(e) => setDepartment(e.target.value)}>
        <option value="all">All Departments</option>
        <option value="HumanResource">HumanResource</option>
        <option value="Engineering">Engineering</option>
        <option value="Sales">Sales</option>
        <option value="Marketing">Marketing</option>
        <option value="Design">Design</option>
        <option value="IT">IT</option>
      </select>

      <select className="emp-filter-select" value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="all">All Roles</option>
        <option value="React Developer">React Developer</option>
        <option value="UI/UX Designer">UI/UX Designer</option>
        <option value="Project Manager">Project Manager</option>
        <option value="Data Analyst">Data Analyst</option>
        <option value="HR Generalist">HR Generalist</option>
        <option value="Sales Executive">Sales Executive</option>
        <option value="Marketing Specialist">Marketing Specialist</option>
        <option value="IT Support Specialist">IT Support Specialist</option>
      </select>

      <select className="emp-filter-select" value={expe} onChange={(e) => setExpe(e.target.value)}>
        <option value="all">All Experience</option>
        <option value="Fresher">Fresher</option>
        <option value="1 Year">1 Year</option>
        <option value="2 Years">2 Years</option>
        <option value="3 Years">3 Years</option>
        <option value="4 Years">4 Years</option>
        <option value="5 Years">5 Years</option>
        <option value="6 Years">6 Years</option>
        <option value="7 Years">7 Years</option>
        <option value="8 Years">8 Years</option>
        <option value="9 Years">9 Years</option>
        <option value="10 Years">10 Years</option>
      </select>

      <button className="btn-clear-filter" onClick={handleClearFilter}>
        <X className="w-3.5 h-3.5" />
        Clear
      </button>
    </>
  );
};

export default EmployeeFilter;