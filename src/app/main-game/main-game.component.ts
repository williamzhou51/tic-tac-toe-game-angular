import { Component, OnInit } from '@angular/core';
import {GameEngin} from "./game-engin";



@Component({
  selector: 'app-main-game',
  templateUrl: './main-game.component.html',
  styleUrls: ['./main-game.component.css'],
  providers:[GameEngin]
})
export class MainGameComponent implements OnInit {

  constructor(public game: GameEngin ) { }

  ngOnInit(): void {
  }

  startGame(): void{
    this.game.gameStart();
    const currentPlayer = 'Current Turn Player' + this.game.currentTurn;
    const information = document.querySelector('.current-status');
    // @ts-ignore
    information.innerHTML = currentPlayer;
  }

  async clickSubArea(subarea: any): Promise<void>{
    if(this.game.gameStatus === 1){
      const position = subarea.currentTarget.getAttribute('position');
      console.log(position);
      const information = document.querySelector('.current-status');

      this.game.setArea(position, this.game.currentTurn);

      const color = this.game.getPlayerColor();
      subarea.currentTarget.classList.add(color);



      await this.game.checkWinner().then((end: boolean) => {
        if(this.game.gameStatus ===0 && end){
          // @ts-ignore
          information.innerHTML = 'The Winner is ' + this.game.currentTurn;
        }
      });



      await this.game.checkDraw().then((end: boolean) => {
        if(this.game.gameStatus ===0 && end){
          // @ts-ignore
          information.innerHTML = 'Both Good Job! Draw!';
        }
      });

      this.game.switchPlayer();

      if(this.game.gameStatus === 1) {
        const currentPlayer = 'Current Turn Player' + this.game.currentTurn;
        // @ts-ignore
        information.innerHTML = currentPlayer;

      }


      }

  }





}
