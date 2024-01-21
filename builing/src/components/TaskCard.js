import React from 'react';
import { Link } from 'react-router-dom';

function TaskCard({ props, onDelete }) {
  const handleDeleteClick = () => {
    onDelete(props.key);
  };

  return (
    <>
      <Link to={`/tasks/${props.key}`} className='text-decoration-none'>
        <div className='bg-light '>
          <div className='card mt-3 shadow-sm'>
            <div className='card-body'>
              {props.title}
              <button className="btn btn-danger btn-sm float-end" onClick={handleDeleteClick}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default TaskCard;




