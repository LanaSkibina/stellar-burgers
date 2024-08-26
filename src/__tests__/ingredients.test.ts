import { describe, expect, test } from '@jest/globals';
import {
  getIngredients,
  getIngredientsList,
  getIngredientsLoadingState,
  getIngredientsState,
  ingredientsSlice,
  initialState
} from '../services/slices/ingredients';

import { configureStore } from '@reduxjs/toolkit';

const ingredientsMockData = {
    ingredients: [
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
      },
      {
        _id: '643d69a5c3f7b9001cfa093f',
        name: 'Мясо бессмертных моллюсков Protostomia',
        type: 'main',
        proteins: 433,
        fat: 244,
        carbohydrates: 33,
        calories: 420,
        price: 1337,
        image: 'https://code.s3.yandex.net/react/code/meat-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png'
      },
      {
        _id: '643d69a5c3f7b9001cfa093e',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
      },
      {
        _id: '643d69a5c3f7b9001cfa0942',
        name: 'Соус Spicy-X',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
      }
    ],
    loading: false,
    error: null
  };

describe('Тесты слайса ingredientsSlice', () => {
  test('Тесты селекторов  getIngredientsState, getIngredientsLoadingState, getIngredients', () => {
    const store = configureStore({
      reducer: {
        ingredients: ingredientsSlice.reducer
      },
      preloadedState: {
        ingredients: ingredientsMockData
      }
    });
    const ingredientsState = getIngredientsState(store.getState());
    const loading = getIngredientsLoadingState(store.getState());
    const ingredients = getIngredients(store.getState());
    expect(ingredientsState).toEqual(ingredientsMockData);
    expect(loading).toEqual(ingredientsMockData.loading);
    expect(ingredients).toEqual(ingredientsMockData.ingredients);
  });

  test('Тесты редьюсера getIngredientsList, check fulfilled', () => {
    const action = {
      type: getIngredientsList.fulfilled.type,
      payload: ingredientsMockData.ingredients
    };
    const stateReceived = ingredientsSlice.reducer(initialState, action);
    expect(stateReceived).toEqual(ingredientsMockData);
    expect(stateReceived.loading).toEqual(false);
  });

  test('Тесты редьюсера getIngredientsList, check rejected', () => {
    const stateReceived = ingredientsSlice.reducer(
      initialState,
      getIngredientsList.rejected(new Error('error'), 'Ошибка!')
    );
    expect(stateReceived.ingredients).toEqual([]);
    expect(stateReceived.loading).toEqual(false);
    expect(stateReceived.error).toEqual('error');
  });

  test('Тесты редьюсера getIngredientsList, check pending', () => {
    const stateReceived = ingredientsSlice.reducer(
      initialState,
      getIngredientsList.pending('')
    );
    expect(stateReceived.loading).toEqual(true);
  });
});