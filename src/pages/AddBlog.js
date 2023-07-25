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
import { getBlogCategories } from '../features/blogCategory/blogCategorySlice'
import { createBlogs, resetState } from '../features/blog/blogSlice';

let schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("A Description is required"),
  category: yup.string().required("Product Category is required"),
});

const AddBlog = () => {
  const dispatch = useDispatch();
  const [ images, setImages ] = useState([]);
  
  useEffect(() => {
    dispatch(getBlogCategories());
  }, []);

  const imgState = useSelector((state) => state.upload.images);
  const blogCategoryState = useSelector((state) => state.blogCategory.blogCategories)
  const newBlog = useSelector((state) => state.blog);
  const { isSuccess, isError, isLoading, createdBlog} = newBlog;
  useEffect(() => {
    if (isSuccess && createdBlog) {
      toast.success("Blog Added Successfully!");
    } 
    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isSuccess, isError, isLoading, createdBlog])

  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    formik.values.images = img;
  }, [ img]);
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: values => {
      dispatch(createBlogs(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 3000)
    },
  });

  return (
    <div>
      <h3 className='mb-4 title'>Add Blog</h3>
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
              {imgState?.map((i, j) => {
                return (
                  <div className="position-relative" key={j}>
                    <button type="button" onClick={() => dispatch(deleteImg(i.public_id))} className='btn-close position-absolute' style={{ top:"10px", right:"10px", }} />
                    <img src={i.url} alt='' width={200} height={200} />
                  </div>
                )
              })}
              
            </div>
            <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>Add Blog</button>
        </form>
      </div>
    </div>
  )
}

export default AddBlog
