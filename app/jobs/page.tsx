import { getJobs } from '@/lib/api/jobs';
import React from 'react';

const JobsPage = async({searchParams}: { searchParams: Promise<{ [key: string]: string | string[] }> }) => {
  const search = await searchParams;
  const urlSearch = new URLSearchParams(search as Record<string, string>);
  const query = urlSearch.toString();
  // console.log('Search Params:', query);

  const jobs = await getJobs(query);
  return (
    <div>
      <h1>Jobs Page</h1>
      {jobs.length > 0 ? (
        <ul>
          {jobs.map((job) => (
            <li key={job._id}>
              <h2>{job.title}</h2>
              <p>{job.category}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No jobs found.</p>
      )}
    </div>
  );
};

export default JobsPage;