import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserInfo } from "@/api";

// 异步 action
export const getMyInfo = createAsyncThunk("user/getMyInfo", async () => {
  const response = await getUserInfo();
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLog: false,
    isAdmin: false,
    hasChecked: false,
    loading: false,
    error: null,
  },
  reducers: {
    setIsLog(state, action) {
      state.isLog = action.payload;
    },
    clearUser(state) {
      state.user = null;
      state.isLog = false;
      state.isAdmin = false;
      state.hasChecked = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAdmin = action.payload.username === "admin" ? true : false;
        state.hasChecked = true;
      })
      .addCase(getMyInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearUser, setIsLog } = userSlice.actions;
export default userSlice.reducer;
