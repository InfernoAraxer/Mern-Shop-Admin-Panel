import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { useFormik } from 'formik'
import * as yup from "yup";
import { createProductCategory, resetState } from "../features/productCategory/productCategorySlice"

let schema = yup.object().shape({
  title: yup.string().required("Product Category Name is required"),
});

const AddProductCategory = () => {
  const dispatch = useDispatch();
  const newProductCategory = useSelector((state) => state.productCategory);
  const { isSuccess, isError, isLoading, createdProductCategory } = newProductCategory;
  useEffect(() => {
    if (isSuccess && createdProductCategory) {
      toast.success("Product Category Added Successfully!");
    } 
    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isSuccess, isError, isLoading])

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: values => {
      dispatch(createProductCategory(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 3000)
    },
  });

  return (
    <div>
      <h3 className='mb-4 title'>Add Product Category</h3>
      <div>
        <form action=''  onSubmit={formik.handleSubmit}>
            <CustomInput type='text' label="Enter Product Category"  name='title' val={formik.values.title} onChng={formik.handleChange('title')} onBlr={formik.handleBlur('title')} />
            <div className='error'>
              {formik.touched.title && formik.errors.title}
            </div>
            <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>Add Product Category</button>
        </form>
      </div>
    </div>
  )
}

export default AddProductCategory
