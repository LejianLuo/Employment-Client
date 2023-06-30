import TextInput from "./TextInput";
import {setCity,setLastname,setFirstname,setPhone} from '../../store/personalSlice'
import { personalInfo } from "../../store/personalSlice";
import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { SaveContext } from "./Resume";

export default function EditPersonal(){
    const [firstname,lastname,phone,city]=useSelector(personalInfo);
    const [fname,setFname]=useState(firstname);
    const [lname,setLname]=useState(lastname);
    const [editPhone, setEditPhone]=useState(phone);
    const [editCity, setEditCity]=useState(city);
    const dispatch=useDispatch();
    const isSaved=useContext(SaveContext);

    function save(){
        dispatch(setLastname(lname));
        dispatch(setCity(editCity));
        dispatch(setPhone(editPhone));
        dispatch(setFirstname(fname));
        isSaved(false);
    }

    return(
        <form>
            <Link to='/resume'><img className='w-[30px] inline' src="https://img.icons8.com/ios-filled/50/left.png" alt="left"/></Link>  
            <h1 className='font-bold text-3xl my-[30px]'>Personal Information</h1>
            <TextInput label={'First Name'} setter={setFname} value={fname}/>
            <TextInput label={'Last Name'} setter={setLname} value={lname}/>
            <TextInput label={'Phone'} setter={setEditPhone} value={editPhone}/>
            <TextInput label={'City'} setter={setEditCity} value={editCity}/>
            <Link to='/resume' onClick={save} className='inline-block my-[30px] bg-blue-700 text-white font-bold px-[20px] py-[10px] rounded-xl active:bg-blue-900'>Done</Link>
        </form>
    );
}