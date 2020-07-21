// export * from "./listsAction";
// export * from "./cardsAction";
// export * from "./editAction";

/*
dispatch로 액션을 발생시키면
각 액션함수를 통해 파라미터에 쓴 값이 들어오게 될 것
*/
export const CONSTANTS = {
    ADD_CARD: "ADD_CARD",
    ADD_LIST: "ADD_LIST",
    EDIT_CARD: "EDIT_CARD",
    DELETE_CARD: "DELETE_CARD",
    DRAG_HAPPENED: "DRAG_HAPPENED"
};

export const sort = (
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    draggableId
) => {
    return {
        type: CONSTANTS.DRAG_HAPPENED,
        payload: {
            droppableIdStart,
            droppableIdEnd,
            droppableIndexStart,
            droppableIndexEnd,
            draggableId
        }
    }
}

export const addCard = ({listID, text}) => {
    return {
        type: CONSTANTS.ADD_CARD,
        payload: {listID, text}
    };
}
export const addList = title => {
    return {
        type: CONSTANTS.ADD_LIST,
        payload: title
    };
};
export const editCard = ({listID, cardID, text, body}) => {
    return {
        type: CONSTANTS.EDIT_CARD,
        payload: {listID, cardID, text, body}
    };
}
export const deleteCard = ({listID, cardID}) => {
    return {
        type: CONSTANTS.DELETE_CARD,
        payload: {listID, cardID}
    };
}