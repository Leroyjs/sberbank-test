import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';

import './style.css';

export default class Modal extends Component {
    static propTypes = {
        info: PropTypes.string,
        handleOk: PropTypes.func.isRequired,
        handleCancel: PropTypes.func.isRequired,
    };

    el = document.createElement('div');
    componentDidMount() {
        document.body.appendChild(this.el);
    }
    componentWillUnmount() {
        document.body.removeChild(this.el);
    }
    render() {
        const { children, handleCancel, handleOk, info } = this.props;
        return ReactDOM.createPortal(
            <div className="modal__overlay">
                <div className="modal">
                    <div className="modal__inner">
                        <h6 className="modal__title">{info}</h6>
                        {children}
                        <div className="buttons">
                            <button
                                className="buttons__accept"
                                onClick={handleOk}
                            >
                                Подтвердить
                            </button>
                            <button
                                className="buttons__cancel"
                                onClick={() => handleCancel()}
                            >
                                Отменить
                            </button>
                        </div>
                    </div>
                </div>
            </div>,
            this.el
        );
    }
}
