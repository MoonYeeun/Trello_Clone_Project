// export * from "./listsAction";
// export * from "./cardsAction";
// export * from "./editAction";

export const CONSTANTS = {
    ADD_CARD: "ADD_CARD",
    ADD_LIST: "ADD_LIST",
    EDIT_CARD: "EDIT_CARD",
    DELETE_CARD: "DELETE_CARD"
};

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
export const editCard = ({listID, cardID, cardText}) => {
    return {
        type: CONSTANTS.EDIT_CARD,
        payload: {listID, cardID, cardText}
    };
}
export const deleteCard = ({listID, cardID}) => {
    return {
        type: CONSTANTS.DELETE_CARD,
        payload: {listID, cardID}
    };
}