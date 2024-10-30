import { combineSlices, createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const login = createAsyncThunk("login", async (data, { rejectWithValue }) => {
	try {
		const url = process.env.REACT_APP_BACKEND_URL + "/auth/login";
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		});

		if (!response.ok) {
			const errorData = await response.json();
			return rejectWithValue(errorData);
		}

		return await response.json();
	} catch (error) {
		console.log(error);
		return rejectWithValue(error);
	}
});

export const generateAccessToken = createAsyncThunk("generateAccessToken", async (_, { rejectWithValue, getState, dispatch }) => {
	try {
		const refreshToken = getState().auth.refreshToken;
		const url = process.env.REACT_APP_BACKEND_URL + "/auth/generate/access";

		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${refreshToken}`
			}
		});

		if (!response.ok) {
			const errorData = await response.json();
			return rejectWithValue(errorData);
		}

		return await response.json();
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const dashboard = createAsyncThunk(
	"dashboard",
	async (navigate, { rejectWithValue, getState, dispatch }) => {
		try {
			const state = getState();
			const accessToken = state.auth.accessToken;
			const url = process.env.REACT_APP_BACKEND_URL + "/dashboard";

			const response = await fetch(url, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${accessToken}`
				}
			});

			return middleware(response, generateAccessToken, dispatch, dashboard, navigate, rejectWithValue)

			// if (response.status === 401 || response.status === 403) {
			// 	console.log("Access token expired or invalid. Generating new access token...");
			// 	const result = await dispatch(generateAccessToken());
			// 	console.log("result is ", result)
			// 	console.log("fullfilled state  is ", generateAccessToken.fulfilled)

			// 	if (generateAccessToken.fulfilled.match(result)) {
			// 		// Retry dashboard request with new access token
			// 		return await dispatch(dashboard()).unwrap();
			// 	} else {
			// 		// Reject if refresh token is also invalid
			// 		navigate("/login") // Clear state and redirect to login
			// 		return rejectWithValue("Please log in again");
			// 	}
			// }

			return await response.json();
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);


export const register = createAsyncThunk("register", async (data, { rejectWithValue }) => {
	try {


		const url = process.env.REACT_APP_BACKEND_URL + "/auth/register"
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": 'application/json'
			},
			body: JSON.stringify(data)
		})

		if (!response.ok) {
			const errorData = await response.json();
			return rejectWithValue(errorData)

		}

		return await response.json();
	}
	catch (error) { return rejectWithValue(error) }
})


export const middleware = async (response, generateAccessToken, dispatch, currentThunk, navigate, rejectWithValue) => {
	try {
		if (response.status === 401 || response.status === 403) {
			console.log("Access token expired or invalid. Generating new access token...");
			const result = await dispatch(generateAccessToken());
			console.log("result is ", result)
			console.log("fullfilled state  is ", generateAccessToken.fulfilled)

			if (generateAccessToken.fulfilled.match(result)) {
				// Retry dashboard request with new access token

				console.log(" dispqtching the action needed ")
				return await dispatch(currentThunk()).unwrap();
			} else {
				// Reject if refresh token is also invalid
				navigate("/login") // Clear state and redirect to login
				return rejectWithValue("Please log in again");
			}
		}
	}
	catch (error) {
		console.log(error)
	}
}

const initialState = {
	accessToken: null,
	user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
	isError: null,
	isLoading: null,
	refreshToken: null
};



export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		clearAuthState: (state) => {
			state.accessToken = null;
			state.refreshToken = null;
			state.user = null;
			state.isError = null;
		}
	},
	extraReducers: (builder) => {

		// login  status 
		builder
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.accessToken = action.payload.accessToken;
				state.refreshToken = action.payload.refreshToken;
				state.user = action.payload.data;
				state.isLoading = false;
				localStorage.setItem("user", JSON.stringify(action.payload.data));
			})
			.addCase(login.rejected, (state, action) => {
				state.isError = true;
				state.isLoading = false;
				console.log("Login rejected", action.payload);
			})

		// dashboard status 
		builder
			.addCase(dashboard.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(dashboard.fulfilled, (state, action) => {
				state.isLoading = false;
				console.log("Dashboard fulfilled", action.payload);
			})
			.addCase(dashboard.rejected, (state, action) => {
				state.isError = true;
				state.isLoading = false;
				console.log("Dashboard rejected", action.payload);
			})

		// generate Access Token status 
		builder
			.addCase(generateAccessToken.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(generateAccessToken.fulfilled, (state, action) => {
				state.accessToken = action.payload.accessToken;
				state.isLoading = false;
				console.log("New access token generated", action.payload);
			})
			.addCase(generateAccessToken.rejected, (state, action) => {
				state.isError = true;
				state.isLoading = false;
				console.log("Access token generation failed", action.payload);
			});


		//register status 

		builder.addCase(register.pending, (state) => {
			state.isLoading = true
		})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false;
				console.log("user  is registered ", action.payload.data)
			})
			.addCase(register.rejected, (state, action) => {
				state.isError = true;
				state.isLoading = false;

				console.log("error occured", action.payload)
			})
	}
});

export default authSlice.reducer;
