import React, { useEffect, useState } from 'react';
import { ref, get,set, remove } from 'firebase/database';
import { useParams,  useNavigate } from 'react-router-dom';
import { db } from '../firebase';

function Dynamic() {
  const { id } = useParams();
  const history = useNavigate();
  const [userdata, setUserData] = useState([]);
  const [taskdetails, setTaskDetails] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    Description: '',
    status: '',
    assigned_user: '',
    deadline: '',
  });

  const getUsersList = () => {
    get(ref(db, 'users'))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const dataArray = Object.values(data);
          setUserData(dataArray);
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getTaskDetails = () => {
    get(ref(db, `/tasks/${id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setTaskDetails(data);
          setFormData(data);
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getUsersList();
    getTaskDetails();
  }, [id]);

  const handleChangeFunction = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    set(ref(db, `tasks/${id}`), formData);
    window.alert('Updated Details');
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await remove(ref(db, `tasks/${id}`));
        console.log('Deleted Tasks');
        history.push('/');
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };





// import React, { useEffect, useState } from 'react';
// import { ref, child, set, get, remove } from 'firebase/database';
// import { useNavigate, useParams } from 'react-router-dom';
// import { db } from '../firebase';

// function Dynamic() {
//   const  history=useNavigate();
//   const { id } = useParams();
//   const [userdata, setUserData] = useState([]);
//   const [taskdetails, setTaskDetails] = useState([]);
//   const [formData, setFormData] = useState({
//     title: '',
//     Description: '',
//     status: '',
//     assigned_user: '',
//     deadline: '',
//   });

//   const getUsersList = () => {
//     get(child(ref(db), 'users'))
//       .then((snapshot) => {
//         if (snapshot.exists()) {
//           console.log(snapshot.val());
//           const data = snapshot.val();
//           const dataArray = Object.values(data);
//           setUserData(dataArray);
//         } else {
//           console.log('No data available');
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   const getTaskDetails = () => {
//     get(child(ref(db), `/tasks/${id}`))
//       .then((snapshot) => {
//         if (snapshot.exists()) {
//           console.log(snapshot.val());
//           const data = snapshot.val();
//           setTaskDetails(data);
//           setFormData(data);
//         } else {
//           console.log('No data available');
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   useEffect(() => {
//     getUsersList();
//     getTaskDetails();
//   }, [id]);

//   const handleChangeFunction = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     set(ref(db, `tasks/${id}`), formData);
//     window.alert('Updated Details');
//   };

//   const handleDelete = async() => {
//     // remove(ref(db, 'tasks/' + id));
//     // console.log('Deleted TASKS');
//     if (window.confirm('Are you sure you want to delete this task?')) {
//       try {
//         await remove(ref(db, `tasks/${id}`));
//         console.log('Delete Tasks');
//         history.push('/'); // Redirect to the home page or any other page after deletion
//       } catch (error) {
//         console.error('Error deleting task:', error);
//       }
//     }
//   };

  return (
    <div className="continer" style={{ width: "60rem" }}>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputTitle" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputTitle"
            name="title"
            onChange={handleChangeFunction}
            value={formData.title}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputDescription" className="form-label">
            Description
          </label>
          <textarea
            type="text"
            class="form-control"
            id="exampleInputDescription"
            rows={6}
            name="Description"
            onChange={handleChangeFunction}
            value={formData.Description}
          />
        </div>
        <div className="d-flex">
          <div className=" mb-3 col-3 me-3">
            <label htmlFor="assigned_status" className="from_label">
              Status
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              name="status"
              onChange={handleChangeFunction}
              value={formData.status}
            >
              <option selected>Status</option>
              <option value="todo">TaskODo </option>
              <option value="in_progess">IN PEOGESSS</option>
              <option value="done">COMPLETED</option>
            </select>
          </div>
          <div className=" mb-3 col-3 me-3">
            <label htmlFor="assigned_user" className="from_label">
              Assigned_User
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              name="assigned_user"
              onChange={handleChangeFunction}
              value={formData.assigned_user}
              >
              <option> selected user</option>
              {userdata.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {"${item.username}<${item.email}"}
                  </option>
                );
              })}
            </select>
          </div>

          <div className=" mb-3 col-3 me-3">
            <label htmlFor="assigned_user" className="from_label">
              Deadline
            </label>
            <br></br>
            <input
              type="date"
              name="deadline"
              id="deadline"
              className="form-contol"
              min={new Date().toISOString().split("T")[0]}
              onChange={handleChangeFunction}
              value={formData.deadline}
            />
          </div>
        </div>
          <div className="d-flex">
          <button type="submit" class="btn btn-success">
          upadated new task
        </button>
        <button type="submit" class="btn btn-outline-danger  mx-3" onClick={handleDelete}>
           Delete button
        </button>

          </div>
      </form>
      {/* <Outlet /> */}
    </div>
  );
}

export default Dynamic;

