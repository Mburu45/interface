import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateStudent = () => {
  const { id } = useParams(); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    gender: "",
  });

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    setLoading(true);

    axios
      .get(`http://localhost:4000/api/students/getStudent/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setData({
          _id: res.data._id,
          firstname: res.data.firstname,
          lastname: res.data.lastname,
          gender: res.data.gender,
        });
      })
      .catch((err) => {
        toast.error("Error fetching student data");
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const saveStudent = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("accessToken");

    setLoading(true);

    axios
      .patch(
        `http://localhost:4000/api/students/updateStudent/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success("Student updated successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
        setTimeout(() => navigate("/AllStudents"), 2000);
      })
      .catch((err) => {
        toast.error("An error occurred while updating the student.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="d-flex justify-content-center mx-auto col-md-12 p-5 rounded shadow">
      <Form onSubmit={saveStudent}>
        <h4 className="pb-1 display-12">Edit Student</h4>

        <Form.Group className="mb-3" controlId="formFirstname">
          <Form.Label>Firstname:</Form.Label>
          <Form.Control
            type="text"
            required
            onChange={handleChange}
            name="firstname"
            value={data.firstname}
            placeholder="Enter firstname"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formLastname">
          <Form.Label>Lastname:</Form.Label>
          <Form.Control
            type="text"
            required
            onChange={handleChange}
            name="lastname"
            value={data.lastname}
            placeholder="Enter lastname"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGender">
          <Form.Label>Gender:</Form.Label>
          <Form.Control
            type="text"
            required
            onChange={handleChange}
            name="gender"
            value={data.gender}
            placeholder="Enter gender"
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </Button>

        <ToastContainer />
      </Form>
    </div>
  );
};

export default UpdateStudent;
