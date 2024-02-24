import Header from "./components/Header";
import Center from "./components/Center";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "./redux/boardSlice";
import EmptyBoard from "./components/EmptyBoard";

function App() {
  const [boardModalopen, setboardModalopen] = useState(false);
  const dispatch = useDispatch()
  const boards = useSelector((state)=>state.boards)
  const activeBoard = boards.find(board => board.isActive)
  if(!activeBoard && boards.length >0){
    dispatch (boardsSlice.actions.setBoardActive({index : 0}))
  }
  return (
    <div 
    className="overflow-hidden overflow-x-scroll"
    >
      <>
      {
        boards.length > 0?
        <>
        {/* Header Section */}
      
      <Header boardModalopen={boardModalopen} setIsBoardModalOpen={setboardModalopen}/>
      
      {/* Center Section */}
      
      <Center boardModalopen={boardModalopen} setboardModalopen={setboardModalopen}/>
        </>
        :
        <EmptyBoard type='add'/>
      }
      
      </>
    </div>
  );
}

export default App;
