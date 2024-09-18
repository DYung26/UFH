// import { listeners } from 'process';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };

  return (
    <div className="flex h-full">
      <div className={`bg-white text-black flex flex-col ${isOpen ? 'w-64' : 'w-20'}
	    transition-width duration-300`} style={{ height: 'calc(100vh - 64px)' }}>
        <div className="flex-shrink-0">
          <button onClick={toggleSidebar} className="mb-4">
            {isOpen ? '<' : '>'}
          </button>
	</div>
        <hr className="border-gray-300 w-full"/>
        <div className="
	flex-grow py-1 overflow-y-auto scrollbar-track-gray-600 scrollbar-thumb-gray-300">
          <nav className={isOpen ? 'block' : 'hidden'}>
            <ul
              className="space-y-1">
              {[
	        { name: 'Home', path: '/UFH'},
	        { name: 'Dashboard', path: '/UFH/dashboard' },
	        { name: 'Accounts', path: '/UFH'},
	        { name: 'Transactions', path: '/'},
	        { name: 'About', path: '/' },
	        { name: 'y', path: '/' },
	        { name: 'z', path: '/' },
	        { name: 'Analytics', path: '/' },
	        { name: 'Profile', path: '/' },
	        { name: 'Settings', path: '/' },
	        { name: 'Logout', path: '/' },
	        { name: 'a', path: '/' },
	        { name: 'b', path: '/' },
	        { name: 'c', path: '/' }
	      ].map(item => (
	        <li
                  key={item.name}
	          className={`sidebar-item ${activeItem === item.name ? 'bg-gray-200' : ''}
			  py-2 px-2 w-full`}
	          onClick={() => handleItemClick(item.name)}
	        >
	          <Link to={item.path} className="block w-full">
		    {item.name}
	          </Link>
	        </li>
	      ))}
	    </ul>
          </nav>
        </div>
        <hr className="border-gray-300 w-full"/>
        <div className="p-0">
	  <nav className={isOpen ? 'block' : 'hidden'}>
	    <ul className="space-y-2">
	      {[
	        {name: 'Sign Out', path: '/'}
	      ].map(item => (
	        <li
	          key={item.name}
	          className={`sidebar-item ${activeItem === item.name ? 'bg-gray-200' : ''}
			  py-2 px-4`}
	          onClick={() => handleItemClick(item.name)}
	        >
	          <Link to={item.path} className="block w-full">
	            {item.name}
	          </Link>
	        </li>
	      ))}
	    </ul>
	  </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
