import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "components/Form";
import Input from "components/Input";
import Footer from "components/Footer";
import { toast } from "react-toastify";
import { errorHandler } from "lib/utils";
import { useSignUpMutation } from "api/property";
import useGlobalStore from "store/global";
const Illustration =
  "https://img.freepik.com/free-photo/3d-illustration-residential-building-exterior_42251-556.jpg?w=900";

function SignUpPage() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const property_admin = useGlobalStore((state) => state.data.property_admin);
  const SIGNIN = useGlobalStore((state) => state.SIGNIN);
  const { mutateAsync: signUpAdmin, isLoading } = useSignUpMutation();

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const submit = async (form, handleResetForm) => {
    try {
      const { data } = await signUpAdmin(form);
      if (!!data) {
        await SIGNIN(data);
        localStorage.setItem("property_admin", JSON.stringify(data));
        handleResetForm();
        toast.success("You have successfully signed up");
        navigate("/property");
        console.log(data);
      } else {
        toast.error("Unable to sign you up, please try again later");
      }
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
      <div className="flex items-center justify-center space-x-0 min-h-screen overflow-auto mt-3 md:mt-0">
        <div className="w-full p-6 mx-auto bg-white border-t border-gray-200  shadow shadow-gray-800/50 lg:max-w-2xl h-[500px] md:mx-0 md:ml-2">
          <h1 className="text-3xl font-semibold text-center text-purple-700">
            LOGO
          </h1>
          <p>{message}</p>
          <Form
            submit={submit}
            initialValues={initialValues}
            loading={isLoading}
          >
            <Input label="Name" name="name" />
            <Input label="Email Address" type="email" name="email" />
            <Input label="Password" type="password" name="password" />
          </Form>
          <p className="mt-8 text-xs font-light text-center text-gray-700">
            {" "}
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-purple-600 hover:underline"
            >
              login here
            </Link>
          </p>
        </div>
        <div className="hidden md:block lg:max-w-3xl w-full  shadow-md">
          <img src={Illustration} alt="" className="h-[500px] w-full " />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SignUpPage;
