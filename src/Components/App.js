import React , { Component } from 'react';
import TrelloList from './TrelloList'; 
import { connect } from 'react-redux';
import TrelloActionButton from './TrelloActionButton';
import { DragDropContext } from 'react-beautiful-dnd' // 드래그앤드롭 기능
import { sort } from '../actions';

/*
만든 컴포넌트와 리덕스를 connect 를 통해 연결한다.
connect 는 컴포넌트의 props를 넣는 함수를 반환한다.
mapStateToProps 함수 : 만들어놓은 스토어의 state를 받아와서 props로 전달
*/

class App extends Component {

  // 드래그 끝나면 할일
  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    // 정해진 곳에 드래그 안한 경우
    if(!destination) {
      return; // 아무일도 일어나지 않는다.
    }
    this.props.dispatch(
      sort (
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId
      )
    );
  };

  render() {
    const { lists } = this.props;
    return (
      // props로 onDragEnd 함수 넣어서 드래그 끝나면 이 함수 실행 -> 영구적으로 움직인 카드 위치시키기 위함
      <DragDropContext onDragEnd={this.onDragEnd}>
      <div style={styles.mainContainer}> 
        <h2>Trello</h2> 
        <div style={styles.listsContainer}> 
          {lists.map(({title, cards}, id) => 
          ( <TrelloList key={id} title={title} cards={cards} listID={id}/> 
          ))} 
          <TrelloActionButton list={lists}></TrelloActionButton>
        </div>
      </div> 
      </DragDropContext>
    )
  }
}

const styles = {
  mainContainer: {
    textAlign: 'center',
    marginLeft: '10px'
  },
  listsContainer: {
    display: 'flex',
    flexdirection: 'row'
  }
};

const mapStateToProps = state => ({
  lists: state.lists
});

export default connect(mapStateToProps) (App);
