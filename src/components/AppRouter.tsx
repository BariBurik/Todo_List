import { privateRoutes, publicRoutes } from "../routes";
import { Navigate, Route, Routes } from "react-router-dom";
import { LOGIN_ROUTE, TODOES_ROUTE } from "../utils/consts";
import { useAppSelector } from "../hooks/useAppSelector";

const AppRouter = () => {
    const {isAuth} = useAppSelector(state => state.authReducer)
    return ( 
        isAuth 
            ?
            <Routes>
                {privateRoutes.map(route => 
                    <Route key={route.path} path={route.path} Component={route.component} />
                )} 
                <Route path="*" element={<Navigate to={TODOES_ROUTE}/>}/>
            </Routes>
            :
            <Routes>
                {publicRoutes.map(route => 
                    <Route key={route.path} path={route.path} Component={route.component} />
                )} 
                <Route path="*" element={<Navigate to={LOGIN_ROUTE}/>}/>
            </Routes>
    );
}

export default AppRouter;