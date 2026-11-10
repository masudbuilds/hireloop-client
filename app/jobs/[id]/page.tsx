import React from 'react';

const JobDetailPage = async ({params}: {params: {id: string}}) => {
  const { id } = await params;
  return (
    <div>
      <h1>Job Detail Page</h1>
      <p>This is where the job details will be displayed.</p>
      <p>Job ID: {id}</p>
    </div>
  );
};

export default JobDetailPage;