import { Boot } from './scenes/Boot';
import { TextShowcase } from './scenes/TextShowcase';
import { ParticleShowcase } from './scenes/ParticleShowcase';
import { CardScreen } from './scenes/CardScreen';

import { Game, Types } from "phaser";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    parent: 'game-container',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Boot,
        CardScreen,
        TextShowcase,
        ParticleShowcase
    ]
};


const game = new Game(config);
export default game;

///Development

if(process.env.DEBUG)
{
    console.log("Debugging environment activated: Using game on globalThis");
    globalThis.game = game;
}
