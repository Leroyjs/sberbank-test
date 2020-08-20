import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ModalNewTask from '../ModalNewTask';

import PropTypes from 'prop-types';

import './style.css';

export default class Сhange extends Component {
    static propTypes = {
        taskList: PropTypes.array.isRequired,
        activeTask: PropTypes.object.isRequired,
        handleSave: PropTypes.func.isRequired,
    };
    constructor() {
        super();
        this.state = {
            title: '',
            isDone: false,
            tasks: [],
            modalAdd: false,
        };
    }
    componentDidMount() {
        const { activeTask } = this.props;
        this.setState({
            id: activeTask.id,
            title: activeTask.title,
            isDone: activeTask.isDone,
            tasks: activeTask.tasks,
        });
    }
    handleCheckboxChange = (event) => {
        const target = event.target;
        const id = target.name;
        let tasks = this.state.tasks.slice();

        tasks.find((item) => item.id === id).isDone = !tasks.find(
            (item) => item.id === id
        ).isDone;
        this.setState({
            tasks,
        });
    };
    handleTitleChange = (event) => {
        const title = event.target.value;

        this.setState({
            title,
        });
    };

    handleAddTask = (newTaskBody) => {
        let tasks = this.state.tasks.slice();

        const arrayId = tasks.map((item) => +item.id);
        let id = (Math.max(...arrayId) + 1).toString();
        if (id === '-Infinity') id = '0';
        const newTask = {
            isDone: false,
            body: newTaskBody,
            id,
        };
        tasks.push(newTask);
        this.setState({
            tasks,
        });
    };
    handleChangeTask = (newTaskBody, id) => {
        let tasks = this.state.tasks.slice();
        tasks.find((item) => item.id === id).body = newTaskBody;

        this.setState({
            tasks,
        });
    };
    handleModalAdd = () => {
        const { modalAdd } = this.state;
        this.setState({
            modalAdd: !modalAdd,
        });
    };
    handleModalChange = (id) => {
        const { modalChange } = this.state;
        if (id) {
            this.setState({
                modalChange: id,
            });
        } else {
            this.setState({
                modalChange: !modalChange,
            });
        }
    };
    handleDel = (id) => {
        let tasks = this.state.tasks.slice();
        tasks = tasks.filter((item) => {
            return item !== tasks.find((item) => item.id === id);
        });

        this.setState({
            tasks,
        });
    };
    render() {
        const { title, id, tasks, modalAdd, modalChange } = this.state;
        const { handleSave } = this.props;
        return (
            <main className="change__wrapper">
                <div className="change">
                    <input
                        className="change__input"
                        type="text"
                        value={title}
                        onChange={this.handleTitleChange}
                    />
                    <ul className="change__list">
                        {tasks.map((item) => (
                            <li key={item.id} className="change__list-item">
                                <label>
                                    <input
                                        name={item.id}
                                        type="checkbox"
                                        checked={item.isDone}
                                        onChange={this.handleCheckboxChange}
                                    />
                                    {item.body}
                                </label>
                                <button
                                    className="button-pen"
                                    onClick={() =>
                                        this.handleModalChange(item.id)
                                    }
                                ></button>
                                <button
                                    className="button-x"
                                    onClick={() => this.handleDel(item.id)}
                                ></button>
                            </li>
                        ))}
                    </ul>
                    <button
                        className="change__button-add"
                        onClick={this.handleModalAdd}
                    >
                        +
                    </button>
                </div>
                {modalAdd && (
                    <ModalNewTask
                        info="Введите новую задачу"
                        handleCancel={this.handleModalAdd}
                        handleOk={this.handleAddTask}
                    ></ModalNewTask>
                )}
                {modalChange && (
                    <ModalNewTask
                        id={modalChange}
                        info="Изменить задачу"
                        handleCancel={this.handleModalChange}
                        handleOk={this.handleChangeTask}
                    ></ModalNewTask>
                )}
                <div className="buttons">
                    <Link to="/">
                        <button
                            className="buttons__accept"
                            onClick={() => handleSave({ title, tasks, id })}
                        >
                            Сохранить
                        </button>
                    </Link>
                    <Link to="/">
                        <button className="buttons__cancel">Отмена</button>
                    </Link>
                </div>
            </main>
        );
    }
}
