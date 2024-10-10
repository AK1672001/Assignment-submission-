import { useContext,createContext,provider, useState } from "react";
import { Route ,Routes} from "react-router-dom";
import AuthForm from "./Component/Authform";
import axios from "axios";
import Admin from "./Component/Admin";
import UserPage from "./Component/UserPage";
import { useEffect } from "react";
axios.defaults.baseURL=window.location.origin === 'http://localhost:3000' 
? 'http://localhost:5000' 
: 'https://assignment-submission-1-8r8o.onrender.com';
axios.defaults.withCredentials=true

const CreateContext=createContext();
function App() {
  
  const [adminuser,setAdminUser]=useState([])
  const [userId,setUserId]=useState('')
  const [adminId,setAdminId]=useState('')
  useEffect(()=>{
    const adminall=async()=>{
         const response=await axios.get("http://localhost:5000/admin")
         console.log(response.data);
       
         console.log("response>>all admin",response.data.alladmin)
          setAdminUser(response.data.alladmin)

    }
    adminall();
},[])
  return (
    <>
    <CreateContext.Provider value={{adminuser,setAdminUser,userId,setUserId,adminId,setAdminId}}>
    <Routes>
        {/* <Route path="/" element={<AuthForm/>} /> */}
        <Route path="/admin" element={<Admin/>} />
        <Route path="/" element={ <AuthForm/>}/>
        <Route path="/userpage" element={<UserPage/>} />
      </Routes>
    </CreateContext.Provider>
      
     
    </>
  );
}

export default App;
export {CreateContext};
