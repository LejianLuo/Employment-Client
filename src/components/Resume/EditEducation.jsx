import { useState,useEffect,useContext } from "react";
import TextInput from "./TextInput";
import DateInput from "./DateInput";
import { Link } from "react-router-dom";
import { addEducation,editEducation,educationById } from "../../store/educationSlice";
import { useParams } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SaveContext } from "./Resume";


export default function EditEducation(){
    const [startMonth,setStartMonth]=useState('');
    const [startYear,setStartYear]=useState('');
    const [endMonth,setEndMonth]=useState('');
    const [endYear,setEndYear]=useState('');
    const [degree,setDegree]=useState('');
    const [program,setProgram]=useState('');
    const [school,setSchool]=useState('');

    const navigate=useNavigate();
    const isSaved=useContext(SaveContext);
    const [newEducation,isNew]=useState();
    const {id}=useParams();
    const storedEducation=useSelector(state=>educationById(state,id));
    const dispatch=useDispatch();

    useEffect(()=>{
        if(id === 'new')
            isNew(true);
        else{
            isNew(false);
            try{
                setStartMonth(storedEducation.startMonth);
                setStartYear(storedEducation.startYear);
                setEndMonth(storedEducation.endMonth);
                setEndYear(storedEducation.endYear);
                setDegree(storedEducation.degree);
                setProgram(storedEducation.program);
                setSchool(storedEducation.school);
            }catch(err){
                navigate('/resume');
            }
        }
    },[id, navigate, storedEducation])

    function save(){
        if(newEducation)
            dispatch(addEducation(degree,program,school,startMonth,startYear,endMonth,endYear));
        else
            dispatch(editEducation(id,degree,program,school,startMonth,startYear,endMonth,endYear));
        isSaved(false);
    }

    return(
        <div>
            <Link to='/resume'><img className='w-[30px] inline' src="https://img.icons8.com/ios-filled/50/left.png" alt="left"/></Link>  
            <h1 className='font-bold text-3xl my-[30px]'>Edit education</h1>
            <TextInput label={'Degree'} setter={setDegree} value={degree} />
            <TextInput label={'Program'} setter={setProgram} value={program} />
            <TextInput label={'School'} setter={setSchool} value={school} />
            <DateInput setStartMonth={setStartMonth} setStartYear={setStartYear} setEndMonth={setEndMonth} setEndYear={setEndYear} startMonth={startMonth} startYear={startYear} endMonth={endMonth} endYear={endYear}/>
            <Link to='/resume' onClick={save} className='inline-block my-[30px] bg-blue-700 text-white font-bold px-[20px] py-[10px] rounded-xl active:bg-blue-900'>Done</Link>
        </div>
    );
}