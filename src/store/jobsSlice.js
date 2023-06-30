import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../api/apiRoutes';



export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async () => {
  let response;
  try{
    response = await api.get(`/job/`);
  }catch(err){
    console.log(err.response.data.message);
  }
  return response.data;
})

export const searchJobs = createAsyncThunk('jobs/searchJobs', async (payload) => {
  let response;
  try{
    response = await api.post(`/search/`,{title:payload.title,city:payload.filters.city,type:payload.filters.type,industry:payload.filters.industry,salary:payload.filters.salary});
  }catch(err){
    console.log(err.response.data.message);
  }
  return response.data;
})

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState:{list:[],selected:{}},
  reducers: {
      selectJob:(state,action)=>{
          state.selected=action.payload;
      }
  },
  extraReducers(builder) {
    builder.addCase(fetchJobs.fulfilled, (state, action) => {
        state.list=action.payload;
        state.selected=action.payload[0];

    }).addCase(searchJobs.fulfilled, (state, action) => {
      state.list=action.payload;
      state.selected=action.payload[0];

  })
  }
  }
)



export const {selectJob} = jobsSlice.actions;

export default jobsSlice.reducer;