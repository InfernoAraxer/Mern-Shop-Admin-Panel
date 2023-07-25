import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogCategories } from '../features/blogCategory/blogCategorySlice';
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
    dataIndex: 'title',
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: 'Actions',
    dataIndex: 'action',
  },
];

const BlogCategoryList = () => {
  const dispatch = useDispatch();
  useEffect (() => {
    dispatch(getBlogCategories());
  }, []);
  const blogCategoryState = useSelector((state) => state.blogCategory.blogCategories);
  // console.log(blogCategoryState);
  const data = [];
  for (let i = 0; i < blogCategoryState.length; i++) {
    data.push({
      key: i + 1,
      title: blogCategoryState[i].title,
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
      <h3 className='mb-4 title'>Blog Categories List</h3>
      <div>
          <Table columns={columns} dataSource={data} />
        </div>
    </div>
  )
}

export default BlogCategoryList
