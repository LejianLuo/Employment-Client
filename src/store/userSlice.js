import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../api/apiRoutes';

export const sendApplication = createAsyncThunk('user/sendApplication', async (payload) => {
  let response;
  try{
    await api.get('/verifyUsername/').then(async(res)=>{response = await api.post(`/send/`, {email:payload.email,application:payload.application})});

  }catch(err){
    alert(err.response.data.message);
  }
  return response.data;
});

export const loadApplications = createAsyncThunk('user/loadApplications', async (email) => {
  let response;
  try{
    response = await api.get(`/loadApplications/${email}`);
  }catch(err){
    alert(err.response.data.message);
  }
  return response.data;
});

export const deleteApplication = createAsyncThunk('user/deleteApplication', async (payload) => {
  let response;
  try{
    await api.get('/verifyUsername/').then(async(res)=>{response = await api.post(`/withdraw/`,{email:payload.email,application:payload.application})});

  }catch(err){
    alert(err.response.data.message);
  }
  return response.data;
});

export const userSlice = createSlice({
  name: 'user',
  initialState:{username:'', applications:[]},
  reducers: {
      setUsername:(state,action)=>{
          state.username=action.payload;
      }
  },
  extraReducers(builder) {
    builder.addCase(sendApplication.fulfilled, (state, action) => {
        state.applications=action.payload;
    }).addCase(loadApplications.fulfilled, (state, action) => {
      state.applications=action.payload;
    }).addCase(deleteApplication.fulfilled, (state, action) => {
      state.applications=action.payload;
    })
  }
  }
)



export const {setUsername} = userSlice.actions;

export default userSlice.reducer;