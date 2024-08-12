"use client";

import { useState } from 'react';
import { FaExternalLinkAlt, FaCopy, FaCheck, FaSearch } from 'react-icons/fa';

const jobListings = [
  { id: 1, title: 'Senior Officer - Devops Engineer', company: 'Yoma Bank', link: 'https://bit.ly/senior-devops-yomabank' },
  { id: 2, title: 'Senior DevOps Engineer', company: 'Yoma Fleet', link: 'https://bit.ly/senior-devops-engineer-yomafleet' },
  { id: 3, title: 'ICT Dev Ops Senior Engineer', company: 'Ooredoo Myanmar', link: 'https://bit.ly/ict-devops-engineer-ooredoo' },
  { id: 4, title: 'Devops Engineer', company: 'Startrick Sdn Bhd', link: 'https://bit.ly/devops-engineer-StartrickSdnBhd' },
  { id: 5, title: 'Assistant Engineer (AWS Devops)', company: 'Global Technology Co., Ltd (GlobalNet)', link: 'https://bit.ly/aws-devops-globalnet' },
  { id: 6, title: 'DevOps Engineer', company: 'HQS Co., Ltd | QSLogics', link: 'https://bit.ly/devops-engineer-hqs-qsl' },
  { id: 7, title: 'System Engineer/Cloud Engineer', company: 'Myanmar Software Integrated Solutions', link: 'https://bit.ly/system-cloud-engineer-msis' },
  { id: 8, title: 'Software-Driven DevOps Engineer', company: 'ABC Content Solutions | Mahar', link: 'https://bit.ly/software-driven-devops-mahar-abc' },
];

export default function Jobs() {
  const [copied, setCopied] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopied(link);
    setTimeout(() => setCopied(null), 2000);
  };

  const filteredJobs = jobListings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'All' || job.company === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-cover bg-center bg-fixed" style={{ backgroundImage: 'url(/background.jpg)' }}>
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      
      <div className="relative z-10 p-8 max-w-6xl w-full mx-auto bg-black bg-opacity-30 rounded-lg shadow-lg mb-auto">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">DevOps & Cloud Engineer Jobs in Myanmar</h1>
        
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex flex-grow items-center bg-[#BDC3C7] rounded-lg shadow-md p-2">
            <FaSearch className="text-[#2C3E50] mr-2" />
            <input
              type="text"
              placeholder="Search by title or company..."
              className="w-full bg-[#BDC3C7] text-[#2C3E50] border-none focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="bg-[#BDC3C7] border border-gray-300 rounded-lg p-2 text-[#2C3E50] font-semibold"
          >
            <option value="All">All Companies</option>
            {Array.from(new Set(jobListings.map(job => job.company))).map(company => (
              <option key={company} value={company}>{company}</option>
            ))}
          </select>
        </div>
        
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {filteredJobs.map((job) => (
            <li 
              key={job.id} 
              className="p-4 rounded-lg bg-[#2C3E50] text-[#BDC3C7] shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer max-w-sm w-full"
            >
              <h2 className="text-lg font-semibold">{job.title}</h2>
              <p className="text-sm mb-4">{job.company}</p>
              <div className="flex justify-between items-center">
                <button
                  className="text-[#BDC3C7] hover:text-gray-300 flex items-center"
                  onClick={() => handleCopyLink(job.link)}
                >
                  {copied === job.link ? <FaCheck className="w-5 h-5" /> : <FaCopy className="w-5 h-5" />}
                </button>
                <button
                  className="text-[#BDC3C7] hover:text-gray-300 flex items-center"
                  onClick={() => window.open(job.link, '_blank')}
                >
                  <FaExternalLinkAlt className="w-5 h-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <footer className="relative z-10 p-4 text-center bg-black bg-opacity-50 text-white">
        <p>&copy; 2024 Your Website. All rights reserved.</p>
      </footer>
    </div>
  );
}
