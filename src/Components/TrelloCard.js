import React, { useState } from 'react'; 
import Card from '@material-ui/core/Card'; 
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import Textarea from 'react-textarea-autosize'
import Typography from '@material-ui/core/Typography'; 
import CardContent from '@material-ui/core/CardContent';
import '../css/TrelloCard.css';
import TodoModal from './TodoModal';
import Modal from './Modal';
import { editCard, deleteCard } from '../actions'
import { useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';

const TrelloCard = ({ index, listID, cardID, cardTitle, cardBody }) => {
    const [modal, setModal] = useState(false); 
    const [isEdit, setEdit] = useState(false); 
    const [text, setUpdate] = useState(cardTitle); 
    const dispatch = useDispatch()

    const handleModal = () => {
        setModal(!modal)
    }

    const handleEditCard = (text, body) => {
        console.log(text + " " + body);
        if(text) {
            dispatch(editCard({listID, cardID, text, body}))
            setEdit(false)
        }
        return;
    }

    // 수정 모드  
    const editMode = () => {
        const handleTitleUpdate = ({target}) => {
            setUpdate(target.value)
        }

        return ( 
            <div> 
                <Card className="Card"> 
                    <Textarea className="Textarea" placeholder={text} 
                    autoFocus value={text}
                    onChange={handleTitleUpdate}/> 
                </Card> 
                <div className="formButtonGroup"> 
                    <Button style={styles.Button} variant="contained"
                    onClick={() => handleEditCard(text, cardBody)}>
                        SAVE
                    </Button> 
                    <Icon onClick={() => {setEdit(false)}}>close</Icon> 
                </div> 
            </div>
        );
    } 
    // 읽기 모드 
    const readMode = () => {
        const handleDeleteCard = () => {
            dispatch(deleteCard({listID, cardID}))
        }

        return (
            // Drag 가능하도록 Draggable 컨테이너로 감싸준다.
            // dragHandleProps : 드래그가 가능한 위치 지정(마우스커서로 어디를 집어야 하는지 지정)
            <Draggable draggableId={String(cardID)} index={index}>
                {provided => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <Card className="CardContainer">
                            <div className="todo-item">
                                <div className="remove" onClick={() => handleDeleteCard()}>&times;</div>
                                <CardContent className="todo-text" onClick={() => handleModal()}>
                                    <Typography gutterBottom>{cardTitle}</Typography>
                                </CardContent>
                                {
                                    modal && (
                                        <Modal>
                                            <TodoModal 
                                                handleModal={handleModal}
                                                handleEditCard={handleEditCard} 
                                                cardTitle={cardTitle} 
                                                cardBody={cardBody}></TodoModal>
                                        </Modal>
                                    )
                                }
                                <div className="update" onClick={() => {setEdit(true)}}>&#9998;</div> 
                            </div>
                        </Card>
                    </div>
                )}
            </Draggable>
        );
    }

    return (
        isEdit === false ? readMode() : editMode()
    )
}

const styles = { 
    Button: {
        color:"white", 
        backgroundColor: "#5aac44",
        marginBottom: 10
    }
}

export default TrelloCard;