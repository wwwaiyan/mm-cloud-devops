import React from 'react';
import styles from '../styles/page.module.css';

const JobListing = ({ job }) => {
  return (
    <div>
      <a href={job.link} target="_blank" rel="noopener noreferrer">
        <h3 className={styles.jobTitle}>{job.title}</h3>
      </a>
      <p className={styles.company}>{job.company}</p>
    </div>
  );
};

export default JobListing;
