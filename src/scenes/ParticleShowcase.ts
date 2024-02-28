import { NavigatedScene } from './NavigatedScene';
import FlamesParticle from '../particles/flame.json'
import { GameObjects } from 'phaser';


const particleFrames = "assets/particles/shapes";

export class ParticleShowcase extends NavigatedScene
{
    particles: GameObjects.Container;

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
        this.particles = this.add.container(0,-300);
        this.particles.setScale(3);
        FlamesParticle.forEach((v) =>
        {
            this.particles.add(new GameObjects.Particles.ParticleEmitter(this.scene.scene, 0,0 , particleFrames, v));
        });
    }
}
