import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getEnquiries } from '../features/enquiry/enquirySlice';
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
    },
    {
      title: 'Email Address',
      dataIndex: 'email',
    },
    {
      title: 'Mobile Number',
      dataIndex: 'mobile',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
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

const Enquiries = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEnquiries());
  }, []);
  const enquiryState = useSelector((state) => state.enquiry.enquiries)
  const data = [];
  for (let i = 0; i < enquiryState.length; i++) {
    data.push({
      key: i + 1,
      name: enquiryState[i].name,
      email: enquiryState[i].email,
      mobile: enquiryState[i].mobile,
      status: (
        <>
          <select name='' className="form-control form-select" id=''>
            <option value="">Set Status</option>
          </select>
        </>
      ),
      comment: enquiryState[i].comment,
      date: new Date(enquiryState[i].createdAt).toLocaleString(),
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
      <h3 className='mb-4 title'>Enquiries</h3>
      <div>
          <Table columns={columns} dataSource={data} />
        </div>
    </div>
  )
}

export default Enquiries
