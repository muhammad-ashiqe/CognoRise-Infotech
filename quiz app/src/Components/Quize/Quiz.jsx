import React, { useEffect, useRef, useState } from "react";
import "./Quiz.css";
import { data } from "../../assets/data";

const Quiz = () => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);

  let [score,setScore] =useState(0);

  let [result,setResult] =useState(false)

  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);

  let optionArray = [option1, option2, option3, option4];

  const checkAns = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore(prev => prev+1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        optionArray[question.ans-1].current.classList.add("correct");
        
      }
    }
  };

  const next =()=>{
    if(lock === true){
      if(index === data.length -1){
          setResult(true)
          return 0;
      }
    setIndex(++ index)
    setQuestion(data[index]);
    setLock(false);
    optionArray.map((option)=>{
      option.current.classList.remove('correct');
      option.current.classList.remove('wrong');

    })
    }
  }

  const reset =()=>{
    setIndex(0);
    setLock(false);
    setQuestion(data[index])
    setScore(0);
    setResult(false);
  }
 
  return (
    <div className="container">
      <div className="quiz-container">
        <div className="header">
          <h1>Quiz App</h1>
        </div>
        <hr />
        {result ? <div className="final">
        <h3>Your Score is {score} out of {data.length}</h3>
        <button onClick={reset}>Reset</button>
        </div> : 
        <div className="">
          <div className="question">
          <h2>
            {index + 1}. {question.question}
          </h2>
        </div>
        <div className="answers">
          <ul>
            <li ref={option1}
              onClick={(e) => {
                checkAns(e, 1);
              }}
            >
              {" "}
              {question.option1}{" "}
            </li>
            <li ref={option2}
              onClick={(e) => {
                checkAns(e, 2);
              }}
            >
              {" "}
              {question.option2}{" "}
            </li>
            <li ref={option3}
              onClick={(e) => {
                checkAns(e, 3);
              }}
            >
              {" "}
              {question.option3}{" "}
            </li>
            <li ref={option4}
              onClick={(e) => {
                checkAns(e, 4);
              }}
            >
              {" "}
              {question.option4}{" "}
            </li>
          </ul>
        </div>
        <div className="sumbit">
          <button onClick={next}>Next</button>
        </div>
        <div className="para">
          <p>{index+1} of {data.length} </p>
        </div>
        </div>
        }
        
      </div>
    </div>
  );
};

export default Quiz;
