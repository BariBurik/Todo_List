import { Button, Menu, Modal } from "antd";
import Sider from "antd/es/layout/Sider";
import Layout from "antd/es/layout/layout";
import MenuItem from "antd/es/menu/MenuItem";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { COMPLETED_TODOES_ROUTE, OVERDUE_TODOES_ROUTE, TODAY_TODOES_ROUTE, TODOES_ROUTE } from "../../utils/consts";
import { ITodo } from "../../models/ITodo";
import TodoItem from "../TodoItem/TodoItem";
import "./TodoList.css"
import TodoModal from "../TodoModal";
import { todoAPI } from "../../service/TodoService";

interface TodoListProps {
    filtredTodos: ITodo[],
    updateTodoInList: (updatedTodo: ITodo) => void
}

const TodoList: FC<TodoListProps> = ({ filtredTodos, updateTodoInList}) => {

    const [modalVisibale, setModalVisibale] = useState<boolean>(false)
    const [createNewTodo] = todoAPI.useCreateTodoMutation()

    const addNewTodo = async(newTodo: ITodo) => {
        await createNewTodo(newTodo)
        setModalVisibale(false)
    }

    return ( 
        <Layout className="h100" style={{backgroundColor: "#222"}}>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
            >
                <div className="demo-logo-vertical" />
                <Menu theme="dark" mode="inline">
                    <MenuItem>
                        <Link to={OVERDUE_TODOES_ROUTE}>Просроченные</Link>
                    </MenuItem>
                    <MenuItem>
                        <Link to={TODAY_TODOES_ROUTE}>Сегодняшние</Link>
                    </MenuItem>
                    <MenuItem>
                        <Link to={TODOES_ROUTE}>Все</Link>
                    </MenuItem>
                    <MenuItem>
                        <Link to={COMPLETED_TODOES_ROUTE}>Выполненные</Link>
                    </MenuItem>
                </Menu>
            </Sider>
                <div className="todo-list">
                    {
                        filtredTodos && filtredTodos.map((todo, index) => 
                            <TodoItem key={index} update={updateTodoInList} todo={todo}/>
                        )
                    }
                    <Button onClick={() => setModalVisibale(true)} type="primary">Создать новый todo</Button>
                    <Modal
                        title="Создать задачу"
                        open={modalVisibale}
                        footer={null}
                        onCancel={() => setModalVisibale(false)}
                    > 
                        <TodoModal todoAction={addNewTodo} whichAction="Создать"/>
                    </Modal>
                </div>
        </Layout>
    );
}

export default TodoList;