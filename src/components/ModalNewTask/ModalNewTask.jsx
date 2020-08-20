import React, { Component } from 'react';
import Modal from '../Modal';

import PropTypes from 'prop-types';

export default class ModalNewTask extends Component {
    static propTypes = {
        info: PropTypes.string,
        handleOk: PropTypes.func.isRequired,
        handleCancel: PropTypes.func.isRequired,
    };
    constructor() {
        super();
        this.state = {
            inputValue: '',
        };
    }
    handleInputChange = (event) => {
        const inputValue = event.target.value;
        this.setState({
            inputValue,
        });
    };
    handleSave = () => {
        const { handleOk, handleCancel, id } = this.props;
        const { inputValue } = this.state;

        handleOk(inputValue, id);
        handleCancel();
    };
    render() {
        const { handleCancel, info } = this.props;
        const { inputValue } = this.state;
        return (
            <Modal
                info={info}
                handleCancel={handleCancel}
                handleOk={this.handleSave}
            >
                <input
                    type="text"
                    onChange={this.handleInputChange}
                    value={inputValue}
                />
            </Modal>
        );
    }
}
