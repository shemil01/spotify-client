import React, { useContext, useState } from "react";
import Emailstep from "./EmailStep";
import PasswordStep from "./Password";
import DateOfBirthStep from "./Dob";
import myContext from "../../context/Context";
import { Axios } from "../mainPage/MainPage";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const [step, setStep] = useState(0);
  const {signup} = useContext(myContext)
  
const navigate = useNavigate()
  const handleNext = () => setStep(step + 1);
  const handleFinish = (event) => {
    event.preventDefault()
    
    Axios.post('/user/register',{...signup,dateOfBirth :`${signup.dateOfBirth.day}/${signup.dateOfBirth.month}/${signup.dateOfBirth.year}`})
    .then((response)=>{
      toast.success(response.data.message)
      navigate('/home')
    }).catch((error)=>{
      console.error('registration error',error) 

    })
    
  };

  return (
    <div>
      {step === 0 && <Emailstep onNext={handleNext} />}
      {step === 1 && <PasswordStep onNext={handleNext} />}
      {step === 2 && <DateOfBirthStep onFinish={handleFinish} />}
    </div>
  );
};

export default Signup;
