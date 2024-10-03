import bgImage from "../../images/login/bg.jpg";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaApple } from "react-icons/fa";
import { SiMicrosoft, SiLine } from "react-icons/si";

const Register = () => {
  return (
    <div
      className="w-full  flex bg-black opacity-100 justify-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        height: "100vh",
        backgroundBlendMode: "overlay",
      }}
    >
      {" "}
      <div className="w-1/2 flex justify-center items-center text-white">
        <div className="text-center flex items-center gap-2">
          <div className="p-2 bg-black rounded-xl ">
            <p className="text-3xl font-bold inline-block">Be</p>
          </div>
          <p className="text-4xl inline-block">Behance</p>
        </div>
      </div>
      <div className="p-5 w-1/3">
        <div className="w-full h-full flex justify-center items-center p-8 bg-white rounded-md shadow-lg">
          <div className="max-w-sm w-full">
            <p className="text-sm text-gray-500 mb-2">Step 1 of 2</p>
            <h2 className="text-2xl font-bold mb-6">Create an account</h2>
            <div className="flex space-x-4  mb-6">
              <button className="bg-white border border-gray-300 p-3 rounded-full">
                <FcGoogle size={24} />
              </button>
              <button className="bg-blue-600 text-white p-3 rounded-full">
                <FaFacebookF size={24} />
              </button>
              <button className="bg-black text-white p-3 rounded-full">
                <FaApple size={24} />
              </button>
              <button className="bg-white border border-gray-300 p-3 rounded-full">
                <SiMicrosoft size={24} />
              </button>
              <button className="bg-green-500 text-white p-3 rounded-full">
                <SiLine size={24} />
              </button>
            </div>
            {/* Divider */}
            <div className="flex items-center mb-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500">Or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            {/* Email form */}
            <form>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Sign up with email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email address"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-6">
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full p-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition"
              >
                Continue
              </button>
            </form>
            <p className="text-center text-gray-600 mt-6">
              Already have an account?{" "}
              <a href="/login" className="text-blue-500 hover:underline">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
