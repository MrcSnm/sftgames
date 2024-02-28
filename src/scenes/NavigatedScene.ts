import { Scene } from "phaser";
import { Navigator } from "../entities/Navigator";

/**
 * Base scene which adds the debug tool for navigating between scenes
 */
export class NavigatedScene extends Scene
{
    create ()
    {
        this.input.on('pointerdown', () => 
        {
            if(!this.scale.isFullscreen)
                this.scale.startFullscreen()
            if(screen.orientation.type != 'landscape-primary')
            {
                if(!this.sys.game.device.os.desktop)
                    (screen.orientation as any).lock('landscape-primary');
            }
        });
        this.add.existing(new Navigator(this));
    }
}