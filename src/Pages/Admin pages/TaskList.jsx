import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AxiosService from '../../components/utils/ApiService';
import { toast } from 'react-toastify';
import './TaskList.css'; // Import the CSS file

const TaskList = () => {
  const { email } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await AxiosService.get(`/task/getTasks/${email}`);
        setTasks(response.data);
        console.log(response.data);
      } catch (err) {
        setError('There was an error fetching the tasks');
        toast.error('There was an error fetching the tasks');
      } finally {
        setLoading(false);
      }
    };

    getTasks();
  }, [email]);

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
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(tasks) && tasks.map((task, index) => (
            <tr key={index}>
              <td>{task.projectTitle}</td>
              <td>{task.taskDetails}</td>
              <td>{task.projectDescription}</td>
              <td>{new Date(task.dateAssigned).toLocaleDateString()}</td>
              <td>{task.status}</td>
              <td>{task.status === 'submitted' ? new Date(task.startTime).toLocaleString() : null}</td>
              <td>{task.status === 'submitted' ? new Date(task.endTime).toLocaleString() : task.status === 'processing' ? new Date(task.startTime).toLocaleString() : null}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;

























// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import AxiosService from '../../components/utils/ApiService';
// import { toast } from 'react-toastify';
// import './TaskList.css'; // Import the CSS file

// const TaskList = () => {
//   const { email } = useParams();
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getTasks = async () => {
//       try {
//         const response = await AxiosService.get(`/task/getTasks/${email}`);
//         setTasks(response.data);
//         console.log(response.data);
//       } catch (err) {
//         setError('There was an error fetching the tasks');
//         toast.error('There was an error fetching the tasks');
//       } finally {
//         setLoading(false);
//       }
//     };

//     getTasks();
//   }, [email]);

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
//         <thead>
//           <tr>
//             <th>Project Title</th>
//             <th>Task Details</th>
//             <th>Description</th>
//             <th>Date Assigned</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tasks.map((task, index) => (
//             <tr key={index}>
//               <td>{task.projectTitle}</td>
//               <td>{task.taskDetails}</td>
//               <td>{task.projectDescription}</td>
//               <td>{new Date(task.dateAssigned).toLocaleDateString()}</td>
//               <td>{task.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TaskList;







// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import AxiosService from '../../components/utils/ApiService';
// import { toast } from 'react-toastify';
// import './TaskList.css'; // Import the CSS file

// const TaskList = () => {
//   const { email } = useParams();
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getTasks = async () => {
//       try {
//         const response = await AxiosService.get(`/task/getTasks/${email}`);
//         setTasks(response.data);
//         console.log(response.data);
//       } catch (err) {
//         setError('There was an error fetching the tasks');
//         toast.error('There was an error fetching the tasks');
//       } finally {
//         setLoading(false);
//       }
//     };

//     getTasks();
//   }, [email]);

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
//         <thead>
//           <tr>
//             <th>Project Title</th>
//             <th>Task Details</th>
//             <th>Description</th>
//             <th>Date Assigned</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {Array.isArray(tasks) && tasks.map((task, index) => (
//             <tr key={index}>
//               <td>{task.projectTitle}</td>
//               <td>{task.taskDetails}</td>
//               <td>{task.projectDescription}</td>
//               <td>{new Date(task.dateAssigned).toLocaleDateString()}</td>
//               <td>{task.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TaskList;

