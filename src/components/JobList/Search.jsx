import { useRef, useState,useReducer, useEffect } from "react";
import { useDispatch } from "react-redux";
import { searchJobs } from "../../store/jobsSlice";
import filterList from './filterList.json';


export default function Search(){
    const dispatch=useDispatch();
    const [searchInput,setInput]=useState("");
    const [filters,dispatchFilter]=useReducer(filterReducer,{city:'Any',salary:'Any',type:'Any',industry:'Any'});
    const textboxFocus=useRef();

    useEffect(()=>{
        setSearchFilter()
    },[filters])

    function setSearchFilter(){
        let newFilters={...filters};
        for(let filter in newFilters){
            if(filter==='salary' && newFilters[filter]==='Any')
              newFilters[filter]=0;
            else if(newFilters[filter]==='Any')
              newFilters[filter]='';
          }
          dispatch(searchJobs({title:searchInput,filters:{...newFilters}}));
    }

    return(
        <div>
            <div className='flex justify-center gap-x-[20px] mt-[50px]'>
                <div ref={textboxFocus} className='sm:w-[350px] w-[230px] h-[45px] flex items-center gap-x-[15px] border-gray-500 border-[1px] rounded-xl'>
                    <h1 className='ml-[10px] p-[5px] text-sm'>What</h1>
                    <input onFocus={()=>{textboxFocus.current.className='sm:w-[350px] w-[230px] h-[45px] flex items-center border-blue-500 border-[1px] gap-x-[15px] rounded-xl'}} 
                        onBlur={()=>{textboxFocus.current.className='sm:w-[350px] w-[230px] h-[45px] flex items-center gap-x-[15px] border-gray-500 border-[1px] rounded-xl'}} 
                        onChange={(e)=>{setInput(e.target.value)}} type='text' placeholder='Job Title' className='sm:w-[310px] w-[150px] p-[5px] outline-none rounded mr-[5px]' />
                </div>
                <button onClick={setSearchFilter} className='bg-blue-700 text-white px-[15px] rounded-xl active:bg-blue-800'>Find Jobs</button>
            </div>
            <div>
                <Filter filters={filters} dispatch={dispatchFilter}/>
            </div>
        </div>
    );
}

function filterReducer(state,{type,selected}){
    switch(type){
        case 'city':
            let newCity={...state};
            newCity.city=selected;
            return newCity;
        case 'salary':
            let newSalary={...state};
            newSalary.salary=selected;
            return newSalary;
        case 'type':
            let newType={...state};
            newType.type=selected;
            return newType;
        case 'industry':
            let newIndustry={...state};
            newIndustry.industry=selected;
            return newIndustry;
        default:
            return;

    }

}

function Filter({filters, dispatch}){
    const salaryList=useRef();
    const cityList=useRef();
    const typeList=useRef();
    const industryList=useRef();
    

    const shown='relative bg-white mt-[20px] border-[1px] border-gray-100 z-20'
    const hidden='hidden'
    
    function dropDown(dropList){
        if(dropList.current.className===shown)
            dropList.current.className=hidden
        else
            dropList.current.className=shown
    }
    
    return(
        <div className='flex flex-wrap md:h-[80px] h-[120px] justify-center my-[30px] border-b-[1px] border-gray-300 gap-[20px]'>
            <div className='h-[40px] w-[150px] bg-gray-300 rounded-xl text-center active:bg-gray-600 hover:border-blue-700 hover:border-[1px] rounded' onClick={()=>dropDown(salaryList)}>
                {filters.salary ==='Any' ? (<h1 className='mt-[5px]'>Salary: {filters.salary}</h1>):(<h1 className='mt-[5px]'>Salary: ${filters.salary}+/hr</h1>)}
                <div ref={salaryList} className='hidden'>
                    {filterList.salary.map(item=>{
                        if(item ==='Any')
                            return (<p className='p-[5px]' onClick={()=>dispatch({type:'salary',selected:item})} key={item}>{item}</p>)
                        else
                            return (<p className='p-[5px]' onClick={()=>dispatch({type:'salary',selected:item})} key={item}>${item}+/hr</p>)
                        })}
                </div>
            </div>
            <div className='h-[40px] w-[150px] bg-gray-300 rounded-xl text-center active:bg-gray-600 hover:border-blue-700 hover:border-[1px] rounded' onClick={()=>dropDown(typeList)}>
                <h1 className='mt-[5px]'>Type: {filters.type}</h1>
                <div ref={typeList} className='hidden'>
                    {filterList.type.map(item=>(<p className='p-[5px]' onClick={()=>dispatch({type:'type',selected:item})} key={item}>{item}</p>))}
                </div>
            </div>
            <div className='h-[40px] w-[150px] bg-gray-300 rounded-xl text-center active:bg-gray-600 hover:border-blue-700 hover:border-[1px] rounded' onClick={()=>dropDown(cityList)}>
                <h1 className='mt-[5px]'>City: {filters.city}</h1>
                <div ref={cityList} className='hidden'>
                    {filterList.city.map(item=>(<p className='p-[5px]' onClick={()=>dispatch({type:'city',selected:item})} key={item}>{item}</p>))}
                </div>
            </div>
            <div className='h-[40px] w-[150px] bg-gray-300 rounded-xl text-center active:bg-gray-600 hover:border-blue-700 hover:border-[1px] rounded' onClick={()=>dropDown(industryList)}>
                <h1 className='mt-[5px]'>Industry: {filters.industry}</h1>
                <div ref={industryList} className='hidden'>
                    {filterList.industry.map(item=>(<p className='p-[5px]' onClick={()=>dispatch({type:'industry',selected:item})} key={item}>{item}</p>))}
                </div>
            </div>
        </div>
    )
}
