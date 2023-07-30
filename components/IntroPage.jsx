import React from "react"


function IntroPage(props) {
    return (
        <div className="intro-main">
            <h1 className="intro--title">Quizzical</h1>
            <p className="intro--description">Some desctiption if needed</p>
            <button className="intro--btn" onClick={(e)=> props.handleClick(e)}>Questions</button>              
        </div>
    )
}

export default IntroPage;