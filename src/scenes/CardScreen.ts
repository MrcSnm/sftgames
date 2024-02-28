import { NavigatedScene } from './NavigatedScene';
import { Card, CardType, getCardName } from '../entities/Card';



/**
 * Card initialization data. In a real and less rushed project, they would be stored in some kind of effect template.
 * Like some card sorting template
 */


const CARDS_COUNT = 144;
const X = 800;
const START_Y = 200;
const SPACING = 2;

/**
 * Priority depth is an additional depth added when the tween is running. This guarantees that the card
 * won't be below the current stack while performing its animation.
 */
const PRIORITY_DEPTH = 2500;


///Tweak here if you find the need
const TWEEN_DELAY    = 1000;
const TWEEN_DURATION = 2000;
const TWEEN_TARGET_X = X + 400;


type CardData = {
    type: CardType,
    level: number
}


/**
 * Factory function for creating or changing the current card properties.
 * @returns 
 */
function getRandomCardData()  : CardData
{
    const cardType: CardType = Phaser.Math.Between(CardType.clubs, CardType.hearts) as CardType;
    const level: number = Phaser.Math.Between(1, 13);
    return {type: cardType, level};
}

export class CardScreen extends NavigatedScene
{
    cards: Card[] = []; 
    protected reverseStackAnim: Phaser.Tweens.Tween;

    constructor ()
    {
        super('CardScreen');
    }

    /**
     * Currently it loads every card sprite. As an improvement, one should load an atlas, but since TexturePacker is paid and I don't have much time
     * to implement the atlas parser from LibGDX, I will use the raw images here.
     */
    preload()
    {
        for(let i = 0; i <= CardType.hearts; i++)
        {
            for(let level = 1; level <= 13; level++)
            {
                const cardName = getCardName(i as CardType, level);
                const path = `assets/cardstemp/images/${cardName}.png`;
                this.load.image(cardName, path);
            }
        }
    }

    /**
     * Card generation here
     */
    create ()
    {
        super.create();

        for(let i = 0; i < CARDS_COUNT; i++)
        {
            const cardData = getRandomCardData();
            const card = new Card(this.scene.scene, cardData.type, cardData.level);
            card.setScale(0.5);
            card.setPosition(X, START_Y + i*SPACING);
            card.setDepth(card.y);
            this.cards.push(card);
            this.add.existing(card);
        }
        this.startReverse();
    }

    /**
     * Schedules a tween on each card by multiplying the delay on them. This is better since there's no need to chain them 
     */
    startReverse()
    {
        for(let i = 0; i < this.cards.length; i++)
        {
            const reverseCard = this.cards[this.cards.length-(i+1)];
            this.tweens.add({
                targets: reverseCard,
                duration: TWEEN_DURATION,
                delay: TWEEN_DELAY*i,
                x: TWEEN_TARGET_X,
                y: START_Y + i * SPACING,
                onUpdate: () =>
                {
                    reverseCard.depth = reverseCard.y + PRIORITY_DEPTH;
                },
                onComplete:() =>
                {
                    reverseCard.depth = reverseCard.y;
                },
                ease: Phaser.Math.Easing.Quadratic.Out
            });
        }
    }
    init()
    {
        console.log("Initialized scene.");
    }
    
    update(time: number, delta: number)
    {
        // this.scene.scene.children.sortChildrenFlag = true;
        // this.scene.scene.children.depthSort();
    }
}
