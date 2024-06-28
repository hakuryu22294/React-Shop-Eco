import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/users/Forms/Login";
import Header from "./components/Header/Header";
import Registers from "./components/users/Forms/Registers";
import CustomerProfile from "./components/users/Profile/CustomerProfile";
import AdminDashboard from "./components/Admin/AdminDashboard";
import { Toaster } from "react-hot-toast";
import AuthRouter from "./components/AuthRouter/AuthRouter";
import AdminRouter from "./components/AuthRouter/AdminRouter";
import AddProduct from "./components/Admin/Products/AddProduct";
import AddCategory from "./components/Admin/Categories/AddCategory";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route
            path="/admin"
            element={
              <AuthRouter>
                <AdminRouter>
                  <AdminDashboard />
                </AdminRouter>
              </AuthRouter>
            }
          >
            <Route path="add-product" element={<AddProduct />} />
            <Route path="add-category" element={<AddCategory />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registers />} />
          <Route path="/customer-profile" element={<CustomerProfile />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
