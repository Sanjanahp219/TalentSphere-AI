import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Pencil, Trash2, Users } from 'lucide-react';

// Helper: map department to badge/avatar CSS class suffix
const getDeptKey = (dept) => {
  const map = {
    Engineering: 'eng',
    Design: 'design',
    HumanResource: 'hr',
    Sales: 'sales',
    Marketing: 'marketing',
    IT: 'it',
  };
  return map[dept] || 'default';
};

// Helper: get initials from a name
const getInitials = (name) =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

const EmployeeTable = ({ employees }) => {
  if (employees.length === 0) {
    return (
      <motion.div
        className="emp-table-wrapper"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="emp-empty-state">
          <Users className="w-12 h-12 mx-auto mb-3 text-slate-600 opacity-40" />
          <p className="emp-empty-title">No employees found</p>
          <p className="emp-empty-desc">Try adjusting your search or filter criteria</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="emp-table-wrapper">
      <table className="emp-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Email</th>
            <th>Role</th>
            <th>Department</th>
            <th>Experience</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {employees.map((emp, index) => {
              const deptKey = getDeptKey(emp.department);
              return (
                <motion.tr
                  key={emp.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  {/* Name + Avatar */}
                  <td>
                    <div className="emp-name-cell">
                      <div className={`emp-avatar emp-avatar-${deptKey}`}>
                        {getInitials(emp.name)}
                      </div>
                      <span className="emp-name-text">{emp.name}</span>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="text-slate-400">{emp.email}</td>

                  {/* Role */}
                  <td>
                    <span className={`emp-badge emp-badge-${deptKey}`}>
                      {emp.role}
                    </span>
                  </td>

                  {/* Department */}
                  <td>
                    <span className={`emp-badge emp-badge-${deptKey}`}>
                      {emp.department}
                    </span>
                  </td>

                  {/* Experience */}
                  <td>
                    <span className="text-sm text-slate-300 font-medium">
                      {emp.experience}
                    </span>
                  </td>

                  {/* Actions */}
                  <td>
                    <div className="emp-actions justify-center">
                      <motion.button
                        className="emp-action-btn view"
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        title="View"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </motion.button>
                      <motion.button
                        className="emp-action-btn edit"
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        title="Edit"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </motion.button>
                      <motion.button
                        className="emp-action-btn del"
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
