import React from "react";
import { HealthCheckRating, HealthCheckEntry, Entry } from "../types";
import { Field, Formik, Form } from "formik";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { Grid, Button, Form as ReactForm } from "semantic-ui-react";
import { useStateValue } from "../state";

export type EntryFormValues = Omit<HealthCheckEntry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

export type RatingOption = {
  value: HealthCheckRating;
  label: string;
};

const ratingOptions: RatingOption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low Risk" },
  { value: HealthCheckRating.HighRisk, label: "High Risk" },
  { value: HealthCheckRating.CriticalRisk, label: "Critical Risk" },
];

export type EntryTypeOption = {
  value: Entry["type"];
  label: string;
};

const entryTypeOptions: EntryTypeOption[] = [
  { value: "HealthCheck", label: "HealthCheck" },
  { value: "Hospital", label: "Hospital" },
];

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        type: "HealthCheck",
        healthCheckRating: HealthCheckRating.Healthy,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        const dateRegex = new RegExp(
          "^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])$"
        );
        if (!values.date) {
          errors.date = requiredError;
        } else if (!dateRegex.test(values.date)) {
          errors.date = "Date is in the wrong format";
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <ReactForm.Field>
              <label>Entry Type</label>
              <Field as="select" name="type" className="ui dropdown">
                {entryTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label || option.value}
                  </option>
                ))}
              </Field>
            </ReactForm.Field>
            {String(values.type) === "HealthCheck" && (
              <ReactForm.Field>
                <label>Healthcheck Rating</label>
                <Field
                  as="select"
                  name="healthCheckRating"
                  className="ui dropdown"
                >
                  {ratingOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label || option.value}
                    </option>
                  ))}
                </Field>
              </ReactForm.Field>
            )}
            {String(values.type) === "Hospital" && (
              <Field
                label="Discharge Date"
                placeholder="YYY-MM-DD"
                name="discharge.date"
                component={TextField}
              />
            )}
            {String(values.type) === "Hospital" && (
              <Field
                label="Criteria"
                placeholder=""
                name="discharge.criteria"
                component={TextField}
              />
            )}
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
