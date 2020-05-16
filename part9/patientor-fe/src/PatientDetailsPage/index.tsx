import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStateValue, Action } from "../state";
import {
  Gender,
  Patient,
  Entry,
  HospitalEntry,
  HealthCheckEntry,
  Diagnosis,
  OccupationalHealthCareEntry,
} from "../types";
import { Icon, Segment } from "semantic-ui-react";
import axios from "axios";
import { apiBaseUrl } from "../constants";

const PatientDetailsPage: React.FC = () => {
  const [{ patientDetails, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const setPatientDetails = (patient: Patient): Action => {
    return {
      type: "SET_PATIENT_DETAILS",
      payload: patient,
    };
  };

  useEffect(() => {
    const fetchPatient = async () => {
      const { data: newPatients } = await axios.get<Patient[]>(
        `${apiBaseUrl}/patients/${id}`
      );
      dispatch(setPatientDetails(newPatients[0]));
      console.log(newPatients[0]);
    };
    if (!patientDetails[id]) {
      fetchPatient();
    }
  }, [dispatch, id, patientDetails]);

  const genderIcon = () => {
    switch (patientDetails[id].gender) {
      case Gender.Male:
        return <Icon name="mars stroke" />;
      case Gender.Female:
        return <Icon name="venus" />;
      case Gender.Other:
        return <Icon name="genderless" />;
    }
  };

  return (
    <div>
      {patientDetails[id] ? (
        <div>
          <h1>
            {patientDetails[id].name} {genderIcon()}
          </h1>
          <p>ssn: {patientDetails[id].ssn}</p>
          <p>occupation: {patientDetails[id].occupation}</p>
          <h2>entries</h2>
          {patientDetails[id].entries.map((entry: Entry) => (
            <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
          ))}
        </div>
      ) : (
        <div>Patient not found.</div>
      )}
    </div>
  );
};

const EntryDetails: React.FC<{
  entry: Entry;
  diagnoses: { [code: string]: Diagnosis };
}> = ({ entry, diagnoses }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalDetail entry={entry} diagnoses={diagnoses} />;
    case "OccupationalHealthcare":
      return (
        <OccupationalHealthcareDetail entry={entry} diagnoses={diagnoses} />
      );
    case "HealthCheck":
      return <HealthCheckDetail entry={entry} diagnoses={diagnoses} />;
    default:
      throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(entry)}`
      );
  }
};

const HealthCheckDetail: React.FC<{
  entry: HealthCheckEntry;
  diagnoses: { [code: string]: Diagnosis };
}> = ({ entry, diagnoses }) => {
  return (
    <Segment>
      <h2>
        {entry.date} <Icon name="doctor" />
      </h2>
      <p>{entry.description}</p>
      {entry.healthCheckRating <= 1 ? (
        <Icon color="green" name="heart" />
      ) : (
        <Icon color="yellow" name="heart" />
      )}
      <ul>
        {entry.diagnosisCodes?.map((code: string) => (
          <li>
            {code} {diagnoses[code] && diagnoses[code].name}
          </li>
        ))}
      </ul>
    </Segment>
  );
};

const HospitalDetail: React.FC<{
  entry: HospitalEntry;
  diagnoses: { [code: string]: Diagnosis };
}> = ({ entry, diagnoses }) => {
  return (
    <Segment>
      <h2>
        {entry.date} <Icon name="hospital" />
      </h2>
      <p>{entry.description}</p>
      <ul>
        {entry.diagnosisCodes?.map((code: string) => (
          <li>
            {code} {diagnoses[code] && diagnoses[code].name}
          </li>
        ))}
      </ul>
    </Segment>
  );
};

const OccupationalHealthcareDetail: React.FC<{
  entry: OccupationalHealthCareEntry;
  diagnoses: { [code: string]: Diagnosis };
}> = ({ entry, diagnoses }) => {
  return (
    <Segment>
      <h2>
        {entry.date} <Icon name="stethoscope" />
      </h2>
      <p>{entry.description}</p>
      <ul>
        {entry.diagnosisCodes?.map((code: string) => (
          <li>
            {code} {diagnoses[code] && diagnoses[code].name}
          </li>
        ))}
      </ul>
    </Segment>
  );
};

export default PatientDetailsPage;
