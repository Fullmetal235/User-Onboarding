import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';

/*
  deleted:
    state, ✅
    handleChanges, ✅
    handleSubmit ✅
    form onSubmit ✅
    input values ✅
    input onChange ✅
    labels ✅
*/

// Tasks - Add two fields - size, notes. Don't forget to add them to the values in mPTV

const Forms = ({ errors, touched, values, handleSubmit, status }) => {
  const [person, setperson] = useState([]);
  console.log(person);

  useEffect(() => {
    if (status) {
      setperson([...person, status]);
    }
  }, [status]);

  return (
    <div className="item-form">
      <h1>Sign In</h1>
      <Form>
      <Field type="text" name="Name" placeholder="Name" />
        {touched.Name && errors.Name && (
          <p className="error">{errors.Name}</p>
        )}

        <Field type="text" name="Email" placeholder="Email" />
        {touched.Email && errors.Email && (
          <p className="error">{errors.Email}</p>
        )}

        <Field type="text" name="Password" placeholder="Password" />
        {touched.Password && errors.Password && (
          <p className="error">{errors.Password}</p>
        )}

        

        <label className="checkbox-container">
          I agree to terms and service
          <Field
            type="checkbox"
            name="check"
            checked={values.Name}
          />
          <span className="checkmark" />
        </label>

        <Field
          component="textarea"
          type="text"
          name="notes"
          placeholder="Notes"
        />
        {touched.notes && errors.notes && (
          <p className="error">{errors.notes}</p>
        )}

        <button type="submit">Submit!</button>
      </Form>

      {person.map(item => (
        <p key={item.id}>{item.Password}</p>
      ))}
    </div>
  );
};

// Higher Order Component - HOC
// Hard to share component / stateful logic (custom hooks)
// Function that takes in a component, extends some logic onto that component,
// returns a _new_ component (copy of the passed in component with the extended logic)
const FormikForm = withFormik({
  mapPropsToValues({ Password, Email, Name }) {
    return {
      Name: Name || '',
      Email: Email || '',
      Password: Password || '',
     
    };
  },

  validationSchema: Yup.object().shape({
    Password: Yup.string().required('You silly!!!'),
    Email: Yup.string().required(),
  }),

  handleSubmit(values, { setStatus }) {
    axios
      .post('https://reqres.in/api/users/', values)
      .then(res => {
        setStatus(res.data);
      })
      .catch(err => console.log(err.response));
  }
})(Forms); // currying functions in Javascript

export default FormikForm;