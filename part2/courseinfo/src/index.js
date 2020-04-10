import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

const Course = ({ course }) => {
  const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }

  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part => <Part part={part.name} exercise={part.exercises} key={part.id}/>)}
      </div>
    )
  }

  const Part = ({ part, exercise }) => {
    return (
      <p>{part} {exercise}</p>
    )
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))