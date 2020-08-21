const storage = localStorage;
let initialState;
if (!storage.initialState) {
    initialState = {
        activeTask: {
            id: '',
            title: '',
            tasks: [],
        },
        taskList: [],
    };
} else {
    initialState = JSON.parse(storage.initialState);
}

function todoApp(state = initialState, action) {
    let taskList = state.taskList.slice();
    let activeTask = Object.assign({}, state.activeTask);
    let tasksList = activeTask.tasks.slice();
    switch (action.type) {
        case 'NEW_ACTIVE_NOTE':
            const activeTask = taskList.find(
                (item) => item.id === action.payload
            );
            const { id, title, tasks } = activeTask;
            return Object.assign({}, state, {
                activeTask: {
                    id,
                    title,
                    tasks,
                },
            });
        case 'ADD_NOTE':
            const arrayId = taskList.map((item) => +item.id);
            let newId = (Math.max(...arrayId) + 1).toString();

            if (newId === '-Infinity') newId = '0';

            const newNote = {
                title: action.payload,
                id: newId,
                tasks: [],
            };
            taskList.push(newNote);
            return Object.assign({}, state, {
                taskList,
            });

        case 'DEL_NOTE':
            taskList = taskList.filter((item) => {
                return (
                    item !== taskList.find((item) => item.id === action.payload)
                );
            });

            return Object.assign({}, state, {
                taskList,
            });
        case 'SAVE_NOTE':
            taskList.find((item) => item.id === action.payload.id).title =
                action.payload.title;
            taskList.find((item) => item.id === action.payload.id).tasks =
                action.payload.tasks;
            return Object.assign({}, state, {
                activeTask: {
                    ...state.activeTask,
                    tasks: tasksList,
                },
            });

        case 'ADD_TASK':
            const arrayIdTask = tasksList.map((item) => +item.id);
            let newIdTask = (Math.max(...arrayIdTask) + 1).toString();
            if (newIdTask === '-Infinity') newIdTask = '0';
            const newTask = {
                isDone: false,
                body: action.payload,
                id: newIdTask,
            };
            tasksList.push(newTask);
            return Object.assign({}, state, {
                activeTask: {
                    ...state.activeTask,
                    tasks: tasksList,
                },
            });
        case 'DEL_TASK':
            tasksList = tasksList.filter((item) => {
                return (
                    item !==
                    tasksList.find((item) => item.id === action.payload)
                );
            });
            return Object.assign({}, state, {
                activeTask: {
                    ...state.activeTask,
                    tasks: tasksList,
                },
            });
        case 'EDIT_TASK':
            tasksList.find((item) => item.id === action.payload.id).body =
                action.payload.newTaskBody;

            return Object.assign({}, state, {
                activeTask: {
                    ...state.activeTask,
                    tasks: tasksList,
                },
            });
        case 'CHANGE_CHECKBOX_TASK':
            tasksList.find(
                (item) => item.id === action.payload
            ).isDone = !tasksList.find((item) => item.id === action.payload)
                .isDone;
            return Object.assign({}, state, {
                activeTask: {
                    ...state.activeTask,
                    tasks: tasksList,
                },
            });
        case 'EDIT_TITLE':
            return Object.assign({}, state, {
                activeTask: {
                    ...state.activeTask,
                    title: action.payload,
                },
            });
        default:
            return state;
    }
}

export default todoApp;
