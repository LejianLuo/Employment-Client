import { useSelector} from "react-redux";
import ApplicationCard from "./ApplicationCard";
import { Link } from "react-router-dom";


export default function ApplicationPage(){
    const applications=useSelector(state=>state.user.applications);


    return(
        <div className='mx-auto md:w-[650px] sm:w-[500px] w-[350px] mb-[50px]'> 
             <Link to='/'><img className='w-[30px] inline' src="https://img.icons8.com/ios-filled/50/left.png" alt="left"/></Link>  
             <h1 className='font-bold text-4xl my-[50px]'>My jobs</h1>
            {applications.map(app=>(<ApplicationCard key={app._id} application={app}/>))}
        </div>
    );
}