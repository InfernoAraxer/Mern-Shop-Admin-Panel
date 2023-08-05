import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getOrder } from "../features/auth/authSlice";

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
  ];

  const ViewOrder = () => {
    const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderId = location.pathname.split("/")[3];
  useEffect(() => {
    dispatch(getOrder(orderId));
  }, [orderId])
    const orderState = useSelector((state) => state.auth?.singleOrder?.orders);
    console.log(orderState);
  
    const data = [];
    for (let i = 0; i < orderState?.orderItems?.length; i++) {
      data.push({
        key: i + 1,
        name: orderState?.orderItems[i]?.product.title,
        brand: orderState?.orderItems[i]?.product.brand,
        count: orderState?.orderItems[i]?.quantity,
        amount: orderState?.orderItems[i]?.price,
        color: orderState?.orderItems[i]?.color.title,
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
