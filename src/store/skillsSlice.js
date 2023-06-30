import { createSlice} from '@reduxjs/toolkit'
import { nanoid } from '@reduxjs/toolkit'


export const skillsSlice = createSlice({
  name: 'skills',
  initialState:[],
  reducers: {
    addSkill: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(skill) {
        return {
          payload: {
            id: nanoid(),
            skill
          }
        }
      }
    },
    editSkill: {
      reducer(state, action) {
        const {id,skill}=action.payload;
        const storedSkill=state.find(skill=>skill.id===id);
        if(storedSkill){
          storedSkill.skill=skill;
        }
      },
      prepare(id,skill) {
        return {
          payload: {
            id,
            skill
          }
        }
      }
    },
    removeSkill:(state,action)=>{
      return state.filter(skill=>skill.id !==action.payload);
    },
    loadSkill(state,action){
      return action.payload;
    }
  }
  }
)

export const skillById=(state,id)=> state.skills.find(skill=>skill.id===id);

export const {addSkill,editSkill,removeSkill,loadSkill} = skillsSlice.actions;

export default skillsSlice.reducer;