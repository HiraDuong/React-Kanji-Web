import React, { useState, useEffect } from "react";
import "./answer.css";

const Answer = ({
  quizAnswer,
  answer,
  resetAnswerState,
  onResetAnswerState,
  score,
  setScore,
  answeredQuestions,
  setAnsweredQuestions,
  QuestionIndex,
}) => {
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
  const hasAnswered = answeredQuestions.some(
    (answeredQuestion) => answeredQuestion.questionIndex === QuestionIndex,
  );
  const checkAnswer = (index) => {
    if (!questionAnswered && !hasAnswered) {
      const updatedAnsweredQuestions = [
        ...answeredQuestions,
        { questionIndex: QuestionIndex, answerIndex: index },
      ];
      setAnsweredQuestions(updatedAnsweredQuestions);

      setSelectedAnswer(index);
      setQuestionAnswered(true);

      // Kiểm tra đáp án
      if (quizAnswer[index] === answer) {
        console.log("Correct !");
        setScore(score + 1);
      } else {
        console.log("Incorrect !");
      }
    }
  };

  const getAnswerClass = (index) => {
    if (hasAnswered) {
      if (quizAnswer[index] === answer) return "correct";
      else if (
        answeredQuestions.some(
          (answeredQuestion) =>
            answeredQuestion.questionIndex === QuestionIndex &&
            quizAnswer[index] === quizAnswer[answeredQuestion.answerIndex],
        )
      )
        return "incorrect";
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
