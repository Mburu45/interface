import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddStudent = () => {
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    gender: ''
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const saveStudent = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem('access_token');

    if (!token) {
      toast.error('No access token found. Please login.');
      return;
    }

    try {
      await axios.post(
        'http://localhost:4000/api/students/addstudent',
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success('Student added successfully!');
      setData({
        firstname: '',
        lastname: '',
        gender: ''
      });
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to add student';
      toast.error(errorMsg);
      console.error('Add Student Error:', error);
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h3 className="mb-4">Add Student</h3>
      <Form onSubmit={saveStudent}>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstname"
            value={data.firstname}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastname"
            value={data.lastname}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Gender</Form.Label>
          <Form.Select
            name="gender"
            value={data.gender}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Gender --</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Save Student
        </Button>
      </Form>
    </div>
  );
};

export default AddStudent;

