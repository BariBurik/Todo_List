import { IRoutes } from "../models/IRoute";
import Login from "../pages/Login";
import Todo from "../pages/Todo";
import { COMPLETED_TODOES_ROUTE, LOGIN_ROUTE, OVERDUE_TODOES_ROUTE, REGISTER_ROUTE, TODAY_TODOES_ROUTE, TODOES_ROUTE } from "../utils/consts";


export const publicRoutes: IRoutes[] = [
    {
        path: LOGIN_ROUTE,
        component: Login
    },
    {
        path: REGISTER_ROUTE,
        component: Login
    }
] 

export const privateRoutes: IRoutes[] = [
    {
        path: TODOES_ROUTE,
        component: Todo
    },
    {
        path: TODAY_TODOES_ROUTE,
        component: Todo
    },
    {
        path: OVERDUE_TODOES_ROUTE,
        component: Todo
    },
    {
        path: COMPLETED_TODOES_ROUTE,
        component: Todo
    }
]