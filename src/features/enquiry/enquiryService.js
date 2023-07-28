import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const getEnquiries = async () => {
    const response = await axios.get(`${base_url}enquiry/`);
    return response.data;
};

const deleteAnEnquiry = async (id) => {
    const response = await axios.delete(`${base_url}enquiry/${id}`, config);
    return response.data;
};

const getAnEnquiry = async (id) => {
    const response = await axios.get(`${base_url}enquiry/${id}`);
    return response.data;
};

const updateAnEnquiry = async (enquiry) => {
    const response = await axios.put(`${base_url}enquiry/${enquiry.id}`, {status:enquiry.enquiryData}, config);
    return response.data;
};



const enquiryService = {
    getEnquiries,
    deleteAnEnquiry,
    getAnEnquiry,
    updateAnEnquiry
};

export default enquiryService;