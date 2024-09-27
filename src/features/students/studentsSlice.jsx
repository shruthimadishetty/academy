import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import './studentsSlice.css'

const API_URL = 'http://localhost:9000/student';

export const fetchStudents = createAsyncThunk('students/fetchStudents', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const createStudent = createAsyncThunk('students/createStudent', async (student) => {
  const response = await axios.post(API_URL, student);

  return response.data;
});

export const updateStudent = createAsyncThunk('students/updateStudent', async (student) => {
  const { id } = student;
  const response = await axios.put(`${API_URL}/${id}`, student);
  return response.data;
});

export const deleteStudent = createAsyncThunk('students/deleteStudent', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const studentsSlice = createSlice({
  name: 'students',
  initialState: {
    students: [66],
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
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.students = action.payload;
        state.loading = false;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        const index = state.students.findIndex(student => student.id === action.payload.id);
        state.students[index] = action.payload;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter(student => student.id !== action.payload);
      });
  },
});

export const { setSearchQuery } = studentsSlice.actions;
export default studentsSlice.reducer;
