import cn from "classnames";
import { useNavigate } from "react-router-dom";
import { deleteTenant } from "@/utils/apiManager";
import { useState, useEffect } from "react";
import Modal from "@/components/Modal";
import { toast } from "react-toastify";

function CompanyCard({
  name,
  city,
  address,
  phone,
  imageUrl,
  id,
  isAlt,
  setter,
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const redirectToEdit = () => {
    navigate(`/admin/update/${id}`);
  };

  const handleDelete = async () => {
    const res = await deleteTenant(id);
    if (res.status === 200) {
      toast.success("Cliente borrado con éxito 👍");
      setter(id);
    } else {
      toast.error("Ocurrió algún error 😌");
    }
  };

  useEffect(() => {
    if (isDeleting) {
      handleDelete();
    }
  }, [isDeleting]);

  return (
    <div
      className={cn(
        "rounded-lg py-6 shadow-md",
        isAlt ? "bg-primary-admin" : "bg-secondary-admin"
      )}
    >
      <div
        className={cn(
          "flex flex-row mb-60 border-b-2 px-4 pb-2",
          isAlt
            ? "border-b-primary-admin-dark"
            : "border-b-secondary-admin-dark"
        )}
      >
        <div className="basis-1/2 flex flex-col justify-between pr-2">
          <span className="">{name}</span>
          <div className="font-bold text-sm">
            <div>{city}</div>
            <div>{address}</div>
            <div>{phone}</div>
          </div>
        </div>
        <div className="basis-1/2 flex justify-end">
          <img
            className="rounded-lg object-contain h-36 w-36"
            src={imageUrl}
            alt="Logo Empresa"
          />
        </div>

        <div />
      </div>
      <div className="flex justify-around px-4 flex-wrap">
        <button
          className="bg-button-edit/60 rounded-lg my-2 py-2 px-4 hover:bg-button-edit hover:shadow-sm mr-2"
          type="button"
          onClick={redirectToEdit}
        >
          EDITAR
        </button>
        <Modal
          title="ELIMINAR"
          text={`¿Está seguro que quiere eliminar a ${name}?`}
          setter={setIsDeleting}
        />
      </div>
    </div>
  );
}

export default CompanyCard;
