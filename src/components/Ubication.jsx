import React, { useState, useEffect } from 'react'
import sites from '../../utils/sites.json'

function Ubication() {
  const [country, setCountry] = useState({
    name: undefined,
    id: undefined,
  })
  const [departments, setDepartments] = useState([])

  const [department, setDepartment] = useState({
    name: undefined,
    id: undefined,
  })
  const [cities, setCities] = useState([])

  const handleUnselectedSite = () => {
    if (department.id === undefined) { setCities([]) }

    if (country.id === undefined) {
      setDepartments([])
      setCities([])
    }
  }

  useEffect(() => {
    if (country.id !== undefined) {
      const deps = sites.paises.filter(({ id }) => id === country.id)[0].departamentos
      setDepartments([...deps])
    }
    handleUnselectedSite()
  }, [country.id])

  useEffect(() => {
    if (department.id !== undefined) {
      const cits = departments.filter(({ id }) => id === department.id)[0].ciudades
      setCities([...cits])
    }
    handleUnselectedSite()
  }, [department.id])

  return (

    <div className="grid grid-cols-3 gap-2">
      <select
        name="Pais"
      >
        <option value="" onClick={() => setCountry({ id: undefined, name: undefined })}>Seleccione un país</option>
        {
          sites.paises.map(
            (site) => (
              <option
                key={site.id}
                value={site.nombre}
                onClick={() => setCountry({ id: site.id, name: site.nombre })}
              >
                {site.nombre}
              </option>
            ),
          )
        }
      </select>

      <select name="Departamento">
        <option value="" onClick={() => setDepartment({ id: undefined, name: undefined })}>Seleccione un departamento</option>
        {
          departments.length > 0 && departments.map((dep) => (
            <option
              key={dep.id}
              value={dep.departamento}
              onClick={() => setDepartment({ id: dep.id, name: dep.departamento })}
            >
              {dep.departamento}
            </option>
          ))
        }
      </select>

      <select name="Ciudad">
        <option value="">Seleccione una ciudad</option>
        {
          cities.length > 0 && cities.map((cit) => (
            <option
              key={cit}
              value={cit}
            >
              {cit}
            </option>
          ))
        }
      </select>
    </div>

  )
}

export default Ubication
