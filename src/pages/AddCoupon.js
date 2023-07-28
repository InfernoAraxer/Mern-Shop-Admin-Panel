import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { useFormik } from 'formik'
import * as yup from "yup";
import { createCoupon, resetState, getACoupon, updateACoupon } from "../features/coupon/couponSlice"
import { useLocation, useNavigate } from 'react-router-dom';

let schema = yup.object().shape({
  name: yup.string().required("Coupon Name is required"),
  expiry: yup.date().required("Expiration Date is required"),
  discount: yup.number().required("Discount Amount is required"),
});

const AddCoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getCouponId = location.pathname.split("/")[3];
  const newCoupon = useSelector((state) => state.coupon)
  const { isSuccess, isError, isLoading, createdCoupon, updatedCoupon, couponName, couponDiscount, couponExpiry } = newCoupon;
  
  const changeDateFormat = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    let [month, day, year] = newDate.split("/");
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    return [year, month, day].join("-");
  }

  useEffect(() => {
    if (getCouponId !== undefined) {
      dispatch(getACoupon(getCouponId));
    } else {
      dispatch(resetState());
    }
  }, [getCouponId])

  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast.success("Coupon Added Successfully!");
    } 
    if (updatedCoupon && isSuccess) {
      toast.success("Coupon Updated Successfully!");
      navigate('/admin/coupon-list');
    }
    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isSuccess, isError, isLoading])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: couponName || "",
      expiry: changeDateFormat(couponExpiry) || "",
      discount: couponDiscount || "",
    },
    validationSchema: schema,
    onSubmit: values => {
      if(getCouponId !== undefined) {
        const data = {id: getCouponId, couponData: values};
        dispatch(updateACoupon(data));
        dispatch(resetState());
      } else {
        dispatch(createCoupon(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300)
      }
    },
  });

  return (
    <div>
      <h3 className='mb-4 title'>{getCouponId !== undefined ? "Edit" : "Add"} Coupon</h3>
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
            <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>{getCouponId !== undefined ? "Edit" : "Add"} Coupon</button>
        </form>
      </div>
    </div>
  )
}

export default AddCoupon
