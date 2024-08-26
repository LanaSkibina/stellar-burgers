import { configureStore } from '@reduxjs/toolkit';
import { ingredientsSlice } from '../services/slices/ingredients';
import { feedsSlice } from '../services/slices/feeds';
import { newOrderSlice } from '../services/slices/order';
import { constructorSlice } from '../services/slices/constructor';
import { userSlice } from '../services/slices/profile';
import { userOrdersSlice } from '../services/slices/userOrders';
import store from '../services/store'; 

describe('Тест инициализация Redux Store', () => {
    it('Должен корректно инициализировать store с правильными редьюсерами', () => {
      const testStore = configureStore({
        reducer: {
          [ingredientsSlice.name]: ingredientsSlice.reducer,
          [constructorSlice.name]: constructorSlice.reducer,
          [userSlice.name]: userSlice.reducer,
          [feedsSlice.name]: feedsSlice.reducer,
          [newOrderSlice.name]: newOrderSlice.reducer,
          [userOrdersSlice.name]: userOrdersSlice.reducer
        }
      });
  
      expect(testStore.getState()).toEqual(store.getState());
    });
});
