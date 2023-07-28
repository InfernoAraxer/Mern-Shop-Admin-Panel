import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getEnquiries, deleteAnEnquiry, resetState, updateAnEnquiry } from '../features/enquiry/enquirySlice';
import { Link } from 'react-router-dom';
import { AiFillDelete, AiOutlineEye } from 'react-icons/ai'
import CustomModal from '../components/CustomModal';

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
  const [open, setOpen] = useState(false);
  const [enquiryId, setEnquiryId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setEnquiryId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState())
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
          <select name="" defaultValue={enquiryState[i].status ? enquiryState[i].status : "Submitted"} className='form-control form-select' id='' onChange={(e) => setEnquiryStatus(e.target.value, enquiryState[i]._id)} >
            <option value="Submitted">Submitted</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </>
      ),
      comment: enquiryState[i].comment,
      date: new Date(enquiryState[i].createdAt).toLocaleString(),
      action: (
        <>
          <Link className="ms-3 fs-3 text-danger" to={`/admin/enquiries/${enquiryState[i]._id}`} >
            <AiOutlineEye/>
          </Link> 
          <button className="ms-3 fs-3 text-danger bg-transparent border-0" onClick={() => showModal(enquiryState[i]._id)} to='/' >
            <AiFillDelete/>
          </button>
        </>
      )
    });
  }

  const setEnquiryStatus = (e, i) => {
    // console.log(e)
    const data = {id: i, enquiryData: e};
    dispatch(updateAnEnquiry(data));
  }

  const deleteEnquiry = (e) => {
    dispatch(deleteAnEnquiry(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getEnquiries());    
    }, 300)
  }

  return (
    <div>
      <h3 className='mb-4 title'>Enquiries</h3>
      <div>
          <Table columns={columns} dataSource={data} />
        </div>
      <CustomModal hideModal={hideModal} open={open} performAction={() => {deleteEnquiry(enquiryId)}} title="Are you sure you want to delete this enquiry?" />
    </div>
  )
}

export default Enquiries
