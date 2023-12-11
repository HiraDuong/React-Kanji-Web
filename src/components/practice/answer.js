import React, { useState, useEffect } from "react";
import "./answer.css";

const Answer = ({ quizAnswer, answer, resetAnswerState, onResetAnswerState }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questionAnswered, setQuestionAnswered] = useState(false);

  useEffect(() => {
    // Reset trạng thái khi resetAnswerState thay đổi
    if (resetAnswerState) {
      setSelectedAnswer(null);
      setQuestionAnswered(false);
      onResetAnswerState(); // Gọi hàm từ bên ngoài để reset resetAnswerState
    }
  }, [resetAnswerState, onResetAnswerState]);

  const checkAnswer = (index) => {
    if (!questionAnswered) {
      setSelectedAnswer(index);
      setQuestionAnswered(true);

      // Kiểm tra đáp án
      if (quizAnswer[index] === answer) {
        console.log("Correct !");
      } else {
        console.log("Incorrect !");
      }
    }
  };

  const getAnswerClass = (index) => {
    if (questionAnswered) {
      if (quizAnswer[index] === answer) {
        return "correct";
      } else if (selectedAnswer === index) {
        return "incorrect";
      }
    }
    return "";
  };

  return (
    <div className="container">
      <div className="box-container">
        {[0, 1].map((index) => (
          <div
            key={index}
            className={`box ${getAnswerClass(index)}`}
            onClick={() => checkAnswer(index)}
          >
            <div className="innerText">{quizAnswer[index]}</div>
          </div>
        ))}
      </div>

      <div className="box-container">
        {[2, 3].map((index) => (
          <div
            key={index}
            className={`box ${getAnswerClass(index)}`}
            onClick={() => checkAnswer(index)}
          >
            <div className="innerText">{quizAnswer[index]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Answer;
