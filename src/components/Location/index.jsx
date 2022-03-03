import { useState, useEffect } from "react";
import places from "@/assets/places.json";

function Location() {
  const [country, setCountry] = useState();
  const [departments, setDepartments] = useState([]);

  const [department, setDepartment] = useState();
  const [cities, setCities] = useState([]);

  const handleUnselectedSite = () => {
    if (department === undefined) {
      setCities([]);
    }

    if (country === undefined) {
      setDepartments([]);
      setCities([]);
    }
  };

  useEffect(() => {
    if (country !== undefined) {
      const currentDepartments = places.countries.find(
        ({ id }) => id === Number(country)
      ).departments;
      setDepartments([...currentDepartments]);
    }
    handleUnselectedSite();
  }, [country]);

  useEffect(() => {
    if (department !== undefined) {
      const currentCities = departments.find(
        ({ id }) => id === Number(department)
      ).cities;
      setCities([...currentCities]);
    }
    handleUnselectedSite();
  }, [department]);

  return (
    <div className="grid grid-cols-3 gap-2">
      <select
        name="Pais"
        onChange={(event) => setCountry(event.currentTarget.value)}
      >
        <option value="">Seleccione un país</option>
        {places.countries.map((site) => (
          <option key={site.id} value={site.id}>
            {site.name}
          </option>
        ))}
      </select>

      <select
        name="Departamento"
        onChange={(event) => setDepartment(event.currentTarget.value)}
      >
        <option value="">Seleccione un departamento</option>
        {departments.length > 0 &&
          departments.map((currentDepartment) => (
            <option key={currentDepartment.id} value={currentDepartment.id}>
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
