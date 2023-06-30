import { useSelector,useDispatch } from 'react-redux'
import { selectJob,fetchJobs } from '../../store/jobsSlice';
import { useEffect,useState } from 'react';
import { sendApplication } from '../../store/userSlice';
import { useRef } from 'react';

export default function JobList(){
    const jobs=useSelector(state=>state.jobs.list); 
    const selectedJob=useSelector(state=>state.jobs.selected);
    const dispatch=useDispatch();
    const [page,selectPage]=useState(1);
    const [showDetail,setShowDetail]=useState(false);
    const pageLength=10;

    useEffect(()=>{
        dispatch(fetchJobs());
    },[])
    return(
        <div>
            <div className='hidden md:flex justify-center gap-[20px]'>
                {jobs.length!==0 && <>
                    <div>
                    {jobs.map((job,index)=>{
                        if(index<page*pageLength && index>=page*pageLength-pageLength)
                            return <Job key={index} job={job} setShowDetail={setShowDetail}/>
                        else
                            return <></>;
                    })}
                        <PageSlide select={selectPage} pageLength={pageLength} selectedPage={page}/>
                    </div>
                    <div>
                        <JobDetail job={selectedJob}/>
                    </div>
                </>}
            </div>
            <div className='md:hidden flex justify-center'>
                {jobs.length!==0 && showDetail ===false &&
                    <div>
                    {jobs.map((job,index)=>{
                        if(index<page*pageLength && index>page*pageLength-pageLength)
                            return <Job key={index} job={job} setShowDetail={setShowDetail}/>
                        else
                            return <></>;
                    })}
                        <PageSlide select={selectPage} pageLength={pageLength} selectedPage={page}/>
                    </div>}
                {jobs.length!==0 && showDetail ===true &&
                <div>
                    <img onClick={()=>{setShowDetail(false)}} className='md:hidden w-[30px] inline' src="https://img.icons8.com/ios-filled/50/left.png" alt="left"/>
                    <JobDetail job={selectedJob}/>
                </div>}
            </div>
        </div>
        
    );
} 
/*

*/
function Job({job,setShowDetail}){ 
    const dispatch=useDispatch();

    return(
        <div onClick={()=>{dispatch(selectJob(job));setShowDetail(true);}} className='lg:w-[330px] md:w-[260px] sm:w-[450px] w-[300px] h-[300px] cursor-pointer border-gray-300 border-[1px] my-[10px] hover:border-blue-700 hover:border-[1px] p-[10px] rounded'>
            <h1 className='font-bold text-xl'>{job.title}</h1>
            <p className='my-[5px]'>{job.company}</p>
            <p className='my-[5px]'>{job.city}</p>
            <div className='flex flex-wrap gap-x-[10px] gap-y-[5px] my-[5px]'>
                <p className='bg-gray-300 px-[10px] rounded'>Salary: $ {job.salary} / hr</p>
                <p className='bg-gray-300 px-[10px] rounded'>{job.type}</p>
                <p className='bg-gray-300 px-[10px] rounded'>Industry: {job.industry}</p>
            </div>
            <p className='mt-[15px] h-[115px] overflow-hidden text-sm text-gray-500'>{job.responsibilities}</p>
        </div>
    )

}

function JobDetail({job}){
    const dispatch=useDispatch();
    const applications=useSelector(state=>state.user.applications);
    const email=useSelector(state=>state.user.username);
    const [applied,isApplied]=useState(false);

    useEffect(()=>{
        if(applications.find(app=>app._id===job._id))
            isApplied(true);
        else    
            isApplied(false);
    },[job])

    function apply(){
        let application={_id:job._id,title:job.title,company:job.company};
        dispatch(sendApplication({email,application}));
        isApplied(true);
    }
    

    return(
        <div key={job._id} className='lg:w-[550px] sm:w-[450px] w-[330px] sticky top-[20px] border-[1px] border-gray-300 rounded'>
            <div className='border-b-2 border-gray-200 h-[210px] p-[15px] '>
                <h1 className='font-bold text-xl'>{job.title}</h1>
                <p className='text-blue-500 underline decoration-solid my-[5px] text-sm'>{job.company}</p>
                <p className='text-sm text-gray-500'>{job.industry}</p>
                <p className='text-sm'>$ {job.salary} / hr - {job.type}</p>
                {!applied ? (<button onClick={apply} className='bg-blue-700 text-white font-bold px-[20px] py-[10px] rounded-xl my-[20px]'>Apply</button>):(<button disabled className='bg-blue-300 text-white font-bold px-[20px] py-[10px] rounded-xl my-[20px]'>Applied</button>)}
               
                
            </div>
            <div className='overflow-y-scroll h-[360px] p-[15px]'>
                <div className='flex flex-col gap-y-[15px] pb-[50px]  border-b-[1px]'>
                    <h1 className='font-bold text-xl mb-[15px]'>Job Details:</h1>
                    <div>
                    <img className='w-[20px] inline mr-[5px] mb-[5px]' src="https://img.icons8.com/ios-filled/50/suitcase.png" alt="suitcase"/>
                    <span>Job Type</span>
                    <br/>
                    <p className='bg-gray-300 px-[10px] w-fit rounded inline mr-[5px]'>{job.type}</p> 
                    <p className='bg-gray-300 px-[10px] w-fit rounded inline'>{job.industry}</p>
                    <br/>
                    </div>
                    <div>
                    <img className='w-[20px] inline mr-[5px]' src="https://img.icons8.com/ios-filled/50/city-buildings.png" alt="city-buildings"/>
                    <span>City</span>
                    <p className='bg-gray-300 px-[10px] w-fit rounded mt-[5px]'>{job.city}</p>
                    </div>
                    <div>
                    <img className='w-[20px] inline mr-[5px]' src="https://img.icons8.com/external-solid-design-circle/64/external-Candidates-job-services-solid-design-circle.png" alt="external-Candidates-job-services-solid-design-circle"/>
                    <span>Hiring</span>
                    <p className='bg-gray-300 px-[10px] w-fit rounded mt-[5px]'>Candidates - {job.candidates}</p>
                    </div>

                </div>
                <h1 className='my-[15px] font-bold'>About Us</h1>
                <p>{job.description}</p>
                <h1 className='my-[15px] font-bold'>Qualifications</h1>
                <div className='sm:w-[400px] w-[280px] h-fit mx-auto'>
                    <ul className="list-disc">{job.requirements.map((req,index)=><li key={index}>{req}</li>)}</ul>
                </div>
                <h1 className='my-[15px] font-bold'>Responsibilities</h1>
                <p>{job.responsibilities}</p>
                
            </div>
           
        </div>
    );

} 

function PageSlide({select,pageLength,selectedPage}){
    const jobs=useSelector(state=>state.jobs.list)
    const maxLength=Math.ceil(jobs.length/pageLength);
    let pageArray=[];
    for(let i=1;i<=maxLength;i++){
        pageArray.push(i);
    }
    useEffect(()=>{
        select(1);
    },[jobs])

    const slider=useRef();
    const left=()=>{
        slider.current.scrollLeft=slider.current.scrollLeft-100;
        
    }
    const right=()=>{
        slider.current.scrollLeft=slider.current.scrollLeft+100;
    }
    return (
        <>
            <div className="flex items-center justify-center overflow-hidden max-w-[180px] my-[50px] mx-auto">
                {pageArray.length>3 && <img className='w-[20px]'onClick={left} src="https://img.icons8.com/ios-filled/50/less-than.png" alt="less-than"/>}
                <div ref={slider} className='grid grid-flow-col overflow-hidden gap-x-[10px]'>
                    {pageArray.map(page=>{
                        return (<PageSlideIndex key={page} page={page} select={select} selectedPage={selectedPage}/>);
                    })}
                </div>
                {pageArray.length>3 && <img className='w-[20px]' onClick={right} src="https://img.icons8.com/ios-filled/50/more-than.png" alt="more-than"/>}
            </div>
        </>
    );
}
function PageSlideIndex({page,select,selectedPage}){
    const pageStyle=useRef();

    useEffect(()=>{
        if(page===selectedPage)
            pageStyle.current.className='w-[40px] h-[40px] rounded border-blue-400 bg-gray-200 border-2 cursor-pointer';
        else
            pageStyle.current.className='w-[40px] h-[40px] rounded bg-gray-200 border-0 cursor-pointer';
    },[selectedPage,page])

    return (
        <div ref={pageStyle} onClick={()=>{select(page)}}>
            <h1 className='font-bold mt-[5px] text-lg text-center'>{page}</h1>
        </div>
    );
}
