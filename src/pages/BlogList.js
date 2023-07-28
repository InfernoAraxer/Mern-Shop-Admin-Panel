import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogs, deleteABlog, resetState } from '../features/blog/blogSlice';
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
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Actions',
      dataIndex: 'action',
    },
  ];

const BlogList = () => {
  const [open, setOpen] = useState(false);
  const [blogId, setBlogId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setBlogId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogs());
  }, []);
  const blogState = useSelector((state) => state.blog.blogs)
  const data = [];
  for (let i = 0; i < blogState.length; i++) {
    data.push({
      key: i + 1,
      title: blogState[i].title,
      category: blogState[i].category,
      action: (
        <>
          <Link className='fs-3 text-danger' to={`/admin/edit-blog/${blogState[i]._id}`} >
            <BiEdit/>
          </Link> 
          <button className="ms-3 fs-3 text-danger bg-transparent border-0" onClick={() => showModal(blogState[i]._id)} to='/' >
            <AiFillDelete/>
          </button>
        </>
      )
    });
  }

  const deleteBlog = (e) => {
    dispatch(deleteABlog(e));
    // console.log(e);
    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogs());    
    }, 100)
  }

  return (
    <div>
      <h3 className='mb-4 title'>Blogs List</h3>
      <div>
          <Table columns={columns} dataSource={data} />
        </div>
      <CustomModal hideModal={hideModal} open={open} performAction={() => {deleteBlog(blogId)}} title="Are you sure you want to delete this blog?" />
    </div>
  )
}

export default BlogList
