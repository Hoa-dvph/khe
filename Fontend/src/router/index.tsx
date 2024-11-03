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
import ContactList from "@/page/Contact/List";
import ContactForm from "@/page/Contact";
import AddTopic from "@/page/topic/AddTopic";
import Topic from "@/page/topic/Topic";
import Edit from "@/page/topic/Edit";
import UserAdmin from "@/page/UserAdmin";
import PrivateRoute from "./privateRouter";
import CreatePost from "@/components/client/CreateProject"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutCLient />}>
          <Route index element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/posts/create" element={<CreatePost/>} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/profile/edit/:userId" element={<EditAuth />} />
          <Route
            path="/profile/edit-password/:userId"
            element={<EditPassword />}
          />
          <Route path="/contact" element={<ContactForm />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <LayoutAdmin />
            </PrivateRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="posts" element={<PostList />} />
          <Route path="posts/add" element={<AddPost />} />
          <Route path="posts/edit/:id" element={<EditPost />} />
          <Route path="contacts" element={<ContactList />} />
          <Route path="topic" element={<Topic />} />
          <Route path="topic/add" element={<AddTopic />} />
          <Route path="topic/edit/:id" element={<Edit />} />
          <Route path="users" element={<UserAdmin />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
