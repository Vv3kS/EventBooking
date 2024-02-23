import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const Feedback = () => {
  const history = useHistory();

  const handleGoBack = () => {
    history.push('/');
  };

  return (
    <div className="container mt-5">
      <h2>Feedback Page</h2>
      <Button variant="primary" onClick={handleGoBack}>
        Go back
      </Button>
    </div>
  );
};

export default Feedback;
