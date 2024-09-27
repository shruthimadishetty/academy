// store.js
import { configureStore } from '@reduxjs/toolkit';
import studentsReducer from '../features/students/studentsSlice';
import teachersReducer from '../features/teachers/TeachersSlice';

const store = configureStore({
    reducer: {
        students: studentsReducer,
        teachers: teachersReducer,  
    },
});

export default store;
