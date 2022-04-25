import React from 'react';
import './Notification.css';
import background from '../../assets/images/initial.gif'

function Notification({ show, handleOnStartGame }) {
  return (
    show && (
      <div className="notification-container">
        <img src={background} alt="background"/>
        <p className="text">Será que você consegue enfrentar o terrível Dragão para salvar a princesa Fiona?</p>
        <span className="button" onClick={handleOnStartGame}>
          START GAME
        </span>
      </div>
    )
  );
}

export default Notification;
