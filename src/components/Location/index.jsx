import { useState, useEffect } from "react";
import places from "@/assets/places.json";

function Location() {
  const [country, setCountry] = useState({
    name: undefined,
    id: undefined,
  });
  const [departments, setDepartments] = useState([]);

  const [department, setDepartment] = useState({
    name: undefined,
    id: undefined,
  });
  const [cities, setCities] = useState([]);

  const handleUnselectedSite = () => {
    if (department.id === undefined) {
      setCities([]);
    }

    if (country.id === undefined) {
      setDepartments([]);
      setCities([]);
    }
  };

  useEffect(() => {
    if (country.id !== undefined) {
      const currentDepartments = places.countries.filter(
        ({ id }) => id === country.id
      )[0].departments;
      setDepartments([...currentDepartments]);
    }
    handleUnselectedSite();
  }, [country.id]);

  useEffect(() => {
    if (department.id !== undefined) {
      const currentCities = departments.filter(
        ({ id }) => id === department.id
      )[0].cities;
      setCities([...currentCities]);
    }
    handleUnselectedSite();
  }, [department.id]);

  return (
    <div className="grid grid-cols-3 gap-2">
      <select name="Pais">
        <option
          value=""
          onClick={() => setCountry({ id: undefined, name: undefined })}
        >
          Seleccione un país
        </option>
        {places.countries.map((site) => (
          <option
            key={site.id}
            value={site.name}
            onClick={() => setCountry({ id: site.id, name: site.name })}
          >
            {site.name}
          </option>
        ))}
      </select>

      <select name="Departamento">
        <option
          value=""
          onClick={() => setDepartment({ id: undefined, name: undefined })}
        >
          Seleccione un departamento
        </option>
        {departments.length > 0 &&
          departments.map((currentDepartment) => (
            <option
              key={currentDepartment.id}
              value={currentDepartment.name}
              onClick={() =>
                setDepartment({
                  id: currentDepartment.id,
                  name: currentDepartment.name,
                })
              }
            >
              {currentDepartment.name}
            </option>
          ))}
      </select>

      <select name="Ciudad">
        <option value="">Seleccione una ciudad</option>
        {cities.length > 0 &&
          cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
      </select>
    </div>
  );
}

export default Location;
