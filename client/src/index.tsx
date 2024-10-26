import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import config from './auth_config.json';
import gamesReducer from './states/index'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = { key: 'root', storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, gamesReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    }
  }),
});

export type RootState = ReturnType<typeof store.getState>;
const rootElement: HTMLElement | null = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <Auth0Provider
          domain={config.domain}
          clientId={config.clientId}
          authorizationParams={{
            redirect_uri: window.location.origin
          }}
        >
          <App />
        </Auth0Provider>
      </PersistGate>
    </Provider>
  );
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
