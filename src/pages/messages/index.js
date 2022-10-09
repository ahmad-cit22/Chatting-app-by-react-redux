import React from 'react'
import Sidebar from '../../components/sidebar'

const Messages = () => {
  return (
     <div className="py-9 pl-8 pr-6 flex gap-x-11 h-auto">
      <Sidebar activePage={'messages'}/>
      <div className="w-4/5">Main Content</div>
    </div>
  )
}

export default Messages