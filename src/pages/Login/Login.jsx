import React from "react";

function Login() {
  return (
    <div className="grid place-items-center h-screen content-center">
      <div className=" flex-col w-min place-items-center">
        <div className="flex flex-col rounded-md border-sky-600 border-2 m-4 py-10 space-y-6 p-12 pr-16 items-center">
          <h1 className="text-6xl font-bold leading-6 text-sky-600 text-center">
            Konecta
          </h1>
          <h1 className="text-slate-900 font-bold m-4">
            Bienvenido, ingrese al portal
          </h1>
          <div className="flex flex-col">
            <input
              className="m-4 radius-md border-b px-5 py-2"
              placeholder="Ingrese nombre de usuario"
            />
            <input
              className="m-4 radius-md border-b px-5 py-2"
              type="password"
              placeholder="Ingrese su contraseña"
            />
          </div>
          <div className="flex justify-around">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-l font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none "
            >
              SIGN IN
            </button>
          </div>
          <button
            type="button"
            className="text-slate-700 hover:text-black hover:underline-offset-4"
          >
            ¿Olvidaste la contraseña?
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
