import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AxiosService from '../../components/utils/ApiService';
import { toast } from 'react-toastify';
import { Modal, Button, Form } from 'react-bootstrap';
import Timer from './Timer'; // Import the Timer component

const TaskList = () => {
  const { email } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    taskId: '',
    frontendUrl: '',
    backendUrl: '',
    title: ''
  });
  const [startTimes, setStartTimes] = useState({}); // Object to store start times for each task
  const userData = JSON.parse(sessionStorage.getItem("userData"));

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await AxiosService.get(`/task/getTasks/${userData.email}`);
        const tasksData = Array.isArray(response.data) ? response.data : [];
        setTasks(tasksData);
      } catch (err) {
        setError('There was an error fetching the tasks');
        toast.error('There was an error fetching the tasks');
      } finally {
        setLoading(false);
      }
    };
  
    getTasks();
  }, [userData.email]);
  
  const handleClose = () => setShowModal(false);

  const handleShow = (taskId) => {
    setShowModal(true);
    setFormData({ ...formData, taskId });
  };

  const handleStartWork = async (taskId) => {
    try {
      const startTime = new Date(); // Capture start time
      setStartTimes(prevState => ({
        ...prevState,
        [taskId]: startTime // Store start time for specific task ID
      }));
      await AxiosService.post('/task/startWork', { taskId, startTime });
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task._id === taskId ? { ...task, status: 'processing' } : task
        )
      );
    } catch (error) {
      console.error('Error starting work:', error);
      toast.error('Error starting work');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      // Capture the current time as the end time
      const endTime = new Date();
      const response = await AxiosService.post('/task/submitTask', {
        email: userData.email,
        taskId: formData.taskId,
        frontendUrl: formData.frontendUrl,
        backendUrl: formData.backendUrl,
        title: formData.title,
        endTime: endTime // Include endTime in the request payload
      });
      toast.success(response.data.message);
      
      // Update task status in the UI
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task._id === formData.taskId ? { ...task, status: 'submitted' } : task
        )
      );
  
      handleClose();
    } catch (error) {
      console.error('Error submitting task:', error);
      toast.error('Error submitting task');
    }
  };
  
  

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="task-list-container">
      <h2>Task List for {email}</h2>
      <table className="task-table">
        <thead>
          <tr>
            <th>Project Title</th>
            <th>Task Details</th>
            <th>Description</th>
            <th>Date Assigned</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>{task.projectTitle}</td>
              <td>{task.taskDetails}</td>
              <td>{task.projectDescription}</td>
              <td>{new Date(task.dateAssigned).toLocaleDateString()}</td>
              <td>{task.status}</td>
              <td>
                {task.status === 'pending' ? (
                  <button className="btn btn-primary" onClick={() => handleStartWork(task._id)}>Start Work</button>
                ) : task.status === 'processing' ? (
                  <div>
                    {startTimes[task._id] && <Timer startTime={startTimes[task._id]} />} {/* Display timer component only if start time is set */}
                    <button className="btn btn-primary" onClick={() => handleShow(task._id)}>Submit</button>
                  </div>
                ) : (
                  task.status === 'submitted' && <span style={{ color: 'green', fontSize: '1.2em' }}>✔️</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Submit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="frontendUrl">
              <Form.Label>Frontend URL</Form.Label>
              <Form.Control type="text" name="frontendUrl" value={formData.frontendUrl} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="backendUrl">
              <Form.Label>Backend URL</Form.Label>
              <Form.Control type="text" name="backendUrl" value={formData.backendUrl} onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>
     
    </div>
  );
};

export default TaskList;

























// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import AxiosService from '../../components/utils/ApiService';
// import { toast } from 'react-toastify';
// import { Modal, Button, Form } from 'react-bootstrap';

// const TaskList = () => {
//   const { email } = useParams();
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     taskId: '',
//     frontendUrl: '',
//     backendUrl: '',
//     title: ''
//   });
//   const userData = JSON.parse(sessionStorage.getItem("userData"));

//   useEffect(() => {
//     const getTasks = async () => {
//       try {
//         const response = await AxiosService.get(`/task/getTasks/${userData.email}`);
//         const tasksData = Array.isArray(response.data) ? response.data : [];
//         setTasks(tasksData);
//       } catch (err) {
//         setError('There was an error fetching the tasks');
//         toast.error('There was an error fetching the tasks');
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     getTasks();
//   }, [userData.email]);
  

//   const handleClose = () => setShowModal(false);

//   const handleShow = (taskId) => {
//     setShowModal(true);
//     setFormData({ ...formData, taskId });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async () => {
//     try {
//       const response = await AxiosService.post('/task/submitTask', {
//         email: userData.email,
//         taskId: formData.taskId,
//         frontendUrl: formData.frontendUrl,
//         backendUrl: formData.backendUrl,
//         title: formData.title
//       });
//       toast.success(response.data.message);
      
//       // Update task status in the UI
//       setTasks(prevTasks =>
//         prevTasks.map(task =>
//           task._id === formData.taskId ? { ...task, status: 'submitted' } : task
//         )
//       );

//       handleClose();
//     } catch (error) {
//       console.error('Error submitting task:', error);
//       toast.error('Error submitting task');
//     }
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div className="task-list-container">
//       <h2>Task List for {email}</h2>
//       <table className="task-table">
//   <thead>
//     <tr>
//       <th>Project Title</th>
//       <th>Task Details</th>
//       <th>Description</th>
//       <th>Date Assigned</th>
//       <th>Status</th>
//       <th>Action</th>
//     </tr>
//   </thead>
//   <tbody>
//     {tasks.map((task, index) => (
//       <tr key={index}>
//         <td>{task.projectTitle}</td>
//         <td>{task.taskDetails}</td>
//         <td>{task.projectDescription}</td>
//         <td>{new Date(task.dateAssigned).toLocaleDateString()}</td>
//         <td>{task.status}</td>
//         <td>
//           {task.status === 'submitted' ? (
//             <span style={{ color: 'green', fontSize: '1.2em' }}>✔️</span>
//           ) : task.status !== 'completed' ? (
//             <button className="btn btn-primary" onClick={() => handleShow(task._id)}>Submit</button>
//           ) : null}
//         </td>
//       </tr>
//     ))}
//   </tbody>
// </table>



//       {/* Modal */}
//       <Modal show={showModal} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Submit Task</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="title">
//               <Form.Label>Title</Form.Label>
//               <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} />
//             </Form.Group>
//             <Form.Group controlId="frontendUrl">
//               <Form.Label>Frontend URL</Form.Label>
//               <Form.Control type="text" name="frontendUrl" value={formData.frontendUrl} onChange={handleChange} />
//             </Form.Group>
//             <Form.Group controlId="backendUrl">
//               <Form.Label>Backend URL</Form.Label>
//               <Form.Control type="text" name="backendUrl" value={formData.backendUrl} onChange={handleChange} />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>Cancel</Button>
//           <Button variant="primary" onClick={handleSubmit}>Submit</Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default TaskList;

