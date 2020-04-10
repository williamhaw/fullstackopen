import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)



  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text={"good"} handleClick={() => setGood(good + 1)} />
      <Button text={"neutral"} handleClick={() => setNeutral(neutral + 1)} />
      <Button text={"bad"} handleClick={() => setBad(bad + 1)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({ good, neutral, bad }) => {
  if (!good && !neutral && !bad)
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    )

  return (
    <div>
      <h1>Statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + neutral + bad}</p>
      <p>average {(good - bad) / (good + neutral + bad)}</p>
      <p>positive {good / (good + neutral + bad) * 100}%</p>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)