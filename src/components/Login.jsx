import { useRef, useState } from "react";
import {api} from '../api/apiRoutes'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setUsername } from "../store/userSlice";
import { loadApplications } from "../store/userSlice";


export default function Login() {
  const [emailWarn,setEmailWarn]=useState('');
  const [passwordWarn,setPasswordWarn]=useState('');
  const [serverWarn,setServerWarn]=useState('');
  const [isNewUser,setNewUser]=useState(false);
  const emailInput=useRef();
  const passwordInput=useRef();

  const navigate = useNavigate();
  const dispatch=useDispatch();

  function verifyEmail(email){
    if(email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)){
      setEmailWarn('');
      emailInput.current.className='block w-[250px] outline-none rounded border-[1px] border-gray-500 h-[30px]'
    }
    else {
      setEmailWarn('Invalid Email Address');
      emailInput.current.className='block w-[250px] border-2 border-red-500 rounded h-[30px] outline-none'
    }
  }

  function verifyPassword(password){
    if(password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g)){
      setPasswordWarn('');
      passwordInput.current.className='block w-[250px] outline-none rounded border-[1px] border-gray-500 h-[30px]'
    }
    else {
      setPasswordWarn('Minimum eight characters, at least one letter and one number');
      passwordInput.current.className='block w-[250px] border-2 border-red-500 rounded h-[30px] outline-none'
    }
  }


  function loginRequest(){
    api.post('/login/',{email:emailInput.current.value,password:passwordInput.current.value})
    .then((res)=>{
        dispatch(setUsername(res.data.email));
        dispatch(loadApplications(res.data.email));
        navigate('/');
    }).catch(err=>setServerWarn(err.response.data.message));

  }

  function registerRequest(){
    api.post('/register/',{email:emailInput.current.value,password:passwordInput.current.value})
    .then((res)=>{loginRequest()}).catch(err=>setServerWarn(err.response.data.message));;
  }
  
  function submit(e){
    e.preventDefault();
    if(emailWarn ==='' && passwordWarn===''){
        if(isNewUser)
            registerRequest();
        else
            loginRequest();
    }
    else
        return;
  }

  return (
    <>
      <div className='w-[500px] text-xs h-[60px] my-[10px] mx-auto text-center'>
          <span>Demo Accounts: p1@email.com, p2@email.com, p3@email.com</span>
          <br/>
          <span>Password: abcd1234</span>
      </div>
      <form className='w-[320px] h-[390px] my-[20px] mx-auto bg-blue-200 p-[30px] rounded-2xl flex flex-col' method='POST' onSubmit={(e)=>{e.preventDefault();}}>
          <h1 className='text-3xl text-center my-[20px]'>{isNewUser ? 'Register':'Login'}</h1>
          {!isNewUser ? (<p className='w-[150px] mx-auto'>New user? <button  onClick={()=>{setNewUser(true)}} className="text-blue-500 underline decoration:solid">Register</button></p>):(<p className='w-[150px] mx-auto'>Existing user? <button  onClick={()=>{setNewUser(false)}} className="text-blue-500 underline decoration:solid">Login</button></p>)}
          <div className='h-[80px]'>
            <label htmlFor='email'>Email</label>
            <input ref={emailInput} className='block w-[250px] outline-none rounded border-[1px] border-gray-500 h-[30px]' onBlur={(e)=>{verifyEmail(e.target.value)}} placeholder='abc@gmail.com'type='text' id='email' name='email'></input>
            <span className='text-red-500 text-xs block'>{emailWarn}</span>
          </div>
          <div className='h-[90px]'>
            <label htmlFor='password'>Password</label>
            <input ref={passwordInput} className='block w-[250px] outline-none rounded border-[1px] border-gray-500 h-[30px]' onBlur={(e)=>{verifyPassword(e.target.value)}} type='password' id='password' name='password'></input>
            <span className='text-red-500 text-xs block'>{passwordWarn}</span>
          </div>
          <button onClick={(e)=>{submit(e)}} className='bg-blue-500 w-[250px] mt-[20px] py-[5px] rounded-xl text-white'>{isNewUser ? 'Register':'Login'}</button>
          <span className='text-red-500 text-xs block text-center pt-[5px]'>{serverWarn}</span>
      </form>
    </>
  )
}

