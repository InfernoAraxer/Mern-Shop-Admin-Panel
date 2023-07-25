import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { useFormik } from 'formik'
import * as yup from "yup";
import { createBrand, getABrand, resetState, updateABrand } from "../features/brand/brandSlice"
import { useLocation, useNavigate } from 'react-router-dom';

let schema = yup.object().shape({
  title: yup.string().required("Brand Name is required"),
});

const AddBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const newBrand = useSelector((state) => state.brand);
  const { isSuccess, isError, isLoading, createdBrand, brandName, updatedBrand } = newBrand;
  const getBrandId = location.pathname.split("/")[3]; 
  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getABrand(getBrandId));
    } else {
      dispatch(resetState());
    }
  }, [getBrandId])
  
  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success("Brand Added Successfully!");
    } 
    if (updatedBrand && isSuccess) {
      toast.success("Brand Updated Successfully!");
      navigate('/admin/brand-list');
    }
    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isSuccess, isError, isLoading])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || "",
    },
    validationSchema: schema,
    onSubmit: values => {
      if(getBrandId !== undefined) {
        const data = {id: getBrandId, brandData: values};
        dispatch(updateABrand(data));
      } else {
        dispatch(createBrand(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300)
      }
    },
  });

  return (
    <div>
      <h3 className='mb-4 title'>{getBrandId !== undefined ? "Edit" : "Add"} Brand</h3>
      <div>
        <form action='' onSubmit={formik.handleSubmit}>
            <CustomInput id="brand" type='text' label="Enter Brand"  name='title' val={formik.values.title} onChng={formik.handleChange('title')} onBlr={formik.handleBlur('title')} />
            <div className='error'>
              {formik.touched.title && formik.errors.title}
            </div>
            <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>{getBrandId !== undefined ? "Edit" : "Add"} Brand</button>
        </form>
      </div>
    </div>
  )
}

export default AddBrand
