import React, { Component } from 'react';
import Note from '../Note';
import Modal from '../Modal';
import ModalNewTask from '../ModalNewTask';

import PropTypes from 'prop-types';

import './style.css';

export default class Main extends Component {
    static propTypes = {
        taskList: PropTypes.array.isRequired,
        handleActive: PropTypes.func.isRequired,
        handleDel: PropTypes.func.isRequired,
        handleAdd: PropTypes.func.isRequired,
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
    handleDelClose = (id) => {
        const { handleDel } = this.props;
        handleDel(id);
        this.handleModalDel();
    };
    render() {
        const even = (element) => !element.isDone;
        const { taskList, handleActive, handleAdd } = this.props;
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
                                handleActive={handleActive}
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
                        handleOk={handleAdd}
                        handleCancel={() => this.handleModalAdd()}
                    ></ModalNewTask>
                )}
            </main>
        );
    }
}
