import React from 'react';
import './question.css';

function Question({quiz}) {
  return (
    <div className="quiz">
      {quiz}
    </div>
  );
}

export default Question;
