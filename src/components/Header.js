import React from 'react';
import './Header.css';

export default ({black}) => {
  return (
    <header className={black ? 'black' : ''}>
      <div className="header--logo">
        <a href="/">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/250px-Netflix_2015_logo.svg.png" alt="Netflix"/>
        </a>
      </div>
      <div className="header--user">
        <a href="/">
          <img src="https://images.vexels.com/media/users/3/135246/isolated/preview/df491bf444acfa945630c22389140d4a---cone-de-sombra-do-usu--rio-by-vexels.png" alt="Usuário"/>
        </a>
      </div>
    </header>

  );
}