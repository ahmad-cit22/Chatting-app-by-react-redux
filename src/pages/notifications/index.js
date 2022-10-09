import React from 'react'
import Sidebar from '../../components/sidebar';

const Notifications = () => {
  return (
    <div className="py-8 pl-7 pr-6 flex gap-x-11 h-auto">
      <Sidebar activePage={"notifications"} />
      <div className="w-4/5">Notifications Page</div>
    </div>
  );
}

export default Notifications