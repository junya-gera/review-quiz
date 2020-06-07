'use strict';

{

  class Quiz {
    constructor(){
      this.quizSet = this.shuffle([
        {q: 'What is A?', c: ['A0','A1','A2']},
        {q: 'What is B?', c: ['B0','B1','B2']},
        {q: 'What is C?', c: ['C0','C1','C2']}
      ]);
    }

    // 選択肢の順番をリセットするメソッド
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

    // 選択された選択肢が正解かどうか調べるメソッド
    checkAnswer(li) {
      if (li.textContent === quizSet[currentNum].c[0]){
        li.classList.add('correct');
      } else {
        li.classList.add('wrong');
      }
    }
  }

  class Game {
    constructor(){
      const start = document.getElementById('start');
      const next = document.getElementById('next');
      start.addEventListener('click', () => {
        start.classList.add('disabled');
        next.classList.remove('disabled');
        this.choices = document.getElementById('choices');
        // 現在の問題の番号
        this.currentNum = 0;
        this.question = document.getElementById('question');
        this.quiz = new Quiz();
        this.setQuiz();
      });


    }

    setQuiz() {
      this.question.textContent = this.quiz.quizSet[this.currentNum].q;
      // シャッフル後の選択肢
      const shuffledChoices = this.quiz.shuffle([...this.quiz.quizSet[this.currentNum].c]);

      shuffledChoices.forEach(choice => {
        const li = document.createElement('li');
        li.textContent = choice;
        li.addEventListener('click', () => {
          checkAnswer(li);
        })
        choices.appendChild(li);
      });

    }

  
  
  }

  new Game();

}