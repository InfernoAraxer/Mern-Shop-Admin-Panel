import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAColor, getColors, resetState } from '../features/color/colorSlice';
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

const ColorList = () => {
  const [open, setOpen] = useState(false);
  const [colorId, setColorId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setColorId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect (() => {
    dispatch(resetState())
    dispatch(getColors());
  }, []);
  const colorState = useSelector((state) => state.color.colors);
  const data = [];
  for (let i = 0; i < colorState.length; i++) {
    data.push({
      key: i + 1,
      title: colorState[i].title,
      action: (
        <>
          <Link className='fs-3 text-danger' to={`/admin/edit-color/${colorState[i]._id}`} >
            <BiEdit/>
          </Link> 
          <button className="ms-3 fs-3 text-danger bg-transparent border-0" onClick={() => showModal(colorState[i]._id)} to='/' >
            <AiFillDelete/>
          </button>
        </>
      )
    });
  }
  const deleteColor = (e) => {
    dispatch(deleteAColor(e));
    console.log(e);
    setOpen(false);
    setTimeout(() => {
      dispatch(getColors());    
    }, 300)
  }
  return (
    <div>
      <h3 className='mb-4 title'>Colors List</h3>
      <div>
          <Table columns={columns} dataSource={data} />
        </div>
      <CustomModal hideModal={hideModal} open={open} performAction={() => {deleteColor(colorId)}} title="Are you sure you want to delete this color?" />
    </div>
  )
}

export default ColorList
