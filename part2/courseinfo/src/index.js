import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web Development Curriculum</h1>
      {courses.map(course => <Course course={course} />)}
    </div>
  )
}

const Course = ({ course }) => {
  const Header = ({ course }) => {
    return (
      <h2>{course.name}</h2>
    )
  }

  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part => <Part part={part.name} exercise={part.exercises} key={part.id} />)}
      </div>
    )
  }

  const Part = ({ part, exercise }) => {
    return (
      <p>{part} {exercise}</p>
    )
  }

  const total = course.parts.reduce((s, p) => (s + p.exercises), 0)

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <b>total of {total} exercises</b>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))