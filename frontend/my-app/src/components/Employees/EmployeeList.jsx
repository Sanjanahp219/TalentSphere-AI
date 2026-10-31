import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, UserPlus, Building2, Briefcase, Award, Sparkles } from 'lucide-react';
import Navbar from '../Navbar/navbar';
import Header from '../Header/Header';
import EmployeeTable from './EmployeeTable';
import EmployeeSearch from './EmployeeSearch';
import EmployeeFilter from './EmployeeFilter';
import AddEmployee from './AddEmployee';
import { employee } from '../../data/employee';
import './Employee.css';
import '../dashboard/dashboard.css';

const EmployeeList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [department, setDeparment] = useState("all");
  const [role, setRole] = useState("all");
  const [expe, setExpe] = useState("all");
  const [addEmp, setAddEmp] = useState(false);
  const [employees, setEmployees] = useState(employee);


  const handleAddEmployee = (newEmp) => {
    setEmployees((prev) => [...prev, newEmp]);
    setAddEmp(false);
  };

  const filteredEmployee = employees.filter((emp) => {
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = department === "all" || emp.department === department;
    const matchesRole = role === "all" || emp.role === role;
    const matchesExpe = expe === "all" || emp.experience === expe;
    return matchesSearch && matchesDepartment && matchesRole && matchesExpe;
  });
  const handleClearFilter = () => {
    setSearchQuery("");
    setDeparment("all");
    setRole("all");
    setExpe("all");
  };

  // Calculate metrics
  const uniqueDepts = new Set(employees.map(e => e.department)).size;
  const uniqueRoles = new Set(employees.map(e => e.role)).size;

  const cards = [
    {
      id: 'total-employees',
      title: 'Total Workforce',
      value: employees.length,
      change: `${filteredEmployee.length} showing`,
      badgeClass: 'ts-badge-positive',
      icon: Users,
      gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
    },
    {
      id: 'departments',
      title: 'Active Departments',
      value: uniqueDepts,
      change: 'Cross-functional',
      badgeClass: 'ts-badge-neutral',
      icon: Building2,
      gradient: 'linear-gradient(135deg, #6366f1, #a855f7)',
    },
    {
      id: 'roles',
      title: 'Designated Roles',
      value: uniqueRoles,
      change: 'Specialized Tech & HR',
      badgeClass: 'ts-badge-neutral',
      icon: Briefcase,
      gradient: 'linear-gradient(135deg, #3b82f6, #6366f1)',
    },
    {
      id: 'experience',
      title: 'Talent Pool Quality',
      value: '100%',
      change: 'Verified Experience',
      badgeClass: 'ts-badge-positive',
      icon: Award,
      gradient: 'linear-gradient(135deg, #f59e0b, #ea580c)',
    },
  ];

  return (
    <div className="ts-dashboard-layout bg-grid-white">
      {/* Background radial glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Side Navigation Bar */}
      <Navbar />

      {/* Main Content Area */}
      <div className="ts-main-content relative z-10">
        <Header />

        <main className="space-y-8 p-6 md:p-10">
          {/* ── Dashboard Page Header ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="ts-dashboard-header"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="ts-dashboard-title">
                  Employee Directory & Management
                </h1>
                <p className="text-sm text-slate-400 mt-1">
                  Manage organization workforce, filter by role or department, and onboard new talent.
                </p>
              </div>
            </div>

            <motion.button
              className="btn-open-form"
              onClick={() => setAddEmp(true)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <UserPlus className="w-4 h-4" />
              Add Employee
            </motion.button>
          </motion.div>

          {/* ── Summary Cards Section ──────────────────────────── */}
          <div className="ts-summary-grid">
            {cards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.08 }}
                  className="ts-summary-card"
                >
                  <div className="ts-summary-card-accent" />
                  <div className="ts-card-top">
                    <span className="ts-card-label">{card.title}</span>
                    <div className="ts-card-icon-box" style={{ background: card.gradient }}>
                      <Icon size={20} />
                    </div>
                  </div>
                  <div className="ts-card-value">{card.value}</div>
                  <div>
                    <span className={`ts-card-badge ${card.badgeClass}`}>
                      {card.change}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ── Add Employee Modal ──────────────────────────── */}
          <AnimatePresence>
            {addEmp && (
              <AddEmployee
                onAdd={handleAddEmployee}
                onCancel={() => setAddEmp(false)}
              />
            )}
          </AnimatePresence>

          {/* ── Toolbar: Search & Filters ───────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="ts-section-heading">Filter & Search Workforce</h2>
            <div className="emp-toolbar">
              <EmployeeSearch
                search={searchQuery}
                setSearch={setSearchQuery}
              />
              <EmployeeFilter
                department={department}
                setDepartment={setDeparment}
                role={role}
                setRole={setRole}
                expe={expe}
                setExpe={setExpe}
                handleClearFilter={handleClearFilter}
              />
            </div>
          </motion.section>

          {/* ── Table Section ───────────────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <h2 className="ts-section-heading">Employee Directory ({filteredEmployee.length})</h2>
            <EmployeeTable employees={filteredEmployee} />
          </motion.section>
        </main>
      </div>
    </div>
  );
};

export default EmployeeList;
