import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { useFormik } from 'formik'
import * as yup from "yup";
import { createBlogCategory, resetState } from "../features/blogCategory/blogCategorySlice"

let schema = yup.object().shape({
  title: yup.string().required("Blog Category Title is required"),
});

const AddBlogCategory = () => {
  const dispatch = useDispatch();
  const newBlogCategory = useSelector((state) => state.blogCategory);
  const { isSuccess, isError, isLoading, createdBlogCategory } = newBlogCategory;
  useEffect(() => {
    if (isSuccess && createdBlogCategory) {
      toast.success("Blog Category Added Successfully!");
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
      dispatch(createBlogCategory(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 3000)
    },
  });
  
  return (
    <div>
      <h3 className='mb-4 title'>Add Blog Category</h3>
      <div>
        <form action='' onSubmit={formik.handleSubmit}>
            <CustomInput id="blogCategory" type='text' label="Enter Blog Category" name='title' val={formik.values.title} onChng={formik.handleChange('title')} onBlr={formik.handleBlur('title')} />
            <div className='error'>
              {formik.touched.title && formik.errors.title}
            </div>
            <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>Add Blog Category</button>
        </form>
      </div>
    </div>
  )
}

export default AddBlogCategory
