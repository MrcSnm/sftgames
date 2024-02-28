import { AdvancedText, text } from '../entities/AdvancedText';
import { NavigatedScene } from './NavigatedScene';

export class TextShowcase extends NavigatedScene
{
    advText: AdvancedText;
    
    constructor ()
    {
        super('TextShowcase');
    }

    preload()
    {
        this.add.existing(this.advText = new AdvancedText(this.scene.scene, "assets/flaticon/StitikPixelStudio/"));
        this.advText.build(text("Oh my God! There's a ${bee.png} ---- ${ride-a-bike.png} ${bee.png} oops ${bee.png} another "));
    }

    create ()
    {
        super.create();
        this.advText.setPosition(300, 300);
    }
}


