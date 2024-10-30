import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { generateAccessToken, middleware } from "./authSlice";



export const getService = createAsyncThunk("getService", async (_, { rejectWithValue }) => {

	try {
		const url = process.env.REACT_APP_BACKEND_URL + "/services"
		const response = await fetch(url, {
			method: "GET"
		})
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

export const addService = createAsyncThunk("addService", async (data, { rejectWithValue, dispatch, getState }) => {
	try {
		const state = getState()

		const accessToken = state.auth.accessToken
		console.log(accessToken)
		const url = process.env.REACT_APP_BACKEND_URL + "/services"
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": 'application/json',
				"Authorization": `Bearer ${accessToken}`
			},
			body: JSON.stringify(data)
		})


		// now we have to  call the middleware 
		// if  access token not provided or  invalid 

		if (response.status == 401 || response.status == 403) {

			return middleware(response, generateAccessToken, dispatch, addService, data.navigate, rejectWithValue)

		}
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

export const deleteService = createAsyncThunk("deleteService", async ({ _id, navigate }, { rejectWithValue, dispatch, getState }) => {
	try {

		const accessToken = getState().auth.accessToken
		const url = process.env.REACT_APP_BACKEND_URL + `/services/${_id}`;

		const response = await fetch(url, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${accessToken}`
			}
		})

		if (response.status == 401 || response.status == 403) {
			return middleware(response, generateAccessToken, dispatch, deleteService, navigate, rejectWithValue)
		}


		if (!response.ok) {
			const erroData = await response.json();
			return rejectWithValue(erroData)
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
	services: []
}

export const serviceSlice = createSlice(
	{
		name: "service",
		initialState,
		extraReducers: (builder) => {

			// accessing services 
			builder.addCase(getService.pending, (state) => {
				state.isLoading = true
			})
				.addCase(getService.fulfilled, (state, action) => {
					state.isLoading = false;
					state.services = action.payload.data
				})
				.addCase(getService.rejected, (state, action) => {
					state.isError = true;
					state.isLoading = false;
					console.log(action.payload)
				})


			//to addd service 
			builder.addCase(addService.pending, (state) => {
				state.isLoading = true
			})
				.addCase(addService.fulfilled, (state, action) => {
					state.isLoading = false;
					console.log("service added", action.payload)
				})
				.addCase(addService.rejected, (state, action) => {
					state.isLoading = false;
					state.isError = true;
					console.log("addservie rejected ", action.payload)
				})


			// to delete service
			builder.addCase(deleteService.pending, (state) => {
				state.isLoading = true
			})
				.addCase(deleteService.fulfilled, (state, action) => {
					state.isLoading = false;
					state.services = state.services.filter((element) => {
						return element._id !== action.payload.data._id
					})
					console.log("service is deleted succesfully ", action.payload)
				})
				.addCase(deleteService.rejected, (state, action) => {
					state.isLoading = false;
					state.isError = true;
					console.log("deleted succesfully ", action.payload)
				})

		}
	}
)

export default serviceSlice.reducer