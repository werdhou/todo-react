import React, { useState, useEffect } from 'react'
import List from '../List/List'
import { addList } from '../../assets/data'
import axios from 'axios'
import Badge from '../Badge/Badge'


import './AddButtonList.scss'

import closeSvg from '../../assets/img/close.svg'

const AddButtonList = ({ colors, onAdd }) => {

    const [visiblePopup, setVisiblePopup] = useState(false)
    const [selectedColor, selectColor] = useState(1)
    const [inputValue, setInputValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (Array.isArray(colors)) { selectColor(colors[0].id) }
    }, [colors])

    const addListBtn = () => onClose()
    const onClose = () => {
        setInputValue('')
        setVisiblePopup(!visiblePopup)
        selectColor(colors[0].id)
    }

    let addListData = (e) => {
        if (!inputValue) {
            alert('Введите название списка')
            return
        }
        setIsLoading(true)
        axios
            .post('http://localhost:3001/lists', {
                "name": inputValue,
                "colorId": selectedColor
            }).then(({ data }) => {
                const color = colors.filter(c => c.id === selectedColor)[0]
                const listObj = { ...data, color, tasks: [] }
                onAdd(listObj)
                onClose()
            }).finally(()=> {
                setIsLoading(false)
            })
    }

    return (
        <div className="add-list">
            <List items={addList}
                onClick={addListBtn} />
            {visiblePopup && (
                <div className="add-list__popup">
                    <img src={closeSvg} className="add-list__popup-close-btn" alt="close button" onClick={addListBtn} />
                    <input value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        className="field" type="text" placeholder="Add List Name" />
                    <div className="add-list__popup-colors">
                        {
                            colors.map(color => (
                                <Badge onClick={() => {
                                    selectColor(color.id)
                                }}
                                    key={color.id} color={color.name}
                                    className={selectedColor === color.id && 'active'} />
                            ))
                        }
                    </div>
                    <button onClick={addListData} className="add-list__button" disabled={isLoading}>{isLoading ? 'List is added...' : "Add"}</button>
                </div>)}
        </div>
    )
}

export default AddButtonList