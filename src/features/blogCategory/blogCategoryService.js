import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const getBlogCategories = async () => {
    const response = await axios.get(`${base_url}blogCategory/`);
    return response.data;
};

const createBlogCategory = async (blogCategory) => {
    const response = await axios.post(`${base_url}blogCategory/`, blogCategory, config);
    return response.data;
};

const getBlogCategory = async (id) => {
    const response = await axios.get(`${base_url}blogcategory/${id}`);
    return response.data;
};

const updateBlogCategory = async (blogCategory) => {
    const response = await axios.put(`${base_url}blogcategory/${blogCategory.id}`, {title: blogCategory.blogCategoryData.title}, config);
    return response.data;
};

const deleteBlogCategory = async (id) => {
    const response = await axios.delete(`${base_url}blogcategory/${id}`, config);
    return response.data;
};

const blogCategoryService = {
    getBlogCategories,
    createBlogCategory,
    getBlogCategory,
    updateBlogCategory,
    deleteBlogCategory,
};

export default blogCategoryService;
