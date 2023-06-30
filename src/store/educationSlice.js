import { createSlice} from '@reduxjs/toolkit'
import { nanoid } from '@reduxjs/toolkit'


export const educationSlice = createSlice({
  name: 'education',
  initialState:[],
  reducers: {
    addEducation: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(degree,program,school,startMonth,startYear,endMonth,endYear) {
        return { payload: {id: nanoid(), degree,program,school,startMonth,startYear,endMonth,endYear}}
      }
    },
    editEducation: {
      reducer(state, action) {
        const {id,degree,program,school,startMonth,startYear,endMonth,endYear}=action.payload;
        const storedEducation=state.find(education=>education.id===id);
        if(storedEducation){
          storedEducation.degree=degree;
          storedEducation.program=program;
          storedEducation.school=school;
          storedEducation.startMonth=startMonth;
          storedEducation.startYear=startYear;
          storedEducation.endMonth=endMonth;
          storedEducation.endYear=endYear;
        }
      },
      prepare(id,degree,program,school,startMonth,startYear,endMonth,endYear) {
        return { payload: {id,degree,program,school,startMonth,startYear,endMonth,endYear}}
      }
    },
    removeEducation:(state,action)=>{
      return state.filter(education=>education.id !==action.payload);
    },
    loadEducation(state,action){
      return action.payload;
    }
  }
  }
)

export const educationById=(state,id)=> state.education.find(education=>education.id===id);

export const {addEducation,editEducation,removeEducation,loadEducation} = educationSlice.actions;

export default educationSlice.reducer;