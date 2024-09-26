import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../page/Login";
import Register from "../page/Register";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<LayoutCLient />}>
          <Route index element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Route> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
