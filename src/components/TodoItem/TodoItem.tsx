import { FC, useState } from "react";
import { ITodo } from "../../models/ITodo";
import "./TodoItem.css"
import { Modal } from "antd";
import TodoModal from "../TodoModal";
import { todoAPI } from "../../service/TodoService";
import { DeleteOutlined } from "@ant-design/icons";

interface TodoItemProps {
    todo: ITodo,
    update: (updatedTodo: ITodo) => void
}

const TodoItem: FC<TodoItemProps> = ({ todo, update}) => {
    console.log(todo)

    const [modalVisibale, setModalVisibale] = useState<boolean>(false)

    const [updateTodo] = todoAPI.useUpdateTodoMutation()
    const [deleteTodo] = todoAPI.useDeleteTodoMutation()

    const updateOldTodo = async (newTodo: ITodo) => {
        newTodo = {...newTodo, id: todo.id}
        await updateTodo(newTodo)
        setModalVisibale(false)
    }

    const deleteThisTodo = async () => {
        await deleteTodo(todo)
    }

    return ( 
        <div className="todo__container">
            <div>
                <div className="item">
                    <div className="checkbox-circle2">
                    <input
                        type="checkbox"
                        id={`checkbox-circle2-${todo.id}`}
                        name={`check-${todo.id}`}
                        checked={todo.completed}
                        onChange={() => update(todo)}
                    />
                    <label htmlFor={`checkbox-circle2-${todo.id}`}></label>
                    </div>
                </div>
                <div onClick={() => setModalVisibale(true)} className="todo__text">
                    <p className="todo__title">{todo.title}</p>
                    <p className="todo__date">{todo.date}</p>
                </div>
            </div>
            <DeleteOutlined className="todo__delete" onClick={deleteThisTodo} />
            <Modal
                title="Создать задачу"
                open={modalVisibale}
                footer={null}
                onCancel={() => setModalVisibale(false)}
            > 
                <TodoModal todoAction={updateOldTodo} whichAction="Изменить"/>
            </Modal>
        </div>
    );
}

export default TodoItem;