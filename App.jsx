import React from "react";
import IntroPage from "./components/IntroPage";
import Questions from "./components/Questions";

import blobsTop from "./assets/blobs-top.svg";
import blobsBottom from "./assets/blobs-bottom.svg";


function App() {
  const [showQuestions, setShowQuestions] = React.useState(false);

  function getQuestions() {
    setShowQuestions(prevShow => !prevShow);
  }

  return (
    <div className="app--background">
      <img className={`blobs-top ${ showQuestions && "question-tblob"}`} src={blobsTop} alt="Top Blobs" />
      { showQuestions ? 
        <Questions playAgain={()=> setShowQuestions(prevShow => !prevShow)} /> : 
        <IntroPage handleClick={getQuestions} /> 
      }
      <img className= {`blobs-bottom ${showQuestions ?  "question-bblob" : "intro-bblob"}`} src={blobsBottom} alt="Bottom Blobs" />
    </div>
  )
}

export default App;
