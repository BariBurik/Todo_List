import { FC, useCallback, useEffect, useState } from "react";
import TodoList from "../components/TodoList/TodoList";
import { useAppSelector } from "../hooks/useAppSelector";
import { todoAPI } from "../service/TodoService";
import { formatDate } from "../utils/date";
import { ITodo } from "../models/ITodo";
import { COMPLETED_TODOES_ROUTE, OVERDUE_TODOES_ROUTE, TODAY_TODOES_ROUTE, TODOES_ROUTE } from "../utils/consts";

const Todo: FC = () => {
    const {user} = useAppSelector(state => state.authReducer)
    const {data: todos, isLoading, error} = todoAPI.useFetchAllTodosQuery(user)
    const [location, setLocation] = useState<string>('')

    useEffect(() => {
        setLocation(window.location.pathname)
    }, [window.location.pathname])
    
    const [filtredTodos, setFiltredTodos] = useState<ITodo[] | undefined>()

    const [updateTodo] = todoAPI.useUpdateTodoMutation();

    useEffect(() => {
        if (todos && !isLoading && !error) {
            console.log(user)
            setFiltredTodos(todos)
        }
    }, [isLoading, error, todos])
    let date = new Date()
    const currentDate = formatDate(date)

    useEffect(() => {
        if (todos && location && !isLoading && !error) {
            switch (location) {
                case OVERDUE_TODOES_ROUTE:
                    setFiltredTodos(todos?.filter(todo => todo.date !== currentDate && !todo.completed));
                    break;
                case TODAY_TODOES_ROUTE:
                    setFiltredTodos(todos?.filter(todo => todo.date === currentDate && !todo.completed));
                    break;
                case TODOES_ROUTE: 
                    setFiltredTodos(todos?.filter(todo => !todo.completed));
                    break;
                case COMPLETED_TODOES_ROUTE:
                    setFiltredTodos(todos?.filter(todo => todo.completed));
                    break;
            }
        }
    }, [todos, location, isLoading, error])

    

    const updateTodoInList = useCallback(async (todo: ITodo) => {
        const updatedTodo = { ...todo, completed: !todo.completed };
        console.log("QQQ",updatedTodo)
        try {
            await updateTodo(updatedTodo).unwrap();
            setFiltredTodos(filtredTodos?.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo))
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    }, [filtredTodos, todos])

    if (filtredTodos && !isLoading && !error) {
        console.log("ddd",filtredTodos)
        return ( 
            <TodoList updateTodoInList={updateTodoInList} filtredTodos={filtredTodos}/>
        );
    }

    return null;
}

export default Todo;