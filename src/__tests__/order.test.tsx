import { describe, expect, test } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import newOrderReducer, {
  getOrderModalData,
  getOrderRequest,
  newOrderSlice,
  createNewOrder,
  initialState,
  resetOrder,
  TNewOrderState
} from '../services/slices/order';

const orderMockData: TNewOrderState = {
  orderRequest: false,
  orderModalData: {
    _id: '66645cb097ede0001d06f8a9',
    status: 'done',
    name: 'Краторный бессмертный бургер',
    createdAt: '2024-08-19T22:25:20.730Z',
    updatedAt: '2024-08-19T22:25:21.166Z',
    number: 50217,
    ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093f'],
  },
  orderError: undefined,
};

  const orderReceivedMockData = {
    success: true,
    name: 'Краторный бессмертный бургер',
    order: {
      _id: '66645cb097ede0001d06f8a9',
      status: 'done',
      name: 'Краторный бессмертный бургер',
      createdAt: '2024-08-19T22:25:20.730Z',
      updatedAt: '2024-08-19T22:25:21.166Z',
      number: 50217,
      ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093f'],
      owner: ''
    }
  };

describe('Тест order', () => {
  test('Тесты селекторов  getOrderRequest, getOrderModalData, ', () => {
    const store = configureStore({
      reducer: {
        newOrder: newOrderSlice.reducer
      },
      preloadedState: {
        newOrder: orderMockData
      }
    });
    const orderRequest = getOrderRequest(store.getState());
    const modal = getOrderModalData(store.getState());

    expect(orderRequest).toEqual(orderMockData.orderRequest);
    expect(modal).toEqual(orderMockData.orderModalData);
  });

  test('Тесты редьюсера resetOrder', () => {
    const state = {
      orderRequest: true,
      orderModalData: orderReceivedMockData.order,
      orderError: 'undefined'
    };
    const stateReceived = newOrderSlice.reducer(state, resetOrder());
    expect(stateReceived).toEqual(initialState);
  });

  test('Тесты редьюсера createNewOrder, check fulfilled', () => {
    const newState = newOrderSlice.reducer(
      initialState,
      createNewOrder.fulfilled(orderReceivedMockData, '', [''])
    );
    expect(newState.orderRequest).toEqual(false);
    expect(newState.orderModalData).toEqual(orderReceivedMockData.order);
  });

  test('Тесты редьюсера placeNewOrder, check rejected', () => {
    const newState = newOrderSlice.reducer(
      initialState,
      createNewOrder.rejected(new Error('error'), 'Ошибка!', [''])
    );
    expect(newState.orderError).toEqual('error');
  });

  test('Тесты редьюсера placeNewOrder, check pending', () => {
    const newState = newOrderSlice.reducer(
      initialState,
      createNewOrder.pending('', [])
    );
    expect(newState.orderRequest).toEqual(true);
  });
});