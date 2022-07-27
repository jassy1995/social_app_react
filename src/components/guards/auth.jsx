
import { Navigate ,useLocation } from "react-router-dom";
import useGlobalStore from "store/global";

export default function AuthGuard({ children }) {
    let location = useLocation();
    const user = useGlobalStore((state) => state.data.app_user);
  return user? children : <Navigate to="/login" state={{ from: location }} replace />;
}

