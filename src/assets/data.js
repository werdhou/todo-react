import listIcon from './img/list.svg'
import addIcon from './img/add.svg'


    let allTasks = [
        {
            icon: listIcon,
            name: 'All Tasks',
        }
    ]
    let data = [
        {
            color: "green",
            icon: null,
            name: 'Purchases'
        },
        {
            color: "blue",
            icon: null,
            name: 'Frontend',
            active: true
        },
        {
            color: "pink",
            icon: null,
            name: 'Watch video on Youtube'
        }
    ]
    let addList = [{
        className: 'list__add-list',
        color: "blue",
        icon: addIcon,
        name: 'Add List',
    }]


export {allTasks, data, addList}