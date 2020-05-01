import express from "express";
import { calculateBmi } from "./bmicalculator";

const app = express();

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

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
