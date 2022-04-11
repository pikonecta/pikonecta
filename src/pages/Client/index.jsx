import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormElement from "@/components/FormElement";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "@/components/Sidebar";
import Location from "@/components/Location";
import UploadImgToForm from "@/components/ImageUpload";
import ErrorMessage from "@/components/ErrorMessage";
import { createTenant, getTenant, updateTenant } from "@/utils/apiManager";

function ClientForm({ canEdit = false }) {
  const {
    register,
    handleSubmit,
    unregister,
    formState: { errors },
    setValue,
  } = useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  const [logo, setLogo] = useState(undefined);
  const [logoSrc, setLogoSrc] = useState("");
  const [isCorrectLogoType, setIsCorrectLogoType] = useState(false);
  const [place, setPlace] = useState(undefined);

  const onSubmit = async (data) => {
    if (!canEdit) {
      const res = await createTenant(data, logo);
      if (res.data.statusCode === 200) {
        navigate("/admin");
        console.log("cliente creado exitosamente");
      } else {
        console.log("error al crear cliente");
      }
    } else {
      const res = await updateTenant(
        { ...data, id },
        logo instanceof File,
        logo
      );
      if (res.data.statusCode === 200) {
        navigate("/admin");
        console.log("cliente editado exitosamente");
      } else {
        console.log("error al crear cliente");
      }
    }
  };
  useEffect(async () => {
    if (canEdit) {
      const res = await getTenant(id);
      const { Item: currentTenant } = res;

      setValue("companyName", currentTenant.COMPANY_NAME);
      setValue("companyEmail", currentTenant.COMPANY_EMAIL);
      setValue("companyPhone", currentTenant.COMPANY_PHONE);
      setValue("companyActivity", currentTenant.COMPANY_ACTIVITY);
      setValue("companyAddress", currentTenant.ADDRESS);
      setValue("NIT", currentTenant.NIT);
      setValue("clientName", currentTenant.REPRESENTATIVE_NAME);
      setValue("clientEmail", currentTenant.REPRESENTATIVE_EMAIL);
      setValue("clientPhone", currentTenant.REPRESENTATIVE_PHONE);
      setValue("country", currentTenant.COUNTRY);
      setValue("department", currentTenant.DEPARTMENT);
      setValue("city", currentTenant.CITY);
      setLogoSrc(currentTenant.LOGO);
      setLogo({ src: currentTenant.LOGO, type: "image/png" });
      setPlace({
        country: currentTenant.COUNTRY,
        department: currentTenant.DEPARTMENT,
        city: currentTenant.CITY,
      });
    }
  }, []);

  useEffect(() => {
    if (logo) {
      const { type } = logo;
      setIsCorrectLogoType(["image/jpeg", "image/png"].includes(type));
    }
  }, [logo]);

  const redirectToGeneral = () => {
    navigate(`/admin`);
  };

  return (
    <div className="grid grid-cols-3 gap-3 gap-x-6 min-h-fit">
      <div className="col-span-1">
        <Sidebar />
      </div>
      <div className="col-span-2 cursor-default">
        <form action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
          <div className=" bg-white space-y-3 p-4 pr-10">
            <h1 className="text-6xl font-bold leading-6 text-sky-700 py-10">
              {canEdit ? "Editar" : "Nuevo"} Cliente
            </h1>
            <div className="grid grid-flow-row-dense grid-cols-3 gap-3">
              <div className="row-start-2 col-span-2">
                <FormElement content="Nombre de la empresa: *">
                  <input
                    className=" flex-1 block w-full  border-b border-sky-700"
                    placeholder="Escriba el nombre de la empresa de su cliente"
                    {...register("companyName", { required: true })}
                  />
                  {errors.companyName?.type === "required" && (
                    <ErrorMessage message="Debe escribir el nombre de la empresa" />
                  )}
                </FormElement>
              </div>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 h-36 border-gray-300 border-dashed rounded-md bg-sky-100 row-start-1 row-end-3">
                {logo ? (
                  <div className="h-full flex flex-col justify-center">
                    <img alt="logo" src={logoSrc} className="h-full" />
                    {!isCorrectLogoType && (
                      <ErrorMessage message="El formato del archivo es incorrecto" />
                    )}
                    <button
                      type="button"
                      className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      onClick={() => {
                        setLogo();
                        unregister("companyLogo");
                        setLogoSrc();
                      }}
                    >
                      cambiar imagen
                    </button>
                  </div>
                ) : (
                  <UploadImgToForm
                    content="Sube el logo"
                    name="companyLogo"
                    message="logo"
                    setters={[
                      { name: "setLogo", func: setLogo },
                      { name: "setLogoSrc", func: setLogoSrc },
                    ]}
                    register={register}
                    errors={errors}
                  />
                )}
              </div>
            </div>
            <FormElement content="Correo de la empresa: *">
              <input
                className=" flex-1 block w-full  border-b border-sky-700"
                placeholder="Escriba el correo de la empresa de su cliente"
                {...register("companyEmail", {
                  required: true,
                  pattern: {
                    value:
                      /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})$/,
                    message: "Email inválido",
                  },
                })}
              />
              {errors.companyEmail?.type === "required" && (
                <ErrorMessage message="Debe escribir el nombre de la empresa" />
              )}
              {errors.companyEmail?.type === "pattern" && (
                <ErrorMessage message="Email inválido" />
              )}
            </FormElement>

            <FormElement content="Telefono de la empresa: *">
              <input
                className=" flex-1 block w-full  border-b border-sky-700"
                placeholder="Escriba el telefono de la empresa de su cliente"
                {...register("companyPhone", {
                  required: true,
                  pattern: {
                    value: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/,
                    message: "Email inválido",
                  },
                })}
              />
              {errors.companyPhone?.type === "required" && (
                <ErrorMessage message="Debe escribir el nombre de la empresa" />
              )}
              {errors.companyPhone?.type === "pattern" && (
                <ErrorMessage message="teléfono inválido" />
              )}
            </FormElement>
            <FormElement content="Ubicación: *">
              {canEdit &&
                (place ? (
                  <Location
                    register={register}
                    errors={errors}
                    canEdit
                    values={place}
                  />
                ) : (
                  <>Loading...</>
                ))}
              {!canEdit && (
                <Location register={register} errors={errors} values={place} />
              )}
            </FormElement>

            <FormElement content="Dirección: *">
              <input
                className=" flex-1 block w-full  border-b border-sky-700"
                placeholder="Escriba la dirección de la empresa del cliente"
                {...register("companyAddress", { required: true })}
              />
              {errors.companyAddress?.type === "required" && (
                <ErrorMessage message="Debe escribir la dirección de la empresa" />
              )}
            </FormElement>

            <FormElement content="NIT: *">
              <input
                className=" flex-1 block w-full  border-b border-sky-700"
                placeholder="Escriba el NIT de la empresa"
                {...register("NIT", {
                  required: true,
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "NIT inválido",
                  },
                })}
              />
              {errors.NIT?.type === "required" && (
                <ErrorMessage message="Debe escribir el NIT de la empresa" />
              )}
              {errors.NIT?.type === "pattern" && (
                <ErrorMessage message="NIT inválido" />
              )}
            </FormElement>

            <FormElement content="Actividad: ">
              <input
                className=" flex-1 block w-full  border-b border-sky-700"
                placeholder="Escriba brevemente a qué se dedica de la empresa"
                {...register("companyActivity")}
              />
            </FormElement>

            <FormElement content="Nombre del representante legal: *">
              <input
                className=" flex-1 block w-full  border-b border-sky-700"
                placeholder="Escriba el nombre completo del representante legal"
                {...register("clientName", { required: true })}
              />
              {errors.clientName?.type === "required" && (
                <ErrorMessage message="Debe escribir el nombre del representante legal de la empresa" />
              )}
            </FormElement>

            <FormElement content="Número de teléfono: *">
              <input
                className=" flex-1 block w-full  border-b border-sky-700"
                placeholder="Escriba el número de teléfono del representante legal"
                {...register("clientPhone", {
                  required: true,
                  pattern: {
                    value: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/,
                    message: "Email inválido",
                  },
                })}
              />
              {errors.clientPhone?.type === "required" && (
                <ErrorMessage message="Debe escribir el teléfono del representante legal de la empresa" />
              )}
              {errors.clientPhone?.type === "pattern" && (
                <ErrorMessage message="teléfono inválido" />
              )}
            </FormElement>

            <FormElement content="Correo electrónico: *">
              <>
                {canEdit && (
                  <span className="text-sky-700">
                    El correo del cliente no se puede editar
                  </span>
                )}
                <input
                  className=" flex-1 block w-full  border-b border-sky-700"
                  placeholder="Escriba el correo electrónico del representante legal"
                  disabled={canEdit}
                  {...register("clientEmail", {
                    required: true,
                    pattern: {
                      value:
                        /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})$/,
                      message: "Email inválido",
                    },
                  })}
                />
                {errors.clientEmail?.type === "required" && (
                  <ErrorMessage message="Debe escribir el correo del representante legal de la empresa" />
                )}
                {errors.clientEmail?.type === "pattern" && (
                  <ErrorMessage message="Email inválido" />
                )}
              </>
            </FormElement>

            <div className="flex justify-around">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-l font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none "
              >
                ENVIAR
              </button>

              <button
                type="button"
                className="inline-flex justify-center py-2 px-4 border border-black shadow-sm text-l font-medium rounded-md text-black bg-white hover:bg-gray-100 focus:outline-none focus:pointer-events-auto"
                onClick={redirectToGeneral}
              >
                ATRAS
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ClientForm;
