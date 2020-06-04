'use strict';

{

  class Game {
    constructor(){
      const start = document.getElementById('start');
      start.addEventListener('click', () => {
        start.classList.add('disabled');
      });  
    }
  
  }

  new Game();

}