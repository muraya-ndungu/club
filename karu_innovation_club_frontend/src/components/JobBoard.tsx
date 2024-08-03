import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchJobBoard } from '../redux/jobBoardSlice';

const JobBoard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const jobs = useSelector((state: RootState) => state.jobBoard.jobs);
  const jobsStatus = useSelector((state: RootState) => state.jobBoard.status);
  const error = useSelector((state: RootState) => state.jobBoard.error);

  useEffect(() => {
    if (jobsStatus === 'idle') {
      dispatch(fetchJobBoard());
    }
  }, [jobsStatus, dispatch]);

  let content;

  if (jobsStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (jobsStatus === 'succeeded') {
    content = jobs.map((job) => (
      <div key={job.id}>
        <h3>{job.title}</h3>
        <p>{job.description}</p>
        <p>Company: {job.company}</p>
        <a href={job.applyLink} target="_blank" rel="noopener noreferrer">Apply Now</a>
      </div>
    ));
  } else if (jobsStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <div>
      <h1>Job and Internship Board</h1>
      {content}
    </div>
  );
};

export default JobBoard;
