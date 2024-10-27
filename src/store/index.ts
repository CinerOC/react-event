import { combineReducers, Middleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import authorizationReducer, {
  logOut,
  requestUnsuccessfullByDesign,
} from './authorization';

import profileReducer from './profileStore';
import { helpRequestData } from './help-requests/help-requests-data';

const rootReducer = combineReducers({
  //counter: rtkReducer,
  auth: authorizationReducer,
  profile: profileReducer,
  HELP_REQUEST: helpRequestData.reducer,
  // остальные редьюсеры
});

export const authMiddleware: Middleware = (store) => (next) => (action) => {
  // @ts-expect-error: тип action определен как unknown
  if (action.type.endsWith('rejected')) {
    // debugger;
    // @ts-expect-error: тип action определен как unknown
    if (action.error?.message === '500') {
      // просто ошибка сервера, не убираем флаг isAuth и не редиректимся на страницу логина
      // console.log('ИЗ миддлавара с ошибкой 500');
      // debugger

      store.dispatch(requestUnsuccessfullByDesign());

      // @ts-expect-error: тип action определен как unknown
    } else if (action.error?.message === '403') {
      // просрочился jwt, убираем флаг isAuth и редиректимся на страницу логина
      // console.log('ИЗ миддлавара с ошибкой 403');
      // debugger;
      store.dispatch(logOut());
    }
  }

  return next(action);
};

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
  devTools: true,
});
