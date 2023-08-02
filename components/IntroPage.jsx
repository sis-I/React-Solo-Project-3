import React from "react"


function IntroPage(props) {
    return (
        <div className="intro-main">
            <h1 className="intro--title">Quizzical</h1>
            <p className="intro--description">
                Get quizzed and test your general knowledge,
              on different categories</p>
            <button className="intro--btn" onClick={(e)=> props.handleClick(e)}>Questions</button>              
        </div>
    )
}

export default IntroPage;