import React from 'react';
import TrelloCard from './TrelloCard';
import TrelloActionButton from './TrelloActionButton';
import { Droppable } from 'react-beautiful-dnd'; 

const TrelloList = ({title, cards, listID}) => {
    return (
        // index id에 대한 에러 발생 시 droppableId 가 문자열로 들어가고 있는지 확인
        <Droppable droppableId={String(listID)}>
            {provided => (
                <div {...provided.droppableProps} ref={provided.innerRef} style={style.container}> 
                    <h4>{title}</h4> 
                    {cards.map(({id, cardTitle, cardBody}, index) => (
                        <TrelloCard key={id} index={index} listID={listID} cardID={id} cardTitle={cardTitle} cardBody={cardBody}></TrelloCard>
                    ))}
                    {provided.placeholder}
                    <TrelloActionButton listID={listID}></TrelloActionButton>
                </div>
            )}
        </Droppable> 
    ); 
}

const style = { 
    container: { 
        backgroundColor: '#dfe3e6', 
        borderRadius: 3, 
        width: 300, 
        padding: 8, 
        marginRight: 8 
    } 
};

export default TrelloList;

