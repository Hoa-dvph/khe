import { Outlet } from "react-router-dom";
import Header from "./component/Header";

const LayOut = () => {
  return (
    <div>
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default LayOut;
