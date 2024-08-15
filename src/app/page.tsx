"use client";

import { useState, useEffect, FormEvent } from 'react';
import { FaExternalLinkAlt, FaCopy, FaCheck, FaEdit, FaTrashAlt, FaSearch, FaPlus } from 'react-icons/fa';
import { db } from './firebase'; // Firebase config file
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import Link from 'next/link';

// Define a TypeScript interface for a Job
interface Job {
  id: string;
  title: string;
  company: string;
  link: string;
}

export default function Jobs() {
  const [copied, setCopied] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [snowflakes, setSnowflakes] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [jobListings, setJobListings] = useState<Job[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<{ title: string; company: string; link: string }>({ title: '', company: '', link: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editJobId, setEditJobId] = useState<string | null>(null);
  const currentYear = new Date().getFullYear();


  // Fetch job listings from Firebase
  useEffect(() => {
    const fetchJobs = async () => {
      const querySnapshot = await getDocs(collection(db, "jobs"));
      const jobsArray: Job[] = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Job[];
      setJobListings(jobsArray);
    };
    fetchJobs();
  }, []);

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopied(link);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "jobs", id));
    setJobListings(jobListings.filter(job => job.id !== id));
  };

  const handleEdit = (job: Job) => {
    setIsEditing(true);
    setShowForm(true);
    setEditJobId(job.id);
    setFormData({ title: job.title, company: job.company, link: job.link });
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isEditing && editJobId) {
      await updateDoc(doc(db, "jobs", editJobId), formData);
    } else {
      await addDoc(collection(db, "jobs"), formData);
    }
    setFormData({ title: '', company: '', link: '' });
    setShowForm(false);
    setIsEditing(false);
    setEditJobId(null);

    // Refresh the job listings after the operation
    const querySnapshot = await getDocs(collection(db, "jobs"));
    const jobsArray: Job[] = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Job[];
    setJobListings(jobsArray);
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
      
      {/* Snowflake Effects */}
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute bg-white rounded-full pointer-events-none"
          style={{
            left: flake.x,
            top: flake.y,
            width: '8px',
            height: '8px',
            transform: `translate(-50%, -50%)`,
            animation: 'snowflake-fall 1s linear forwards',
          }}
        ></div>
      ))}

      <div className="relative z-10 p-8 max-w-6xl w-full mx-auto bg-black bg-opacity-30 rounded-lg shadow-lg mb-auto">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">DevOps & Cloud Engineer Jobs in Myanmar</h1>
        
        {/* Search, Filter Bar, and Add Job Button */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
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
          <button
            className="bg-[#2C3E50] text-[#BDC3C7] rounded-lg p-2 hover:bg-[#BDC3C7] hover:text-[#2C3E50] flex items-center"
            onClick={() => setShowForm(!showForm)}
          >
            <FaPlus className="mr-2" /> {showForm ? 'Cancel' : 'Add Job'}
          </button>
        </div>

        {/* CRUD Form */}
        {showForm && (
          <form onSubmit={handleFormSubmit} className="mb-6">
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Job Title"
                className="bg-[#BDC3C7] text-[#2C3E50] border-none focus:outline-none p-2 rounded-lg"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Company Name"
                className="bg-[#BDC3C7] text-[#2C3E50] border-none focus:outline-none p-2 rounded-lg"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                required
              />
              <input
                type="url"
                placeholder="Job Link"
                className="bg-[#BDC3C7] text-[#2C3E50] border-none focus:outline-none p-2 rounded-lg"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                required
              />
              <button
                type="submit"
                className="bg-[#2C3E50] text-[#BDC3C7] rounded-lg p-2 hover:bg-[#BDC3C7] hover:text-[#2C3E50]"
              >
                {isEditing ? 'Update Job' : 'Add Job'}
              </button>
            </div>
          </form>
        )}

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
                <button
                  className="text-[#BDC3C7] hover:text-gray-300 flex items-center"
                  onClick={() => handleEdit(job)}
                >
                  <FaEdit className="w-5 h-5" />
                </button>
                <button
                  className="text-red-500 hover:text-red-700 flex items-center"
                  onClick={() => handleDelete(job.id)}
                >
                  <FaTrashAlt className="w-5 h-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <footer className="relative z-10 p-4 text-center bg-black bg-opacity-50 text-white">
      <p>
          &copy; {currentYear} DevOps & Cloud Engineer Jobs in Myanmar | Created by{' '}
          <Link href="https://waiyansoe.vercel.app/" target="_blank" className="text-blue-500 hover:underline">
            Wai Yan Soe
          </Link>
        </p>
      </footer>

      <style jsx>{`
        @keyframes snowflake-fall {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
          }
        }
      `}</style>
    </div>
  );
}
