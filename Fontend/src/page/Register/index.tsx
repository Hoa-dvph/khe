import axios from "axios";
import { useForm } from "react-hook-form";
import { FaApple, FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SiLine, SiMicrosoft } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import bgImage from "../../images/login/bg.jpg"; // Ensure correct path

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/signup",
        data
      );
      alert("Đăng ký thành công!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Đã xảy ra lỗi khi đăng ký");
    }
  };

  return (
    <div
      className="w-full flex bg-black opacity-100 justify-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        height: "100vh",
        backgroundBlendMode: "overlay",
      }}
    >
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Sign up with email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email address"
                  {...register("email", {
                    required: "Trường Email là bắt buộc",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: "Trường Email phải là email hợp lệ",
                    },
                  })}
                  className={`w-full p-3 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:ring-2 focus:ring-blue-500`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "Trường Password là bắt buộc",
                    minLength: {
                      value: 6,
                      message: "Trường Password phải có ít nhất 6 ký tự",
                    },
                  })}
                  className={`w-full p-3 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:ring-2 focus:ring-blue-500`}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  {...register("confirmPassword", {
                    required: "Trường Confirm Password là bắt buộc",
                    validate: (value) => {
                      const passwordElement = document.getElementById(
                        "password"
                      ) as HTMLInputElement | null;
                      return passwordElement && value === passwordElement.value
                        ? true
                        : "Mật khẩu không trùng khớp";
                    },
                  })}
                  className={`w-full p-3 border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md focus:ring-2 focus:ring-blue-500`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
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
