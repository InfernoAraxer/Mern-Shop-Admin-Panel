import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../features/customers/customerSlice';

const columns= [
    {
      title: 'SNo',
      dataIndex: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      defaultSortOrder: "descend",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Email Address',
      dataIndex: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'mobile',
    },
  ];
  
  

const Customers = () => {
  const dispatch = useDispatch();
  useEffect (() => {
    dispatch(getUsers());
  }, []);
  const customerstate = useSelector((state) => state.customer.customers);
  const data = [];
  for (let i = 0; i < customerstate.length; i++) {
    if (customerstate[i].role !== 'admin') {
      data.push({
        key: i + 1,
        name: customerstate[i].firstname + " " + customerstate[i].lastname,
        email: customerstate[i].email,
        mobile: customerstate[i].mobile,
      });
    }
  }
  return (
    <div>
      <h3 className='mb-4 title'>Customers</h3>
      <div>
          <Table columns={columns} dataSource={data} />
        </div>
    </div>
  )
}

export default Customers
