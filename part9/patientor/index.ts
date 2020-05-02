import express from "express";
import cors from "cors";
import diagnosesRouter from "./src/routes/diagnoses";

const app = express();
app.use(express.json());

const PORT = 3001;

app.use(cors());

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/diagnoses", diagnosesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
