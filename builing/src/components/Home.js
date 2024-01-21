import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TaskCard from './TaskCard';
import { ref, child, get ,remove} from 'firebase/database';
import CreateTask from '../task/CreateTask';
import { db } from '../firebase';

function Home() {
  const [tasklist, setTaskList] = useState({
    todo: {},
    in_progress: {},
    done: {},
  });

  const gettasksList = () => {
    get(child(ref(db), `tasks`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          const data = snapshot.val();
          const filteredData = {
            todo: {},
            in_progress: {},
            done: {},
          };

          Object.keys(data).forEach((key) => {
            const item = data[key];
            const status = item['status'];

            if (['todo', 'in_progress', 'done'].includes(status)) {
              filteredData[status][key] = item;
            } else {
              console.error(`Invalid status key: ${status}`);
            }
          });

          console.log(filteredData);
          setTaskList(filteredData);
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    gettasksList();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      await remove(ref(db, `tasks/${taskId}`));
      console.log('Deleted TASK:', taskId);
      gettasksList(); // Fetch updated task list after deletion
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

 return (
    <>
      <div className='d-flex g-2 '>
        <div className=' col-3 mx-3  mt-2'>
          <div className='bg-primary px-3 py-2 rounded'>Todo </div>
          <div>
          
            {Object.keys(tasklist['todo']).map((key) => {
              return (
                <TaskCard
                  key={key}
                  props={{ ...tasklist['todo'][key], key: key }}
                  onDelete={handleDelete}
                ></TaskCard>
              );
            })}
          </div>
        </div>

        <div className=' col-3 mx-3  mt-2'>
          <div className='bg-warning px-3 py-2 rounded'>In Progress </div>
          <div>
           
            {Object.keys(tasklist['in_progress']).map((key) => {
              return (
                <TaskCard
                  key={key}
                  props={{ ...tasklist['in_progress'][key], key: key }}
                  onDelete={handleDelete}
                ></TaskCard>
              );
            })}
          </div>
        </div>

        <div className=' col-3 mx-3  mt-2'>
          <div className='bg-success px-3 py-2 rounded'>Completed </div>
          <div>
          
            {Object.keys(tasklist['done']).map((key) => {
              return (
                <TaskCard
                  key={key}
                  props={{ ...tasklist['done'][key], key: key }}
                  onDelete={handleDelete}
                ></TaskCard>
              );
            })}
          </div>
        </div>

        <div className='col-3 mx-3 mt-2'>
          <Link to='/createtask' className='btn bg-dark text-white '> Add To Task + </Link>
        </div>
      </div>
    </>
  );
}

export default Home;




