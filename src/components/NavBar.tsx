import { Layout, Menu, Row } from "antd";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/consts";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { authSlice } from "../store/auth/authSlice";

const NavBar: FC = () => {
    const navigate = useNavigate()
    const {isAuth, user} = useAppSelector(state => state.authReducer)
    const dispatch = useAppDispatch()
    const {userLogouted} = authSlice.actions

    const logout = () => {
        dispatch(userLogouted())
        localStorage.clear()
    }

    return ( 
        <Layout.Header>
            <Row justify={"end"}>
                {isAuth 
                    ?
                    <>
                        <div style={{color: "white"}}>{user.username}</div>
                        <Menu theme="dark" mode="horizontal" selectable={false}>
                            
                            <Menu.Item 
                            onClick={logout}
                            >
                                Выйти
                            </Menu.Item>
                        </Menu>
                    </>
                    :
                    <Menu theme="dark" mode="horizontal" selectable={false}>
                        <div style={{userSelect: 'none', cursor: "default", color: "#011900"}}>111111</div>
                        <Menu.Item 
                        onClick={() => navigate(LOGIN_ROUTE)} 
                        >
                            Логин
                        </Menu.Item>
                    </Menu>
                }
            </Row>
        </Layout.Header>
    );
}

export default NavBar;