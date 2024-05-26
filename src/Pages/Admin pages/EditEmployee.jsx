import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AxiosService from '../../components/utils/ApiService';
import { toast } from "react-toastify";
import './CreateEmployee.css';
import { useNavigate, useParams } from "react-router-dom";

const EditEmployee = () => {
  const { email } = useParams(); // Get email from route parameters
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  });
  const [loading, setLoading] = useState(true);

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    role: Yup.string().oneOf(['user', 'admin'], 'Invalid role').required('Role is required'),
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await AxiosService.get(`/user/getuserBy-email/${email}`);
        console.log('API response:', response.data); // Debugging line to check API response
        const { firstName, lastName, email: userEmail, role } = response.data;
        setInitialValues({
          firstName,
          lastName,
          email: userEmail,
          password: '',
          confirmPassword: '',
          role,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Error fetching user data');
        setLoading(false);
      }
    };

    if (email) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [email]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (email) {
        // Edit user
        await AxiosService.put(`/user/edit/${email}`, values);
        toast.success("Employee updated successfully");
      } else {
        // Create user
        await AxiosService.post('/user/signup', values);
        toast.success("Employee created successfully");
      }
      navigate("/EmployeeList");
    } catch (error) {
      console.error('There was an error updating the user!', error);
      toast.error(error.response?.data?.message || 'Error updating user');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="create-employee-container">
      <h2>{email ? 'Edit Employee' : 'Create Employee'}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
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
              {email ? 'Update Employee' : 'Create Employee'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditEmployee;
