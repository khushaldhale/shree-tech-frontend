import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import serviceSlice from "./slices/ServiceSlice";
import teamSlice from "./slices/TeamSlice";
import productSlice from "./slices/productSlice";



export const store = configureStore(
	{
		reducer: {
			auth: authSlice,
			service: serviceSlice,
			team: teamSlice,
			product: productSlice
		},

	}

)