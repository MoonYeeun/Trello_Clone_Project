import { CONSTANTS } from "../actions";
/*
listID, cardID 값을 통해 어느 TrelloList Card 수정할 지 확인
*/
export const editCard = ({listID, cardID, cardText}) => {
    return {
        type: CONSTANTS.EDIT_CARD,
        payload: {listID, cardID, cardText}
    };
}