import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteABrand, getBrands, resetState } from '../features/brand/brandSlice';
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
      dataIndex: 'title',
      sorter: (a, b) => a.title.length - b.title.length,
    },
    {
      title: 'Actions',
      dataIndex: 'action',
    },
  ];

const BrandList = () => {
  const [open, setOpen] = useState(false);
  const [brandId, setBrandId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setBrandId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect (() => {
    dispatch(getBrands());
  }, []);
  const brandState = useSelector((state) => state.brand.brands);
  const data = [];
  for (let i = 0; i < brandState.length; i++) {
    data.push({
      key: i + 1,
      title: brandState[i].title,
      action: (
        <>
          <Link className='fs-3 text-danger' to={`/admin/edit-brand/${brandState[i]._id}`} >
            <BiEdit/>
          </Link> 
          <button className="ms-3 fs-3 text-danger bg-transparent border-0" onClick={() => showModal(brandState[i]._id)} to='/' >
            <AiFillDelete/>
          </button>
        </>
      )
    });
  }

  const deleteBrand = (e) => {
    dispatch(deleteABrand(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBrands());    
    }, 100)
  }
  
  return (
    <div>
      <h3 className='mb-4 title'>Brands List</h3>
      <div>
          <Table columns={columns} dataSource={data} />
      </div>
      <CustomModal hideModal={hideModal} open={open} performAction={() => {deleteBrand(brandId)}} title="Are you sure you want to delete this color?" />
    </div>
  )
}

export default BrandList
