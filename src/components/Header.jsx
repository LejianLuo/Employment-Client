import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useRef,useEffect } from "react";
import Cookies from "universal-cookie";
import { api } from "../api/apiRoutes";
import { useDispatch } from "react-redux";
import { setUsername } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { loadApplications } from "../store/userSlice";


export default function Header(){
    const dispatch=useDispatch();
    const cookies = new Cookies();
    const username=useSelector(state=>state.user.username);

    useEffect(()=>{
        let token=cookies.get('token');
        if(token)
            api.get('/verifyUsername/').then(res=>{
                dispatch(setUsername(res.data.email));
                dispatch(loadApplications(res.data.email));
            }).catch(err=>alert(err.response.data.message));
    },[])
    return(
        <div className='flex justify-between h-[80px] border-b-[1px] items-center'>
            <Link to='/'className='text-2xl md:text-3xl font-black text-blue-600 p-[10px]'>Employment Website</Link>
            {username==='' ? (<Link className='text-xl mr-[20px]' to='/login'>Login</Link>): <ProfileList username={username}/>}
        </div>
    )
}

function ProfileList({username}){
    const dropList=useRef();

    const cookies = new Cookies();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    
    function dropDown(){
        const shown='relative bg-white flex flex-col text-center'
        const hidden='hidden'
        if(dropList.current.className===shown)
            dropList.current.className=hidden
        else
            dropList.current.className=shown
    }

    function logout(){
        dispatch(setUsername('')); 
        cookies.remove('token');
        navigate('/');
        window.location.reload();
    }

    return(
        <div>
            <div>
                <div className='w-fit hidden md:flex gap-x-[40px] p-[10px] items-center'>
                    <Link to='resume'>Resume</Link>
                    <Link to='applications'>Applications</Link>
                    <div className="flex">
                        <img className="w-[20px]" src="https://img.icons8.com/ios-filled/50/gender-neutral-user.png" alt="gender-neutral-user"/>
                        <h1>{username}</h1>
                    </div>
                    <button onClick={logout} className='bg-blue-700 text-white font-bold px-[20px] py-[10px] rounded-xl active:bg-blue-900'>Sign Out</button>
                </div>
                </div>

                <div className='h-[20px] w-[100px] mr-[30px] mx-auto md:hidden z-30 relative' onClick={dropDown}>
                <img className="w-[20px] mx-auto" src="https://img.icons8.com/ios-filled/50/gender-neutral-user.png" alt="gender-neutral-user"/>
                    <div ref={dropList} className='hidden'>
                        <h1 className="pt-[10px] mt-[5px] text-xs" >{username}</h1>
                        <Link  className="pt-[10px] mt-[5px] text-xs" to='resume'>Resume</Link>
                        <Link  className="pt-[10px] mt-[5px] text-xs" to='applications'>Applications</Link>
                        <button  className="p-[10px] mt-[5px] text-xs bg-blue-500 text-white " onClick={logout}>Sign Out</button>
                    </div>
                </div>
        </div>
    );
}