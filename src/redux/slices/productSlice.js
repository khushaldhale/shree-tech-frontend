import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { generateAccessToken, middleware } from "./authSlice";




// add product 
export const addProduct = createAsyncThunk("addProduct", async (data, { rejectWithValue, dispatch, getState }) => {
	try {

		const accessToken = getState().auth.accessToken;
		const url = process.env.REACT_APP_BACKEND_URL + "/products"

		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${accessToken}`
			},
			body: JSON.stringify(data)
		})

		if (response.status === 401 || response.status === 403) {
			return middleware(response, generateAccessToken, dispatch, addProduct, data.navigate, rejectWithValue)
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


// delete product 


export const deleteProduct = createAsyncThunk("deleteProduct", async (data, { rejectWithValue, dispatch, getState }) => {
	try {

		const accessToken = getState().auth.accessToken;

		const url = process.env.REACT_APP_BACKEND_URL + `/products/${data._id}`
		const response = await fetch(url, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${accessToken}`
			}
		})

		if (response.status == 401 || response.status === 403) {
			return middleware(response, generateAccessToken, dispatch, deleteProduct, data.navigate, rejectWithValue)
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

// get all products 

export const getAllProducts = createAsyncThunk("getAllProducts", async (_, { rejectWithValue, }) => {
	try {
		const url = process.env.REACT_APP_BACKEND_URL + "/products"
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


const initialState = {
	isLoading: null,
	isError: null,
	products: []
}

export const productSlice = createSlice({
	name: "product",
	initialState,
	extraReducers: (builder) => {

		// get products 
		builder.addCase(getAllProducts.pending, (state) => {
			state.isLoading = true;
		})
			.addCase(getAllProducts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.products = action.payload.data;
				console.log("products are fetched : ", action.payload.data)
			})
			.addCase(getAllProducts.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				console.log("products are rejected : ", action.payload.data)
			})


		//  add products 
		builder.addCase(addProduct.pending, (state) => {
			state.isLoading = true
		})
			.addCase(addProduct.fulfilled, (state, action) => {
				state.isLoading = false;
				state.products = [...state.products, action.payload.data];
				console.log("product added : ", action.payload.data)
			})
			.addCase(addProduct.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				console.log('add product error occured : ', action.payload.data)
			})

		// delete products 

		builder.addCase(deleteProduct.pending, (state) => {
			state.isLoading = true
		})
			.addCase(deleteProduct.fulfilled, (state, action) => {
				state.isLoading = false;
				state.products = state.products.filter((element) => {
					return element._id !== action.payload.data._id
				})
			})
			.addCase(deleteProduct.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				console.log("product deletion error : ", action.payload.data)
			})

	}
})

export default productSlice.reducer