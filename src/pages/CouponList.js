import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getCoupons, deleteACoupon, resetState } from '../features/coupon/couponSlice';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import CustomModal from '../components/CustomModal';

const columns= [
    {
      title: 'SNo',
      dataIndex: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.title.length - b.title.length,
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      sorter: (a, b) => a.discount - b.discount,
    },
    {
      title: 'Expiration Date',
      dataIndex: 'expiry',
      sorter: (a, b) => a.title.length - b.title.length,
    },
    {
      title: 'Actions',
      dataIndex: 'action',
    },
  ];
  
const CouponList = () => {
  const [open, setOpen] = useState(false);
  const [couponId, setCouponId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setCouponId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect (() => {
    dispatch(getCoupons());
  }, []);
  const couponState = useSelector((state) => state.coupon.coupons);
  const data = [];
  for (let i = 0; i < couponState.length; i++) {
    data.push({
      key: i + 1,
      name: couponState[i].name,
      discount: couponState[i].discount,
      expiry: new Date(couponState[i].expiry).toLocaleString(),
      action: (
        <>
          <Link className='fs-3 text-danger' to={`/admin/edit-coupon/${couponState[i]._id}`} >
            <BiEdit/>
          </Link> 
          <button className="ms-3 fs-3 text-danger bg-transparent border-0" onClick={() => showModal(couponState[i]._id)} to='/' >
            <AiFillDelete/>
          </button>
        </>
      )
    });
  }

  const deleteCoupon = (e) => {
    dispatch(deleteACoupon(e));
    // console.log(e);
    setOpen(false);
    setTimeout(() => {
      dispatch(getCoupons());    
    }, 100)
  }

  return (
    <div>
      <h3 className='mb-4 title'>Coupons</h3>
      <div>
          <Table columns={columns} dataSource={data} />
        </div>
      <CustomModal hideModal={hideModal} open={open} performAction={() => {deleteCoupon(couponId)}} title="Are you sure you want to delete this coupon?" />
    </div>
  )
}

export default CouponList
