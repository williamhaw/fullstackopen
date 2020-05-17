import express from "express";
import patientService from "../services/patientsService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get("/:id", (req, res) => {
  res.send(patientService.getEntries().filter(e => e.id === req.params.id));
});

router.post("/", (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation, entries } = req.body;
  const patientEntry = patientService.addPatientEntry(
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
    entries
  );
  res.json(patientEntry);
});

router.post("/:id/entries", (req, res) => {
  const { entry } = req.body;
  const patientEntry = patientService.addEntry(
    req.params.id,
    entry
  );
  res.json(patientEntry);
});

export default router;
