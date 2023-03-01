import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { encodeFormat } from "../../pages/UserType";
import Cookies from "universal-cookie";
const cookies = new Cookies();

interface EncodeState {
  str: string[];
}

const initialState: EncodeState = {
  str: [],
};

export const encode = createAsyncThunk(
  "str",
  async (encodeData: string, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3000/encode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: cookies.get("cookies"),
        },
        body: encodeData,
      });
      if (!response.ok) {
        const errorData = await response.json();
        alert("Something is not correct");
        return rejectWithValue(errorData);
      }
      const data = await response.json();

      return data.encoded;
    } catch (e: any) {
      alert("Something is not correct");
      return rejectWithValue(e.message);
    }
  }
);

export const EncodeSlice = createSlice({
  name: "str",
  initialState,
  reducers: {
    setStrToNull: (state) => {
      state.str = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(encode.fulfilled, (state, action) => {
      state.str.push(action.payload);
    });
  },
});

export default EncodeSlice.reducer;
export const { setStrToNull } = EncodeSlice.actions;
