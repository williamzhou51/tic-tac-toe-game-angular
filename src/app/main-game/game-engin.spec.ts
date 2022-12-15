import { GameEngin } from './game-engin';

describe('GameEngin', () => {
  it('should create an instance', () => {
    expect(new GameEngin()).toBeTruthy();
  });

  it('random player', () => {
    const newgame = new GameEngin();
    // @ts-ignore
    expect(newgame.randomPlayerStart()).toBeLessThanOrEqual(2);
  });

});
