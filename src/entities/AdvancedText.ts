import { GameObjects, Scene } from "phaser";

export class AdvancedText extends GameObjects.Container
{
    protected basePath: string;
    protected textLiteral: string;
    protected textTuple: TextTuple[];
    protected style: Phaser.Types.GameObjects.Text.TextStyle = {fontSize: 48};
    protected fontSize: number = 48;

    constructor(scene: Scene, basePath: string, style? : Phaser.Types.GameObjects.Text.TextStyle)
    {
        super(scene);
        this.setBasePath(basePath);

        if(style)
            this.style = style;
    }

    setFontSize(size: number)
    {
        this.fontSize = size;
        this.style.fontSize = size;
    }
    protected adjustChildrenOrder()
    {
        let nextPos = {x:0,y:0};
        this.textTuple.forEach((tuple, i) => 
        {
            if(i > 0)
            {
                const last : Phaser.GameObjects.Components.Transform & 
                             Phaser.GameObjects.Components.Origin & 
                             Phaser.GameObjects.Components.GetBounds = this.list[i-1] as any;
                nextPos = last.getRightCenter(nextPos);
            }
            switch(tuple.type)
            {
                case TextInputType.image:
                {
                    const sz = Number(this.fontSize);
                    (this.list[i] as GameObjects.Sprite).setDisplaySize(sz, sz).setPosition(nextPos.x, 0).setOrigin(0);
                    break;
                }
                case TextInputType.string:
                    const txtObj = (this.list[i] as GameObjects.Text);
                    txtObj.setFontSize(this.fontSize).setPosition(nextPos.x, 0);
                    break;
                default: throw new Error(`Received unkown type ${tuple.type} on tuple with data ${tuple.data} on input ${this.textLiteral}`);
            }
        });
    }
    
    /**
     * Sets a base path for the files to be loaded if they need them.
     * @param path 
     */
    setBasePath(path: string)
    {
        this.basePath = path;
        if(this.basePath != null && !this.basePath.endsWith("/"))
            this.basePath+= "/";
    }


    /**
     * Builds the display from the advanced text data tuple. This function may not change it immediately, as
     * it will need to process the string and find which images needs to be loaded.
     * @param txt 
     */
    public build(txt: AdvancedTextData)
    {
        this.removeAll(true);
        this.textLiteral = txt.literal;
        this.textTuple = txt.tuple;

        const images = txt.tuple.filter((v) => v.type === TextInputType.image);
        let shouldWait = images.find((v) => !this.scene.textures.exists(this.basePath+v.data));

        if(shouldWait)
        {
            for(let i = 0; i < images.length; i++)
            {
                const imgName = this.basePath+images[i].data;
                this.scene.load.image(imgName, imgName);
            }
            this.scene.load.start();
            this.scene.load.once(Phaser.Loader.Events.COMPLETE, () => this.finishBuild(txt));
        }
        else
        {
            this.finishBuild(txt);
        }
    }

    /**
     * Semi internal and semi extensible function for processing the tuple data.
     * This AdvancedText could also be component based if the need existed.
     * @param txt 
     */
    protected finishBuild(txt: AdvancedTextData)
    {
        //No wrap implementation.
        txt.tuple.forEach((tuple, i) => 
        {
            switch(tuple.type)
            {
                case TextInputType.image:
                {
                    let data = tuple.data;
                    if(this.basePath) data = this.basePath + data;
                    this.add(new Phaser.GameObjects.Sprite(this.scene, 0, 0, data));
                    break;
                }
                case TextInputType.string:
                    this.add(new Phaser.GameObjects.Text(this.scene, 0, 0, tuple.data, this.style));
                    break;
                default: throw new Error(`Received unkown type ${tuple.type} on tuple with data ${tuple.data} on input ${txt.literal}`);
            }
        });
        this.adjustChildrenOrder();
    }
    
}

enum TextInputType
{
    string,
    image,
}

type TextTuple = {
    data: string,
    type: TextInputType
}

export type AdvancedTextData = {
    literal: string,
    tuple: TextTuple[]
}

/**
 * Base function for AdvancedText.
 * This function generates a tuple on which AdvancedText acts on.
 * 
 * @param input 
 * @returns 
 */
export function text(input: string) : AdvancedTextData
{
    let tupleRet: TextTuple[]  = [];
    let index = 0;
    for(let i = 0; i < input.length; i++)
    {
        if(input[i] == '$')
        {
            if(i + 1 < input.length && input[i+1] === '{')
            {
                if(index != i)
                    tupleRet.push({type: TextInputType.string, data: input.substring(index, i)});
                let imageName = "";
                index = input.indexOf('}', i);
                if(index === -1) throw new Error(`Malformed input ${input} starting at index ${i}`);
                imageName = input.substring(i+2, index); 
                tupleRet.push({type: TextInputType.image, data: imageName});
                i = index;
                index++;
            }
        }
    }

    if(input.length - index > 1)
    {
        tupleRet.push({
            type: TextInputType.string,
            data: input.substring(index)
        });
    }
    return {literal: input, tuple: tupleRet};
}