import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IUser } from "../../models/IUser"


interface AuthState {
    user: IUser,
    isAuth: boolean
}

const initialState: AuthState = {
    user: {
        id: 0,
        username: '',
        password: ''
    },
    isAuth: false
}

export const authSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        userLogined(state, action: PayloadAction<IUser>) {
            state.user = action.payload
            state.isAuth = true
        },
        userLogouted(state) {
            state.user = {
                id: 0,
                username: '',
                password: ''
            }
            state.isAuth = false
        }
    }
})

export default authSlice.reducer