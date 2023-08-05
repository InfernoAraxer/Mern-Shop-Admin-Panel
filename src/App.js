import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login"
// import ResetPassword from "./pages/ResetPassword"
// import ForgotPassword from "./pages/ForgotPassword"
import MainLayout from "./components/MainLayout"
import Dashboard from "./pages/Dashboard"
import Enquiries from './pages/Enquiries';
import BlogList from './pages/BlogList';
import BlogCategoryList from './pages/BlogCategoryList';
import OrdersList from './pages/Orders';
import Customers from './pages/Customers';
import ProductList from './pages/ProductList';
import BrandList from './pages/BrandList';
import ProductCategoryList from './pages/ProductCategoryList';
import ColorList from './pages/ColorsList';
import AddBlog from './pages/AddBlog';
import AddBlogCategory from './pages/AddBlogCategory';
import AddColor from './pages/AddColor';
import AddProductCategory from './pages/AddProductCategory';
import AddBrand from './pages/AddBrand';
import AddProduct from './pages/AddProduct';
import CouponList from './pages/CouponList';
import AddCoupon from './pages/AddCoupon';
import ViewEnquiry from './pages/ViewEnquiry';
import ViewOrder from './pages/ViewOrder';
import { PrivateRoutes } from './routing/PrivateRoutes';
import { OpenRoutes } from './routing/OpenRoutes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<OpenRoutes><Login/></OpenRoutes>}/>
        {/* <Route path='/reset-password' element={<ResetPassword/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/> */}
        <Route path='/admin' element={<PrivateRoutes><MainLayout/></PrivateRoutes>}>
          <Route index element={<Dashboard />}/>
          <Route path='enquiries' element={<Enquiries />}/>
          <Route path='enquiries/:id' element={<ViewEnquiry />}/>
          <Route path='add-blog' element={<AddBlog />}/>
          <Route path='edit-blog/:id' element={<AddBlog />}/>
          <Route path='blog-list' element={<BlogList />}/>
          <Route path='add-coupon' element={<AddCoupon />}/>
          <Route path='edit-coupon/:id' element={<AddCoupon />}/>
          <Route path='coupon-list' element={<CouponList />}/>
          <Route path='add-blog-category' element={<AddBlogCategory />}/>
          <Route path='edit-blog-category/:id' element={<AddBlogCategory />}/>
          <Route path='blog-category-list' element={<BlogCategoryList />}/>
          <Route path='order-list' element={<OrdersList />}/>
          <Route path='order-list/:id' element={<ViewOrder />}/>
          <Route path='customers' element={<Customers />}/>
          <Route path='product-list' element={<ProductList />}/>
          <Route path='add-product' element={<AddProduct />}/>
          <Route path='brand-list' element={<BrandList />}/>
          <Route path='add-brand' element={<AddBrand />}/>
          <Route path='edit-brand/:id' element={<AddBrand />}/>
          <Route path='category-list' element={<ProductCategoryList />}/>
          <Route path='add-category' element={<AddProductCategory />}/>
          <Route path='add-color' element={<AddColor />}/>
          <Route path='edit-color/:id' element={<AddColor />}/>
          <Route path='color-list' element={<ColorList />}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
