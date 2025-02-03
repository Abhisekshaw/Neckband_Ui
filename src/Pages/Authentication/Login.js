import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, clearError } from "../../Slices/authSlice";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const authState = useSelector((state) => state?.authSlice ?? {});
  const { error } = authState;

  const handleTogglePassword = () => setShowPassword(!showPassword);
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin({ data: formData, navigate }));
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left Side: Login Form */}
      <div className="w-1/2 flex flex-col justify-center items-center p-12 bg-white shadow-lg">
        <h2 className=" text-black font-semibold text-md mb-4">NECKBAND UI</h2>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sign In To Continue</h2>
        
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-lime-500 outline-none"
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-lime-500 outline-none"
              placeholder="Enter your password"
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-4 mt-6 flex items-center text-gray-600"
              onClick={handleTogglePassword}
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>

          <div className="flex justify-between items-center mb-6">
            <a href="#" className="text-sm text-lime-500 hover:underline">Forgot Password?</a>
          </div>

          <button type="submit" className="w-full py-2 bg-lime-500 text-white rounded-lg font-medium hover:bg-red-600 transition-all">
            Login
          </button>
        </form>
      </div>

      {/* Right Side: Image */}
      <div className="w-1/2 bg-lime-500 flex items-center justify-center">
        <img src="../assets/image.png" alt="Pet" className="h-ful w-full object-cover" />
      </div>
    </div>
  );
}

export default Login;
