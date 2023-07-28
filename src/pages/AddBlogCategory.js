import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { useFormik } from 'formik'
import * as yup from "yup";
import { createBlogCategory, resetState, getABlogCategory, updateABlogCategory  } from "../features/blogCategory/blogCategorySlice"
import { useLocation, useNavigate } from 'react-router-dom';

let schema = yup.object().shape({
  title: yup.string().required("Blog Category Title is required"),
});

const AddBlogCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBlogCategoryId = location.pathname.split("/")[3];
  const newBlogCategory = useSelector((state) => state.blogCategory);
  const { isSuccess, isError, isLoading, createdBlogCategory, updatedBlogCategory, blogCategoryName } = newBlogCategory;
  
  useEffect(() => {
    if (getBlogCategoryId !== undefined) {
      dispatch(getABlogCategory(getBlogCategoryId));
    } else {
      dispatch(resetState());
    }
  }, [getBlogCategoryId])

  useEffect(() => {
    if (isSuccess && createdBlogCategory) {
      toast.success("Blog Category Added Successfully!");
    } 
    if (updatedBlogCategory && isSuccess) {
      toast.success("Blog Category Updated Successfully!");
      navigate('/admin/blog-category-list');
    }
    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isSuccess, isError, isLoading])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogCategoryName || "",
    },
    validationSchema: schema,
    onSubmit: values => {
      if(getBlogCategoryId !== undefined) {
        const data = {id: getBlogCategoryId, blogCategoryData: values};
        dispatch(updateABlogCategory(data));
        dispatch(resetState());
      } else {
        dispatch(createBlogCategory(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300)
      }
    },
  });
  
  return (
    <div>
      <h3 className='mb-4 title'>{getBlogCategoryId !== undefined ? "Edit" : "Add"} Blog Category</h3>
      <div>
        <form action='' onSubmit={formik.handleSubmit}>
            <CustomInput id="blogCategory" type='text' label="Enter Blog Category" name='title' val={formik.values.title} onChng={formik.handleChange('title')} onBlr={formik.handleBlur('title')} />
            <div className='error'>
              {formik.touched.title && formik.errors.title}
            </div>
            <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>{getBlogCategoryId !== undefined ? "Edit" : "Add"} Blog Category</button>
        </form>
      </div>
    </div>
  )
}

export default AddBlogCategory
