import patientsData from "../../data/patients";
import {
  Patient,
  Gender,
  Entry,
  Discharge,
  SickLeave,
  HealthCheckRating,
} from "../../types";
import { v4 as uuidv4 } from "uuid";

/* eslint-disable @typescript-eslint/no-explicit-any */

const patients: Array<Patient> = patientsData;

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseName = (name: any): string => {
  if (!isString(name)) {
    throw new Error("Incorrect or missing name: " + name);
  }
  return name;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const parseSsn = (ssn: any): string => {
  if (!isString(ssn)) {
    throw new Error("Incorrect or missing ssn: " + ssn);
  }
  return ssn;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const parseOccupation = (occupation: any): string => {
  if (!isString(occupation)) {
    throw new Error("Incorrect or missing ssn: " + occupation);
  }
  return occupation;
};

const parseEntries = (entries: any): Entry[] => {
  if (
    !Array.isArray(entries) &&
    entries.filter(
      (e: { type: string }) =>
        e.type === "HealthCheck" ||
        e.type === "OccupationalHealthcare" ||
        e.type === "Hospital"
    ).length === entries.length
  ) {
    throw new Error("Incorrect entries: " + entries);
  }
  return entries;
};

const parseEntryId = (id: any): string => {
  if (!isString(id)) {
    throw new Error("Incorrect or missing entry id: " + id);
  }
  return id;
};

const parseEntryDescription = (description: any): string => {
  if (!isString(description)) {
    throw new Error("Incorrect or missing entry description: " + description);
  }
  return description;
};

const parseEntrySpecialist = (specialist: any): string => {
  if (!isString(specialist)) {
    throw new Error("Incorrect or missing entry specialist: " + specialist);
  }
  return specialist;
};

const parseEntryEmployerName = (name: any): string => {
  if (!isString(name)) {
    throw new Error("Incorrect or missing entry employer name: " + name);
  }
  return name;
};

const parseEntryType = (type: any): Entry["type"] => {
  console.log(type);
  if (!isString(type)) {
    throw new Error("Incorrect or missing entry type: " + type);
  }
  if (
    type === "Hospital" ||
    type === "HealthCheck" ||
    type === "OccupationalHealthcare"
  ) {
    return type;
  } else {
    throw new Error("Incorrect entry type: " + type);
  }
};

const parseEntryDiagnosisCodes = (codes: any): string[] => {
  if (codes && !Array.isArray(codes)) {
    throw new Error("Incorrect or missing entry diagnosis codes: " + codes);
  }

  if (codes && codes.filter((c: any) => isString(c)).length !== codes.length) {
    throw new Error("Incorrect or missing entry diagnosis codes: " + codes);
  }

  if (!codes) {
    return [];
  } else {
    return codes;
  }
};

const parseEntryHealthcheckRating = (rating: any): HealthCheckRating => {
  if (isNaN(rating)) {
    throw new Error("Incorrect or missing entry healthcheck rating: " + rating);
  }
  return rating;
};

const parseEntryDischarge = (discharge: any): Discharge => {
  if (!discharge || typeof discharge !== "object") {
    throw new Error("Incorrect or missing entry discharge: " + discharge);
  }

  if (!discharge.date || !isString(discharge.date)) {
    throw new Error("Incorrect or missing entry discharge date: " + discharge);
  }

  if (!discharge.criteria || !isString(discharge.criteria)) {
    throw new Error(
      "Incorrect or missing entry discharge criteria: " + discharge
    );
  }

  return discharge;
};

const parseEntrySickLeave = (sickLeave: any): SickLeave => {
  if (!sickLeave || typeof sickLeave !== "object") {
    throw new Error("Incorrect or missing entry sick leave: " + sickLeave);
  }

  if (!sickLeave.startDate || !isString(sickLeave.startDate)) {
    throw new Error(
      "Incorrect or missing entry sick leave start date: " + sickLeave
    );
  }

  if (!sickLeave.endDate || !isString(sickLeave.endDate)) {
    throw new Error(
      "Incorrect or missing entry sick leave end date: " + sickLeave
    );
  }

  return sickLeave;
};

const getEntries = (): Array<Patient> => {
  return patients;
};

const getNonSensitiveEntries = (): Array<Omit<Patient, "ssn">> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries: [],
  }));
};

const addPatientEntry = (
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: string,
  occupation: string,
  entries: Entry[]
): Patient => {
  const newPatientEntry: Patient = {
    id: uuidv4(),
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: parseEntries(entries),
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const createEntry = (
  id: any,
  description: any,
  date: any,
  specialist: any,
  diagnosisCodes: any,
  type: any,
  healthCheckRating: any,
  discharge: any,
  sickLeave: any,
  employerName: any
) => {
  switch (parseEntryType(type)) {
    case "HealthCheck":
      return {
        id: parseEntryId(id),
        description: parseEntryDescription(description),
        date: parseDate(date),
        specialist: parseEntrySpecialist(specialist),
        diagnosisCodes: parseEntryDiagnosisCodes(diagnosisCodes),
        type: "HealthCheck",
        healthCheckRating: parseEntryHealthcheckRating(healthCheckRating),
      };
    case "Hospital":
      return {
        id: parseEntryId(id),
        description: parseEntryDescription(description),
        date: parseDate(date),
        specialist: parseEntrySpecialist(specialist),
        diagnosisCodes: parseEntryDiagnosisCodes(diagnosisCodes),
        type: "Hospital",
        discharge: parseEntryDischarge(discharge),
      };
    case "OccupationalHealthcare":
      return {
        id: parseEntryId(id),
        description: parseEntryDescription(description),
        date: parseDate(date),
        specialist: parseEntrySpecialist(specialist),
        diagnosisCodes: parseEntryDiagnosisCodes(diagnosisCodes),
        type: "OccupationalHealthcare",
        sickLeave: parseEntrySickLeave(sickLeave),
        employerName: parseEntryEmployerName(employerName),
      };
    default:
      throw new Error("Invalid entry type: " + type);
  }
};

const addEntry = (
  patientId: string,
  id: any,
  description: any,
  date: any,
  specialist: any,
  type: any,
  diagnosisCodes: any,
  healthCheckRating: any,
  discharge: any,
  sickLeave: any,
  employerName: any
): Entry => {
  const patient = patients.find((p) => p.id === patientId);

  const newEntry: Entry = createEntry(
    id,
    description,
    date,
    specialist,
    diagnosisCodes,
    type,
    healthCheckRating,
    discharge,
    sickLeave,
    employerName
  );

  if (patient) {
    patient.entries.push(newEntry);
  }
  return newEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatientEntry,
  addEntry,
};
