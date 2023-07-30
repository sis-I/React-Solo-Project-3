import React from "react";
import IntroPage from "./components/IntroPage";
import Questions from "./components/Questions";
import Answers from "./components/Answers";

import blobsTop from "./assets/blobs-top.svg";
import blobsBottom from "./assets/blobs-bottom.svg";


function App() {

    const [isIntro, setIsIntro] = React.useState(true);
    const [isAnswerPage, setIsAnswerPage] = React.useState(false);

    // const res = fetch("https://opentdb.com/api.php?amount=5");
    // let data = res.json();
    // console.log(data);

    function handleClick(e) {
      e.preventDefault();
      setIsIntro(false);
    }

    function checkAnswer() {
        setIsAnswerPage(true);
    }

    return (
      <div className="app--background">
        <img className="blobs-top" src={blobsTop} alt="Top Blobs" />
        {isIntro && <IntroPage handleClick={handleClick}/>}
        {!isIntro && !isAnswerPage && <Questions checkAnswer={checkAnswer}/>}
        {isAnswerPage && <Answers /> }
        <img className="blobs-bottom" src={blobsBottom} alt="Bottom Blobs" />
      </div>
    )
  }

export default App;
