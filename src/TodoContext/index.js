import React from "react";
import { useLocalStorage } from "./useLocalStorage";

const TodoContext = React.createContext();

function TodoProvider({ children }) {
    //se pasan los parametros que retornan del Hook y se transforman 
    //en un objeto para no depender de las posiciones.   
    //Se separa la UI en otro componente y se pasan todas las funciones como PROPS.
    const {
        item: todos,
        saveItem: saveTodos,
        loading,
        error,
    } = useLocalStorage('TODOS_V1', []);
    const [searchValue, setSearchValue] = React.useState("");
    const [openModal, setOpenModal] = React.useState(false);

    const completedTodos = todos.filter(todo => !!todo.completed).length
    const totalTodos = todos.length
    const searchedTodos = todos.filter(todo => todo.text.toLowerCase().includes(searchValue.toLowerCase()));

    const addTodo = (text) => {
        const newTodos = [...todos];
        newTodos.push({
            text,
            completed: false, 
        })
        saveTodos(newTodos);
    };
    
    const completeTodo = (text) => {
        const newTodos = [...todos];
        const todoIndex = newTodos.findIndex((todo) => todo.text === text);
        newTodos[todoIndex].completed = true;
        saveTodos(newTodos);
    };
    const deleteTodo = (text) => {
        const newTodos = [...todos];
        const todoIndex = newTodos.findIndex((todo) => todo.text === text);
        newTodos.splice(todoIndex, 1);
        saveTodos(newTodos);
    };

    return (
        <TodoContext.Provider
            value={{
                addTodo, 
                loading,
                error,
                completedTodos,
                totalTodos,
                searchValue,
                searchedTodos,
                setSearchValue,
                completeTodo,
                deleteTodo,
                openModal,
                setOpenModal,
                setOpenModal, 
            }}>
            {children}
        </TodoContext.Provider>
    )
}
export { TodoContext, TodoProvider }

// const defaultTodos = [
//   { text: 'Cortar cebolla', completed: true },
//   { text: 'Tomar el curso de Introducción a ReacJS', completed: false },
//   { text: 'Llorar con la Llorona', completed: false },
//   { text: 'LALALALALA', completed: false },
//   { text: 'Usar estados derivados', completed: true },
// ];

// localStorage.setItem('TODOS_V1', JSON.stringify(defaultTodos));