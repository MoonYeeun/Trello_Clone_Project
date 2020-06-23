import React from 'react';
import TrelloCard from './TrelloCard';
import TrelloActionButton from './TrelloActionButton';

const TrelloList = ({title, cards, listID}) => {
    return ( 
        <div style={style.container}> 
            <h4>{title}</h4> 
            {cards.map(({id, text, body}) => (
                <TrelloCard key={id} listID={listID} cardID={id} text={text} body={body}></TrelloCard>
            ))}
            <TrelloActionButton listID={listID}></TrelloActionButton>
        </div>
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

