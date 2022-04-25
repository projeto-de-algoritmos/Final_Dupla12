import React from 'react';
import './Header.css';

function Header({ points }) {

  return (
    <header>
        <p>
          Pontuação <span className="score">{points.toString().padStart(5, ' ')}</span>&nbsp;&nbsp;
        </p>
    </header>
  );
}

export default Header;
