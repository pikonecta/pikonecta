import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import encodeImage from "@/utils/encodeImage";

const createTenant = async (data, logo) => {
  const encodedLogo = await encodeImage(logo);

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
      encodedImage: encodedLogo,
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
    const encodeLogo = await encodeImage(logo);
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

const deleteProduct = async (id, productId) => {
  const res = await axios.delete(
    `/api/products/product?tableName=Product_${id}&id=${productId}`,
    {
      headers: {
        Authorization: import.meta.env.VITE_ADMIN_TOKEN,
      },
    }
  );
  return res;
};

const getProduct = async (id, productId) => {
  const res = await axios.get(
    `/api/products/product?tableName=Product_${id}&id=${productId}`,
    {
      headers: {
        Authorization: import.meta.env.VITE_ADMIN_TOKEN,
      },
    }
  );
  return res.data;
};

const getProducts = async (id) => {
  const res = await axios.get(`/api/products?tableName=Product_${id}`, {
    Authorization: import.meta.env.VITE_ADMIN_TOKEN,
  });
  return res.data;
};

const createProduct = async (data, id, images) => {
  const promises = [];
  images.forEach(async (image) => {
    const encodedImage = encodeImage(image);
    promises.push(encodedImage);
  });
  const encodedImages = await Promise.all(promises);
  const productMedia = images.map((image, index) => {
    return {
      id: uuidv4(),
      encodedImage: encodedImages[index],
      extension: image.name.split(".").pop(),
    };
  });

  const req = {
    tableName: `Product_${id}`,
    id: uuidv4(),
    name: data.name,
    description: data.description,
    price: data.price,
    productMedia,
  };

  const res = await axios.post("/api/products", req, {
    Authorization: import.meta.env.VITE_ADMIN_TOKEN,
  });
  return res.data;
};

const updateProduct = async (data, id, setImages, images) => {
  const req = {
    tableName: `Product_${id}`,
    id: data.idProduct,
    name: data.name,
    description: data.description,
    price: data.price,
  };

  if (setImages) {
    const promises = [];
    images.forEach(async (image) => {
      const encodedImage = encodeImage(image);
      promises.push(encodedImage);
    });
    const encodedImages = await Promise.all(promises);
    const productMedia = images.map((image, index) => {
      return {
        id: uuidv4(),
        encodedImage: encodedImages[index],
        extension: image.name.split(".").pop(),
      };
    });
    req.productMedia = productMedia;
    req.NEW_MEDIA = true;
  } else {
    req.CURRENT_MEDIA = data.imgs;
  }

  const res = await axios.put(`/api/products/product`, req, {
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
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
};
