import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { useFormik } from 'formik'
import * as yup from "yup";
import { createCoupon, resetState } from "../features/coupon/couponSlice"

let schema = yup.object().shape({
  name: yup.string().required("Coupon Name is required"),
  expiry: yup.date().required("Expiration Date is required"),
  discount: yup.number().required("Discount Amount is required"),
});

const AddCoupon = () => {
  const dispatch = useDispatch();
  const newCoupon = useSelector((state) => state.coupon);
  const { isSuccess, isError, isLoading, createdCoupon } = newCoupon;
  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast.success("Coupon Added Successfully!");
    } 
    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isSuccess, isError, isLoading])

  const formik = useFormik({
    initialValues: {
      name: "",
      expiry: "",
      discount: "",
    },
    validationSchema: schema,
    onSubmit: values => {
      dispatch(createCoupon(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 3000)
    },
  });

  return (
    <div>
      <h3 className='mb-4 title'>Add Coupon</h3>
      <div>
        <form action='' onSubmit={formik.handleSubmit}>
            <CustomInput id="coupon" type='text' label="Enter Coupon Name"  name='name' val={formik.values.name} onChng={formik.handleChange('name')} onBlr={formik.handleBlur('name')} />
            <div className='error'>
              {formik.touched.name && formik.errors.name}
            </div>
            <CustomInput id="coupon" type='date' label="Enter Coupon Expiration Date"  name='expiry' val={formik.values.expiry} onChng={formik.handleChange('expiry')} onBlr={formik.handleBlur('expiry')} />
            <div className='error'>
              {formik.touched.expiry && formik.errors.expiry}
            </div>
            <CustomInput id="discount" type='number' label="Enter Discount Percentage"  name='discount' val={formik.values.discount} onChng={formik.handleChange('discount')} onBlr={formik.handleBlur('discount')} />
            <div className='error'>
              {formik.touched.discount && formik.errors.discount}
            </div>
            <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>Add Coupon</button>
        </form>
      </div>
    </div>
  )
}

export default AddCoupon
