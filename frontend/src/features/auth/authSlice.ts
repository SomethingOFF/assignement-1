import { UserTypes } from "@/types/auth/user";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const GetMyDetails = createAsyncThunk<any, void>(
  "auth/me",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/me`,
        { withCredentials: true }
      );
      return response.data.user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "My data failed");
    }
  }
);

export const register = createAsyncThunk<
  any,
  { email: string; password: string; name: string }
>("auth/register", async (userData, { rejectWithValue }) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/register`,
      userData,
      config
    );
    return response.data.user;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Registration failed"
    );
  }
});

export const login = createAsyncThunk<any, { email: string; password: string }>(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/login`,
        credentials,
        config
      );
      return response.data.user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

interface AuthState {
  user: UserTypes | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetMyDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        GetMyDetails.fulfilled,
        (state, action: PayloadAction<UserTypes>) => {
          state.loading = false;
          state.isAuthenticated = true;
          state.user = action.payload;
        }
      )
      .addCase(GetMyDetails.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload || "Get My Details Error";
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<UserTypes>) => {
          state.loading = false;
          state.isAuthenticated = true;
          state.user = action.payload;
        }
      )
      .addCase(register.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload || "Registration Error";
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<UserTypes>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload || "Login Error";
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
