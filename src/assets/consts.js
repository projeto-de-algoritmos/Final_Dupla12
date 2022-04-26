import armorImage from '../assets/images/armor.png';
import axeImage from '../assets/images/axe.png';
import donkeyImage from '../assets/images/donkey.png';
import helmetImage from '../assets/images/helmet.png';
import lassoImage from '../assets/images/lasso.png';
import shieldImage from '../assets/images/shield.png';

export const MOVEMENT_REWARD = 10;
export const ROWS = 16;
export const COLS = 26;

export const KEYBOARD = {
  Enter: 'Enter',
  Left: 'ArrowLeft',
  Right: 'ArrowRight',
  Up: 'ArrowUp',
  Down: 'ArrowDown',
};

export const GAME_ITEMS = [
  {
    name: 'Corda',
    id: 0,
    image: lassoImage,
    points: 1000,
    weight: 1,
  },
  {
    name: 'Capacete',
    id: 1,
    image: helmetImage,
    points: 1800,
    weight: 2,
  },
  {
    name: 'Escudo',
    id: 2,
    image: shieldImage,
    points: 2300,
    weight: 5,
  },
  {
    name: 'Machado',
    id: 3,
    image: axeImage,
    points: 3100,
    weight: 6,
  },
  {
    name: 'Armadura',
    id: 4,
    image: armorImage,
    points: 4200,
    weight: 7,
  },
  {
    name: 'Burro',
    id: 5,
    image: donkeyImage,
    points: 5300,
    weight: 8,
  },
];
