import axios from 'axios';
import React from 'react'
import editSvg from "../../assets/img/edit.svg";

import './Tasks.scss'
import AddTaskForm from './AddTaskForm/AddTaskForm';
import Task from './Task';
import { Link } from 'react-router-dom';

export default function Tasks({ list, onEditTitle, onAdd, withoutEmpty, onRemoveTask, onEditTask, onCompleteTask }) {

    const editTitle = () => {
        let newTitle = window.prompt('Введите новый загаловок', list.name)
        if (newTitle) {
            onEditTitle(list.id, newTitle)
            axios
                .patch('http://localhost:3001/lists/' + list.id, {
                    name: newTitle
                }).catch(() => {
                    alert('Не удалось обновить название списка')
                })
        }
    }

    return (
        <div className="tasks">
            <Link to={`/lists/${list.id}`}>
            <h2 style={{ color: list.color.hex }}
                className="tasks__title">
                {list.name}
                <img onClick={editTitle} src={editSvg} alt="edit title"></img>
            </h2>
            </Link>
            <div className="tasks__items">
                {!withoutEmpty && list.tasks && !list.tasks.length && <h2>Задачи отсутствуют</h2>}
                {
                    list.tasks && list.tasks.map((item, index) => (
                        <Task key={item.id + index}
                            {...item}
                            list={list}
                            onRemove={onRemoveTask}
                            onEdit={onEditTask}
                            onComplete={onCompleteTask} />
                    )
                    )
                }
                <AddTaskForm key={list.id} list={list} onAddTask={onAdd} />
            </div>
        </div>
    )
}
