import { describe, expect, test } from '@jest/globals';
import {
  feedsSlice,
  getAllFeeds,
  getOrdersFeeds,
  getTotalFeeds,
  getTotalTodayFeeds,
  initialState
} from '../services/slices/feeds';
import { configureStore } from '@reduxjs/toolkit';

const feedsMockData = {
    orders: [
      {
        _id: '6664274397ede0001d06f816',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',        
          '643d69a5c3f7b9001cfa093e'
        ],
        status: 'done',
        name: 'Краторный люминесцентный бургер',
        createdAt: '2024-08-19T23:40:18.529Z',
        updatedAt: '2024-08-19T23:41:02.011Z',
        number: 50222
      },
      {
        _id: '666424d497ede0001d06f80d',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093e'
        ],
        status: 'done',
        name: 'Флюоресцентный люминесцентный бургер',
        createdAt: '2024-08-20T00:19:00.931Z',
        updatedAt: '2024-08-20T00:19:02.501Z',
        number: 50225
      },
      {
        _id: '666422d897ede0001d06f802',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa093f'
        ],
        status: 'done',
        name: 'Краторный бессмертный бургер',
        createdAt: '2024-08-19T22:25:20.730Z',
        updatedAt: '2024-08-19T22:25:21.166Z',
        number: 50217
      }
    ],
    total: 3,
    totalToday: 3,
    isLoading: false,
    error: undefined
  };

describe('Тесты слайса feedsSlice', () => {
  test('Тесты селекторов  getOrdersFeeds, getTotalFeeds, getTotalTodayFeeds', () => {
    const store = configureStore({
      reducer: {
        feeds: feedsSlice.reducer
      },
      preloadedState: {
        feeds: feedsMockData
      }
    });
    const orders = getOrdersFeeds(store.getState());
    const total = getTotalFeeds(store.getState());
    const totalToday = getTotalTodayFeeds(store.getState());
    expect(orders).toEqual(feedsMockData.orders);
    expect(total).toEqual(feedsMockData.total);
    expect(totalToday).toEqual(feedsMockData.totalToday);
  });

  test('Тесты редьюсера getAllFeeds, check fulfilled', () => {
    const action = {
      type: getAllFeeds.fulfilled.type,
      payload: feedsMockData
    };
    const stateReceived = feedsSlice.reducer(initialState, action);
    expect(stateReceived).toEqual(feedsMockData);
    expect(stateReceived.isLoading).toEqual(false);
  });

  test('Тесты редьюсера getAllFeeds, check rejected', () => {
    const stateReceived = feedsSlice.reducer(
      initialState,
      getAllFeeds.rejected(new Error('error'), 'Ошибка!')
    );
    expect(stateReceived.orders).toEqual([]);
    expect(stateReceived.total).toEqual(0);
    expect(stateReceived.totalToday).toEqual(0);
    expect(stateReceived.isLoading).toEqual(false);
    expect(stateReceived.error).toEqual('error');
  });

  test('Тесты редьюсера getAllFeeds, check pending', () => {
    const stateReceived = feedsSlice.reducer(
      initialState,
      getAllFeeds.pending('')
    );
    expect(stateReceived.isLoading).toEqual(true);
  });
});
