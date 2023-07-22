import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login"
import ResetPassword from "./pages/ResetPassword"
import ForgotPassword from "./pages/ForgotPassword"
import MainLayout from "./components/MainLayout"
import Dashboard from "./pages/Dashboard"
import Enquiries from './pages/Enquiries';
import BlogList from './pages/BlogList';
import BlogCategoryList from './pages/BlogCategoryList';
import OrdersList from './pages/Orders';
import CustomersList from './pages/Customers';
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/admin' element={<MainLayout/>}>
          <Route index element={<Dashboard />}/>
          <Route path='enquiries' element={<Enquiries />}/>
          <Route path='add-blog' element={<AddBlog />}/>
          <Route path='blog-list' element={<BlogList />}/>
          <Route path='add-blog-category' element={<AddBlogCategory />}/>
          <Route path='blog-category-list' element={<BlogCategoryList />}/>
          <Route path='orders' element={<OrdersList />}/>
          <Route path='customers' element={<CustomersList />}/>
          <Route path='product-list' element={<ProductList />}/>
          <Route path='add-product' element={<AddProduct />}/>
          <Route path='brand-list' element={<BrandList />}/>
          <Route path='add-brand' element={<AddBrand />}/>
          <Route path='category-list' element={<ProductCategoryList />}/>
          <Route path='add-category' element={<AddProductCategory />}/>
          <Route path='add-color' element={<AddColor />}/>
          <Route path='color-list' element={<ColorList />}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
