import { Button, Form, Input } from "antd";
import { FC, useState } from "react";
import { IUser } from "../models/IUser";
import { rules } from "../utils/rules";
import { userAPI } from "../service/UserService";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { authSlice } from "../store/auth/authSlice";
import { LOGIN_ROUTE, REGISTER_ROUTE } from "../utils/consts";
import { Link } from "react-router-dom";

const LoginForm: FC = () => {
    const [isLogining, setIsLogining] = useState<boolean>(false)
    const [username, setUsername] = useState('')
    const [pass, setPass] = useState('')
    const dispatch = useAppDispatch()
    const {userLogined} = authSlice.actions

    const {data: users, isLoading, error, refetch: refetchUsers} = userAPI.useFetchAllUserQuery(0)
    const [registerUser, {}] = userAPI.useRegisterUserMutation()

    const registerationUser = (regUser: IUser) => {
        let continueFunc = true;
        if (!isLoading && !error && users) {
            users.forEach(user => {
                if (user.username === regUser.username) {
                    if (user.username === regUser.username) {
                        continueFunc = false;
                        return;
                    }
                }    
            })
            if (continueFunc && regUser) {
                const newUserId = Math.random() * 1000000000
                regUser = {...regUser, id: newUserId}
                registerUser(regUser)
                refetchUsers()
                if (!isLoading && !error) {
                    dispatch(userLogined(regUser))
                    localStorage.setItem('auth', 'true')
                    localStorage.setItem('username', regUser.username)
                    localStorage.setItem('id', `${newUserId}`)
                } else if (error) {
                    return error
                }
            } else {
                alert("Пользователь с таким именем уже существует")
            }
        }
    }

    const loginUser = (logUser: IUser) => {
        let continueFunc = false
        if (!isLoading && !error && users ) {
            users.forEach(user => {
                if (user.username === logUser.username) {
                    if (user.password === logUser.password) {
                        continueFunc = true;
                        return;
                    }
                }
            })
            if (continueFunc && logUser) {
                dispatch(userLogined(logUser))
                let newUserId;
                users.forEach(user => {
                    console.log(user)
                    if(user.username === logUser.username) {
                        newUserId = user.id
                        console.log('1')
                    }
                })
                localStorage.setItem('auth', 'true')
                localStorage.setItem('username', logUser.username)
                console.log(newUserId)
                localStorage.setItem('id', `${newUserId}`)
            } else {
                alert("Не верные логин или пароль")
            }
        } else if (error) {
            return error
        }
        
        
    }

    return ( 
        isLogining
        ?
        <Form
        onFinish={loginUser}>
            <Form.Item
                label="Имя пользователя"
                name="username"
                rules={[rules.required("Пожалуйста введите имя пользователя")]}
            >
                <Input value={username} onChange={(e) => setUsername(e.target.value)}/>
            </Form.Item>
            <Form.Item
                label="Пароль"
                name="password"
                rules={[rules.required("Пожалуйста введите пароль")]}
            >
                <Input value={pass} onChange={(e) => setPass(e.target.value)}/>
            </Form.Item>
            <Form.Item wrapperCol={{offset: 5, span: 16}}>
                <p>Нет аккаунтa? <Link onClick={() => setIsLogining(false)} to={REGISTER_ROUTE}>Зарегистрируйтесь</Link></p>
            </Form.Item>
            <Form.Item wrapperCol={{offset: 9, span: 16}}>
                <Button type="primary" htmlType="submit">Войти</Button>
            </Form.Item>
        </Form>
        :
        <Form
        onFinish={registerationUser}>
            <Form.Item
                label="Имя пользователя"
                name="username"
                rules={[rules.required("Пожалуйста введите имя пользователя")]}
            >
                <Input value={username} onChange={(e) => setUsername(e.target.value)}/>
            </Form.Item>
            <Form.Item
                label="Пароль"
                name="password"
                rules={[rules.required("Пожалуйста введите пароль")]}
            >
                <Input value={pass} onChange={(e) => setPass(e.target.value)}/>
            </Form.Item>
            <Form.Item wrapperCol={{offset: 7, span: 16}}>
                <p>Есть аккаунт? <Link onClick={() => setIsLogining(true)} to={LOGIN_ROUTE}>Войдите</Link></p>
            </Form.Item>
            <Form.Item wrapperCol={{offset: 6, span: 16}}>
                <Button type="primary" htmlType="submit">Зарегистрироваться</Button>
            </Form.Item>
        </Form>
    )
}


    

export default LoginForm;