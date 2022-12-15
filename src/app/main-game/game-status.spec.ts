import { GameStatus } from './game-status';

describe('GameStatus', () => {



  it('game status STOP', () => {
    expect(GameStatus.STOP).toEqual(0);
  });

  it('game status START', () => {
    expect(GameStatus.START).toEqual(1);
  });
});
