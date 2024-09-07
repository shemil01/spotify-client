import React, { useContext, useState } from "react";
import Emailstep from "./EmailStep";
import PasswordStep from "./Password";
import DateOfBirthStep from "./Dob";
import myContext from "../../context/Context";
import { Axios } from "../mainPage/MainPage";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const Signup = () => {
  const [step, setStep] = useState(0);
  const { signup ,setLog,setUserData} = useContext(myContext);
  const [loading, setLoading] = useState(false); 

  const navigate = useNavigate();
  const handleNext = () => setStep(step + 1);
  const handleFinish = (event) => {
    event.preventDefault();
    setLoading(true)
    Axios.post("/user/register", {
      ...signup,
      dateOfBirth: `${signup.dateOfBirth.day}/${signup.dateOfBirth.month}/${signup.dateOfBirth.year}`,
    })
      .then((response) => {
        const { token, userData } = response.data;
        Cookies.set("token", token, { expires: 1 });
        localStorage.setItem("token", token);
        const userInfo = JSON.stringify(userData);
        localStorage.setItem("userInfo", userInfo);
        toast.success(response.data.message);
        navigate("/home");
        setLog(true);
        setUserData(userData);

       setLoading(false)
      })
      .catch((error) => {
        console.error("registration error", error);
      });
  };

  return (
    <div>
      {step === 0 && <Emailstep onNext={handleNext} />}
      {step === 1 && <PasswordStep onNext={handleNext} />}
      {step === 2 && <DateOfBirthStep onFinish={handleFinish} loading={loading}/>}
    </div>
  );
};

export default Signup;
