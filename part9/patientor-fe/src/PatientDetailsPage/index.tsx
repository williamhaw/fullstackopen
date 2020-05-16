import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStateValue, Action } from "../state";
import { Gender, Patient, Entry } from "../types";
import { Icon } from "semantic-ui-react";
import axios from "axios";
import { apiBaseUrl } from "../constants";

const PatientDetailsPage: React.FC = () => {
  const [{ patientDetails }, dispatch] = useStateValue();
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
            <p key={entry.id}>{entry.description}
            <ul>
              {entry.diagnosisCodes?.map((code: string) => (
                <li>{code}</li>
              ))}
            </ul>
            </p>
          ))}
        </div>
      ) : (
        <div>Patient not found.</div>
      )}
    </div>
  );
};

export default PatientDetailsPage;
