'use strict';

{

  class Quiz {
    constructor(){
      this.quizSet = this.shuffle([
        {q: 'What is A?', c: ['A0','A1','A2']},
        {q: 'What is B?', c: ['B0','B1','B2']},
        {q: 'What is C?', c: ['C0','C1','C2']}
      ]);
      this.currentNum = 0;
      this.isAnswered = false;
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
      if (this.isAnswered === true) {
        return;
      }

      this.isAnswered = true;
      if (li.textContent === this.quizSet[this.currentNum].c[0]){
        li.classList.add('correct');
      } else {
        li.classList.add('wrong');
      }

      next.classList.add('answered');
    }
  }

  class Game {
    constructor(){
      const start = document.getElementById('start');
      this.next = document.getElementById('next');
      this.quiz = new Quiz();

      // startを押すとゲーム開始
      start.addEventListener('click', () => {
        start.classList.add('disabled');
        next.classList.remove('disabled');
        this.choices = document.getElementById('choices');
        // 現在の問題の番号
        this.question = document.getElementById('question');
        this.setQuiz();
      });

      // nextを押すと次の問題へ
      next.addEventListener('click', () => {
        this.nextQuiz();
      });


    }

    setQuiz() {
      this.quiz.isAnswered = false;

      // もし選択肢の1つ目があれば（前の選択肢が残っていれば）
      // 1つ目の選択肢を消す、これを選択肢がなくなるまでループ
      while(this.choices.firstChild){
        this.choices.removeChild(this.choices.firstChild);
      }

      this.question.textContent = this.quiz.quizSet[this.quiz.currentNum].q;
      // シャッフル後の選択肢
      const shuffledChoices = this.quiz.shuffle([...this.quiz.quizSet[this.quiz.currentNum].c]);

      shuffledChoices.forEach(choice => {
        const li = document.createElement('li');
        li.textContent = choice;
        li.addEventListener('click', () => {
          this.quiz.checkAnswer(li);
          if (this.quiz.currentNum === this.quiz.quizSet.length - 1){
            this.next.textContent = '結果を見る';
          }
    
        })
        choices.appendChild(li);
      });
    }

    nextQuiz(){
      if (this.next.classList.contains('answered')){
        this.next.classList.remove('answered');
        this.quiz.currentNum++;
        this.setQuiz();
      }
    };

  
  
  }

  new Game();

}