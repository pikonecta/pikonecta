import cn from "classnames";

// TODO: implemet id
// eslint-disable-next-line no-unused-vars
function CompanyCard({ name, city, address, phone, imageUrl, id, isAlt }) {
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
          <span className="text-3xl font-bold">{name}</span>
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
      <div className="flex justify-around px-4">
        <button
          className="bg-button-edit/80 rounded-lg py-2 px-4 hover:bg-button-edit hover:shadow-sm mr-2"
          type="button"
        >
          EDITAR
        </button>
        <button
          className="bg-button-delete/80 rounded-lg py-2 px-4 hover:bg-button-delete hover:shadow-sm"
          type="button"
        >
          ELIMINAR
        </button>
      </div>
    </div>
  );
}

export default CompanyCard;
