import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";


const getProductCategories = async () => {
    const response = await axios.get(`${base_url}category/`);
    return response.data;
};

const createProductCategory = async (productCategory) => {
    const response = await axios.post(`${base_url}category/`, productCategory, config);
    return response.data;
};

const productCategoryService = {
    getProductCategories,
    createProductCategory,
};

export default productCategoryService;