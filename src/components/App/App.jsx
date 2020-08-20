import React, { Component } from 'react';
import Сhange from '../Сhange';
import Main from '../Main';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            activeTask: {
                id: '',
                title: '',
                tasks: [],
            },
            taskList: [],
        };
    }
    componentDidMount() {
        const storage = localStorage;
        if (!storage.taskList) {
            storage.taskList = '[]';
        }
        let taskList = JSON.parse(storage.taskList);

        this.setState({ taskList });
    }
    handleActive = (id) => {
        let taskList = this.state.taskList.slice();
        const activeTask = taskList.find((item) => item.id === id);
        this.setState({
            activeTask,
        });
    };
    handleSave = (newNote) => {
        let taskList = this.state.taskList.slice();

        taskList.find((item) => item.id === newNote.id).title = newNote.title;
        taskList.find((item) => item.id === newNote.id).tasks = newNote.tasks;

        this.setState({ taskList }, () => this.localStorageSave(taskList));
    };
    handleDel = (id) => {
        let taskList = this.state.taskList.slice();
        taskList = taskList.filter((item) => {
            return item !== taskList.find((item) => item.id === id);
        });
        this.setState(
            {
                taskList,
            },
            () => this.localStorageSave(taskList)
        );
    };
    handleAdd = (newNoteTitle) => {
        let taskList = this.state.taskList.slice();

        const arrayId = taskList.map((item) => +item.id);
        let id = (Math.max(...arrayId) + 1).toString();

        if (id === '-Infinity') id = '0';

        const newTask = {
            title: newNoteTitle,
            id,
            tasks: [],
        };
        taskList.push(newTask);
        this.setState(
            {
                taskList,
            },
            () => this.localStorageSave(taskList)
        );
    };
    localStorageSave = (taskList) => {
        const storage = localStorage;
        storage.taskList = JSON.stringify(taskList);
    };
    render() {
        const { taskList, activeTask } = this.state;
        return (
            <BrowserRouter>
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Main
                                handleAdd={this.handleAdd}
                                handleDel={this.handleDel}
                                handleActive={this.handleActive}
                                taskList={taskList}
                            />
                        )}
                    />
                    <Route
                        path="/change"
                        render={() => (
                            <Сhange
                                taskList={taskList}
                                activeTask={activeTask}
                                handleSave={this.handleSave}
                            />
                        )}
                    />
                    <Route render={() => <Main taskList={taskList} />} />
                </Switch>
            </BrowserRouter>
        );
    }
}
