import React from 'react'
import ReactDOM from 'react-dom'

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

export default Course