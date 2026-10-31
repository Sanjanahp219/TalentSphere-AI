import { Search } from 'lucide-react';

const EmployeeSearch = ({ search, setSearch }) => {
  return (
    <div className="emp-search-wrapper">
      <Search className="emp-search-icon w-4 h-4" />
      <input
        type="text"
        className="emp-search-input"
        placeholder="Search employees by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default EmployeeSearch;