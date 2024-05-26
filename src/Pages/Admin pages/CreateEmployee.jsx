import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AxiosService from '../../components/utils/ApiService';
import { toast } from "react-toastify";
import './CreateEmployee.css';
import { useNavigate } from "react-router-dom";

const CreateEmployee = () => {
  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    role: Yup.string().oneOf(['user', 'admin'], 'Invalid role').required('Role is required'),
  });

  const navigate = useNavigate();

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await AxiosService.post('/user/signup', values);
      console.log('User created successfully:', response.data);
      toast.success("Employee created successfully");
      navigate("/EmployeeList")
    } catch (error) {
      console.error('There was an error creating the user!', error);
      toast.error(error.response.data.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="create-employee-container">
      <h2>Create Employee</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="firstName">First Name:</label>
              <Field type="text" id="firstName" name="firstName" />
              <ErrorMessage name="firstName" component="div" className="error-message" />
            </div>
            <div>
              <label htmlFor="lastName">Last Name:</label>
              <Field type="text" id="lastName" name="lastName" />
              <ErrorMessage name="lastName" component="div" className="error-message" />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <Field type="password" id="confirmPassword" name="confirmPassword" />
              <ErrorMessage name="confirmPassword" component="div" className="error-message" />
            </div>
            <div>
              <label htmlFor="role">Role:</label>
              <Field as="select" id="role" name="role">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Field>
              <ErrorMessage name="role" component="div" className="error-message" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Create Employee
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateEmployee;
