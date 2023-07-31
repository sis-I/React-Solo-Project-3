import React from "react";
import IntroPage from "./components/IntroPage";
import Questions from "./components/Questions";

import blobsTop from "./assets/blobs-top.svg";
import blobsBottom from "./assets/blobs-bottom.svg";


function App() {
  const [showQuestions, setShowQuestions] = React.useState(false);

  function getQuestions() {
    setShowQuestions(true);
  }

  return (
    <div className="app--background">
      <img className="blobs-top" src={blobsTop} alt="Top Blobs" />
      { showQuestions ? 
        <Questions  /> : 
        <IntroPage handleClick={getQuestions} /> 
      }
      <img className="blobs-bottom" src={blobsBottom} alt="Bottom Blobs" />
    </div>
  )
}

export default App;
