import React from "react";
import ReactDOM from "react-dom";

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
    },
    {
      name: "The fourth part",
      exerciseCount: 14,
      description: "Mostly harmless",
      score: 42,
    },
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

const Header: React.FC<HeaderProps> = (props) => {
  return <h1>{props.name}</h1>;
};

interface HeaderProps {
  name: string;
}

const Content: React.FC<ContentProps> = (props) => {
  return (
    <div>
      {props.parts.map((p) => (
        <Part {...p} key={p.name} />
      ))}
    </div>
  );
};

interface ContentProps {
  parts: Array<CoursePart>;
}

const Total: React.FC<ContentProps> = (props) => {
  return (
    <p>
      Number of exercises{" "}
      {props.parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<CoursePart> = (props) => {
  switch (props.name) {
    case "Fundamentals":
      return (
        <p>
          {props.name} {props.exerciseCount} {props.description}
        </p>
      );
    case "Using props to pass data":
      return (
        <p>
          {props.name} {props.exerciseCount} {props.groupProjectCount}
        </p>
      );
    case "Deeper type usage":
      return (
        <p>
          {props.name} {props.exerciseCount} {props.description}{" "}
          {props.exerciseSubmissionLink}
        </p>
      );
    case "The fourth part":
      return (
        <p>
          {props.name} {props.exerciseCount} {props.description} {props.score}
        </p>
      );
    default:
      return assertNever(props);
  }
};

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartOne extends CoursePartBaseWithDescription {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBaseWithDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartBaseWithDescription {
  name: "The fourth part";
  score: number;
}

interface CoursePartBaseWithDescription extends CoursePartBase {
  description: string;
}

type CoursePart =
  | CoursePartOne
  | CoursePartTwo
  | CoursePartThree
  | CoursePartFour;

ReactDOM.render(<App />, document.getElementById("root"));
