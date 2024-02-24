import React, { useEffect, useState } from 'react'
import SideBar from './SideBar';
import { useSelector } from 'react-redux';
import Column from './Column';
import EmptyBoard from '../components/EmptyBoard'
import AddEditBoardModal from '../modals/AddEditBoardModal';

const Center = ({boardModalopen,setboardModalopen}) => {
  const [windowsize,setwindowsize] = useState(
    [
      Window.innerWidth,
      Window.innerHeight,
    ]
  );
  const [isSideBarOpen,setisSideBarOpen]=useState(false)
  const boards=useSelector((state)=>state.boards)
  const board = boards.find((board)=> board.isActive === true)
  const columns = board.columns
  useEffect(()=>{
    const handleWindowResize=()=>{
      setwindowsize([window.innerWidth,window.innerHeight])
    }
    window.addEventListener('resize', handleWindowResize)
    return()=>{
      window.removeEventListener('resize',handleWindowResize)
    }
  })

  return (
    <div
    className={
      windowsize[0] >= 760 && isSideBarOpen ? 'bg-[#f4f7fd] scrollbar-hide h-screen flex dark:bg-[#20212c] overflow-x-scroll gap-6 ml-[261px]'
      :'bg-[#f4f7fd] scrollbar-hide h-screen flex dark:bg-[#20212c] overflow-x-scroll gap-6'
    }
    >
      {
        windowsize[0] >= 760 && (
          <SideBar isSideBarOpen={isSideBarOpen} setisSideBarOpen={setisSideBarOpen}/>
        )
      }
      {/* columns Selections */}
      {
        columns.length > 0 ? (
          <>
          {
            columns.map((col,ind)=>(
              <Column key={ind} colIndex={ind}/>
            ))
          }
          <div
          onClick={()=>{
            setboardModalopen(true);
          }}
          className='h-screen dark:bg-[#2b2c3740] flex justify-center items-center font-bold text-2xl hover:text-[#635fc7] transition duration-300 cursor-pointer bg-[#e9effa] scrollbar-hide mb-2 mx-5 pt-[90px] min--w-[280px] text-[#828fa3] mt-[135px] rounded-lg'
          >
            + New Column 
          </div>
          </>
        )
          :
          <>
          <EmptyBoard type='edit'/>
          </>
      }
      {
        boardModalopen && (
          <AddEditBoardModal
          type='edit'
          setIsBoardModalOpen={setboardModalopen}
          />
        )
      }
      
    </div>
  )
}

export default Center
