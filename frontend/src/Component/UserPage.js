import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { CreateContext } from '../App';
function UserPage() {
  const {adminuser,setAdminUser,userId}=useContext(CreateContext)
  const [selectedAdmin, setSelectedAdmin] = useState('');
  const [task,setTask]=useState("");
  
  const handleAdminChange = (e) => {
    setSelectedAdmin(e.target.value);
  }
 
  const handletaskChange = (e) => {
    setTask(e.target.value); 
  };
 
  const handleUploadTask = async() => {
    if (selectedAdmin && task) {
      try {
        const response = await axios.post('http://localhost:5000/assignmentupload', {
          admin: selectedAdmin,
          task: task,
          userId
        });

       console.log(response.data)
        console.log(`Task uploaded for admin ID: ${selectedAdmin}`, response.data);
        setTask(''); 
      } catch (error) {
        console.error('Failed to upload task:', error);
      }
    } else {
      console.log('Please select an admin and enter a task.');
    }
  }

  return (
    <>
      <div className='p-5 mt-20 flex flex-row justify-center'>
        <div className='overflow-hidden w-[40rem] rounded-xl shadow-lg p-4'>
          <div className='flex flex-col gap-4'>
            {/* Admin selection dropdown */}
            <select 
              className='p-2 w-full border border-gray-300 rounded-2xl' 
              value={selectedAdmin} 
              onChange={handleAdminChange}
            >
              <option value="" disabled>Select Admin</option>
              {adminuser.map(item => (
                <option key={item._id} value={item._id}>{item.username}</option> // Assuming each admin has _id and username
              ))}
              {/* Add more admins as needed */}
            </select>

            {/* Task input area */}
            <textarea 
              className='p-2 w-full border border-gray-300 rounded-2xl' 
              placeholder='Enter task here...' 
              value={task}
              onChange={handletaskChange}
            />
    
            {/* Upload task button */}
            <button 
              className='bg-blue-600 p-2 rounded-2xl text-white hover:bg-blue-700 transition' 
              onClick={handleUploadTask}
            >
              Upload Task
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserPage;
