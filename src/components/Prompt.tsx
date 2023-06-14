import React, { BaseSyntheticEvent, SyntheticEvent } from 'react'
import Navigation from './Navigation'
import { useState } from 'react'
import styles from '../styles/Prompt.module.css'

type Prompt = {
  question: any[]
  answer: string
  questionNumber: number
}

export default function Prompt({ question, answer, questionNumber }: Prompt) {
  console.log(answer)
  console.log(question)

  const [userGuess, setUserGuess] = useState('')
  const [userMadeGuess, setUserMadeGuess] = useState(false)
  const [result, setResult] = useState('')




  function handleUserMadeGuess() {
    setUserMadeGuess(false)
    setResult('')
  }

  function makeGuess(e: any) {
    e.preventDefault()
    setUserMadeGuess(true)

    if (answer === userGuess.toLowerCase()){
      setResult("Correct!") 

    } else{
      setResult("Wrong :(")
    }
    setUserGuess('')
  }

  const navigateInput = (e: BaseSyntheticEvent, eType: string) => {

    console.log(e)

    if (e.code == "Backspace") {
      
      if(e.currentTarget.previousElementSibling === null){
        console.log("already back at starting point")
      } else{
        console.log("hit backspace")
        e.currentTarget.previousElementSibling.focus()
      }  

    } else if (e.code !== "Backspace") {
      
      if(e.currentTarget.nextElementSibling === null){
        console.log("submit your guess")
      } else {
        e.currentTarget.nextElementSibling.focus()
      }  
    }
  }


  return (
    <div className={styles.promptWrapper}>

      <h1>
        {question.reduce((acc, curr) => {
          acc.push(curr, "+")
          return acc
        }, []).slice(0, -1)}
      </h1>

      <h3>{userMadeGuess ? result : <></>}</h3>

      <p>Make your guess:</p>


      <form className={styles.guessContainer}>
        {answer.split("").map((character, index) => {

          if (character === " ") { return }

          return (
            <input
              type="text"
              style={{ marginLeft: answer[index - 1] === ' ' ? '10px' : "0px" }}
              maxLength={1}
              onKeyUp={(e) => navigateInput(e, "onKeyUp")}
              tabIndex={index}
              key={index} />
          )

        })}
      </form>
      <button onClick={(e) => makeGuess(e)}>Submit Guess</button>


      <Navigation
        questionNumber={questionNumber}
        handleState={handleUserMadeGuess}
      />
    </div>
  )
}