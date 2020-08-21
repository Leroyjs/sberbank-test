import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ModalNewTask from '../ModalNewTask';
import { connect } from 'react-redux';
import {
    addTask,
    delTask,
    editTask,
    changeCheckboxTask,
    saveNote,
    editTitle,
} from '../../redux/actions.js';

import PropTypes from 'prop-types';

import './style.css';

class Сhange extends Component {
    static propTypes = {
        tasks: PropTypes.array.isRequired,
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        addTask: PropTypes.func.isRequired,
        saveNote: PropTypes.func.isRequired,
        editTask: PropTypes.func.isRequired,
        delTask: PropTypes.func.isRequired,
        changeCheckboxTask: PropTypes.func.isRequired,
        editTitle: PropTypes.func.isRequired,
    };
    constructor() {
        super();
        this.state = {
            modalAdd: false,
        };
    }

    handleCheckboxChange = (event) => {
        const { changeCheckboxTask } = this.props;
        const target = event.target;
        const id = target.name;
        changeCheckboxTask(id);
    };
    handleTitleChange = (event) => {
        const title = event.target.value;
        const { editTitle } = this.props;
        editTitle(title);
    };
    handleSave = (newNote) => {
        const { saveNote } = this.props;
        saveNote(newNote);
    };

    handleAddTask = (newTaskBody) => {
        const { addTask } = this.props;
        addTask(newTaskBody);
    };
    handleEditTask = (newTaskBody, id) => {
        const { editTask } = this.props;
        editTask({ newTaskBody, id });
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
        const { delTask } = this.props;
        delTask(id);
    };
    render() {
        const { modalAdd, modalChange } = this.state;
        const { title, id, tasks } = this.props;
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
                        handleOk={this.handleEditTask}
                    ></ModalNewTask>
                )}
                <div className="buttons">
                    <Link to="/">
                        <button
                            className="buttons__accept"
                            onClick={() =>
                                this.handleSave({ title, tasks, id })
                            }
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

const mapStateToProps = (state) => {
    const { title, id, tasks } = state.activeTask;
    return {
        title,
        id,
        tasks,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        addTask: (body) => {
            dispatch(addTask(body));
        },
        saveNote: (body) => {
            dispatch(saveNote(body));
        },
        editTask: (changes) => {
            dispatch(editTask(changes));
        },
        delTask: (id) => {
            dispatch(delTask(id));
        },
        changeCheckboxTask: (id) => {
            dispatch(changeCheckboxTask(id));
        },
        editTitle: (title) => {
            dispatch(editTitle(title));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Сhange);
