import React from 'react';
import './Header.css';

function Header({ points, bestItems, currentWeight, backpackSize, lifePoints }) {

  return bestItems.length > 0 ? (
    <header>
        <p>
          Pontuação: <span className="score">{points.toString().padStart(5, ' ')}</span>&nbsp;&nbsp;
        </p>
        <p>Mochila: <span className="score">{currentWeight+" / "+backpackSize+" kg"}</span>&nbsp;&nbsp;
        </p>
        <p>Vidas: <span className="score">{lifePoints.toString().padStart(5, ' ') + " / 3"}</span>&nbsp;&nbsp;
        </p>
    </header>
  ) : null;
}

export default Header;
