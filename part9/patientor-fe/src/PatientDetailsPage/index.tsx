import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import { Gender, Patient } from "../types";
import { Icon } from "semantic-ui-react";
import axios from "axios";
import { apiBaseUrl } from "../constants";

const PatientDetailsPage: React.FC = () => {
  const [{ patientDetails }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatient = async () => {
      const { data: newPatients } = await axios.get<Patient[]>(
        `${apiBaseUrl}/patients/${id}`
      );
      dispatch({ type: "SET_PATIENT_DETAILS", payload: newPatients[0] });
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
        </div>
      ) : (
        <div>Patient not found.</div>
      )}
    </div>
  );
};

export default PatientDetailsPage;
