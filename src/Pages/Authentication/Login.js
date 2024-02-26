import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { clearError, userLogin } from "../../Slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorLog, setErrorLog] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { error} = useSelector((state) => state.authSlice);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...formData };
    dispatch(userLogin({ data, navigate }));
  };

  useEffect(() => {
    if (error) {
      setErrorLog(error);
      setTimeout(() => {
        setErrorLog([]);
      }, 2000);
    }
  }, [error]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  return (
    <div className="login_wrapper">
      <div className="bg-video">
        <img
          src="../assets/img/futuristic-smart-city-with-5g-global-network-technology (1).jpg"
          alt=""
        />
        <div className="p-6 log">
          <div className="h-full max-w-xl mx-auto bg-white rounded-lg shadow-xl dark:bg-gray-800">
            <div className="p-6 sm:p-12">
              <div className="w-full">
                <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                  Login
                </h1>
                <label className="block text-sm">
                  <span className="text-gray-700 dark:text-gray-400">
                    Email
                  </span>
                  <input
                    className={`block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input`}
                    placeholder="Jane Doe"
                    name="email"
                    onChange={handleChange}
                  />
                  {(errorLog.key === "user" || errorLog.key === "email") && (
                    <p
                      className="mt-2 text-xs text-red-500"
                      style={{ color: "red" }}
                    >
                      {errorLog.message}
                    </p>
                  )}
                </label>
                <label className="block mt-4 text-sm">
                  <span className="text-gray-700 dark:text-gray-400">
                    Password
                  </span>
                  <input
                    className={`block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input`}
                    placeholder="***************"
                    type="password"
                    name="password"
                    onChange={handleChange}
                  />
                  {errorLog.key === "password" && (
                    <p
                      className="mt-2 text-xs text-red-500"
                      style={{ color: "red" }}
                    >
                      {errorLog.message}
                    </p>
                  )}
                </label>

                {/* You should use a button here, as the anchor is only used for the example */}
                <button
                  type="button"
                  className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                  // href="../index.html"
                  onClick={handleSubmit}
                >
                  Log In
                </button>

                <hr className="my-6" />

                <div className="">
                  <p className="mt-1">
                    <Link
                      className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                      to="./forgot"
                    >
                      Forgot your password?
                    </Link>
                  </p>
                  <p className="mt-1">
                    <Link
                      className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                      to="./create-account.html"
                    >
                      Create account
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
