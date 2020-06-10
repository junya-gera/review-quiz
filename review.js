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
      this.point = 0;
      this.missPoint = 0;
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
        this.point++;
      } else {
        li.classList.add('wrong');
        this.missPoint++;
      }

      next.classList.add('answered');
    }
  }

  class Timer{
    constructor(){
      this.startTime = 0;
      this.timer = document.getElementById('timer');
      this.timeoutId = undefined;
      this.resultTime = "";
    }

    startTimer(){
      this.startTime = Date.now();
      this.countUp();

    }

    countUp(){
      const d = new Date(Date.now() - this.startTime);

      // padStart 2桁になるまで先頭に0をつける
      const m = String(d.getMinutes()).padStart(2,'0');
      const s = String(d.getSeconds()).padStart(2,'0');
      const ms = String(d.getMilliseconds()).padStart(3,'0');

      this.timer.textContent = `${m}:${s}.${ms}`;
      this.timeoutId = setTimeout(() =>{
        this.countUp();
      },10);
    }

    stopTimer(){
      clearTimeout(this.timeoutId);
      
    }

    getResultTime(){
      return this.timer.textContent;
    }

  }



  class Game {
    constructor(){
      const start = document.getElementById('start');
      this.next = document.getElementById('next');
      this.quiz = new Quiz();
      this.timer = new Timer();

      // startを押すとゲーム開始
      start.addEventListener('click', () => {
        start.classList.add('disabled');
        next.classList.remove('disabled');
        this.choices = document.getElementById('choices');
        // 現在の問題の番号
        this.question = document.getElementById('question');
        this.setQuiz();
        this.timer.startTimer();
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
          // 最後の問題に答えたら「次へ」が「結果を見る」になる
          if (this.quiz.currentNum === this.quiz.quizSet.length - 1){
            this.timer.stopTimer();
            this.next.textContent = '結果を見る';
            this.next.addEventListener('click', () => {
              this.showResult();
            })
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
    }

    showResult(){
      const result = document.getElementById('result');
      const score = document.getElementById('score');
      const miss = document.getElementById('miss');
      const resultTimer = document.getElementById('resultTimer');
      
      score.textContent = this.quiz.point;
      miss.textContent = this.quiz.missPoint;
      resultTimer.textContent = this.timer.getResultTime();
      result.classList.remove('hidden');
    }  
  
  }


  new Game();

}