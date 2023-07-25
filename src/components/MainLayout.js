import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';
import { AiOutlineBgColors, AiOutlineDashboard, AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai"
import { RiCouponLine } from "react-icons/ri"
import { Outlet } from 'react-router-dom';
import { SiBrandfolder } from "react-icons/si"
import { BiCategoryAlt } from "react-icons/bi"
import { ImBlog } from "react-icons/im"
import { IoIosNotifications } from "react-icons/io"
import { FaClipboardList, FaBloggerB } from "react-icons/fa"
import { Layout, Menu, Button, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" >
          <h2 className='text-white fs-5 text-center py-3 mb-0'>
            <span className='sm-logo'>AE</span>
            <span className='lg-logo'>Alex's Ecommerce</span></h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          onClick= {({ key }) => {
            if (key == 'signout') {

            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: '',
              icon: <AiOutlineDashboard className='fs-4' />,
              label: 'Dashboard',
            },
            {
              key: 'customers',
              icon: <AiOutlineUser className='fs-4' />,
              label: 'Customers',
            },
            {
              key: 'Catalog', // Note the Capitalization
              icon: <AiOutlineShoppingCart className='fs-4' />,
              label: 'Catalog',
              children: [
                {
                  key: 'add-product',
                  icon: <AiOutlineShoppingCart className='fs-4' />,
                  label: 'Add Product',
                },
                {
                  key: 'product-list',
                  icon: <AiOutlineShoppingCart className='fs-4' />,
                  label: 'Product List',
                },
                {
                  key: "add-brand",
                  icon: <SiBrandfolder className='fs-4' />,
                  label: "Add Brand",
                },
                {
                  key: "brand-list",
                  icon: <SiBrandfolder className='fs-4' />,
                  label: "Brand List",
                },
                {
                  key: "add-category",
                  icon: <BiCategoryAlt className='fs-4' />,
                  label: "Add Category",
                },
                {
                  key: "category-list",
                  icon: <BiCategoryAlt className='fs-4' />,
                  label: "Category List",
                },
                {
                  key: "add-color",
                  icon: <AiOutlineBgColors className='fs-4' />,
                  label: "Add Color",
                },
                {
                  key: "color-list",
                  icon: <AiOutlineBgColors className='fs-4' />,
                  label: "Color List",
                },
              ]
            },
            {
              key: 'order-list',
              icon: <FaClipboardList className='fs-4' />,
              label: 'Orders',
            },
            {
              key: 'marketing',
              icon: <RiCouponLine className='fs-4' />,
              label: 'Marketing',
              children: [
                {
                  key: 'add-coupon',
                  icon: <ImBlog className='fs-4' />,
                  label: 'Add Coupon',
                },
                {
                  key: 'coupon-list',
                  icon: <RiCouponLine className='fs-4' />,
                  label: 'Coupon List',
                },
              ]
            },
            {
              key: 'blogs',
              icon: <FaBloggerB className='fs-4' />,
              label: 'Blogs',
              children: [
                {
                  key: 'add-blog',
                  icon: <ImBlog className='fs-4' />,
                  label: 'Add Blog',
                },
                {
                  key: 'blog-list',
                  icon: <FaBloggerB className='fs-4' />,
                  label: 'Blog List',
                },
                {
                  key: 'add-blog-category',
                  icon: <ImBlog className='fs-4' />,
                  label: 'Add Blog Category',
                },
                {
                  key: 'blog-category-list',
                  icon: <FaBloggerB className='fs-4' />,
                  label: 'Blog Category List',
                },
              ]
            },
            {
              key: 'enquiries',
              icon: <FaClipboardList className='fs-4' />,
              label: 'Enquiries',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className='d-flex justify-content-between ps-1 pe-5'
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div className='d-flex gap-4 align-items-center dropdown'>
            <div className='position-relative'>
              <IoIosNotifications className='fs-4'/>
              <span className='badge bg-warning rounded-circle p-1 position-absolute'>3</span>
            </div>
            <div className='d-flex gap-3 align-items-center'>
              <div>
                <img width={32} height={32} src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' alt='' />
              </div>
              <div role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                <h5 className='mb-0'>Alex Tan</h5>
                <p className='mb-0'>alex.tan@rutgers.edu</p>
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li><Link to="/" className="dropdown-item py-1 mb-1" style={{ height: "auto", lineHeight: "20px" }} href="#">View Profile</Link></li>
                <li><Link to="/" className="dropdown-item py-1 mb-1" style={{ height: "auto", lineHeight: "20px" }} href="#">Sign Out</Link></li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;