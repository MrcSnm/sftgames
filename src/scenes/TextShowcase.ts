import { GameObjects } from 'phaser';
import { AdvancedText, text } from '../entities/AdvancedText';
import { NavigatedScene } from './NavigatedScene';


/**
 * Existing files list
 */
const imageIcons = [
    "baseball.png",
    "bee.png",
    "berries.png",
    "butterflies.png",
    "easter.png",
    "ride-a-bike.png",
];

/**
 * Generates some random text. 
 * @param maxCharacters This is absolute maximum, that means, the more images, the less characters
 * @param maxImages Max images to generate
 * @returns 
 */
function generateText(maxCharacters: number, maxImages: number)
{
    const generatedImgCount = Phaser.Math.Between(0, maxImages);
    const imgIndices = [];
    for(let i = 0; i < generatedImgCount; i++)
        imgIndices.push(Phaser.Math.Between(0, maxCharacters));
    let str = "";
    for(let i = 0; i < maxCharacters; i++)
    {
        const index = imgIndices.indexOf(i);
        if(index != -1)
            str+= "${"+imageIcons[Phaser.Math.Between(0, imageIcons.length-1)]+"}";
        else
            str+= String.fromCharCode(Phaser.Math.Between(32, 126)); /// Between ' ' and '~'
    }
    return str;
}


export class TextShowcase extends NavigatedScene
{
    advText: AdvancedText;
    repText: GameObjects.Text;
    
    constructor ()
    {
        super('TextShowcase');
    }

    preload()
    {
        this.add.existing(this.advText = new AdvancedText(this.scene.scene, "assets/flaticon/StitikPixelStudio/", {
            wordWrap: {width: 200}
        }));
        this.repText = this.add.text(100, 350, 'Input Text: ', {
            fontSize: 20,
        });
        this.advText.build(text("Oh my God!\nThere's a ${bee.png} \n---- ${ride-a-bike.png} ${bee.png} oops ${bee.png} another "));
    }

    create ()
    {
        super.create();
        this.advText.setPosition(100, 500);
        ///Just play this build font on loop
        this.time.addEvent({delay: 2000, callback: () => 
        {
            const generatedText = generateText(90, 20);
            this.repText.setText("Input Text: " + generatedText);
            this.advText.build(text(generatedText)); 
            this.advText.setFontSize(Phaser.Math.Between(20, 60));
        }, loop: true});
    }
}