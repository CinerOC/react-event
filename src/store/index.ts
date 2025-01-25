import { Action, combineReducers, Middleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import authorizationReducer, { logOut } from './authorization';
import userFavouritesReducer from './user-favourites/userFavourites';
import profileReducer from './profileStore';
import formAuthorizationReducer from './formAuthorization';
import { helpRequestData } from './help-requests/help-requests-data';
import { createAPI } from '../services/api';

const rootReducer = combineReducers({
  auth: authorizationReducer,
  formAuthorization: formAuthorizationReducer,
  profile: profileReducer,
  favourites: userFavouritesReducer,
  HELP_REQUEST: helpRequestData.reducer,
  // остальные редьюсеры
});

type RootState = ReturnType<typeof rootReducer>;

// задавили линтер по необходимости согласно инструкции редакса https://redux.js.org/usage/usage-with-typescript
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const authMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
  // здесь ловим 403 ошибку
  const typedAction = action as Action;

  if (typedAction.type.endsWith('rejected') &&
    typedAction.error?.name === 'AxiosError' &&
    typedAction.error?.message.includes('403')
  ) {
    //store.dispatch(logOut()); // TODO: убрать двойной вывод инфо-тоста о разлогинивании
  }

  return next(action);
};

/*export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware),
  devTools: true,
});*/

export const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(authMiddleware),
    devTools: true,
});

