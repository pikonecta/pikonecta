import { useState, useEffect } from "react";
import places from "@/assets/places.json";

function Location() {
  const [country, setCountry] = useState({
    name: undefined,
    id: -1,
  });
  const [departments, setDepartments] = useState([]);

  const [department, setDepartment] = useState({
    name: undefined,
    id: -1,
  });
  const [cities, setCities] = useState([]);

  const [city, setCity] = useState(undefined);

  const handleUnselectedSite = () => {
    if (department.id === -1) {
      setCities([]);
      setCity(undefined);
    }

    if (country.id === -1) {
      setDepartments([]);
      setDepartment({ name: undefined, id: -1 });
      setCities([]);
      setCity(undefined);
    }
  };

  useEffect(() => {
    if (country.name === "")
      setCountry({
        name: undefined,
        id: -1,
      });
    setDepartment({ name: undefined, id: -1 });
    if (country.id !== -1) {
      const currentDepartments = places.countries.filter(
        ({ id }) => id === country.id
      )[0].departments;
      setDepartments([...currentDepartments]);
    }
    handleUnselectedSite();
  }, [country.id]);

  useEffect(() => {
    setCity(undefined);
    if (department.id !== -1) {
      const currentCities = departments.filter(
        ({ id }) => id === department.id
      )[0].cities;
      setCities([...currentCities]);
    }
    handleUnselectedSite();
  }, [department.id]);

  return (
    <div className="grid grid-cols-3 gap-2">
      <select
        name="Country"
        value={country.name}
        onChange={(e) => {
          setCountry({ name: e.target.value, id: e.target.selectedIndex - 1 });
        }}
      >
        <option value="">Seleccione un país</option>
        {places.countries.map((currentCountry) => (
          <option
            id={currentCountry.id}
            key={currentCountry.id}
            value={currentCountry.name}
          >
            {currentCountry.name}
          </option>
        ))}
      </select>

      <select
        name="Department"
        value={department.name}
        onChange={(e) => {
          setDepartment({
            name: e.target.value,
            id: e.target.selectedIndex - 1,
          });
        }}
      >
        <option value="">Seleccione un departamento</option>
        {departments.length > 0 &&
          departments.map((currentDepartment) => (
            <option key={currentDepartment.id} value={currentDepartment.name}>
              {currentDepartment.name}
            </option>
          ))}
      </select>

      <select
        name="City"
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
        }}
      >
        <option value="">Seleccione una ciudad</option>
        {cities.length > 0 &&
          cities.map((currentCity) => (
            <option key={currentCity} value={currentCity}>
              {currentCity}
            </option>
          ))}
      </select>
    </div>
  );
}

export default Location;
