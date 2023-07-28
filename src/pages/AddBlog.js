import React, { useEffect, useState } from 'react'
import CustomInput from "../components/CustomInput"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Dropzone from 'react-dropzone'
import { uploadImg, deleteImg } from '../features/upload/uploadSlice';
import { toast } from "react-toastify";
import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik'
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { createBlogs, resetState, getABlog, updateABlog } from '../features/blog/blogSlice';
import { resetImages } from '../features/upload/uploadSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { getBlogCategories } from "../features/blogCategory/blogCategorySlice"

let schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("A Description is required"),
  category: yup.string().required("Blog Category is required"),
});

const AddBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBlogId = location.pathname.split("/")[3];

  const imgState = useSelector((state) => state.upload.images);
  const blogCategoryState = useSelector((state) => state.blogCategory.blogCategories)
  const newBlog = useSelector((state) => state.blog);
  const { isSuccess, isError, isLoading, createdBlog, updatedBlog, blogName, blogDescription, blogCategory, blogImages} = newBlog;
  
  let img = [];
  useEffect(() => {
    if (getBlogId !== undefined) {
      dispatch(getABlog(getBlogId));
      // console.log(blogImages);
      img = blogImages;
    } else {
      dispatch(resetState());
    }
  }, [getBlogId])

  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogCategories());
  }, [])

  useEffect(() => {
    if (isSuccess && createdBlog) {
      toast.success("Blog Added Successfully!");
    } 
    if (isSuccess && updatedBlog) {
      toast.success("Blog Updated Successfully!");
      navigate('/admin/blog-list');
    }
    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isSuccess, isError, isLoading, createdBlog])

  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    formik.values.images = img;
  }, [imgState]);
  
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogName || "",
      description: blogDescription || "",
      category: blogCategory || "",
      images: blogImages || "",
    },
    validationSchema: schema,
    onSubmit: values => {
      console.log(values);
      if(getBlogId !== undefined) {
        const data = {id: getBlogId, blogData: values};
        dispatch(updateABlog(data));
        dispatch(resetState());
      } else {
        dispatch(createBlogs(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
          dispatch(resetImages());
          dispatch(getBlogCategories());
        }, 300)
      }
    },
  });

  return (
    <div>
      <h3 className='mb-4 title'>{getBlogId !== undefined ? "Edit" : "Add"} Blog</h3>
      <div className=''>
        <form action='' onSubmit={formik.handleSubmit}>
            <div className='mt-4'>
                <CustomInput type='text' label="Enter Blog Title" name='title' val={formik.values.title} onChng={formik.handleChange('title')} onBlr={formik.handleBlur('title')} />
            </div>
            <div className='error'>
              {formik.touched.title && formik.errors.title}
            </div>
            <select name="category" onChange={formik.handleChange('category')} onBlur={formik.handleBlur('category')} value={formik.values.category} id='' className='form-control py-3 mt-3'>
                <option value="">Select Blog Category</option>
                {blogCategoryState.map((i, j) => {
                  return <option key={j} value={i.title}>{i.title}</option>
                })}
            </select>
            <div className='error'>
              {formik.touched.category && formik.errors.category}
            </div>
            <ReactQuill theme="snow" name="description" className='mt-3' onChange={formik.handleChange('description')} value={formik.values.description} />
            <div className='error'>
              {formik.touched.description && formik.errors.description}
            </div>
            <div className='bg-white border-1 p-5 text-center mt-3'>
              <Dropzone onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}>
                {({getRootProps, getInputProps}) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>
            <div className='showimages d-flex flex-wrap mt-3 gap-3'>
              {img?.map((i, j) => {
                return (
                  <div className="position-relative" key={j}>
                    <button type="button" onClick={() => dispatch(deleteImg(i.public_id))} className='btn-close position-absolute' style={{ top:"10px", right:"10px", }} />
                    <img src={i.url} alt='' width={200} height={200} />
                  </div>
                )
              })}
            </div>
            <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>{getBlogId !== undefined ? "Edit" : "Add"} Blog</button>
        </form>
      </div>
    </div>
  )
}

export default AddBlog
