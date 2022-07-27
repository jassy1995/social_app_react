import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "components/Form";
import Input from "components/Input";
import Footer from "components/Footer";
import { useLoginMutation } from "api/property";
import { toast } from "react-toastify";
import { errorHandler } from "lib/utils";
import useGlobalStore from "store/global";
const Illustration =
  "https://img.freepik.com/free-photo/3d-illustration-residential-building-exterior_42251-556.jpg?w=900";
function LoginPage() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const { property_admin, SIGNIN } = useGlobalStore((state) => ({
    property_admin: state.data.property_admin,
    SIGNIN: state.SIGNIN,
  }));

  const { mutateAsync: loginAdmin, isLoading } = useLoginMutation();

  const initialValues = {
    email: "",
    password: "",
  };

  const submit = async (form, handleResetForm) => {
    try {
      const { data } = await loginAdmin(form);
      if (!!data) {
        await SIGNIN(data);
        localStorage.setItem("property_admin", JSON.stringify(data));
        handleResetForm();
        toast.success("Successful login");
        navigate("/property");
      } else {
        toast.error("Unable to login, please try again");
      }
      console.log(data);
    } catch (err) {
      toast.error(errorHandler(err));
    }
  };

  useEffect(() => {
    if (property_admin) {
      navigate("/");
    }
  }, [navigate, property_admin]);

  return (
    <>
      <div className="flex justify-center items-center space-x-0 min-h-screen overflow-auto md:mt-0">
        <div className="w-full p-6 mx-auto bg-white border-t border-gray-200  shadow-md shadow-gray-800/50 lg:max-w-2xl h-[450px] md:h-[500px] md:mx-0  md:ml-2">
          <h1 className="text-3xl font-semibold text-center text-violet-700">
            LOGO
          </h1>
          <Form
            submit={submit}
            initialValues={initialValues}
            loading={isLoading}
          >
            <Input label="Email Address" type="email" name="email" />
            <Input label="Password" type="password" name="password" />
          </Form>
          <p className="mt-8 text-xs font-light text-center text-gray-700">
            {" "}
            Don't have an account?{" "}
            <Link
              to="/signUp"
              className="font-medium text-violet-600 hover:underline"
            >
              sign Up here
            </Link>
          </p>
        </div>
        <div className="hidden md:block lg:max-w-3xl w-full shadow-md">
          <img
            src={Illustration}
            alt=""
            className="h-[500px] w-full md:mr-20"
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LoginPage;
