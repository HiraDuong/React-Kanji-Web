import React from 'react';
import './question.css';

function Question({quizz}) {
  return (
    <div className="quiz">
      {quizz}
    </div>
  );
}

export default Question;
