import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const UPI = () => {
  const history = useHistory();

  const handleGoBack = () => {
    history.push('/');
  };

  return (
    <div className="container mt-5">
      <h2>Payment with UPI</h2>
      <Form>
        <Button variant="primary" type="submit">
          Confirm Payment
        </Button>
      </Form>
      <Button variant="primary" onClick={handleGoBack}>
        Go back
      </Button>
    </div>
  );
};

export default UPI;
