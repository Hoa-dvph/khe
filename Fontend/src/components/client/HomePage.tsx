
import CheckLogin from "./CheckLogin";
// import ProductV2 from "./ProductPageV2";
import ProductPage from "./ProductPage";
import Service from "./Service";
import Sidebar from "./Sidebar";

function HomePage() {
  return (
    <div className="px-9">  
        <Service/>
        <Sidebar/>
        
      <div className="grid grid-cols-4 gap-6">
        <ProductPage />
        <ProductPage />
        <ProductPage />
        <ProductPage />
        <ProductPage />
        <ProductPage />
        <ProductPage />
        <ProductPage />
        {/* <ProductV2/> */}
      </div>

      <CheckLogin/>
    </div>
  );
}

export default HomePage;
