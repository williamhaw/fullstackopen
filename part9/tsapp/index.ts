import express from "express";
import bodyParser from "body-parser";
import { calculateBmi } from "./bmicalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(bodyParser.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  try {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    if (isNaN(height) || isNaN(weight))
      throw new Error("malformatted parameters");
    const result = calculateBmi(height, weight);

    res.send({
      weight: weight,
      height: height,
      bmi: result,
    });
  } catch (e) {
    res.send({
      error: "malformatted parameters",
    });
  }
});

app.post("/exercises", (req, res) => {
  try {
    if (!req.body.daily_exercises || !req.body.target)
      throw new Error("parameters missing");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dailyExercises: any = req.body.daily_exercises;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const target: any = req.body.target;
    if (isNaN(target)) {
      throw new Error("malformatted parameters");
    } else if (
      !Array.isArray(dailyExercises) ||
      dailyExercises.filter((v) => !isNaN(v)).length !=
        dailyExercises.length
    ) {
      throw new Error("malformatted parameters");
    }
    res.send(calculateExercises(dailyExercises, target));
  } catch (e) {
    res.send({
      error: e.message,
    });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
