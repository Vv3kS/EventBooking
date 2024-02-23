import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const Payment = () => {
  const history = useHistory();
  const [paymentMethod, setPaymentMethod] = useState('');

  const handlePaymentSelection = (method) => {
    setPaymentMethod(method);
    if (method === 'cash') {
      history.push('/feedback');
    } else if (method === 'upi') {
      history.push('/upi');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Select Payment Method</h2>
      <Form>
        <Button variant="primary" className="mr-3" onClick={() => handlePaymentSelection('cash')}>
          Payment with Cash
        </Button>
        <Button variant="success" onClick={() => handlePaymentSelection('upi')}>
          Payment with UPI
        </Button>
      </Form>
    </div>
  );
};

export default Payment;
