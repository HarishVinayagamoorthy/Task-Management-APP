import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmployeeList.css'; // Import the CSS file
import AxiosService from '../../components/utils/ApiService';
import { toast } from 'react-toastify';
import { Modal, Button, Form } from 'react-bootstrap';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAssignTaskModal, setShowAssignTaskModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [taskDetails, setTaskDetails] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const response = await AxiosService.get('/user/getall-Employee');
        setEmployees(response.data);
        console.log(response.data);
      } catch (err) {
        setError('There was an error fetching the employee data');
        toast.error('There was an error fetching the employee data');
      } finally {
        setLoading(false);
      }
    };

    getEmployees();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await AxiosService.delete(`/user/delete-Employee/${userId}`);
      setEmployees(employees.filter(employee => employee._id !== userId));
      toast.success('User deleted successfully');
      setShowDeleteModal(false);
    } catch (error) {
      toast.error('There was an error deleting the user');
    }
  };

  const handleAssignTask = async (email) => {
    try {
      if (!taskDetails || !projectTitle || !projectDescription) {
        toast.error('All fields are required');
        return;
      }
      await AxiosService.post('/task/assignTask', { 
        email, 
        taskDetails, 
        projectTitle, 
        projectDescription
      });
      toast.success('Task assigned successfully');
      setShowAssignTaskModal(false);
      setTaskDetails('');
      setProjectTitle('');
      setProjectDescription('');
    } catch (error) {
      toast.error('There was an error assigning the task');
   console.log(error)
    }
  };

  const openAssignTaskModal = (employee) => {
    setSelectedEmployee(employee);
    setShowAssignTaskModal(true);
  };

  const openDeleteModal = (employee) => {
    setSelectedEmployee(employee);
    setShowDeleteModal(true);
  };

  const navigateToTaskList = (email) => {
    navigate(`/tasks/${email}`);
  };

  // const navigateToEditTask = (email) => {
  //   navigate(`/Edit/${email}`);
  // };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="employee-list-container">
      <h2>Employee List</h2>
      <table className="employee-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
              <td>
                {employee.role !== 'admin' && (
                  <>
                    <button className="delete-button" onClick={() => openDeleteModal(employee)}>Delete</button>
                    <button className="assign-button" onClick={() => openAssignTaskModal(employee)}>Assign Task</button>
                    <button className="view-button" onClick={() => navigateToTaskList(employee.email)}>View Tasks</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      {/* Assign Task Modal */}
      <Modal show={showAssignTaskModal} onHide={() => setShowAssignTaskModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Task to {selectedEmployee && selectedEmployee.firstName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="projectTitle">
              <Form.Label>Project Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter project title"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="projectDescription">
              <Form.Label>Project Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter project description"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="taskDetails">
              <Form.Label>Task Details</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task details"
                value={taskDetails}
                onChange={(e) => setTaskDetails(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAssignTaskModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleAssignTask(selectedEmployee.email)}
            disabled={!taskDetails || !projectTitle || !projectDescription} // Disable button if any field is empty
          >
            Assign Task
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete {selectedEmployee && selectedEmployee.firstName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete {selectedEmployee && selectedEmployee.firstName} {selectedEmployee && selectedEmployee.lastName}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={() => handleDeleteUser(selectedEmployee._id)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EmployeeList;












// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './EmployeeList.css'; // Import the CSS file
// import AxiosService from '../../components/utils/ApiService';
// import { toast } from 'react-toastify';
// import { Modal, Button, Form } from 'react-bootstrap';

// const EmployeeList = () => {
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showAssignTaskModal, setShowAssignTaskModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [taskDetails, setTaskDetails] = useState('');
//   const [projectTitle, setProjectTitle] = useState('');
//   const [projectDescription, setProjectDescription] = useState('');

//   const navigate = useNavigate();

//   useEffect(() => {
//     const getEmployees = async () => {
//       try {
//         const response = await AxiosService.get('/user/getall-Employee');
//         setEmployees(response.data);
//         console.log(response.data);
//       } catch (err) {
//         setError('There was an error fetching the employee data');
//         toast.error('There was an error fetching the employee data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     getEmployees();
//   }, []);

//   const handleDeleteUser = async (userId) => {
//     try {
//       await AxiosService.delete(`/user/delete-Employee/${userId}`);
//       setEmployees(employees.filter(employee => employee._id !== userId));
//       toast.success('User deleted successfully');
//       setShowDeleteModal(false); 
//     } catch (error) {
//       toast.error('There was an error deleting the user');
//     }
//   };

//   const handleAssignTask = async (email) => {
//     try {
//       if (!taskDetails || !projectTitle || !projectDescription) {
//         toast.error('All fields are required');
//         return;
//       }
//       await AxiosService.post('/task/assignTask', { email, taskDetails, projectTitle, projectDescription });
//       toast.success('Task assigned successfully');
//       setShowAssignTaskModal(false);
//       setTaskDetails('');
//       setProjectTitle('');
//       setProjectDescription('');
//     } catch (error) {
//       toast.error('There was an error assigning the task');
//     }
//   };

//   const openAssignTaskModal = (employee) => {
//     setSelectedEmployee(employee);
//     setShowAssignTaskModal(true);
//   };

//   const openDeleteModal = (employee) => {
//     setSelectedEmployee(employee);
//     setShowDeleteModal(true);
//   };

//   const navigateToTaskList = (email) => {
//     navigate(`/tasks/${email}`);
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div className="employee-list-container">
//       <h2>Employee List</h2>
//       <table className="employee-table">
//   <thead>
//     <tr>
//       <th>First Name</th>
//       <th>Last Name</th>
//       <th>Email</th>
//       <th>Role</th>
//       <th>Action</th>
//     </tr>
//   </thead>
//   <tbody>
//     {employees.map((employee) => (
//       <tr key={employee._id}>
//         <td>{employee.firstName}</td>
//         <td>{employee.lastName}</td>
//         <td>{employee.email}</td>
//         <td>{employee.role}</td>
//         <td>
//           <button className="delete-button" onClick={() => openDeleteModal(employee)}>Delete</button>
//           <button className="assign-button" onClick={() => openAssignTaskModal(employee)}>Assign Task</button>
//           <button className="view-button" onClick={() => navigateToTaskList(employee.email)}>View Tasks</button>
//         </td>
//       </tr>
//     ))}
//   </tbody>
// </table>


//       {/* Assign Task Modal */}
//       <Modal show={showAssignTaskModal} onHide={() => setShowAssignTaskModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Assign Task to {selectedEmployee && selectedEmployee.firstName}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="projectTitle">
//               <Form.Label>Project Title</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter project title"
//                 value={projectTitle}
//                 onChange={(e) => setProjectTitle(e.target.value)}
//               />
//             </Form.Group>
//             <Form.Group controlId="projectDescription">
//               <Form.Label>Project Description</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter project description"
//                 value={projectDescription}
//                 onChange={(e) => setProjectDescription(e.target.value)}
//               />
//             </Form.Group>
//             <Form.Group controlId="taskDetails">
//               <Form.Label>Task Details</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter task details"
//                 value={taskDetails}
//                 onChange={(e) => setTaskDetails(e.target.value)}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowAssignTaskModal(false)}>
//             Close
//           </Button>
//           <Button
//             variant="primary"
//             onClick={() => handleAssignTask(selectedEmployee.email)}
//             disabled={!taskDetails || !projectTitle || !projectDescription} // Disable button if any field is empty
//           >
//             Assign Task
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Delete Modal */}
//       <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Delete {selectedEmployee && selectedEmployee.firstName}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           Are you sure you want to delete {selectedEmployee && selectedEmployee.firstName} {selectedEmployee && selectedEmployee.lastName}?
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
//             Close
//           </Button>
//           <Button variant="danger" onClick={() => handleDeleteUser(selectedEmployee._id)}>
//             Delete
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default EmployeeList;