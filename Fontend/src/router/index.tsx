import { BrowserRouter, Route, Routes } from "react-router-dom";
import Page from "../page";
import HomePage from "../page/HomePage";
import Login from "../page/Login";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Page />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
