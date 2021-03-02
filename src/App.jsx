import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { List, AddButtonList, Tasks } from './components/index'

import { allTasks } from './assets/data'
import { Route, useHistory, useLocation } from 'react-router'


function App() {

  const [lists, setLists] = useState(null)
  const [colors, setColors] = useState(null)
  const [activeItem, setActiveItem] = useState(null)
  let history = useHistory()
  let location = useLocation()

  React.useEffect(() => {
    const listId = location.pathname.split('lists/')[1]
    if (lists) {
      const list = lists.find(list => list.id === Number(listId))
      setActiveItem(list)
    }
  }, [lists, location])


  useEffect(() => {
    axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(({ data }) => {
      setLists(data)
    })
    axios.get('http://localhost:3001/colors').then(({ data }) => {
      setColors(data)
    })
  }, [])

  const onAddList = (addNewListItem) => {
    const newList = [...lists, addNewListItem]
    setLists(newList)
  }
  const onAddTask = (listId, taskObj) => {
    const newList = lists.map(item => {
      if (item.id === listId) {
        item.tasks = [...item.tasks, taskObj]
      }
      return item
    })
    setLists(newList)
  }

  const onAddTitle = (id, title) => {
    const newTitle = lists.map(item => {
      if (item.id === id) {
        item.name = title
      }
      return item
    })

    setLists(newTitle)
  }

  const onRemoveTask = (listId, taskId) => {
    if (window.confirm('Are you sure you want to delete this task')) {
      const newList = lists.map(item => {
        if (item.id === listId) {
          item.tasks = item.tasks.filter(task => task.id !== taskId)
        }
        return item
      })
      setLists(newList)
      axios
        .delete('http://localhost:3001/tasks/' + taskId)
    }
  }

  const onEditTask = (listId, taskObj) => {
    const newTaskText = window.prompt("Text task", taskObj.text)

    if (!newTaskText) {
      return
    }
    const newList = lists.map(list => {
      if (list.id === listId) {
        list.tasks = list.tasks.map(task => {
          if (task.id === taskObj.id) {
            task.text = newTaskText
          }
          return task
        })
      }
      return list
    })
    setLists(newList)
    axios
      .patch('http://localhost:3001/tasks/' + taskObj.id, {
        text: newTaskText
      })

  }

  const onCompleteTask = (listId, taskId, completed) => {

    const newList = lists.map(list => {
      if (list.id === listId) {
        list.tasks = list.tasks.map(task => {
          if (task.id === taskId) {
            task.completed = completed
          }
          return task
        })
      }
      return list
    })
    setLists(newList)
    axios
      .patch('http://localhost:3001/tasks/' + taskId, {
        completed
      })
  }
  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List items={allTasks}
          onClickItem={list => {
            history.push(`/`)
          }} />
        {lists ? (
          <List items={lists}
            isRemovable
            onRemove={(id) => {
              const newList = lists.filter(item => item.id !== id)
              setLists(newList)
            }}
            onClickItem={list => {
              history.push(`/lists/${list.id}`)
            }}
            activeItem={activeItem}
            key={lists.id} />
        ) : (
            '...Loading'
          )}
        {colors ? (
          <AddButtonList onAdd={onAddList} colors={colors} />
        ) : (
            ' '
          )}

      </div>
      <div className="todo__tasks">
        <Route exact path="/">
          {lists &&
            lists.map(list => <Tasks
              key={list.id}
              list={list}
              onEditTitle={onAddTitle}
              onAdd={onAddTask}
              withoutEmpty
              onRemoveTask={onRemoveTask}
              onEditTask={onEditTask}
              onCompleteTask={onCompleteTask} />)
          }
        </Route>
        <Route path="/lists/:id">
          {lists && activeItem &&
            <Tasks list={activeItem}
              onEditTitle={onAddTitle}
              onAdd={onAddTask}
              onRemoveTask={onRemoveTask}
              onEditTask={onEditTask}
              onCompleteTask={onCompleteTask} />}
        </Route>
      </div>
    </div>
  );
}

export default App;
