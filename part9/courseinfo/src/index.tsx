import React from "react";
import ReactDOM from "react-dom";

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
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
        <p>
          {p.name} {p.exerciseCount}
        </p>
      ))}
    </div>
  );
};

interface ContentProps {
  parts: Array<CoursePart>;
}

interface CoursePart {
  name: string;
  exerciseCount: number;
}

const Total: React.FC<ContentProps> = (props) => {
  return (
    <p>
      Number of exercises{" "}
      {props.parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
