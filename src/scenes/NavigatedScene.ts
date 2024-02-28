import { Scene } from "phaser";
import { Navigator } from "../entities/Navigator";

/**
 * Base scene which adds the debug tool for navigating between scenes
 */
export class NavigatedScene extends Scene
{
    create ()
    {
        this.add.existing(new Navigator(this));
    }
}