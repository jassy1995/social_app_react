import { useEffect,useState}from "react";
import axios from "axios";
import { useNavigate ,useLocation, Link} from "react-router-dom";
import useGlobalStore from "store/global";
import { toast } from "react-toastify"
const Login = () => {
  const { app_user,SIGNIN } = useGlobalStore((state) => ({
    app_user: state.data.app_user,
    SIGNIN: state.SIGNIN,
  }));

  let [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [filled,setFilled] = useState(false);

  const navigate =  useNavigate()
  const location = useLocation()
  let pathDirection = location.state?.from?.pathname || "/";

  useEffect(() => {
    if(!email || !password) { 
      setFilled(false);
     }else setFilled(true);
  },[email,password])

  const handleSubmit = async() => {
    if(!filled) {
      toast.warn('all fields are required');
      return
    }
    setIsLoading(true);
    const body= { email: email.trim(), password: password.trim() };
    
        try {
          const {data} = await axios.post("http://localhost:4100/api/auth/login",body)
            setIsLoading(false);
            SIGNIN(data)
            if (data?.status) {
              localStorage.setItem(
                "app_user",
                JSON.stringify(data)
              );
             
              toast.success("successfully logged in");
              setEmail("");
              setPassword("");
              setTimeout(() => {
                setIsLoading(false);
                navigate(pathDirection, { replace: true });
              }, 1000);
            }else {
              setIsLoading(false);
              toast.warn(data.message);
            }
        } catch (error) {
          let msg = error?.message
              ? error.message
              : "no or poor internet connection, try it again";
            setIsLoading(false);
            toast.error(msg);
            console.log(error);
        }
  }
      

  useEffect(() => {
    if (app_user && (localStorage.getItem('app_user')|| null )) {
      navigate(pathDirection);
    }
  }, [navigate, app_user,pathDirection]);

  return (
    <div className="login flex justify-center items-center bg-[#f0f2f5] w-[100vw] h-[100vh]">
      <div className="loginWrapper flex w-[70%] h-[70%] space-x-4">
        <div className="loginLeft hidden md:flex flex-1 flex-col justify-center space-y-4">
          <h3 className="loginLogo text-4xl font-bold text-[#1775ee]">
            Social App
          </h3>
          <span className="loginDesc text-2xl">
            Connect with friends and the world around you on this app.
          </span>
        </div>
        <div className="loginRight flex flex-1 flex-col justify-center">
          <div className="loginBox flex flex-col p-10 h-[320px] bg-white rounded-sm justify-between">
            <input
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              type="text"
              placeholder="your email"
              className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-[#1775ee] focus:ring-[#619dec] focus:outline-none focus:ring focus:ring-opacity-40 mb-4"
            />
            <input
             value={password}
             onChange={(e)=>setPassword(e.target.value)}
              type="password"
              placeholder="your password"
              className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-[#1775ee] focus:ring-[#619dec] focus:outline-none focus:ring focus:ring-opacity-40 mb-4"
            />
            <button 
              onClick={handleSubmit}
              type="button"
              className="py-2 text-white rounded-md outline-none border-0 font-medium cursor-pointer bg-[#1775ee] disabled:bg-blue-400 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
             {isLoading ? 'Login...' : 'Log In'}
            </button>
            <span className="text-center text-[#1775ee] my-2 cursor-pointer">
              Forgot Password
            </span>
            <Link to='/register' className="text-center">
            <button
              type="button"
              className="py-2 text-sm px-[2px] text-white rounded-md outline-none border-0 font-medium  cursor-pointer bg-[#42b72a] w-full lg:w-[50%]  self-center"
            >
              creates new account
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
