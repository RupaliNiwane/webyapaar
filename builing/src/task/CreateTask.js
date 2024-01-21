import React, { useEffect, useState } from "react";
import { ref, child, set, get } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase";

function CreateTask() {
  const [userdata, setUserData] = useState([]);
  const [fromdata, setFromdata] = useState({
    title: null,
    Description: null ,
    status: null,
    assigned_user: null,
    deadline: null,
  });
  const getUersList = () => {
    get(child(ref(db), `users`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          const data = snapshot.val();
          const dataArray = Object.values(data);
          setUserData(dataArray);
           console.log(dataArray);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getUersList();
  }, []);

  const handlechnagefunction = (e) => {
    setFromdata({ ...fromdata, [e.target.name]: e.target.value });
     console.log(fromdata);
  };

  const handleSubmit = (e) => {
   e.preventDefault();
   const taskId = uuidv4();
    set(ref(db, "tasks/" + taskId), fromdata);
    window.alert("Successfully ");
    console.log(fromdata);
  };

  return (
    <div className="continer" style={{ width: "60rem" }}>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label for="exampleInputTitle" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputTitle"
            name="title"
            onChange={handlechnagefunction}
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputDescription" className="form-label">
            Description
          </label>
          <textarea
            type="text"
            class="form-control"
            id="exampleInputDescription"
            rows={6}
            name="Description"
            onChange={handlechnagefunction}
          />
        </div>
        <div className="d-flex">
          <div className=" mb-3 col-3 me-3">
            <label for="assigned_status" className="from_label">
              Status
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              name="status"
              onChange={handlechnagefunction}
            >
              <option selected>Status</option>
              <option value="todo">TaskODo </option>
              <option value="in_progress">IN PEOGESSS</option>
              <option value="done">COMPLETED</option>
            </select>
          </div>
          <div className=" mb-3 col-3 me-3">
            <label for="assigned_user" className="from_label">
              Assigned_User
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              name="assigned_user"
            >
              onChange={handlechnagefunction}
              <option> selected user</option>
              {userdata.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {`${item.username} <${item.email}`}
                  </option>
                );
              })}
            </select>
          </div>

          <div className=" mb-3 col-3 me-3">
            <label for="assigned_user" className="from_label">
              Deadline
            </label>
            <br></br>
            <input
              type="date"
              name="deadline"
              id="deadline"
              className="form-contol"
              min={new Date().toISOString().split("T")[0]}
              onChange={handlechnagefunction}
            />
          </div>
        </div>
        <button type="submit" class="btn btn-success">
          create new task
        </button>
      </form>
    </div>
  );
}

export default CreateTask;
