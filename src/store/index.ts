import { configureStore } from '@reduxjs/toolkit'
import {combineReducers} from 'redux'
import { todoAPI } from '../service/TodoService'
import { userAPI } from '../service/UserService'
import authReducer from './auth/authSlice'

const rootReducer = combineReducers({
    [userAPI.reducerPath]: userAPI.reducer,
    [todoAPI.reducerPath]: todoAPI.reducer,
    authReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => 
            getDefaultMiddleware().concat(userAPI.middleware, todoAPI.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']