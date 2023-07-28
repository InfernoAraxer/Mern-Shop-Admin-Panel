import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogCategories, deleteABlogCategory, resetState } from '../features/blogCategory/blogCategorySlice';
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

const BlogCategoryList = () => {
  const [open, setOpen] = useState(false);
  const [couponId, setBlogCategoryId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setBlogCategoryId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect (() => {
    dispatch(getBlogCategories());
  }, []);
  const blogCategoryState = useSelector((state) => state.blogCategory.blogCategories);
  const data = [];
  for (let i = 0; i < blogCategoryState.length; i++) {
    data.push({
      key: i + 1,
      title: blogCategoryState[i].title,
      action: (
        <>
          <Link className='fs-3 text-danger' to={`/admin/edit-blog-category/${blogCategoryState[i]._id}`} >
            <BiEdit/>
          </Link> 
          <button className="ms-3 fs-3 text-danger bg-transparent border-0" onClick={() => showModal(blogCategoryState[i]._id)} to='/' >
            <AiFillDelete/>
          </button>
        </>
      )
    });
  }

  const deleteBlogCategory = (e) => {
    dispatch(deleteABlogCategory(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogCategories());    
    }, 100)
  }

  return (
    <div>
      <h3 className='mb-4 title'>Blog Categories List</h3>
      <div>
          <Table columns={columns} dataSource={data} />
        </div>
      <CustomModal hideModal={hideModal} open={open} performAction={() => {deleteBlogCategory(couponId)}} title="Are you sure you want to delete this blog category?" />
    </div>
  )
}

export default BlogCategoryList
