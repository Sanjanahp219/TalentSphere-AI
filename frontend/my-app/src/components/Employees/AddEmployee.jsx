import { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, X } from "lucide-react";

const AddEmployee = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    experience: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.role || !formData.department || !formData.experience) {
      alert("Please fill in all fields");
      return;
    }

    const newEmployee = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      department: formData.department,
      experience: formData.experience,
    };

    onAdd(newEmployee);
  };

  return (
    <motion.div
      className="add-employee-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onCancel}
    >
      <motion.div
        className="add-employee-form"
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30">
              <UserPlus className="w-5 h-5 text-indigo-400" />
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
              Add New Employee
            </h2>
          </div>
          <motion.button
            onClick={onCancel}
            className="flex items-center justify-center w-8 h-8 rounded-lg border border-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Name & Email row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Department & Role row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-group">
              <label htmlFor="department">Department</label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
              >
                <option value="">Select Department</option>
                <option value="HumanResource">HumanResource</option>
                <option value="Engineering">Engineering</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
                <option value="Design">Design</option>
                <option value="IT">IT</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="">Select Role</option>
                <option value="React Developer">React Developer</option>
                <option value="UI/UX Designer">UI/UX Designer</option>
                <option value="Project Manager">Project Manager</option>
                <option value="Data Analyst">Data Analyst</option>
                <option value="HR Generalist">HR Generalist</option>
                <option value="Sales Executive">Sales Executive</option>
                <option value="Marketing Specialist">Marketing Specialist</option>
                <option value="IT Support Specialist">IT Support Specialist</option>
              </select>
            </div>
          </div>

          {/* Experience */}
          <div className="form-group">
            <label htmlFor="experience">Experience</label>
            <select
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
            >
              <option value="">Select Experience</option>
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
          </div>

          {/* Buttons */}
          <div className="form-actions">
            <motion.button
              type="submit"
              className="btn-add"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center justify-center gap-2">
                <UserPlus className="w-4 h-4" />
                Add Employee
              </span>
            </motion.button>
            <button type="button" className="btn-cancel" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddEmployee;
