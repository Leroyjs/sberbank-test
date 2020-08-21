import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import './style.css';

Note.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        tasks: PropTypes.array,
    }),
    handleActive: PropTypes.func,
    handleModalDel: PropTypes.func,
};

export default function Note(props) {
    const { item, handleActive, handleModalDel } = props;
    return (
        <li className="note">
            <Link onClick={() => handleActive(item.id)} to="/change">
                <h3 className="note__title">{item.title}</h3>
                <ul className="note__list">
                    {item.tasks.map((task) => (
                        <li
                            className={
                                'note__task ' +
                                (task.isDone && 'note__task_done')
                            }
                            key={task.id + '-task'}
                        >
                            <span>{task.body}</span>
                            <br />
                        </li>
                    ))}
                </ul>
            </Link>
            <button className="note__x" onClick={() => handleModalDel(item.id)}>
                X
            </button>
        </li>
    );
}
