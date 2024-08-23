import React from 'react'
import SideNav from '../../adminComponent/SideNav'
import TopNav from '../../adminComponent/TopNav'



const ViewSong = () => {
  return (
    <div className='flex h-screen bg-[#0d0d0d] text-white'>
        <SideNav/>
        <div className='flex flex-col flex-grow'>
            <TopNav/>
            <div>
                
            </div>
        </div>
    </div>
  )
}

export default ViewSong