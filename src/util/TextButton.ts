import { GameObjects, Scene } from "phaser";



export class TextButton extends GameObjects.Container
{
    protected btnColors: EventColors;
    protected txtColors: EventColors;
    public text: GameObjects.Text;

    constructor(scene: Scene, text: string = "Button", style?: Phaser.Types.GameObjects.Text.TextStyle)
    {
        super(scene);
        this.add(this.text = new GameObjects.Text(scene, 0, 0, text, style ?? {}));

        this.setSize(this.text.displayWidth, this.text.displayHeight);
        this.text.setInteractive();
        this.text.on(Phaser.Input.Events.POINTER_OVER, () =>
        {
            if(this.txtColors?.hover)
            {
                this.text.setColor(this.txtColors.hover.rgba);
            }
        });
        this.text.on(Phaser.Input.Events.POINTER_OUT, () =>
        {
            if(this.txtColors?.idle)
            {
                this.text.setColor(this.txtColors.idle.rgba);
            }
        });
    }



    public setButtonColor(
        idle : Phaser.Display.Color,
        hover?: Phaser.Display.Color,
        click?: Phaser.Display.Color,
    )
    {
        this.btnColors = {idle, hover, click};
    }
    public setTextColor(
        idle : Phaser.Display.Color,
        hover?: Phaser.Display.Color,
        click?: Phaser.Display.Color,
    )
    {
        this.text.setColor(idle.rgba);
        this.txtColors = {idle, hover, click};
    }
}

type EventColors =
{
    idle? : Phaser.Display.Color,
    hover?: Phaser.Display.Color,
    click?: Phaser.Display.Color
}