import { GameObjects, Scene } from "phaser";
import { TextButton } from "../util/TextButton";
import ExportedScenes from "../exported_scenes.txt";



const FILTERED_SCENES = ["Boot", "Preloader"];

/**
 * Implements a display for the current FPS and buttons with some filtered scenes. Those buttons
 * stops the current scene and starts the selected scene. 
 * 
 * It is able to identify the existing scenes by accessing using the local file exported_scenes.txt
 */
export class Navigator extends GameObjects.Container
{
    protected sceneSwitchers: TextButton[] = [];
    protected fpsText: GameObjects.Text;
    protected lastFps: number = 0;
    
    constructor(scene: Scene)
    {
        super(scene);
        this.fpsText = new GameObjects.Text(scene, 0, 0, "FPS: 0", {
            fontSize: 48,
            color: "#00FF00",
        });
        this.initializeSceneSwitcher(scene.game);
        this.add(this.fpsText);
    }

    private initializeSceneSwitcher(game: Phaser.Game)
    {
        let y = 80;
        const sceneNames = ExportedScenes.replace(/\r/gm, "").split("\n");

        for(let i = 0; i < sceneNames.length; i++)
        {
            const sceneName = sceneNames[i];
            if(FILTERED_SCENES.indexOf(sceneName) != -1) 
                continue;
            let button = new TextButton(this.scene, sceneName, {
                fontSize: 32,
                strokeThickness: 2
            });
            y+= button.displayHeight*1.5;
            button.setPosition(25, y);

            const colors = {
                idle: Phaser.Display.Color.HexStringToColor("#FFFFFF"),
                hover: Phaser.Display.Color.HexStringToColor("#FFFF00")
            }

            ///Same scene options
            if(this.scene.scene.key === sceneName)
            {
                const color = Phaser.Display.Color.HexStringToColor("#222222");
                colors.idle = colors.hover = color;
                button.disableInteractive();
            }
            else
            {
                button.text.on(Phaser.Input.Events.POINTER_DOWN, () =>
                {
                    this.scene.scene.transition({
                        target: sceneName,
                        duration: 0,
                        sleep: true,
                        allowInput: false
                    })
                });
            }
            button.setTextColor(
                colors.idle,
                colors.hover
            );
            this.sceneSwitchers.push(button);
            this.add(button);
        }
    }

    protected setFps(fps: number)
    {
        fps = Math.round(fps);
        if(fps != this.lastFps)
        {
            this.fpsText.setText(`FPS: ${fps}`);
            this.lastFps = fps;
        }
    }

    preUpdate(time: number, delta: number)
    {
        this.setFps(this.scene.game.loop.actualFps);
    }
}