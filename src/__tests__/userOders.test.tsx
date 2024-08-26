import { describe, expect, test } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import {
  listOfOrders,
  initialState,
  userOrdersSlice,
  getUserOrders
} from '../services/slices/userOrders';

const ordersMockData = {
  orders: [
    {
      _id: '6664274397ede0001d06f816',
      status: 'done',
      name: 'Краторный люминесцентный бургер',
      createdAt: '2024-08-19T23:40:18.529Z',
      updatedAt: '2024-08-19T23:41:02.011Z',
      number: 50222,
      ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093e']
    },
    {
      _id: '666424d497ede0001d06f80d',
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2024-08-20T00:19:00.931Z',
      updatedAt: '2024-08-20T00:19:02.501Z',
      number: 50225,
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e']
    },
    {
      _id: '666422d897ede0001d06f802',
      status: 'done',
      name: 'Краторный бессмертный бургер',
      createdAt: '2024-08-19T22:25:20.730Z',
      updatedAt: '2024-08-19T22:25:21.166Z',
      number: 50217,
      ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093f']
    }
  ],
  isLoading: true
};

describe('Тест слайса userOrders', () => {
  test('Тест селектора  listOfOrders, ', () => {
    const store = configureStore({
      reducer: {
        orders: userOrdersSlice.reducer
      },
      preloadedState: {
        orders: ordersMockData
      }
    });
    const orderRequest = listOfOrders(store.getState());

    expect(orderRequest).toEqual(ordersMockData.orders);
  });

  test('Тесты редьюсера getUserOrders, check fulfilled', () => {
    const newState = userOrdersSlice.reducer(
      initialState,
      getUserOrders.fulfilled(ordersMockData.orders, '')
    );
    expect(newState.orders).toEqual(ordersMockData.orders);
    expect(newState.isLoading).toEqual(false);
  });

  test('Тесты редьюсера getUserOrders, check rejected', () => {
    const newState = userOrdersSlice.reducer(
      initialState,
      getUserOrders.rejected(new Error('error'), 'тестовая ошибка')
    );
    expect(newState.isLoading).toEqual(false);
  });

  test('Тесты редьюсера getUserOrders, check pending', () => {
    const newState = userOrdersSlice.reducer(
      initialState,
      getUserOrders.pending('')
    );
    expect(newState.isLoading).toEqual(true);
  });
});
