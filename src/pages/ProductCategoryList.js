import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getProductCategories } from '../features/productCategory/productCategorySlice';
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

const ProductCategoryList = () => {
  const dispatch = useDispatch();
  useEffect (() => {
    dispatch(getProductCategories());
  }, []);
  const productCategoryState = useSelector((state) => state.productCategory.productCategories);
  const data = [];
  for (let i = 0; i < productCategoryState.length; i++) {
    data.push({
      key: i + 1,
      title: productCategoryState[i].title,
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
      <h3 className='mb-4 title'>Product Categories List</h3>
      <div>
          <Table columns={columns} dataSource={data} />
        </div>
    </div>
  )
}

export default ProductCategoryList
