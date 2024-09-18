import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-black text-white flex items-center p-4">
      <div className="text-2xl font-bold">
        <a href="http://localhost:3000/">
          UFH
        </a>
      </div>
    </header>
    );
};

export default Header;
