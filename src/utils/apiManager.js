import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import encodedLogo from "@/utils/encodedLogo";

const createTenant = async (data, logo) => {
  const encodeLogo = await encodedLogo(logo);

  const req = {
    id: uuidv4(),
    COMPANY_NAME: data.companyName,
    COMPANY_EMAIL: data.companyEmail,
    COMPANY_PHONE: data.companyPhone,
    COMPANY_ACTIVITY: data.companyActivity,
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
  const res = await axios.post("/api/tenants", req, {
    Authorization: import.meta.env.VITE_ADMIN_TOKEN,
  });
  return res;
};

const updateTenant = async (data, setLogo, logo) => {
  const req = {
    id: data.id,
    ADDRESS: data.companyAddress,
    CITY: data.city,
    COUNTRY: data.country,
    DEPARTMENT: data.department,
    NIT: data.NIT,
    COMPANY_EMAIL: data.companyEmail,
    COMPANY_NAME: data.companyName,
    COMPANY_PHONE: data.companyPhone,
    COMPANY_ACTIVITY: data.companyActivity || "",
    REPRESENTATIVE_EMAIL: data.clientEmail,
    REPRESENTATIVE_NAME: data.clientName,
    REPRESENTATIVE_PHONE: data.clientPhone,
    ITS_ACTIVE: true,
  };

  if (setLogo) {
    const encodeLogo = await encodedLogo(logo);
    req.NEW_LOGO = {
      encodedImage: encodeLogo,
      extension: logo.name.split(".").pop(),
    };
  } else {
    req.CURRENT_LOGO = logo.src;
  }
  const res = await axios.put(`/api/tenants/tenant`, req, {
    Authorization: import.meta.env.VITE_ADMIN_TOKEN,
  });
  return res;
};

const getTenant = async (id) => {
  const res = await axios.get(`/api/tenants/tenant?id=${id}`, {
    Authorization: import.meta.env.VITE_ADMIN_TOKEN,
  });
  return res.data;
};

const getTenants = async () => {
  const res = await axios.get(`/api/tenants`, {
    Authorization: import.meta.env.VITE_ADMIN_TOKEN,
  });
  return res.data;
};

const deleteTenant = async (id) => {
  const res = await axios.delete(`/api/tenants/tenant?id=${id}`, {
    Authorization: import.meta.env.VITE_ADMIN_TOKEN,
  });
  return res;
};

const getProducts = async (id) => {
  const res = await axios.get(`/api/products?tableName=Product_${id}`, {
    Authorization: import.meta.env.VITE_ADMIN_TOKEN,
  });
  return res.data;
};

export {
  createTenant,
  getTenant,
  updateTenant,
  getTenants,
  deleteTenant,
  getProducts,
};
