import { GameObjects, Scene } from "phaser";



export enum CardType
{
    clubs,
    diamonds,
    spades,
    hearts
}
const CardMapping = {
    1: "ace",
    11: "jack",
    12: "queen",
    13: "king",
}

/**
 * Returns a sprite frame name from the given data.
 * 
 * @param type 
 * @param num A number between 1 and 13
 * @returns 
 */
export function getCardName(type: CardType, num: number)
{
    if(num > 13 || num <= 0)
        throw new RangeError(`Out of Range [1..13] number received ${num}`);
    let mapped:string = (CardMapping as any)[num];
    let typeName:string = CardType[type];
    if(mapped == undefined)
    {
        mapped = String(num);
    }

    return `${mapped}_of_${typeName}`;
}


export class Card extends GameObjects.Sprite
{
    protected cardType: CardType;
    protected level: number;

    constructor(scene: Scene, cardType: CardType, level: number)
    {
        super(scene, 0,0, getCardName(cardType, level));

        this.cardType = cardType;
        this.level = level;
    }

    public setCardProperties(type: CardType, level: number)
    {
        this.cardType = type;
        this.level = level;
        this.setFrame(getCardName(type, level));
    }
}
