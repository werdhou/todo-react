import React from 'react'
import classNames from 'classnames'

import './List.scss'
import Badge from '../Badge/Badge'
import removeSvg from '../../assets/img/remove.svg'
import axios from 'axios'


function List(props) {



    const removeItem = (item) => {
        if (window.confirm('Are you sure you want to delete this list?')) {
            axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
                props.onRemove(item.id)
            })

        }
    }
    return (
        <ul onClick={props.onClick}
            className="list">
            {
                props.items.map((item, id) => {
                    return (
                        <li key={id}
                            className={classNames(item.className, {
                                'active': (item.active
                                    ? item.active
                                    : props.activeItem && props.activeItem.id === item.id)
                            })}
                            onClick={props.onClickItem ? () => props.onClickItem(item) : null}>
                            <i>
                                {item.icon
                                    ? <img src={item.icon} alt='List item' />
                                    : <Badge color={item.color.name} />
                                }

                            </i>
                            <span className={"item_name"} title={item.name}>
                                {item.name}
                                {item.tasks && `  (${item.tasks.length})`}
                            </span>
                            {props.isRemovable &&
                                <img onClick={() => removeItem(item)} className="list__remove-icon" src={removeSvg} alt="remove list" />
                            }
                        </li>
                    )
                }

                )
            }
        </ul>
    )
}

export default List