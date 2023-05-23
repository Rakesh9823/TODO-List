import React, { useState } from 'react'
import "../components/TodoApp.css"
const TodoApp = () => {

    const [inputValue, setInputValue] = useState("")
    const [btn, setBtn] = useState(true)
    const [todoList, setTodoList] = useState([])
    const [itemId, setItemId] = useState(null)
    const handleAdd = () => {
        if (!inputValue.length) {
            alert("Please Fill the below field.")
        } else if (inputValue && inputValue.length && !btn) {
            setTodoList(todoList.map((item) => {
                if (item.id == itemId) {
                    return { ...item, name: inputValue }
                }
                return item
            }))
            setBtn(true)
        }
        else {
            const item = { id: new Date().getTime().toString(), name: inputValue }
            setTodoList([...todoList, item])
        }
        setInputValue("")
    }

    const handleEdit = (toBeEdit) => {
        const query = todoList.find((item) => {
            return item.id == toBeEdit
        })

        setItemId(toBeEdit)
        setInputValue(query.name)
        setBtn(false)
    }

    const handleDelete = (toBeDelete) => {
        const newList = todoList.filter((item) => {
            return item.id !== toBeDelete
        })

        setTodoList(newList)

    }
    return (
        <div className='container'>
            <h1>Todo List</h1>
            <input type="text" onChange={(e) => { setInputValue(e.target.value) }} value={inputValue} />
            {btn ? <button onClick={handleAdd} className='addBtn'>Add</button> : <button onClick={handleAdd} className='addBtn'>Update</button>}

            {todoList.map((item, index) => {
                return (
                    <div key={index} className='itemList'>
                        <section className='itemName'>{item.name}</section>
                        <section className='buttons'>
                            <button onClick={() => { handleEdit(item.id) }} className='edit'>Edit</button>
                            <button onClick={() => { handleDelete(item.id) }} className='delete'>Delete</button>
                        </section>
                    </div>
                )
            })}
        </div>
    )
}

export default TodoApp