import { useState, useContext } from "react";
import { AccountContext } from "@/components/Account";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";

function Login() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [loginError, setLoginError] = useState();

  const { authenticate, confirmPassword, logout, getSession } =
    useContext(AccountContext);

  const handleChangingPassword = (data) => {
    const { password, newPassword, newPasswordValidator, email } = data;
    if (newPassword !== newPasswordValidator) {
      setLoginError("Las contraseñas no coinciden");
      return;
    }
    confirmPassword(email, password, newPassword)
      .then((result) => {
        setLoginError();
        console.log(result); // redirigir a la pagina correspondiente
      })
      .catch((error) => {
        setLoginError(error);
      });
  };

  const handleLogin = (data) => {
    const { email, password } = data;
    authenticate(email, password)
      .then((response) => {
        if (response === "newPasswordRequired") {
          setIsChangingPassword(true);
          setValue("newPassword", "");
          setValue("newPasswordValidator", "");
        } else {
          setLoginError();
          console.log(response); // redirigir a pagina correspondiente
        }
      })
      .catch(() => {
        setLoginError("Usuario o contraseña inválidos");
      });
  };

  return (
    <div className="grid place-items-center h-screen content-center">
      <div className=" flex-col min-w-min w-1/4 place-items-center">
        <div className="flex flex-col rounded-md border-sky-600 border-2 m-4 py-10 space-y-6 p-12 pr-16 items-center">
          <h1 className="text-6xl font-bold leading-6 text-sky-600 text-center">
            Konecta
          </h1>
          {loginError && <ErrorMessage message={loginError} />}
          {!isChangingPassword ? (
            <div className="flex flex-col place-items-center">
              <h1>Bienvenido</h1>
              <input
                type="email"
                id="email"
                className="m-4 w-full px-5 py-2"
                placeholder="Ingrese correo electrónico"
                {...register("email", {
                  required: true,
                  pattern: {
                    value:
                      /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})$/,
                    message: "Email inválido",
                  },
                })}
              />
              {errors.email?.type === "required" && (
                <ErrorMessage message="Debe escribir el correo" />
              )}
              {errors.email?.type === "pattern" && (
                <ErrorMessage message="Correo inválido" />
              )}
              <input
                className="m-4 px-5 py-2 w-full"
                type="password"
                id="password"
                placeholder="Ingrese la contraseña"
                {...register("password", { required: true })}
              />
              {errors.password?.type === "required" && (
                <ErrorMessage message="Debe de escribir la contraseña" />
              )}

              <div className="flex justify-around">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-l font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none "
                  onClick={handleSubmit(handleLogin)}
                >
                  INGRESAR
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col place-items-center">
              <h1>Veo que es tu primera vez, por favor cambia la contraseña</h1>
              <input
                className="m-4 px-5 py-2 w-full"
                type="password"
                id="newPassword"
                placeholder="Ingrese la nueva contraseña"
                {...register("newPassword", { required: true, minLength: 6 })}
              />
              {errors.newPassword?.type === "required" && (
                <ErrorMessage message="Debe de escribir la contraseña" />
              )}
              {errors.newPassword?.type === "minLength" && (
                <ErrorMessage message="La contraseña debe de ser de 6 digitos o más" />
              )}
              <input
                className="m-4 px-5 py-2 w-full"
                type="password"
                id="newPasswordValidator"
                placeholder="Repita la nueva contraseña"
                {...register("newPasswordValidator", {
                  required: true,
                  minLength: 6,
                })}
              />
              {errors.newPasswordValidator?.type === "required" && (
                <ErrorMessage message="Debe de escribir de nuevo la contraseña" />
              )}
              {errors.newPasswordValidator?.type === "minLength" && (
                <ErrorMessage message="La contraseña debe de ser de 6 digitos o más" />
              )}

              <div className="flex justify-around">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-l font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none "
                  onClick={handleSubmit(handleChangingPassword)}
                >
                  INGRESAR
                </button>
              </div>
            </div>
          )}

          {!isChangingPassword && (
            <button
              onClick={() => {
                getSession().then((data) => {
                  console.log(data);
                });
                logout();
              }}
              type="button"
              className="text-slate-700 hover:text-black hover:underline-offset-4"
            >
              ¿Olvidaste la contraseña?
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
