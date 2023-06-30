import { createSlice} from '@reduxjs/toolkit'



export const personalSlice = createSlice({
  name: 'personal',
  initialState:{firstname:'',lastname:'',phone:'', city:''},
  reducers: {
    setFirstname:(state,action)=>{
      state.firstname=action.payload;
    },
    setLastname:(state,action)=>{
      state.lastname=action.payload;
    },
    setPhone:(state,action)=>{
      state.phone=action.payload;
    },
    setCity:(state,action)=>{
      state.city=action.payload;
    },
    loadPersonal(state,action){
      return action.payload;
    }
  },
  }
)

export const personalInfo=state=> [state.personal.firstname,state.personal.lastname,state.personal.phone,state.personal.city];

export const {setCity,setLastname,setFirstname,setPhone,loadPersonal} = personalSlice.actions;

export default personalSlice.reducer;