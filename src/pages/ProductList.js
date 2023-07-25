import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../features/product/productSlice';
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
      title: 'Brand',
      dataIndex: 'brand',
      sorter: (a, b) => a.brand.length - b.brand.length,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      sorter: (a, b) => a.category.length - b.category.length,
    },
    {
      title: 'Color',
      dataIndex: 'color',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Actions',
      dataIndex: 'action',
    },
  ];
  


const ProductList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  const productState = useSelector((state) => state.product.products)
  const data = [];
  for (let i = 0; i < productState.length; i++) {
    data.push({
      key: i + 1,
      title: productState[i].title,
      brand: productState[i].brand,
      category: productState[i].category,
      color: productState[i].color,
      price: `${productState[i].price}`,
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
      <h3 className='mb-4 title'>Products List</h3>
      <div>
          <Table columns={columns} dataSource={data} />
        </div>
    </div>
  )
}

export default ProductList
