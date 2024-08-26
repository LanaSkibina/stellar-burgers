import { configureStore } from '@reduxjs/toolkit';
import { constructorSlice, initialState } from '../services/slices/constructor';
import { nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

// Мокаем nanoid для генерации стабильных id во время тестирования
jest.mock('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  nanoid: jest.fn(() => 'test-id'),
}));

// Моковые данные
const bun: TConstructorIngredient = {
  _id: 'bun1',
  id: 'bun1',
  name: 'Булка',
  type: 'bun',
  proteins: 10,
  fat: 20,
  carbohydrates: 30,
  calories: 200,
  price: 50,
  image: 'url_to_image',
  image_mobile: 'url_to_mobile_image',
  image_large: 'url_to_large_image',
};

const meat1: TConstructorIngredient = {
  _id: 'meat1',
  id: 'meat1',
  name: 'Мясо',
  type: 'main',
  proteins: 30,
  fat: 10,
  carbohydrates: 10,
  calories: 300,
  price: 200,
  image: 'url_to_image',
  image_mobile: 'url_to_mobile_image',
  image_large: 'url_to_large_image',
};

const meat2: TConstructorIngredient = {
  _id: 'meat2',
  id: 'meat2',
  name: 'Мясо 2',
  type: 'main',
  proteins: 25,
  fat: 15,
  carbohydrates: 5,
  calories: 250,
  price: 180,
  image: 'url_to_image',
  image_mobile: 'url_to_mobile_image',
  image_large: 'url_to_large_image',
};

describe('Тест слайса constructorSlice', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        constructorIngredient: constructorSlice.reducer,
      },
      preloadedState: {
        constructorIngredient: initialState,
      },
    });
  });

  test('должен добавить булку', () => {
    store.dispatch(constructorSlice.actions.addItem(bun));
    const state = store.getState().constructorIngredient;
    expect(state.bun).toEqual({ ...bun, id: 'test-id' });
  });

  test('должен добавить ингредиент', () => {
    store.dispatch(constructorSlice.actions.addItem(meat1));
    const state = store.getState().constructorIngredient;
    expect(state.ingredients).toContainEqual({ ...meat1, id: 'test-id' });
  });

  test('должен удалить ингредиент', () => {
    store.dispatch(constructorSlice.actions.addItem(meat1));
    store.dispatch(constructorSlice.actions.deleteItem({ ...meat1, id: 'test-id' }));
    const state = store.getState().constructorIngredient;
    expect(state.ingredients).not.toContainEqual({ ...meat1, id: 'test-id' });
  });

  test('должен очистить все ингредиенты и булку', () => {
    store.dispatch(constructorSlice.actions.addItem(bun));
    store.dispatch(constructorSlice.actions.addItem(meat1));
    store.dispatch(constructorSlice.actions.clearAll());
    const state = store.getState().constructorIngredient;
    expect(state).toEqual(initialState);
  });

  test('должен обновить все ингредиенты', () => {
    const ingredients: TConstructorIngredient[] = [
      { ...meat1, id: 'unique-id-1' },
      { ...meat2, id: 'unique-id-2' }
    ];
    store.dispatch(constructorSlice.actions.updateAll(ingredients));
    const state = store.getState().constructorIngredient;
    expect(state.ingredients).toEqual(ingredients);
  });

  test('должен переместить ингредиент вниз', () => {
    const ingredients: TConstructorIngredient[] = [
      { ...meat1, id: 'unique-id-1' },
      { ...meat2, id: 'unique-id-2' }
    ];
    store.dispatch(constructorSlice.actions.updateAll(ingredients));
    store.dispatch(constructorSlice.actions.ingredientMoveDown({ ...meat1, id: 'unique-id-1' }));
    const state = store.getState().constructorIngredient;
    expect(state.ingredients[0]).toEqual({ ...meat2, id: 'unique-id-2' });
    expect(state.ingredients[1]).toEqual({ ...meat1, id: 'unique-id-1' });
  });

  test('должен переместить ингредиент вверх', () => {
    const ingredients: TConstructorIngredient[] = [
      bun,
      { ...meat1, id: 'unique-id-1' },
      { ...meat2, id: 'unique-id-2' }
    ];
    store.dispatch(constructorSlice.actions.updateAll(ingredients));
    store.dispatch(constructorSlice.actions.ingredientMoveUp({ ...meat2, id: 'unique-id-2' }));
    const state = store.getState().constructorIngredient;
    expect(state.ingredients[0]).toEqual(bun);  // Булка на 0-й позиции
    expect(state.ingredients[1]).toEqual({ ...meat2, id: 'unique-id-2' });  // meat2 переместился вверх
    expect(state.ingredients[2]).toEqual({ ...meat1, id: 'unique-id-1' });  // meat1 сместился вниз
  });
});
