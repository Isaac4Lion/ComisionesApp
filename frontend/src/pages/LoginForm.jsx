import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
export default function LoginForm() {
  const { auth, setAuth } = useContext(AuthContext)
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleValue = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      };
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, options);
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token',data.token)
        setAuth(data)
        navigate('/')
        
      } else {
        setErrorMessage(data.msg)
        setTimeout(()=>{
          setErrorMessage('')
        },3000)
      }
    } catch (error) {
      console.log("Error during login:", error);
    }
  };

  useEffect(()=>{
    if (Object.keys(auth).length > 0){
      navigate('/')
    }
  },[])
  return (
    <>
    { errorMessage &&
      <div className="fixed top-8 right-4 max-w-lg mx-auto">
      <div className="flex bg-red-200/80 rounded-lg p-4 mb-4 text-sm text-red-700" role="alert">
          <svg className="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
          <div>
               {errorMessage}
          </div>
      </div>
  </div>
    }
      <div className="min-h-screen w-full bg-[url('https://res.cloudinary.com/dcax5qaud/image/upload/v1723824486/aq9flsvr3lxubdice3hx.jpg')] bg-no-repeat bg-cover">
        <div className="min-h-screen flex items-center justify-center w-full">
          <div className="backdrop-blur-sm bg-transparent border-2 shadow-md rounded-lg px-8 py-6 max-w-md">
            <img
              src="/logoMantaHills.png"
              alt="MantaHills S.C"
              className="h-32 mb-4 mx-auto"
            />
            <form id="loginForm" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-100 mb-2"
                >
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleValue}
                  className="shadow-sm rounded-md w-full px-3 py-2 text-slate-100 placeholder:text-slate-300 bg-transparent border border-gray-300 focus:outline-none focus:ring-blue-500 focus:bg-blue-800/50"
                  placeholder="tucorreo@email.com"
                  required
                />
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-100 mb-2"
                >
                  Contraseña
                </label>
                <span
                onClick={()=>setShowPassword(true)} 
                className={`absolute top-9 right-3 hover:cursor-pointer ${showPassword && 'hidden'}`}>
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 27C26.2845 27 33 18 33 18C33 18 26.2845 9 18 9C9.7155 9 3 18 3 18C3 18 9.7155 27 18 27Z"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18 21.75C18.9946 21.75 19.9484 21.3549 20.6517 20.6517C21.3549 19.9484 21.75 18.9946 21.75 18C21.75 17.0054 21.3549 16.0516 20.6517 15.3483C19.9484 14.6451 18.9946 14.25 18 14.25C17.0054 14.25 16.0516 14.6451 15.3483 15.3483C14.6451 16.0516 14.25 17.0054 14.25 18C14.25 18.9946 14.6451 19.9484 15.3483 20.6517C16.0516 21.3549 17.0054 21.75 18 21.75Z"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span
                onClick={()=>setShowPassword(false)} 
                className={`absolute top-9 right-3 hover:cursor-pointer ${!showPassword && 'hidden'}`}>
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.3935 13.5C4.6785 15.75 3 18 3 18C3 18 9.7155 27 18 27C19.0275 27 20.031 26.8613 21 26.619M15.024 9.375C15.9855 9.1365 16.9815 9 18 9C26.2845 9 33 18 33 18C33 18 31.3207 20.25 28.6065 22.5M15.2355 15.4658C14.5723 16.1856 14.2169 17.1363 14.2451 18.1147C14.2733 19.0931 14.6829 20.0217 15.3865 20.7021C16.0901 21.3826 17.0318 21.761 18.0106 21.7565C18.9894 21.7521 19.9277 21.3651 20.625 20.6782M31.5 31.5L4.5 4.5"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleValue}
                  className="shadow-sm rounded-md w-full px-3 py-2 text-slate-100 placeholder:text-slate-300 bg-transparent border border-gray-300 focus:outline-none focus:ring-blue-500 focus:bg-blue-800/50"
                  placeholder="Ingresa tu contraseña"
                  required
                />
                <a
                  href="#"
                  className="text-xs text-slate-100 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <button
                form="loginForm"
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
