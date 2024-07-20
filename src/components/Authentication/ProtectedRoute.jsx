import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProtectRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    return children;
  } else {
    return <>
   {toast.error("Authentication error, please Sign-in for access")}

   <Navigate to={'/login'} />
    </>;
  }
};
export default ProtectRoute