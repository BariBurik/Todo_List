import React, { useEffect } from 'react';
import './App.css';
import { Layout } from "antd"
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { authSlice } from './store/auth/authSlice';
import { useAppDispatch } from './hooks/useAppDispatch';
import { IUser } from './models/IUser';

function App() {

  const {userLogined} = authSlice.actions
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (localStorage.getItem("auth")) {
       dispatch(userLogined({id: Number(localStorage.getItem('id' || '')),username: localStorage.getItem('username' || '')} as IUser))
    }
  }, [])

  return (
    <Layout>
      <NavBar/>
      <Layout.Content>
        <AppRouter/>
      </Layout.Content>
    </Layout>
  );
}

export default App;
