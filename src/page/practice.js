import React from 'react';
import CourseTitle from "../components/course/CourseTitle";
import Counter from "../components/course/counter";
import Answer from "../components/practice/answer";
import Question from "../components/practice/question";

const quizzes = [
  {
    quiz: "日",
    quizAnswer: ["sun", "nichi", "moon", "ichi"],
    answer: "sun"
  },
  {
    quiz: "本",
    quizAnswer: ["book", "hon", "tree", "ki"],
    answer: "book"
  },
  {
    quiz: "山",
    quizAnswer: ["mountain", "yama", "river", "kawa"],
    answer: "mountain"
  }
];

function Practice() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [resetAnswerState, setResetAnswerState] = React.useState(false);

  const quiz = quizzes[currentIndex];

  const goToNextQuestion = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, quizzes.length - 1));
    setResetAnswerState(true);
  };

  const goToPreviousQuestion = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    setResetAnswerState(true);
  };

  const handleResetAnswerState = () => {
    setResetAnswerState(false); // Đặt lại resetAnswerState thành false sau khi sử dụng
  };

  return (
    <div className="page">
      <CourseTitle title={"Kanji N5"} />
      <Question quiz={quiz.quiz} />
      <Answer quizAnswer={quiz.quizAnswer} answer={quiz.answer} resetAnswerState={resetAnswerState} onResetAnswerState={handleResetAnswerState} />
      <Counter num1={currentIndex + 1} num2={quizzes.length} onDecrement={goToPreviousQuestion} onIncrement={goToNextQuestion} />
    </div>
  );
}

export default Practice;
