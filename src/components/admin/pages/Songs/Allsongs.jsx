import React from 'react'
import TopNav from '../../TopNav'
import SideNav from '../../SideNav'

const Allsongs = () => {
  return (
    <div className="flex h-screen bg-[#0d0d0d] text-white">
    <SideNav />
    <div className="flex flex-col flex-grow">
      <TopNav />
      <main className="flex-grow p-6">
        {/* <Dashboard /> */}
      </main>
    </div>
  </div>
  )
}

export default Allsongs