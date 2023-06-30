import { createSlice} from '@reduxjs/toolkit'
import { nanoid } from '@reduxjs/toolkit'


export const worksSlice = createSlice({
  name: 'works',
  initialState:[],
  reducers: {
    addWork: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(title,company,startMonth,startYear,endMonth,endYear,description) {
        return { payload: {id: nanoid(), title,company,startMonth,startYear,endMonth,endYear,description}}
      }
    },
    editWork: {
      reducer(state, action) {
        const {id,title,company,startMonth,startYear,endMonth,endYear,description}=action.payload;
        const storedWork=state.find(work=>work.id===id);
        if(storedWork){
          storedWork.title=title;
          storedWork.company=company;
          storedWork.startMonth=startMonth;
          storedWork.startYear=startYear;
          storedWork.endMonth=endMonth;
          storedWork.endYear=endYear;
          storedWork.description=description;
        }
      },
      prepare(id,title,company,startMonth,startYear,endMonth,endYear,description) {
        return { payload: {id,title,company,startMonth,startYear,endMonth,endYear,description}}
      }
    },
    removeWork:(state,action)=>{
      return state.filter(work=>work.id !==action.payload);
    },
    loadWork(state,action){
      return action.payload;
    }
  }
  }
)

export const workById=(state,id)=> state.works.find(work=>work.id===id);

export const {addWork,editWork,removeWork,loadWork} = worksSlice.actions;

export default worksSlice.reducer;