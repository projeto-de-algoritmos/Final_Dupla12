import armorImage from '../assets/images/armor.png';
import axeImage from '../assets/images/axe.png';
import donkeyImage from '../assets/images/donkey.png';
import helmetImage from '../assets/images/helmet.png';
import lassoImage from '../assets/images/lasso.png';
import shieldImage from '../assets/images/shield.png';

export const MOVEMENT_REWARD = 10;
export const ROWS = 7;
export const COLS = 18;
// export const ROWS = 5;
// export const COLS = 3;

export const KEYBOARD = {
  Enter: 'Enter',
  Left: 'ArrowLeft',
  Right: 'ArrowRight',
  Up: 'ArrowUp',
  Down: 'ArrowDown',
};

export const GAME_ITEMS = [
  {
    name: 'Armor',
    image: armorImage,
    points: 1000,
  },
  {
    name: 'Axe',
    image: axeImage,
    points: 1000,
  },
  {
    name: 'Donkey',
    image: donkeyImage,
    points: 1000,
  },
  {
    name: 'Helmet',
    image: helmetImage,
    points: 1000,
  },
  {
    name: 'Lasso',
    image: lassoImage,
    points: 1000,
  },
  {
    name: 'Shield',
    image: shieldImage,
    points: 1000,
  },
];
