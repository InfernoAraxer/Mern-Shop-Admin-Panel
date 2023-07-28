import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getOrderByUser, getOrders } from "../features/auth/authSlice";

const columns= [
    {
      title: 'SNo',
      dataIndex: 'key',
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
    },
    {
      title: 'Brand Name',
      dataIndex: 'brand',
    },
    {
      title: 'Count',
      dataIndex: 'count',
    },
    {
      title: 'Color',
      dataIndex: 'color',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
      title: 'Actions',
      dataIndex: 'action',
    },
  ];

  const ViewOrder = () => {
    const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = location.pathname.split("/")[3];
//   const enquiryState = useSelector((state) => state.enquiry);
//   const { enquiryName, enquiryMobile, enquiryEmail, enquiryComment, enquiryStatus } = enquiryState;
  useEffect(() => {
    dispatch(getOrderByUser(userId));
  }, [userId])


    const orderState = useSelector((state) => state.auth.orderByUser.products);
    console.log(orderState);
  
    const data = [];
    for (let i = 0; i < orderState.length; i++) {
      data.push({
        key: i + 1,
        name: orderState[i].product.title,
        brand: orderState[i].product.brand,
        count: orderState[i].count,
        amount: orderState[i].product.price,
        color: orderState[i].product.color,
        date: new Date(orderState[i].product.createdAt).toLocaleString(),
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
      <h3 className='mb-4 title'>View Order</h3>
      <div>
          <Table columns={columns} dataSource={data} />
        </div>
    </div>
  )
}

export default ViewOrder
