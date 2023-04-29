import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import userInfor from './userInfor'
import {
  persistReducer
} from 'redux-persist'
const reducers = combineReducers({
  userInfor
})

const persistConfig = {
  key: 'store',
  storage,
  blacklist: ['spin']
}
const persistedReducer = persistReducer(persistConfig, reducers)

export default configureStore({
  reducer: persistedReducer
})
