const NEW_ACTIVE_NOTE = 'NEW_ACTIVE_NOTE',
    ADD_NOTE = 'ADD_NOTE',
    DEL_NOTE = 'DEL_NOTE',
    SAVE_NOTE = 'SAVE_NOTE',
    ADD_TASK = 'ADD_TASK',
    DEL_TASK = 'DEL_TASK',
    CHANGE_CHECKBOX_TASK = 'CHANGE_CHECKBOX_TASK',
    EDIT_TASK = 'EDIT_TASK',
    EDIT_TITLE = 'EDIT_TITLE';

function newActiveNote(newActiveNoteId) {
    return {
        type: NEW_ACTIVE_NOTE,
        payload: newActiveNoteId,
    };
}

function addNote(title) {
    return {
        type: ADD_NOTE,
        payload: title,
    };
}

function delNote(id) {
    return {
        type: DEL_NOTE,
        payload: id,
    };
}
function saveNote(newNote) {
    return {
        type: SAVE_NOTE,
        payload: newNote,
    };
}

function addTask(body) {
    return {
        type: ADD_TASK,
        payload: body,
    };
}
function delTask(id) {
    return {
        type: DEL_TASK,
        payload: id,
    };
}
function editTask(changes) {
    return {
        type: EDIT_TASK,
        payload: {
            id: changes.id,
            newTaskBody: changes.newTaskBody,
        },
    };
}
function changeCheckboxTask(id) {
    return {
        type: CHANGE_CHECKBOX_TASK,
        payload: id,
    };
}
function editTitle(title) {
    return {
        type: EDIT_TITLE,
        payload: title,
    };
}
export {
    addNote,
    newActiveNote,
    delNote,
    saveNote,
    addTask,
    delTask,
    editTask,
    changeCheckboxTask,
    editTitle,
};
