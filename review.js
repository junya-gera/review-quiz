'use strict';

{

  class Quiz {
    constructor(){
      const quizSet = this.shuffle([
        {q: 'What is A?', c: ['A0','A1','A2']},
        {q: 'What is B?', c: ['B0','B1','B2']},
        {q: 'What is C?', c: ['C0','C1','C2']}    
      ]);
    }

    shuffle(arr){
      // フィッシャー・イェーツのシャッフルを使って選択肢をシャッフルする
      // i = ランダムに選ぶ範囲の終点
      for (let i = arr.length - 1; i > 0; i--){
        // iと交換するランダムな値をjにする
        const j = Math.floor(Math.random() * (i + 1));
        // 分割代入を利用してiとjを入れ替える
        [arr[j],arr[i]] = [arr[i],arr[j]];  
      }
      return arr;
    }
  }

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