import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import  encodedLogo  from "@/utils/encodedLogo";

const createTenant = async (data, logo) => {
  const encodeLogo = await encodedLogo(logo);

  const req = {
    id: uuidv4(),
    COMPANY_NAME: data.companyName,
    COMPANY_EMAIL: data.companyEmail,
    COMPANY_PHONE: data.companyPhone,
    REPRESENTATIVE_EMAIL: data.clientEmail,
    REPRESENTATIVE_NAME: data.clientName,
    REPRESENTATIVE_PHONE: data.clientPhone,
    NIT: data.NIT,
    LOGO: {
      encodedImage: encodeLogo,
      extension: logo.name.split(".").pop(),
    },
    ADDRESS: data.companyAddress,
    COUNTRY: data.country,
    CITY: data.city,
    DEPARTMENT: data.department,
  };
  await axios.post("/api/tenants", req, {
    Authorization: import.meta.env.VITE_ADMIN_TOKEN,
  });
};

const updateTenant = async (data, logo) => {

};

const getTenant = async (id) => {
  const res = await axios.get(`/api/tenants/tenant?id=${id}`)
  return res.data; 
};

export { createTenant, getTenant };
