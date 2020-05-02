import express from "express";
import diagnosesData from "../../data/diagnoses.json";
import { Diagnose } from "../../types";

const router = express.Router();

const diagnoses: Array<Diagnose> = diagnosesData;

router.get("/", (_req, res) => {
  res.send(diagnoses);
});

export default router;
