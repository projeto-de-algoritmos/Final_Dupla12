import React from 'react';
import './Notification.css';
import background from '../../assets/images/initial.gif'

function Notification({ show, handleOnStartGame, checked, handleBackpackChange }) {
  return (
    show && (
      <div className="notification-container">
        <img src={background} alt="background" />
        <p className="text">Escolha o tamanho da mochila de itens do Shrek:</p>
        <form className="options">
          <input type="radio" id="small" name="backpack" value="5" checked={checked === "5"} onChange={e => handleBackpackChange(e.target.value)}/>
          <label for="small">Pequena (5kg)</label> <br />
          <input type="radio" id="medium" name="backpack" value="15" checked={checked === "15"} onChange={e => handleBackpackChange(e.target.value)}/>
          <label for="medium">Média (15kg)</label> <br />
          <input type="radio" id="big" name="backpack" value="20" checked={checked === "20"} onChange={e => handleBackpackChange(e.target.value)}/>
          <label for="big">Grande (20kg)</label> <br />
        </form>
        <p className="text">Será que você consegue enfrentar o terrível Dragão para salvar a princesa Fiona?</p>
        <span className="button" onClick={handleOnStartGame}>
          INICIAR JOGO
        </span>
      </div>
    )
  );
}

export default Notification;
