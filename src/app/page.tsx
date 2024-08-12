"use client";

import { useState } from 'react';

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

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopied(link);
    setTimeout(() => setCopied(null), 2000); // Reset the copied state after 2 seconds
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-cover bg-center bg-fixed" style={{ backgroundImage: 'url(/background.jpg)' }}>
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      
      <div className="relative z-10 p-8 max-w-6xl w-full mx-auto bg-black bg-opacity-30 rounded-lg shadow-lg mb-auto">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">DevOps & Cloud Engineer Jobs</h1>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {jobListings.map((job) => (
            <li 
              key={job.id} 
              className="p-4 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gradient-to-l hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 cursor-pointer max-w-sm w-full"
            >
              <h2 className="text-lg font-semibold">{job.title}</h2>
              <p className="text-sm mb-4">{job.company}</p>
              <div className="flex justify-between items-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => window.open(job.link, '_blank')}
                >
                  Go to Link
                </button>
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleCopyLink(job.link)}
                >
                  {copied === job.link ? 'Copied!' : 'Copy Link'}
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
