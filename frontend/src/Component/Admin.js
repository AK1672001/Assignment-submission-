import { CreateContext } from "../App";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";

function Admin() {
  const { adminuser, setAdminUser, adminId } = useContext(CreateContext);
  const [assignments, setAssignments] = useState([]);
  const [success,setSuccess]=useState("")
  const [error,setError]=useState("")
  console.log("adminId", adminId);
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        console.log("adminIdtrhyjkulko>>", adminId);
        const response = await axios.get(
          `https://assignment-submission-1-8r8o.onrender.com/admin/assignment/${adminId}`
        );
        console.log(response.data);

        setAssignments(response.data.assignments);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };
    fetchAssignments();
  }, []);

  const handleAccept = async (assignmentId) => {
    try {
     const response= await axios.post(`https://assignment-submission-1-8r8o.onrender.com/admin/assignment/${assignmentId}/accept`);
     console.log(response.data);
     setSuccess(response.data.message);
     setTimeout(()=>{
        setSuccess("")
     },2000)
      console.log("Assignment accepted:", response.data);
      
      setAssignments(assignments);
    } catch (error) {
      console.error("Error accepting assignment:", error);
    }
  };

  const handleReject = async (assignmentId) => {
    try {
     const response = await axios.post(`https://assignment-submission-1-8r8o.onrender.com/admin/assignment/${assignmentId}/reject`);
     console.log(response.data)
      console.log("Assignment rejected:",response.data);
      setError(response.data.message)
      setTimeout(()=>{
         setError("")
      },2000)
      setAssignments(assignments);
    } catch (error) {
      console.error("Error rejecting assignment:", error);
    }
  };

  return (
    <>
      <div className="p-4 flex grid-cols-1 flex-item mt-6 justify-center">
         
        <div className="p-4 flex flex-col mt-6 justify-center">
        <div className=" flex justify-center mt-2">
          <h1 className="items-center font-bold text-3xl ">Show Task</h1>
         </div>
        {
          success && (
            <>
            <p className="text-green-600 font-bold text-2xl">{success}</p>
            </>
          )
        }
         {
          error && (
            <>
            <p className="text-red-600 font-bold text-2xl">{error}</p>
            </>
          )
        }
          {assignments.length > 0 ? (
            <div className="grid grid-cols-1 mt-3 sm:mt-3 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
              {assignments.map((assignment) => (
                <div
                  key={assignment._id}
                  className="overflow-hidden border border-x-black border-y-black rounded-2xl  w-full sm:w-[50rem] p-2 shadow-2xl"
                >
                  <div className="p-5 flex flex-row justify-between items-center">
                    <div className="mt-3">
                      <h1 className="text-lg font-semibold">
                        {assignment.userId}
                      </h1>
                      <h2 className="text-md text-gray-700">
                        {assignment.task}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {new Date(assignment.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex flex-row gap-2 sm:gap-4">
                      <button
                        className="bg-green-600 rounded-2xl px-4 py-1 text-white hover:bg-green-700 transition duration-300"
                        onClick={() => handleAccept(assignment._id)}
                      >
                        Accepted
                      </button>
                      <button
                        className="bg-red-700 rounded-2xl px-4 sm:px-4 sm:py-1 py-1 text-white hover:bg-red-800 transition duration-300"
                        onClick={() => handleReject(assignment._id)}
                      >
                        Rejected
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No assignments available.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Admin;
