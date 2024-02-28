import { NavigatedScene } from './NavigatedScene';
///Import the generated particle json and play here (This is better than parsing with JSON.parse since it gets code completion!).
import FlamesParticle from '../particles/flame.json'
import { GameObjects } from 'phaser';


const particleFrames = "assets/particles/shapes";


const MIN_ATTENUATION = 0.005;
const MAX_ATTENUATION = 0.015;

const MAX_INTENSITY = 30;
const MIN_INTENSITY = 0;

export class ParticleShowcase extends NavigatedScene
{
    particles: GameObjects.Container;
    light: GameObjects.PointLight;

    constructor ()
    {
        super('ParticleShowcase');
    }

    preload()
    {
        this.load.atlas(particleFrames);
    }

    create ()
    {
        super.create();
        this.lights.enable().setAmbientColor(0x333333);
        this.particles = this.add.container(0,-300);
        this.particles.setScale(3);
        FlamesParticle.forEach((v) =>
        {
            this.particles.add(new GameObjects.Particles.ParticleEmitter(this.scene.scene, 0,0 , particleFrames, v));
        });

        this.light = this.lights.addPointLight(1100, 750, 0xff9900, 200, 15, 0.01);

        
        this.tweens.add({
            targets:this.light,
            duration: 0,
            onComplete: () =>
            {
                this.onLightTweenComplete();
            }
        });
    }
    private onLightTweenComplete()
    {
        this.tweens.add({
            targets: this.light,
            duration: Phaser.Math.Between(30, 80),
            radius: Phaser.Math.Between(150, 200),
            attenuation: Phaser.Math.FloatBetween(MIN_ATTENUATION, MAX_ATTENUATION),
            intensity: Phaser.Math.Between(MIN_INTENSITY, MAX_INTENSITY),
            onComplete: () => this.onLightTweenComplete()
        });        
    }
}
