import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import axios from 'axios';
import './Header.css'

const SearchBar = ({ onSearchResults}) => {

  const [search, setSearch] = useState('');

  const handleChange = async(e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim().length > 1) {
      try {
        const response = await axios.get(`/api/users/search?q=${value}`);
        if (response.data.success && onSearchResults) {
           onSearchResults(response.data.data);
        }
      } catch (error) {
         console.error('Error fetching search results:', error);
      }      
    }
  else if(value.trim()===''){
     if (onSearchResults) onSearchResults([]); 

  }

  };
   return (
    <div className="relative w-full max-w-[400px]">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ">
        <Search className="h-4 w-4 text-slate-400" />
      </div>
      <input
        type="text"
        value={search}
        onChange={handleChange}
        placeholder="Search employees, roles..."
        className="w-full pl-10 pr-10 py-2 bg-slate-900/50 hover:bg-slate-900/80 focus:bg-slate-900/90 text-slate-200 text-sm rounded-xl border border-slate-800 focus:outline-none max-w-[400px]"
      />
    </div>
   );
};

export default SearchBar;