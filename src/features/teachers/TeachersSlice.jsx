import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:7000/teachers';

// Fetch Teachers
export const fetchAllTeachers = createAsyncThunk('teachers/fetchAllTeachers', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// Create Teacher
export const createNewTeacher = createAsyncThunk('teachers/createNewTeacher', async (teacher) => {
  const response = await axios.post(API_URL, teacher);
  return response.data;
});

// Update Teacher
export const modifyTeacher = createAsyncThunk('teachers/modifyTeacher', async (teacher) => {
  const { id } = teacher;
  const response = await axios.put(`${API_URL}/${id}`, teacher);
  return response.data;
});

// Delete Teacher
export const deleteTeacher = createAsyncThunk('teachers/deleteTeacher', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const teachersSlice = createSlice({
  name: 'teachers',
  initialState: {
    allTeachers: [],
    loading: false,
    error: null,
    searchQuery: '',
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTeachers.pending, (state) => {
        console.log('Fetching teachers: Pending'); // Log for debugging
        state.loading = true;
      })
      .addCase(fetchAllTeachers.fulfilled, (state, action) => {
        console.log('Fetching teachers: Fulfilled', action.payload); // Log for debugging
        state.allTeachers = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllTeachers.rejected, (state, action) => {
        console.error('Fetching teachers: Rejected', action.error.message); // Log for debugging
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createNewTeacher.fulfilled, (state, action) => {
        console.log('Creating teacher: Fulfilled', action.payload); // Log for debugging
        state.allTeachers.push(action.payload);
      })
      .addCase(modifyTeacher.fulfilled, (state, action) => {
        console.log('Updating teacher: Fulfilled', action.payload); // Log for debugging
        const index = state.allTeachers.findIndex(teacher => teacher.id === action.payload.id);
        if (index !== -1) {
          state.allTeachers[index] = action.payload;
        }
      })
      .addCase(deleteTeacher.fulfilled, (state, action) => {
        console.log('Removing teacher: Fulfilled', action.payload); // Log for debugging
        state.allTeachers = state.allTeachers.filter(teacher => teacher.id !== action.payload);
      });
  },
});

export const { setSearchQuery } = teachersSlice.actions;
export default teachersSlice.reducer;
