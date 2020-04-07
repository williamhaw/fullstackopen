import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }

  const Content = ({ parts }) => {
    return (
      <div>
        <Part part={parts[0].name} exercise={parts[0].exercises} />
        <Part part={parts[1].name} exercise={parts[1].exercises} />
        <Part part={parts[2].name} exercise={parts[2].exercises} />
      </div>
    )
  }

  const Part = ({ part, exercise }) => {
    return (
      <p>{part} {exercise}</p>
    )
  }

  const Total = ({ parts }) => {
    return (
      <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
    )
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />

    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))