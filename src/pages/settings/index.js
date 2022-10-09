import React from 'react'
import Sidebar from '../../components/sidebar';

const Settings = () => {
  return (
    <div className="py-8 pl-7 pr-6 flex gap-x-11 h-auto">
      <Sidebar activePage={"settings"} />
      <div className="w-4/5">Main Content</div>
    </div>
  );
}

export default Settings