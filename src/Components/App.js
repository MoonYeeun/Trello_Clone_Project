import React from 'react';
import './App.css';
import TrelloList from './TrelloList'; 
import { connect } from 'react-redux';
import TrelloActionButton from './TrelloActionButton';

/*
만든 컴포넌트와 리덕스를 connect 를 통해 연결한다.
connect 는 컴포넌트의 props를 넣는 함수를 반환한다.
mapStateToProps 함수 : 만들어놓은 스토어의 state를 받아와서 props로 전달
*/

function App({ lists }) {
  return ( 
    <div className="App"> 
      <h2>Trello</h2> 
      <div style={styles.listsContainer}> 
        {lists.map(({title, cards}, id) => 
        ( <TrelloList key={id} title={title} cards={cards} listID={id}/> 
        ))} 
        <TrelloActionButton list={lists}></TrelloActionButton>
      </div>
    </div> 
  );
}

const styles = {
  listsContainer: {
    display: 'flex',
    flexdirection: 'row'
  }
};

const mapStateToProps = state => ({
  lists: state.lists
});

export default connect(mapStateToProps) (App);
