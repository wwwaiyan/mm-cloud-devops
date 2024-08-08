import React from 'react';
import JobListing from './components/JobListing';
import styles from './styles/page.module.css';

export default function Home() {
  const jobs = [
    {
      title: 'Senior Officer - DevOps Engineer',
      company: 'Yoma Bank',
      link: 'https://bit.ly/senior-devops-yomabank',
    },
    {
      title: 'Senior DevOps Engineer',
      company: 'Yoma Fleet',
      link: 'https://bit.ly/senior-devops-engineer-yomafleet',
    },
    {
      title: 'ICT Dev Ops Senior Engineer',
      company: 'Ooredoo Myanmar',
      link: 'https://bit.ly/ict-devops-engineer-ooredoo',
    },
    {
      title: 'DevOps Engineer',
      company: 'Startrick Sdn Bhd',
      link: 'https://bit.ly/devops-engineer-StartrickSdnBhd',
    },
    {
      title: 'Assistant Engineer (AWS DevOps)',
      company: 'Global Technology Co., Ltd (GlobalNet)',
      link: 'https://bit.ly/aws-devops-globalnet',
    },
    {
      title: 'DevOps Engineer',
      company: 'HQS Co., Ltd | QSLogics',
      link: 'https://bit.ly/devops-engineer-hqs-qsl',
    },
    {
      title: 'System Engineer/Cloud Engineer',
      company: 'Myanmar Software Integrated Solutions',
      link: 'https://bit.ly/system-cloud-engineer-msis',
    },
    {
      title: 'Software-Driven DevOps Engineer',
      company: 'ABC Content Solutions | Mahar',
      link: 'https://bit.ly/software-driven-devops-mahar-abc',
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.overlay}>
        <h1 className={styles.title}>DevOps and Cloud Engineer Jobs in Myanmar</h1>
        <div className={styles.grid}>
          {jobs.map((job, index) => (
            <div key={index} className={styles.card}>
              <JobListing job={job} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
