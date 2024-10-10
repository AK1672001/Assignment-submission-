import React, { useState ,useContext} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CreateContext } from '../App';
const AuthForm = () => {
  const navigate= useNavigate()
  const {userId,setUserId,adminId,setAdminId}=useContext(CreateContext)
  const [isLogin, setIsLogin] = useState(false); // Toggle between login and register
  const [role, setRole] = useState("user"); // Default role is 'user'
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error,setError]=useState("");
  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLogin) {
      // Register user
      try {
        const response = await axios.post(
          role === "user"
            ? "http://localhost:5000/register"
            : "http://localhost:5000/admin/register",
          { ...formData, role }
        );
        setMessage(response.data.message); 
        setTimeout(()=>{
          setMessage("")
        },2000)
        setFormData({
          username: "",
          email: "",
          password: "",
        });
      } catch (error) {
        setTimeout(()=>{
          setError("")
        },2000)
        setError(error.response.data.msg);
      }
    } else {
      // Login user
        try {
          console.log("inside")
            const response = await axios.post("http://localhost:5000/login", {
              email: formData.email,
              password: formData.password,
            });
            console.log(response.data);
            console.log("responsedata admin is>>",response.data);
            setMessage(response.data.message);
            if(response.data.user.role=="user"){
            setUserId(response.data.user.username)
            }
            setFormData({
              email: "",
              password: "",
              userrole:""
            });
            if(response.data.user.role=="admin"){
              setAdminId(response.data.user._id)
              console.log("response.data.user._id>>",response.data.user._id)
              navigate("/admin")
            }
            else{
              navigate("/userpage")
            }
          } catch (error) {
            setTimeout(()=>{
              setError("");
            },2000)
            setError(error.response.data.msg);
          }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
       {message && (
        <p className="mt-4 font-bold text-3xl text-center text-green-600">
          {message}
        </p>
      )}
      {error && (
        <p className="mt-4 font-bold text-3xl text-center text-red-600">
          {error}
        </p>
      )}
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
        {isLogin
          ? "Login"
          : `Register as ${role === "user" ? "User" : "Admin"}`}
      </h2>

      {/* Toggle between Register and Login */}
      <p className="mb-6">
        {isLogin ? "Don't have an account?" : "Already registered?"}{" "}
        <button
          type="button"
          className="text-blue-600 hover:underline"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Register here" : "Login here"}
        </button>
      </p>

      {!isLogin && (
        <div className="flex mb-6 space-x-4">

          {/* Role Selection Buttons (only in Register mode) */}
          <button
            className={`px-4 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              role === "user"
                ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500"
            }`}
            onClick={() => setRole("user")}
          >
            Register as User
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              role === "admin"
                ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500"
            }`}
            onClick={() => setRole("admin")}
          >
            Register as Admin
          </button>
        </div>
      )}

      {/* Registration/Login Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg space-y-6"
      >
        {!isLogin && (
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              required={!isLogin}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        )}

        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </div>
      </form>

     
    </div>
  );
};

export default AuthForm;
