/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
// import { FcGoogle } from "react-icons/fc";

function LoginForm({ onLogin }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    onLogin();
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-96">
        <h2 className="text-sm text-gray-600">Please enter your details</h2>
        <h1 className="text-2xl font-semibold mb-6">Welcome back</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register("email")}
              type="email"
              placeholder="Email address"
              className="w-full p-3 border bg-gray-50 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="w-full p-3 border bg-gray-50 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center ">
              <input
                {...register("remember")}
                type="checkbox"
                className="mr-2 w-3 h-3 bg-gray-50"
              />
              Remember me
            </label>
            <a href="#" className="text-blue-500">
              Forgot password
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
          >
            Sign up
          </button>
        </form>

        {/* <div className="flex items-center my-4">
          <hr className="w-full border-gray-300" />
          <span className="px-2 text-gray-500">or</span>
          <hr className="w-full border-gray-300" />
        </div> */}

        {/* <button className="flex items-center justify-center w-full border border-gray-300 py-3 rounded-lg hover:bg-gray-100">
          <FcGoogle className="mr-2" />
          Sign in with Google
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don&apos;t have an account?{" "}
          <a href="#" className="text-blue-500">
            Sign up
          </a>
        </p> */}
      </div>
    </div>
  );
}

export default LoginForm;
