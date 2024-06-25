import { FC, useEffect, useState } from "react";
import { ITodo } from "../models/ITodo";
import { Button, DatePicker, Form, Input, Row } from "antd";
import { rules } from "../utils/rules";
import { useAppSelector } from "../hooks/useAppSelector";
import { Dayjs } from "dayjs";
import { formatDate } from "../utils/date";
import { createVoidTodo } from "../utils/createVoidTodo";

interface TodoModalProps {
    todoAction: (newTodo: ITodo) => void,
    whichAction: string
}

const TodoModal: FC<TodoModalProps> = ({todoAction, whichAction}) => {

    const {user} = useAppSelector(state => state.authReducer)

    const [newTodo, setNewTodo] = useState<ITodo | null>(null)

    useEffect(() => {
        setNewTodo(createVoidTodo(user.id))
        console.log(1)
    }, [])

    const todoNewAction = () => {
        if(newTodo) {
            console.log(user)
            todoAction(newTodo)
        }
    }

    const selectDate = (date: Dayjs | null) => {
        if (date && newTodo) {
            setNewTodo({...newTodo, date: formatDate(date.toDate())})
        }
    }

    return ( 
        <Form onFinish={todoNewAction}>
            <Form.Item
                label="Название задачи"
                name="title"
                rules={[rules.required()]}
            >
                <Input
                    onChange={e => newTodo && setNewTodo({...newTodo, title: e.target.value})}
                />
            </Form.Item>
            <Form.Item
                label="Дедлайн"
                name="date"
                rules={[rules.required(), rules.isDateAfter("Нельзя создать уже просроченную задачу")]}
            >
                <DatePicker  
                    onChange={(date) => selectDate(date)}
                />
            </Form.Item>
            <Row justify={"end"}>
                <Form.Item>
                    <Button type="primary" htmlType="submit">{whichAction}</Button>
                </Form.Item>
            </Row>
        </Form>
    );
}

export default TodoModal;