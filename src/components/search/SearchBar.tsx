import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useFreelancerStore } from '../../store/freelancerStore';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const searchFreelancers = useFreelancerStore((state) => state.searchFreelancers);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchFreelancers(query);
  };

  return (
    <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for freelancers, skills, or services..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
      </div>
    </form>
  );
}