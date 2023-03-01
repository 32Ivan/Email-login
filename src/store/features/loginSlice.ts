import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginFormat } from "../../pages/UserType";
import Cookies from "universal-cookie";
const cookies = new Cookies();

interface LoginState {
  user: loginFormat[];
}

const initialState: LoginState = {
  user: [],
};

export const login = createAsyncThunk(
  "login",
  async (formatData: loginFormat, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formatData),
      });
      if (!response.ok) {
        const errorData = await response.json();

        return rejectWithValue(errorData);
      }
      const data = await response.json();
      cookies.set("cookies", data.token);
      return data.token;
    } catch (e: any) {
      alert("Incorrect Email or Password");
      return rejectWithValue(e.message);
    }
  }
);

export const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUserToNull: (state) => {
      state.user = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user.push(action.payload);
    });
  },
});

export default LoginSlice.reducer;
export const { setUserToNull } = LoginSlice.actions;
