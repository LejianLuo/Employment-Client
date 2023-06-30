



export default function TextInput({label,setter,value}){
    
    return (
        <div className='my-[5px]'>
            <label className='font-bold' htmlFor={label}>{label}</label>
            <input className='block md:w-[600px] sm:w-[500px] w-[350px] h-[40px] outline-none rounded mt-[5px] border-gray-500 border-[1px] hover:border-blue-500 focus:border-blue-600 focus:border-b-[3px] p-[5px]' defaultValue={value} onChange={(e)=>{setter(e.target.value)}} type='text' name={label} id={label}></input>
        </div>
    );
}