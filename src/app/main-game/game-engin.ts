import {GameStatus} from "./game-status";

export class GameEngin {

  gameArea: Array<number> = [];

  currentTurn: number;
  gameStatus: GameStatus;

  winSituationPlayerOne: Array<Array<number>> = [
    [1,1,1,0,0,0,0,0,0 ],
    [0,0,0,1,1,1,0,0,0 ],
    [0,0,0,0,0,0,1,1,1 ],
    [1,0,0,1,0,0,1,0,0 ],
    [0,1,0,0,1,0,0,1,0 ],
    [0,0,1,0,0,1,0,0,1 ],
    [1,0,0,0,1,0,0,0,1 ],
    [0,0,1,0,1,0,1,0,0 ]
  ]
  winSituationPlayerTwo: Array<Array<number>> = [
    [2,2,2,0,0,0,0,0,0 ],
    [0,0,0,2,2,2,0,0,0 ],
    [0,0,0,0,0,0,2,2,2 ],
    [2,0,0,2,0,0,2,0,0 ],
    [0,2,0,0,2,0,0,2,0 ],
    [0,0,2,0,0,2,0,0,2 ],
    [2,0,0,0,2,0,0,0,2 ],
    [0,0,2,0,2,0,2,0,0 ]
  ]





  public constructor() {
    this.currentTurn = 1;
    this.gameStatus = GameStatus.STOP;
    this.gameArea = [0,0,0,0,0,0,0,0,0];

  }

  gameStart(): void{
    this.gameArea = [0,0,0,0,0,0,0,0,0];
    this.currentTurn = this.randomPlayerStart();
    console.log(this.currentTurn);
    this.gameStatus = GameStatus.START;
  }


  randomPlayerStart(): number {
    const startPlayer = Math.floor(Math.random()*2)+1;
    return startPlayer;
  }

  setArea(position: number, player: number):void{
    this.gameArea[position] = player;
    console.log(this.gameArea);
  }

  // @ts-ignore
  getPlayerColor():string{
    const colorClass = (this.currentTurn === 2) ? 'player-two' : 'player-one';
    return colorClass;
  }

  switchPlayer():void{
    this.currentTurn = (this.currentTurn ===2) ? 1: 2;
  }

  checkEquals(a: Array<any>, b: Array<any>):boolean{

    return Array.isArray(a) && Array.isArray(b) && a.length === b.length &&
      a.every((value, index) => value === b[index]);

  }

  async checkDraw(): Promise<boolean>{
    let isDraw =  true;

    if( this.gameArea.includes(0)) {
      isDraw = false;
    }

    if (isDraw) {
      console.log('draw')
      this.gameEnd();
      return true;
    }else {
      return false;
    }
  }

  async checkWinner(): Promise<boolean>{
    let isWinner = false;
    const checkWinner = (this.currentTurn === 1) ? this.winSituationPlayerOne : this.winSituationPlayerTwo;

    const currentArray : Array<number> = [];

    this.gameArea.forEach((subfield, index) =>{
      if( subfield !== this.currentTurn){
        currentArray[index] = 0;
      }else {
        currentArray[index] = subfield;
      }
    });

    checkWinner.forEach((checkField, checkindex) => {
      if (this.checkEquals(checkField, currentArray)){
        isWinner = true;
      }
    });

    //console.log(currentArray );

    if (isWinner) {
      this.gameEnd();
      return true;
    }else {
      return false;
    }

  }




  gameEnd(): void{
    this.gameStatus = GameStatus.STOP;
  }

}

