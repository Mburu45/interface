import { useEffect, useState } from "react";
import axios from "axios";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; 
import "react-toastify/dist/ReactToastify.css";

const AllStudents = () => {
  const [records, setRecords] = useState([]);
  const [unauthorized, setUnauthorized] = useState(false);
  const navigate = useNavigate(); 

  const loadEdit = (student_id) => {
    navigate(`/UpdateStudent/${student_id}`);
  };

  const LoadStudent = (student_id) => {
    navigate(`/StudentDetails/${student_id}`);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");

    axios
      .get("http://localhost:4000/api/students/getallStudents", {
        headers: {
          Authorization: `Bearer ${token}`, 
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setRecords(res.data);
      })
      .catch((err) => {
        if (err.response && err.response.status === 403) {
          setUnauthorized(true);
        }
      });
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center mx-auto col-md-12">
      <div className="mt-3">
        <h5>All Students Details</h5>

        {unauthorized && (
          <div className="alert alert-danger">Unauthorized access</div>
        )}

        <div className="table-responsive">
          <table className="table table-bordered table-md">
            <thead>
              <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Gender</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r, i) => (
                <tr key={i}>
                  <td>{r.firstname}</td>
                  <td>{r.lastname}</td>
                  <td>{r.gender}</td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="secondary"
                        id={`dropdown-${i}`}
                        size="sm"
                      >
                        Actions
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => LoadStudent(r._id)}
                        >
                          Details
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => loadEdit(r._id)}
                        >
                          Edit Student
                        </Dropdown.Item>
                        {/* Add Delete logic if needed */}
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllStudents;
