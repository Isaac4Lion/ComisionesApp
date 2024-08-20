import { useState, useEffect } from "react";

export default function LoginForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleValue = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      };
      const response = await fetch("http://localhost:3000/api/login", options);
      const data = await response.json();
      if (response.ok) {
        console.log("Login successful:", data);
      } else {
        console.log("Login failed:", data);
      }
    } catch (error) {
      console.log("Error during login:", error);
    }
  };

  return (
    <>
    <div className="min-h-screen w-full bg-[url('https://res.cloudinary.com/dcax5qaud/image/upload/v1723824486/aq9flsvr3lxubdice3hx.jpg')] bg-no-repeat bg-cover">
        <div className="min-h-screen flex items-center justify-center w-full">
          <div className="backdrop-blur-sm bg-transparent border-2 shadow-md rounded-lg px-8 py-6 max-w-md">
            <img src="/logoMantaHills.png" alt="MantaHills S.C" className="h-32 mb-4 mx-auto" />
            <form id="loginForm" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#8EC3D3] mb-2"
                >
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleValue}
                  className="shadow-sm rounded-md w-full px-3 py-2 text-slate-100 placeholder:text-slate-300 bg-transparent border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="tucorreo@email.com"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-100 mb-2"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleValue}
                  className="shadow-sm rounded-md w-full px-3 py-2 border bg-transparent text-slate-100 placeholder:text-slate-300 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>
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
