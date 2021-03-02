import axios from 'axios'
import React, { useState, useEffect } from 'react'
import addSvg from "../../../assets/img/add.svg"

import './AddTaskForm.scss'


export default function AddTaskForm({ onAddTask, list }) {
    const [inputValue, setInputValue] = useState('')
    const [visibleForm, setVisibleForm] = useState(false)
    const [isLoading, setIsLoading] = useState('')


    const toggleFormVisible = () => {
        setVisibleForm(!visibleForm)
        setInputValue('')
    }

    const addTask = () => {
        const obj = {
            listId: list.id,
            text: inputValue,
            completed: false
        }
        setIsLoading(true)
        axios.post('http://localhost:3001/tasks/', obj).then(({ data }) => {

            onAddTask(list.id, data)
            toggleFormVisible()

        })
            .catch(() => alert('Error while adding task'))
            .finally(() => {
                setIsLoading(false)
            })

    }


    return (
        <div className="tasks__form">
            {!visibleForm ?
                <div className="tasks__form_new" onClick={toggleFormVisible}>
                    <img src={addSvg} alt="Add" />
                    <span>New task</span>
                </div> :
                <>
                    <input value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        className="field" type="text" placeholder="Add Task" />
                    <div className="tasks__form_block">
                        <button disabled={isLoading} className="button" onClick={addTask}>{isLoading ? '...Loading' : "Add Task"}</button>
                        <button className="button button--gray" onClick={toggleFormVisible}>Cansel</button>
                    </div>
                </>
            }

        </div>

    )
}
