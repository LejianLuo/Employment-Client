import { personalInfo,loadPersonal } from "../../store/personalSlice";
import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeSkill,loadSkill } from "../../store/skillsSlice";
import { removeEducation,loadEducation } from "../../store/educationSlice";
import { removeWork,loadWork } from "../../store/worksSlice";
import { api } from "../../api/apiRoutes";
import { useState,createContext,useEffect,useContext } from "react";
import { Route,Routes } from "react-router-dom";
import EditEducation from "./EditEducation";
import EditPersonal from "./EditPersonal";
import EditSkill from "./EditSkill";
import EditWork from "./EditWork";
import { useLocation } from "react-router-dom"; 
import Cookies from "universal-cookie";


export const SaveContext=createContext();

export default function Resume(){
    const personal=useSelector(state=>state.personal);
    const skills=useSelector(state=>state.skills);
    const works=useSelector(state=>state.works);
    const education=useSelector(state=>state.education);
    const email=useSelector(state=>state.user.username);
    const dispatch=useDispatch();
    const location = useLocation();
    const [save, isSaved]=useState(true);
    const cookies = new Cookies();
    cookies.set('test','test')
    

    useEffect(()=>{
        let token=cookies.get('token');
        if(token)
            download(); 
    },[email])

    async function download(){
            await api.get('/verifyUsername/').then(async(res)=>{
                await api.get(`/loadResume/${res.data.email}`).then(res=>{
                    dispatch(loadEducation(res.data.education));
                    dispatch(loadPersonal(res.data.personal));
                    dispatch(loadSkill(res.data.skills));
                    dispatch(loadWork(res.data.works));
                }).catch(err=>alert(err.response.data.message));
            }).catch(err=>alert(err.response.data.message));    
    }

    async function upload(){
        await api.get('/verifyUsername/').then(async(res)=>{
            await api.post(`/saveResume/`,{email,personal,skills,works,education}).then((res)=>{
                console.log(res.data.message)
            }).catch(err=>alert(err.response.data.message));;
        }).catch(err=>alert(err.response.data.message));
    }

    return(
        <SaveContext.Provider value={isSaved}>
            <div className='mx-auto md:w-[650px] sm:w-[500px] w-[350px] mb-[50px]'> 
                {!location.pathname.includes('/edit') &&<div>
                    <div className="flex justify-between sticky top-0 py-[30px] bg-white h-[60px]">
                        <Link to='/'><img className='w-[30px] inline' src="https://img.icons8.com/ios-filled/50/left.png" alt="left"/></Link>  
                    <div>
                        {!save && <span className='mx-[10px] text-sm text-red-500 decoration-solid underline'>Not Saved</span>} 
                        <button onClick={()=>{upload();isSaved(true)}} className='bg-blue-700 text-white font-bold px-[20px] py-[10px] rounded-xl active:bg-blue-900'>SAVE</button>
                    </div>

                    </div>
                    <PersonalCard/>
                    <SkillList/>
                    <EducationList/>
                    <WorkList/>
                </div>}       
                
                    <Routes >
                        <Route path='editEducation/:id' element={<EditEducation/>}/>
                        <Route path='editPersonal' element={<EditPersonal/>}/>
                        <Route path='editWork/:id' element={<EditWork/>}/>
                        <Route path='editSkill/:id' element={<EditSkill/>}/>
                    </Routes>
                
            </div>
        </SaveContext.Provider>
    );
}

function PersonalCard(){
    const [firstname,lastname,phone,city]=useSelector(personalInfo);

    return(
        <div className="mt-[60px]">
            <div className='flex justify-between'>
                <h1 className='font-bold text-xl'>Personal Information</h1>
                <Link className='mr-[20px] w-[20px]' to='editPersonal'><img src="https://img.icons8.com/ios-filled/50/edit--v1.png" alt="edit--v1"/></Link>
            </div>
           
            <p className="text-sm my-[5px] text-gray-500">{phone}</p>
            <p className="text-sm my-[5px] text-gray-500">{firstname+" "+lastname}</p>
            <p className="text-sm my-[5px] text-gray-500">{city}</p>
        </div>
    )
}

function SkillList(){
    const list=useSelector(state=>state.skills);
    

    return(
        <div className='mt-[30px]'>
            <div className='flex justify-between'>
                <h1 className='font-bold text-xl'>Skill</h1>
                <Link className='font-bold text-2xl mr-[20px]' to={`editSkill/${'new'}`}>+</Link>
            </div>
            {list.length>0 && list.map((skill,index)=>{return (<SkillCard key={index} skill={skill}/>)})}
        </div>
    );

}

function SkillCard({skill}){
    const dispatch=useDispatch();
    const isSaved=useContext(SaveContext);

    return(
        <div key={skill.id} className="flex justify-between mt-[20px] border-gray-200 border-[1px] rounded-xl p-[14px]">
            <p className='font-bold md:w-fit sm:w-[350px] w-[200px]'>{skill.skill}</p>
            <div className="flex items-center">
                <Link to={`editSkill/${skill.id}`}><img className='w-[20px] inline mr-[20px]' src="https://img.icons8.com/ios-filled/50/edit--v1.png" alt="edit--v1"/></Link>
                <button onClick={()=>{dispatch(removeSkill(skill.id));isSaved(false);}}><img className='w-[20px] inline mr-[20px]' src="https://img.icons8.com/ios-filled/50/delete-sign--v1.png" alt="delete-sign--v1"/></button>
            </div>
        </div>
    )

}

function EducationList(){
    const list=useSelector(state=>state.education);
    return(
        <div className='mt-[30px]'>
            <div className='flex justify-between'>
                <h1 className='font-bold text-xl'>Education</h1>
                <Link className='font-bold text-2xl mr-[20px]' to={`editEducation/${'new'}`}>+</Link>
            </div>
            {list.length>0 && list.map((education,index)=>{return (<EducationCard key={index} education={education}/>)})}
        </div>
    );
}

function EducationCard({education}){
    const dispatch=useDispatch();
    const isSaved=useContext(SaveContext);

    return(
        <div key={education.id} className="border-gray-200 border-[1px] rounded-xl p-[14px] mt-[20px]">
            <div className="flex justify-between">
                <h1 className="font-bold w-fit">{`${education.degree} in ${education.program}`}</h1>
                <div className="flex items-center">
                    <Link to={`editEducation/${education.id}`}><img className='w-[20px] inline mr-[20px]' src="https://img.icons8.com/ios-filled/50/edit--v1.png" alt="edit--v1"/></Link>
                    <button onClick={()=>{dispatch(removeEducation(education.id));isSaved(false);}}><img className='w-[20px] inline mr-[20px]' src="https://img.icons8.com/ios-filled/50/delete-sign--v1.png" alt="delete-sign--v1"/></button>
                </div>
            </div>
            <p className="text-sm my-[5px] text-gray-500">{education.school}</p>
            <p className="text-sm my-[5px] text-gray-500">{`${education.startMonth} ${education.startYear} to ${education.endMonth} ${education.endYear}`}</p>
           
        </div>
    );
}

function WorkList(){
    const list=useSelector(state=>state.works);
    return(
        <div className='mt-[30px]'>
            <div className='flex justify-between'>
                <h1 className='font-bold text-xl'>Work Experience</h1>
                <Link className='font-bold text-2xl mr-[20px]' to={`editWork/${'new'}`}>+</Link>
            </div>
            {list.length>0 && list.map((work,index)=>{return (<WorkCard key={index} work={work}/>)})}
        </div>
    );
}

function WorkCard({work}){
    const dispatch=useDispatch();
    const isSaved=useContext(SaveContext);

    return(
        <div key={work.id} className="border-gray-200 border-[1px] rounded-xl p-[14px] mt-[20px]">
            <div className="flex justify-between">
                <h1 className="font-bold">{work.title}</h1>
                <div className="flex items-center">
                    <Link to={`editWork/${work.id}`}><img className='w-[20px] inline mr-[20px]' src="https://img.icons8.com/ios-filled/50/edit--v1.png" alt="edit--v1"/></Link>
                    <button onClick={()=>{dispatch(removeWork(work.id));isSaved(false);}}><img className='w-[20px] inline mr-[20px]' src="https://img.icons8.com/ios-filled/50/delete-sign--v1.png" alt="delete-sign--v1"/></button>
                </div>
            </div>
            <p className="text-sm my-[5px] text-gray-500">{work.company}</p>
            <p className="text-sm my-[5px] text-gray-500">{`${work.startMonth} ${work.startYear} to ${work.endMonth} ${work.endYear}`}</p>
            <p className="p-[10px] text-sm">{work.description}</p>
        </div>
    );
}