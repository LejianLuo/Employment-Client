import TextInput from "./TextInput";
import { addSkill,editSkill } from "../../store/skillsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState,useEffect,useContext } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { skillById } from "../../store/skillsSlice";
import { useNavigate } from "react-router-dom";
import { SaveContext } from "./Resume";


export default function EditSkill(){
    const [skill,setSkill]=useState('');
    const [newSkill,isNew]=useState();
    const {id}=useParams();

    const navigate=useNavigate();
    const isSaved=useContext(SaveContext);
    const storedSkill=useSelector(state=>skillById(state,id));
    const dispatch=useDispatch();

    useEffect(()=>{
        if(id === 'new')
            isNew(true);
        else{
            isNew(false);
            try{
                setSkill(storedSkill.skill);
            }catch(err){
                navigate('/resume');
            }
        }
    },[id, navigate, storedSkill])

    function save(){
        if(newSkill)
            dispatch(addSkill(skill));
        else
            dispatch(editSkill(id,skill));
        isSaved(false);
    }

    return(
        <div>
            <Link to='/resume'><img className='w-[30px] inline' src="https://img.icons8.com/ios-filled/50/left.png" alt="left"/></Link>  
            <h1 className='font-bold text-3xl my-[30px]'>Edit Skill</h1>
            <TextInput setter={setSkill} value={skill} label={'Skill name'}/>
            <Link to='/resume' onClick={save} className='inline-block my-[30px] bg-blue-700 text-white font-bold px-[20px] py-[10px] rounded-xl active:bg-blue-900'>Done</Link>
        </div>
    );
}