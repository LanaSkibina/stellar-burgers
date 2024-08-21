import { orderBurgerApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export interface TNewOrderState {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  orderError: string | undefined;
}

export const initialState: TNewOrderState = {
  orderRequest: false,
  orderModalData: null,
  orderError: undefined
};

export const createNewOrder = createAsyncThunk(
  'order/createOrder',
  orderBurgerApi
);

export const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    resetOrder: (state) => initialState
  },
  selectors: {
    getOrderRequest: (state) => state.orderRequest,
    getOrderModalData: (state) => state.orderModalData
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.orderError = action.error.message;
      })
      .addCase(createNewOrder.pending, (state) => {
        state.orderRequest = true;
      });
  }
});
export const { resetOrder } = newOrderSlice.actions;
export const { getOrderRequest, getOrderModalData } = newOrderSlice.selectors;
export default newOrderSlice.reducer;
