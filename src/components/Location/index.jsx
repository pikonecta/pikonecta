import { useState, useEffect } from "react";
import places from "@/assets/places.json";
import ErrorMessage from "@/components/ErrorMessage";

function Location({ register, errors }) {
  const [country, setCountry] = useState("");
  const [departments, setDepartments] = useState([]);

  const [department, setDepartment] = useState("");
  const [cities, setCities] = useState([]);

  const handleUnselectedSite = () => {
    if (department === "") {
      setCities([]);
    }

    if (country === "") {
      setDepartments([]);
      setCities([]);
    }
  };

  useEffect(() => {
    if (country !== "") {
      const currentDepartments = places.countries.find(
        ({ name }) => name === country
      ).departments;
      setDepartments([...currentDepartments]);
    }
    handleUnselectedSite();
  }, [country]);

  useEffect(() => {
    if (department !== "") {
      const currentCities = departments.find(
        ({ name }) => name === department
      )?.cities;
      setCities([...currentCities]);
    }
    handleUnselectedSite();
  }, [department]);

  return (
    <div className="grid grid-cols-3 gap-2">
      <select
        className="cursor-pointer"
        {...register("country", { required: true })}
        name="country"
        onChange={(event) => setCountry(event.currentTarget.value)}
      >
        <option value="">Seleccione un país</option>
        {places.countries.map((site) => (
          <option key={site.id}>{site.name}</option>
        ))}
      </select>

      <select
        className="cursor-pointer"
        {...register("department", { required: true })}
        name="department"
        onChange={(event) => setDepartment(event.currentTarget.value)}
      >
        <option value="">Seleccione un departamento</option>
        {departments.length > 0 &&
          departments.map((currentDepartment) => (
            <option key={currentDepartment.id}>{currentDepartment.name}</option>
          ))}
      </select>

      <select
        className="cursor-pointer"
        {...register("city", { required: true })}
        name="city"
      >
        <option value="">Seleccione una ciudad</option>
        {cities.length > 0 &&
          cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
      </select>
      {errors.country?.type === "required" && (
        <ErrorMessage message="Necesita elegir el país de la empresa" />
      )}
      {errors.department?.type === "required" && (
        <ErrorMessage message="Necesita elegir el demartamento de la empresa" />
      )}
      {errors.city?.type === "required" && (
        <ErrorMessage message="Necesita elegir la ciudad de la empresa" />
      )}
    </div>
  );
}

export default Location;
