import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearMessage,
  registerAction,
} from "../../../redux/slices/users/usersSlice";
import { toast } from "react-hot-toast";

const Registers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const { name, email, password, passwordConfirm } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(registerAction({ name, email, password, passwordConfirm }));
  };

  const { loading, error, success, user } = useSelector(
    (state) => state?.users
  );
  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(clearMessage());
    }
    if (error) {
      toast.error(error);
      dispatch(clearMessage());
    }
  }, [success, error]);
  //redirect
  useEffect(() => {
    if (user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <>
      <section className="relative overflow-x-hidden">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-2/6 px-4 mb-12 lg:mb-0">
              <div className="py-20 text-center">
                <h3 className="mb-8 text-4xl md:text-5xl font-bold font-heading">
                  Signing up with social is super quick
                </h3>
                {/* {userAuth?.error?.message && (
                  <ErrorComponent message={userAuth?.error?.message} />
                )} */}
                <p className="mb-10">Please, do not hesitate</p>
                <form onSubmit={onSubmit}>
                  <input
                    name="name"
                    value={name}
                    onChange={onChange}
                    className="w-full mb-4 px-12 py-6 border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
                    type="text"
                    placeholder="Full Name"
                  />
                  <input
                    name="email"
                    value={email}
                    onChange={onChange}
                    className="w-full mb-4 px-12 py-6 border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
                    type="email"
                    placeholder="Enter your email"
                  />
                  <input
                    name="password"
                    value={password}
                    onChange={onChange}
                    className="w-full mb-4 px-12 py-6 border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
                    type="password"
                    placeholder="Enter your password"
                  />
                  <input
                    name="passwordConfirm"
                    value={passwordConfirm}
                    onChange={onChange}
                    className="w-full mb-4 px-12 py-6 border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
                    type="password"
                    placeholder="Enter Confirm Password"
                  />
                  <button
                    // disable the button if loading is true
                    disabled={loading}
                    className="mt-12 md:mt-16 bg-blue-800 hover:bg-blue-900 text-white font-bold font-heading py-5 px-8 rounded-md uppercase"
                  >
                    {loading ? "Loading..." : "Register"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div
          className="hidden lg:block lg:absolute top-0 bottom-0 right-0 lg:w-3/6 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage:
              'url("https://cdn.pixabay.com/photo/2017/03/29/04/47/high-heels-2184095_1280.jpg")',
          }}
        />
      </section>
    </>
  );
};

export default Registers;
