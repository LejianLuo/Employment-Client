export default function DateInput({setStartMonth,setStartYear,setEndMonth,setEndYear,startMonth,startYear,endMonth,endYear}){

    return(
        <div className="my-[20px]">
            <h1 className='my-[5px] font-bold'>From</h1>
            <select className='md:w-[300px] sm:w-[240px] w-[165px] h-[40px] outline-none rounded mt-[5px] border-gray-500 border-[1px] hover:border-blue-500 focus:border-blue-600 focus:border-b-[3px] p-[5px]' onChange={(e)=>setStartMonth(e.target.value)}  value={startMonth}>
                <option value=''></option>
                <option value='Janaury'>Janaury</option>
                <option value='February'>February</option>
                <option value='March'>March</option>
                <option value='April'>April</option>
                <option value='May'>May</option>
                <option value='June'>June</option>
                <option value='July'>July</option>
                <option value='August'>August</option>
                <option value='September'>September</option>
                <option value='October'>October</option>
                <option value='November'>November</option>
                <option value='December'>December</option>
            </select>
            <input onChange={(e)=>setStartYear(e.target.value)} type='text' value={startYear} className='mx-[10px] md:w-[300px] sm:w-[240px] w-[165px] h-[40px] outline-none rounded mt-[5px] border-gray-500 border-[1px] hover:border-blue-500 focus:border-blue-600 focus:border-b-[3px] p-[5px]'></input>
            <h1>To</h1>
            <select  className='md:w-[300px] sm:w-[240px] w-[165px] h-[40px] outline-none rounded mt-[5px] border-gray-500 border-[1px] hover:border-blue-500 focus:border-blue-600 focus:border-b-[3px] p-[5px]' onChange={(e)=>setEndMonth(e.target.value)}  value={endMonth}>   
                <option value=''></option>
                <option value='Janaury'>Janaury</option>
                <option value='February'>February</option>
                <option value='March'>March</option>
                <option value='April'>April</option>
                <option value='May'>May</option>
                <option value='June'>June</option>
                <option value='July'>July</option>
                <option value='August'>August</option>
                <option value='September'>September</option>
                <option value='October'>October</option>
                <option value='November'>November</option>
                <option value='December'>December</option>
            </select>
            <input  className='mx-[10px] md:w-[300px] sm:w-[240px] w-[165px] h-[40px] outline-none rounded mt-[5px] border-gray-500 border-[1px] hover:border-blue-500 focus:border-blue-600 focus:border-b-[3px] p-[5px]' onChange={(e)=>setEndYear(e.target.value)} type='text' value={endYear}></input>
        </div>
    );
}