import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getCoupons } from '../features/coupon/couponSlice';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'

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
    },
    {
        title: 'Expiration Date',
        dataIndex: 'expiry',
    },
    {
      title: 'Actions',
      dataIndex: 'action',
    },
  ];
  


const CouponList = () => {
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
          <Link className='fs-3 text-danger' to='/' >
            <BiEdit/>
          </Link> 
          <Link className="ms-3 fs-3 text-danger" to='/' >
            <AiFillDelete/>
          </Link>
        </>
      )
    });
  }
  return (
    <div>
      <h3 className='mb-4 title'>Coupons</h3>
      <div>
          <Table columns={columns} dataSource={data} />
        </div>
    </div>
  )
}

export default CouponList
