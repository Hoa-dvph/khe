import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../page/Login";
import Register from "../page/Register";
import LayoutCLient from "@/layout/LayoutCLient";
import HomePage from "@/page/HomePage";
import Profile from "@/components/client/Profile";
import ProductDetailPage from "@/page/product-detail/ProductDetailPage";
import LayoutAdmin from "@/layout/LayoutAdmin";
import NotFound from "@/page/NotFound";
import PostList from "@/page/Post/list";
import AddPost from "@/page/Post/add";
import EditPost from "@/page/Post/edit";
import AdminDashboard from "@/layout/AdminDashBoard";
import EditAuth from "@/components/client/EditAuth";
import EditPassword from "@/components/client/EditPassword";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutCLient />}>
          <Route index element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/profile/edit/:userId" element={<EditAuth />} />
          <Route
            path="/profile/edit-password/:userId"
            element={<EditPassword />}
          />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<AdminDashboard />} />
          <Route path="posts" element={<PostList />} />
          <Route path="posts/add" element={<AddPost />} />
          <Route path="posts/edit/:id" element={<EditPost />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
