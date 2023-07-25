import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getOrders } from "../features/auth/authSlice";

const columns= [
    {
      title: 'SNo',
      dataIndex: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Product',
      dataIndex: 'product',
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

  const Orders = () => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getOrders());
    }, []);

    const orderState = useSelector((state) => state.auth.orders);
  
    const data = [];
    for (let i = 0; i < orderState.length; i++) {
      data.push({
        key: i + 1,
        name: orderState[i].orderedby.firstname,
        product: orderState[i].products.map((i, j) => {
          return (
            <ul key={j}>
              <li>{i.product.title}</li>
            </ul>
          );
        }),
        amount: orderState[i].paymentMethod.amount,
        date: new Date(orderState[i].createdAt).toLocaleString(),
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
      <h3 className='mb-4'>Orders List</h3>
      <div>
          <Table columns={columns} dataSource={data} />
        </div>
    </div>
  )
}

export default Orders
