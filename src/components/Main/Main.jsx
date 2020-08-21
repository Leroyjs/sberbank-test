import React, { Component } from 'react';
import Note from '../Note';
import Modal from '../Modal';
import ModalNewTask from '../ModalNewTask';
import { newActiveNote, addNote, delNote } from '../../redux/actions.js';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import './style.css';

class Main extends Component {
    static propTypes = {
        taskList: PropTypes.array.isRequired,
        changeActiveNote: PropTypes.func.isRequired,
        delNote: PropTypes.func.isRequired,
        addNewNote: PropTypes.func.isRequired,
    };
    constructor() {
        super();
        this.state = {
            modalDel: false,
            modalAdd: false,
        };
    }
    handleModalDel = (id) => {
        const { modalDel } = this.state;
        if (id) {
            this.setState({
                modalDel: id,
            });
        } else {
            this.setState({
                modalDel: !modalDel,
            });
        }
    };
    handleModalAdd = () => {
        const { modalAdd } = this.state;

        this.setState({
            modalAdd: !modalAdd,
        });
    };
    handleDel = (id) => {
        const { delNote } = this.props;
        delNote(id);
    };
    handleDelClose = (id) => {
        this.handleDel(id);
        this.handleModalDel();
    };
    handleActive = (id) => {
        const { changeActiveNote } = this.props;
        changeActiveNote(id);
    };
    handleAdd = (newNoteTitle) => {
        const { addNewNote } = this.props;
        addNewNote(newNoteTitle);
    };
    render() {
        const even = (element) => !element.isDone;
        const { taskList } = this.props;
        const { modalDel, modalAdd } = this.state;
        return (
            <main className="main__wrapper">
                <ul className="main__note-list">
                    {!taskList.some(even) && (
                        <span>У вас сейчас нет активных заметок.</span>
                    )}
                    {taskList.map((item) => (
                        <div key={item.id + '-active'}>
                            <Note
                                handleActive={this.handleActive}
                                handleModalDel={this.handleModalDel}
                                item={item}
                            ></Note>
                        </div>
                    ))}
                </ul>
                <button
                    className="main__add-button"
                    onClick={this.handleModalAdd}
                >
                    +
                </button>

                {modalDel && (
                    <Modal
                        info="Удалить запись?"
                        handleOk={() => this.handleDelClose(modalDel)}
                        handleCancel={() => this.handleModalDel()}
                    ></Modal>
                )}
                {modalAdd && (
                    <ModalNewTask
                        info="Введите новую заметку"
                        handleOk={this.handleAdd}
                        handleCancel={() => this.handleModalAdd()}
                    ></ModalNewTask>
                )}
            </main>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        taskList: state.taskList,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        changeActiveNote: (newActiveNoteId) => {
            dispatch(newActiveNote(newActiveNoteId));
        },
        delNote: (id) => {
            dispatch(delNote(id));
        },
        addNewNote: (newActiveNoteId) => {
            dispatch(addNote(newActiveNoteId));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
