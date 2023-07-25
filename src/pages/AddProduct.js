import React, { useEffect, useState } from 'react'
import CustomInput from "../components/CustomInput"
import ReactQuill from 'react-quill';
import { toast } from "react-toastify";
import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik'
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from "../features/brand/brandSlice"
import { getProductCategories, resetState } from '../features/productCategory/productCategorySlice';
import { getColors } from '../features/color/colorSlice';
import { Select } from 'antd';
import Dropzone from 'react-dropzone'
import { uploadImg, deleteImg } from '../features/upload/uploadSlice';
import { createProducts } from '../features/product/productSlice';

let schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("A Description is required"),
  price: yup.number().required("Price is required"),
  brand: yup.string().required("Brand is required"),
  category: yup.string().required("Product Category is required"),
  tags: yup.string().required("Tag is required"),
  color: yup.array().min(1, "Pick at least one color").required("Color is required"),
  quantity: yup.number().required("A Quantity are required"),
});

const AddProduct = () => {
  const dispatch = useDispatch();
  const [ color, setColor ] = useState([]);
  const [ images, setImages ] = useState([]);
  
  useEffect(() => {
    dispatch(getBrands());
    dispatch(getProductCategories());
    dispatch(getColors());
  }, []);
  const brandState = useSelector((state) => state.brand.brands);
  const colorState = useSelector((state) => state.color.colors);
  const imgState = useSelector((state) => state.upload.images);
  const productCategoryState = useSelector((state) => state.productCategory.productCategories);
  const newProduct = useSelector((state) => state.product);
  const { isSuccess, isError, isLoading, createdProduct } = newProduct;
  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Added Successfully!");
    } 
    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isSuccess, isError, isLoading])

  const coloropt = [];
  colorState.forEach((i) => {
    coloropt.push({
      value: i._id,
      label: i.title,
    })
  })

  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    formik.values.color = color ? color : " ";
    formik.values.images = img;
  }, [color, img]);
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      tags: "",
      color: "",
      quantity: "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: values => {

      dispatch(createProducts(values));
      formik.resetForm();
      setColor(null);
      setTimeout(() => {
        dispatch(resetState());
      }, 3000)
    },
  });

const handleColors = (e) => {
  setColor(e);
}

  return (
    <div>
      <h3 className='mb-4 title'>Add Product</h3>
      <div className=''>
        <form onSubmit={formik.handleSubmit} action='' className='d-flex gap-3 flex-column'>
            <CustomInput type='text' label="Enter Product Title" name='title' val={formik.values.title} onChng={formik.handleChange('title')} onBlr={formik.handleBlur('title')} />
            <div className='error'>
              {formik.touched.title && formik.errors.title}
            </div>
            <div className=''>
                <ReactQuill theme="snow" name="description" onChange={formik.handleChange('description')} value={formik.values.description}/>
            </div>
            <div className='error'>
              {formik.touched.description && formik.errors.description}
            </div>
            <CustomInput type='number' label="Enter Product Price" name="price" onChng={formik.handleChange('price')} onBlr={formik.handleBlur('price')} val={formik.values.price}/>
            <div className='error'>
              {formik.touched.price && formik.errors.price}
            </div>
            <select name="brand" onChange={formik.handleChange('brand')} onBlur={formik.handleBlur('brand')} value={formik.values.brand} id='' className='form-control py-3 mb-3'>
            <option value="">Select Brand</option>
            {brandState.map((i, j) => {
              return <option key={j} value={i.title}>{i.title}</option>
            })}
            </select>
            <div className='error'>
              {formik.touched.brand && formik.errors.brand}
            </div>
            <select name="category" onChange={formik.handleChange('category')} onBlur={formik.handleBlur('category')} value={formik.values.category} id='' className='form-control py-3 mb-3'>
                <option value="">Select Product Category</option>
                {productCategoryState.map((i, j) => {
                  return <option key={j} value={i.title}>{i.title}</option>
                })}
            </select>
            <div className='error'>
              {formik.touched.category && formik.errors.category}
            </div>
            <select name="tags" onChange={formik.handleChange('tags')} onBlur={formik.handleBlur('tags')} value={formik.values.tags} id='' className='form-control py-3 mb-3'>
                <option value="" disabled>Select Product Category</option>
                <option value="featured">Featured</option>
                <option value="popular">Popular</option>
                <option value="special">Special</option>
            </select>
            <div className='error'>
              {formik.touched.tags && formik.errors.tags}
            </div>
            {/* Still has errors with showing the Error */}
            <Select mode='multiple' allowClear className='w-100' placeholder="Select Colors" defaultValue={color} onChange={(i) => handleColors(i)} options={coloropt} />
            <div className='error'>
              {formik.touched.color && formik.errors.color}
            </div>
            <CustomInput type='number' name="quantity" label="Enter Product Quantity" onChng={formik.handleChange('quantity')} onBlr={formik.handleBlur('quantity')} val={formik.values.quantity}/>
            <div className='error'>
              {formik.touched.quantity && formik.errors.quantity}
            </div>
            <div className='bg-white border-1 p-5 text-center'>
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
            <div className='showimages d-flex flex-wrap gap-3'>
              {imgState?.map((i, j) => {
                return (
                  <div className="position-relative" key={j}>
                    <button type="button" onClick={() => dispatch(deleteImg(i.public_id))} className='btn-close position-absolute' style={{ top:"10px", right:"10px", }} />
                    <img src={i.url} alt='' width={200} height={200} />
                  </div>
                )
              })}
              
            </div>
            <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>Add Product</button>
        </form>
      </div>
    </div>
  )
}

export default AddProduct
