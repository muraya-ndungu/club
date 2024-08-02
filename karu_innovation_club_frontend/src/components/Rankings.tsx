import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchRankings } from '../redux/rankingsSlice';

const Rankings: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const rankings = useSelector((state: RootState) => state.rankings.rankings);
  const rankingStatus = useSelector((state: RootState) => state.rankings.status);
  const error = useSelector((state: RootState) => state.rankings.error);

  useEffect(() => {
    if (rankingStatus === 'idle') {
      dispatch(fetchRankings());
    }
  }, [rankingStatus, dispatch]);

  let content;

  if (rankingStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (rankingStatus === 'succeeded') {
    content = rankings.map((ranking) => (
      <div key={ranking.id}>
        <p>Member: {ranking.memberName}</p>
        <p>Rank: {ranking.rank}</p>
        <p>Points: {ranking.points}</p>
      </div>
    ));
  } else if (rankingStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <div>
      <h2>Rankings</h2>
      {content}
    </div>
  );
};

export default Rankings;
