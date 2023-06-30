import { useState,useEffect,useContext } from "react";
import TextInput from "./TextInput";
import DateInput from "./DateInput";
import { Link } from "react-router-dom";
import { addWork,editWork,workById } from "../../store/worksSlice";
import { useParams } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SaveContext } from "./Resume";


export default function EditWork(){
    const [startMonth,setStartMonth]=useState('');
    const [startYear,setStartYear]=useState('');
    const [endMonth,setEndMonth]=useState('');
    const [endYear,setEndYear]=useState('');
    const [title,setTitle]=useState('');
    const [company,setCompany]=useState('');
    const [description,setDescription]=useState('');

    const navigate=useNavigate();
    const isSaved=useContext(SaveContext);
    const [newWork,isNew]=useState();
    const {id}=useParams();
    const storedWork=useSelector(state=>workById(state,id));
    const dispatch=useDispatch();

    useEffect(()=>{
        if(id === 'new')
            isNew(true);
        else{
            try{
                isNew(false);
                setStartMonth(storedWork.startMonth);
                setStartYear(storedWork.startYear);
                setEndMonth(storedWork.endMonth);
                setEndYear(storedWork.endYear);
                setTitle(storedWork.title);
                setCompany(storedWork.company);
                setDescription(storedWork.description)
            }catch(err){
                navigate('/resume');
            }
        }
    },[id, storedWork,navigate])

    function save(){
        if(newWork)
            dispatch(addWork(title,company,startMonth,startYear,endMonth,endYear,description));
        else
            dispatch(editWork(id,title,company,startMonth,startYear,endMonth,endYear,description));
        isSaved(false);
    }

    return(
        <div>
            <Link to='/resume'><img className='w-[30px] inline' src="https://img.icons8.com/ios-filled/50/left.png" alt="left"/></Link>  
            <h1 className='font-bold text-3xl my-[30px]'>Edit work experience</h1>
            <TextInput label={'Title'} setter={setTitle} value={title} />
            <TextInput label={'Company'} setter={setCompany} value={company} />
            <DateInput setStartMonth={setStartMonth} setStartYear={setStartYear} setEndMonth={setEndMonth} setEndYear={setEndYear} startMonth={startMonth} startYear={startYear} endMonth={endMonth} endYear={endYear}/>
            <div>
                <label htmlFor='description' className='block font-bold mt-[20px]'>Description</label>
                <p className="text-xs text-gray-500 mb-[10px]">Describe your position and any significant accomplishments.</p>
                <textarea className='md:w-[600px] sm:w-[500px] w-[350px] h-[200px] border-gray-500 border-[1px] rounded-xl p-[20px]' defaultValue={description} onChange={(e)=>{setDescription(e.target.value)}}name='description' id='description'/>
            </div>
            <Link to='/resume' onClick={save} className='inline-block my-[30px] bg-blue-700 text-white font-bold px-[20px] py-[10px] rounded-xl active:bg-blue-900'>Done</Link>
        </div>
    );

}