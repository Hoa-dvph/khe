import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import bgImage from "../../images/login/bg.jpg";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/api/signin", {
        email: data.email,
        password: data.password,
      });

      alert("Đăng nhập thành công");

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.messages
      ) {
        // Get the first message from the 'messages' array in the response
        const message = error.response.data.messages[0];
        alert(message);
      } else {
        alert("An unexpected error occurred");
      }
      console.error("Error during login:", error);
      console.log(
        "🚀 ~ const onSubmit: SubmitHandler<FormData> = ~ error:",
        error
      );
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
          <div className="p-2 bg-black rounded-xl">
            <p className="text-3xl font-bold inline-block">Be</p>
          </div>
          <p className="text-4xl inline-block">Behance</p>
        </div>
      </div>

      <div className="p-5 w-1/3">
        <div className="bg-white h-full flex justify-center rounded-xl items-center p-8">
          <div className="max-w-sm w-full">
            <h2 className="text-2xl font-bold mb-4">Sign in</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email address"
                  {...register("email", { required: "Email is required" })}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button className="w-full p-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition">
                Continue
              </button>
            </form>

            <div className="my-8 flex items-center justify-center">
              <div className="border-b border-gray-300 w-1/4"></div>
              <p className="mx-4 text-gray-500">Or</p>
              <div className="border-b border-gray-300 w-1/4"></div>
            </div>

            <div className="space-y-3">
              <button className="w-full p-3 bg-white border border-gray-300 rounded-md flex items-center justify-center font-bold hover:bg-gray-100 transition">
                <FcGoogle className="w-5 h-5 mr-2" />
                Continue with Google
              </button>

              <button className="w-full p-3 bg-white border border-gray-300 rounded-md flex items-center justify-center font-bold hover:bg-gray-100 transition">
                <FaFacebook className="w-5 h-5 text-blue-500 mr-2" />
                Continue with Facebook
              </button>

              <button className="w-full p-3 bg-white border border-gray-300 rounded-md flex items-center justify-center font-bold hover:bg-gray-100 transition">
                <FaApple className="w-5 h-5 mr-2" />
                Continue with Apple
              </button>
            </div>

            <p className="text-center text-gray-600 mt-6">
              <a href="/help-sign-in" className="text-blue-500">
                Get help signing in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
