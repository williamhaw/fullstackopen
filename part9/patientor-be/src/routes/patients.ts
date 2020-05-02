import express from "express";
import patientService from "../services/patientsService";
import patientsService from "../services/patientsService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post("/", (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const patientEntry = patientsService.addEntry(
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  );
  res.json(patientEntry);
});

export default router;
