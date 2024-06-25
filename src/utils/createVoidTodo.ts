export const createVoidTodo = (userId: number) => {
    return {
        userId: userId,
        id: `${Math.random()*10000000000000000000}`,
        title: '',
        date: '',
        completed: false
    }
}