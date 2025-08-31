import React, { useState } from 'react';
import { MdEmail } from 'react-icons/md';
import { RiEyeCloseFill, RiEyeFill, RiLock2Line, RiUserLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { SingUpAPI } from '../../../API/GeneralAPI';
import signup_img from '@assets/signup-bg.jpg';
import { handleError } from '../../../Util/Alerts';

export const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [pass, setPass] = useState(true);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await SingUpAPI(user);
      const data = await response.json();
      console.log(data);
      if (data.success) {
        setLoading(false);
        setSuccess(true);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user_name", JSON.stringify(data.user_name));
        setTimeout(() => navigate("/"), 1000);
      } else {
        setLoading(false);
        setSuccess(false);
        handleError(data.message);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      setSuccess(false);
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

//   const { isLoading, setIsLoading } = useLoading();
//   useEffect(() => {
//     setIsLoading(true);
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 4000);
//     return () => clearTimeout(timer);
//   }, [setIsLoading]);

  return (
    <>
      {/* {isLoading && <Loader />}
      {!isLoading && ( */}
        <div className="relative h-screen flex items-center justify-center">
          <img src={signup_img} alt="bg image" className="login__img absolute w-full h-full object-cover object-center" />
          <form action="" className="relative bg-opacity-10 border-2 border-white rounded-2xl p-10 backdrop-blur-md" 
          onSubmit={handleSignup}>
            <h1 className="text-center text-2xl font-medium mb-8">Signup</h1>
            <div className="grid gap-7 mb-6">
              <div className="grid grid-cols-[max-content_1fr] items-center gap-3 border-b-2 border-white">
                <RiUserLine className="text-xl" />
                <div className="relative">
                  <input name="name" onChange={handleChange} type="text" required 
                  className="w-full py-2 bg-transparent text-white" placeholder="" />
                  <label className="absolute left-0 top-3 font-medium transition-all">UserName</label>
                </div>
              </div>
              <div className="grid grid-cols-[max-content_1fr] items-center gap-3 border-b-2 border-white">
                <MdEmail className="text-xl" />
                <div className="relative">
                  <input type="email" name="email" onChange={handleChange} required className="login__input w-full py-2 bg-transparent text-white" placeholder="" />
                  <label className="login__label absolute left-0 top-3 font-medium transition-all">Email</label>
                </div>
              </div>
              <div className="login__box grid grid-cols-[max-content_1fr] items-center gap-3 border-b-2 border-white">
                <RiLock2Line className="login__icon text-xl" />
                <div className="login__box-input relative">
                  {pass ? <RiEyeCloseFill className="login__eye absolute right-0 top-4 cursor-pointer" onClick={() => setPass(!pass)} /> : <RiEyeFill className="login__eye absolute right-0 top-4 cursor-pointer" onClick={() => setPass(!pass)} />}
                  <input type={pass ? "password" : "text"} name="password" onChange={handleChange} required className="login__input w-full py-2 bg-transparent text-white" placeholder="" />
                  <label className="login__label absolute left-0 top-3 font-medium transition-all">Password</label>
                </div>
              </div>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <input type="checkbox" className="login__check-input w-4 h-4" />
                  <label className="ml-2 text-sm text-gray-400">Remember me</label>
                </div>
              </div>
            </div>
            <button className={`w-full py-4 rounded-lg text-[#1A120B] bg-white font-medium cursor-pointer mb-8 transition duration-200 hover:bg-[#1A120B] hover:text-white 
                ${loading ? 'loading' : ''} ${success ? 'success bg-green-600 transition' : ''}`} disabled={loading}>
              <span className="button--text">{success ? 'Signup Successful' : 'Sign Up'}</span>
              <div className="hidden flex gap-1 justify-center items-center">
                <div className="w-2 h-2 bg-black rounded-full animate-ping"></div>
                <div className="w-2 h-2 bg-black rounded-full animate-ping delay-100"></div>
                <div className="w-2 h-2 bg-black rounded-full animate-ping delay-200"></div>
              </div>
            </button>
            <p className="text-center text-sm text-gray-400">
              Try Login? <a href="/petopia/login" className=" text-white font-medium hover:underline">Log In</a>
            </p>
          </form>
          <ToastContainer />
        </div>
      {/* )} */}
    </>
  );
};

export default Signup;
