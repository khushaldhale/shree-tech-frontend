import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { generateAccessToken, middleware } from "./authSlice";



// while pwrforming crud i have to optimize extraredeucesrs 

// now  we  have to create api for everthing 
export const getTeamMembers = createAsyncThunk("getTeamMembers", async (_, { rejectWithValue }) => {

	try {
		const url = process.env.REACT_APP_BACKEND_URL + "/team"
		const response = await fetch(url, {
			method: "GET"
		})

		if (!response.ok) {
			const errorData = await response.json()
			return rejectWithValue(errorData)
		}

		return await response.json()
	}
	catch (error) {
		return rejectWithValue(error)
	}
})



// add team meber 

export const addTeamMember = createAsyncThunk("addTeamMember", async (data, { rejectWithValue, dispatch, getState }) => {
	try {

		const accessToken = getState().auth.accessToken;

		const url = process.env.REACT_APP_BACKEND_URL + "/team"

		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${accessToken}`
			},
			body: JSON.stringify(data)
		})

		if (response.status === 401 || response.status === 403) {
			return middleware(response, generateAccessToken, dispatch, addTeamMember, data.navigate, rejectWithValue)
		}

		if (!response.ok) {
			const errorData = await response.json();
			return rejectWithValue(errorData)
		}
		return await response.json()
	}
	catch (error) {
		return rejectWithValue(error)
	}
})



// delete team 

export const deleteTeamMember = createAsyncThunk("deleteTeamMember", async (data, { rejectWithValue, dispatch, getState }) => {
	try {
		const accessToken = getState().auth.accessToken;
		const url = process.env.REACT_APP_BACKEND_URL + `/team/${data._id}`;

		const response = await fetch(url, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${accessToken}`
			}
		})

		if (response.status === 401 || response.status === 403) {
			return middleware(response, generateAccessToken, dispatch, deleteTeamMember, data.navigate, rejectWithValue)
		}
		if (!response.ok) {
			const errorData = await response.json();
			return rejectWithValue(errorData)
		}

		return await response.json()
	}
	catch (error) {
		return rejectWithValue(error)
	}
})

const initialState = {
	isLoading: null,
	isError: null,
	teamMember: []
}

export const teamSlice = createSlice({
	name: "team",
	initialState,
	extraReducers: (builder) => {

		builder.addCase(getTeamMembers.pending, (state) => {
			state.isLoading = true
		})
			.addCase(getTeamMembers.fulfilled, (state, action) => {
				state.isLoading = false;
				state.teamMember = action.payload.data;
				console.log("Team members are fetched")
			})
			.addCase(getTeamMembers.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				console.log("error occured : ", action.payload)
			})



		builder.addCase(addTeamMember.pending, (state) => {
			state.isLoading = true;
		})
			.addCase(addTeamMember.fulfilled, (state, action) => {
				state.isLoading = true;
				// it is causing problem so solution is 
				// as push method is returning 1 , no of elements inserted 
				// state.teamMember = state.teamMember.push(action.payload.data);

				// we also have to remember immutability so 
				state.teamMember = [...state.teamMember, action.payload.data]
				console.log("team member added : ", action.payload.data)
			})


		builder.addCase(deleteTeamMember.pending, (state) => {
			state.isLoading = true
		})
			.addCase(deleteTeamMember.fulfilled, (state, action) => {
				state.isLoading = false;
				state.teamMember = state.teamMember.filter((element) => {
					return element._id !== action.payload.data._id
				})
				console.log("team member is deleted succefully", action.payload)
			})
			.addCase(deleteTeamMember.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				console.log("member deleted succefully", action.payload.data)
			})
	}
})

export default teamSlice.reducer