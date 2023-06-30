import { useState } from "react";
import { deleteApplication } from "../../store/userSlice";
import { useDispatch,useSelector } from "react-redux";


export default function ApplicationCard({application}){
    const [confirm,showConfirm]=useState(false);
    const dispatch=useDispatch();
    const email=useSelector(state=>state.user.username);

    return(
        <div className='flex justify-between my-[30px]'>
            <div>
                <h1 className="font-semibold text-xl">{application.title}</h1>
                <p>{application.company}</p>
            </div>
            {confirm ?
                (<div className="flex items-center gap-[5px] sm:gap-[20px]">
                    <button className='font-bold text-red-700 border-gray-300 border-[1px] sm:px-[20px] px-[10px] h-[40px] rounded-xl active:bg-red-300 active:border-red-600 hover:border-red-600 hover:bg-red-100'onClick={()=>dispatch(deleteApplication({email,application}))}>Withdraw</button>
                    <button className='font-bold text-blue-700 border-gray-300 border-[1px] sm:px-[20px] px-[10px] h-[40px] rounded-xl active:bg-blue-300 active:border-blue-600 hover:border-blue-600 hover:bg-blue-100' onClick={()=>showConfirm(false)}>Cancel</button>
                </div>)
                :
                (<button onClick={()=>showConfirm(true)} className='font-bold text-blue-700 border-gray-300 border-[1px] px-[20px] h-[40px] rounded-xl active:bg-blue-300 active:border-blue-600 hover:border-blue-600 hover:bg-blue-100'>Withdraw</button>)
            }
        </div>
    );

}