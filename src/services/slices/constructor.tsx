import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'constructorIngredient',
  initialState,
  reducers: {
    addItem: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TConstructorIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    deleteItem: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload.id
      );
    },
    clearAll: (state) => (state = initialState),
    updateAll: (state, action: PayloadAction<TConstructorIngredient[]>) => {
      state.ingredients = action.payload;
    },
    ingredientMoveDown: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const ings = state.ingredients;
      const ingId = action.payload.id;
      const ingIndex = ings.findIndex((item) => item.id === ingId);
      if (ingIndex > -1 && ingIndex < ings.length - 1) {
        ings.splice(ingIndex, 2, ings[ingIndex + 1], ings[ingIndex]);
      }
    },
    ingredientMoveUp: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const ings = state.ingredients;
      const ingId = action.payload.id;
      const ingIndex = ings.findIndex((item) => item.id === ingId);
      if (ingIndex > 0) {
        ings.splice(ingIndex - 1, 2, ings[ingIndex], ings[ingIndex - 1]);
      }
    }
  },
  selectors: {
    selectItems: (state: TConstructorState) => state
  }
});
export const {
  addItem,
  deleteItem,
  clearAll,
  updateAll,
  ingredientMoveDown,
  ingredientMoveUp
} = constructorSlice.actions;
export const constructorSelector = constructorSlice.selectors;
