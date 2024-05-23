import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { createUser ,logInUser, logoutUser} from "./authAPI";

const initialState = {
  loggedInUser:null,
  status: "idle",
  error:null,
};

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData) => {
   
      const response = await createUser(userData);
      return response.data;
   
  }
);

export const logInUserAsync = createAsyncThunk(
  "user/logInUser",
  async (userData) => {
  
      const response = await logInUser(userData);
      return response.data;
   
  }
);

export const logoutUserAsync = createAsyncThunk(
  "user/logoutUser",
  async () => {
    const response = await logoutUser();
    return response.data;
  }
);


const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers:(builder)=>{
   builder
   .addCase(createUserAsync.pending, (state) => {
    state.status = "Loading";
  })
  .addCase(createUserAsync.fulfilled, (state, action) => {
    state.loggedInUser = action.payload;
    state.status = "idle";

  })
  .addCase(createUserAsync.rejected, (state, action) => {
    state.error = action.error;
    state.status = "idle";
  })
  .addCase(logInUserAsync.pending, (state) => {
    state.status = "Loading";
  })
  .addCase(logInUserAsync.fulfilled, (state, action) => {
    state.loggedInUser = action.payload;
    state.status = "idle";

  })
  .addCase(logInUserAsync.rejected, (state, action) => {
    state.error = action.error;
    state.status = "idle";
  })
  .addCase(logoutUserAsync.fulfilled, (state, action) => {
    state.loggedInUser = null;
    state.status = "idle";
  })
  .addCase(logoutUserAsync.rejected, (state, action) => {
    state.loggedInUser = action.payload.user;
  })
  
  }
});

export const {} = authSlice.actions;
export const getCurrentUser =(state)=>state.auth.loggedInUser 
export const getError =(state)=>state.auth.error 

export const authReducer = authSlice.reducer;
