import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchPayments } from '../redux/paymentsSlice';

const Payments: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const payments = useSelector((state: RootState) => state.payments.payments);
  const paymentStatus = useSelector((state: RootState) => state.payments.status);
  const error = useSelector((state: RootState) => state.payments.error);

  useEffect(() => {
    if (paymentStatus === 'idle') {
      dispatch(fetchPayments());
    }
  }, [paymentStatus, dispatch]);

  let content;

  if (paymentStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (paymentStatus === 'succeeded') {
    content = payments.map((payment) => (
      <div key={payment.id}>
        <p>Amount: {payment.amount}</p>
        <p>Date: {payment.date}</p>
        <p>Status: {payment.status}</p>
      </div>
    ));
  } else if (paymentStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <div>
      <h2>Payments</h2>
      {content}
    </div>
  );
};

export default Payments;
