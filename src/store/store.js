import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from './jobsSlice';
import userReducer from './userSlice';
import personalReducer from './personalSlice';
import skillsReducer from './skillsSlice';
import educationReducer from './educationSlice';
import worksReducer from './worksSlice'


export default configureStore({
  reducer: {
    jobs:jobsReducer,
    user:userReducer,
    personal:personalReducer,
    skills:skillsReducer,
    education:educationReducer,
    works:worksReducer,
  }
})