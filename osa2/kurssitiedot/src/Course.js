import React from 'react'

const Header = props =>
  <h2>{props.course}</h2>

const Total = props => {
  const exercises = props.parts.map(part => part.exercises)
  const total = exercises.reduce((acc, cur) => acc+cur)

  return <p>total of {total} exercises</p>
}


const Part = props =>
  <p>{props.part.name} {props.part.exercises}</p>

const Content = props => {
  const parts = props.parts.map(part => <Part key={part.id} part={part}/>)
  return(
    <div>
      {parts}
    </div>
  )
}

const Course = props =>{
  return(
    <div>
    <Header course={props.course.name}/>
    <Content parts={props.course.parts}/>
    <Total parts={props.course.parts}/>
    </div>
  )
}

export default Course
