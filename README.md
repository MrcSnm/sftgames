# Sftgames Assignment
Possible improvements that I would do if I had more time

- Add Width Wrapping to AdvancedText
- Load CardScreen with an Atlas (requires Multipack which is paid or .atlas conversion to .json to multipack json)
- Add component based formatting on AdvancedText
- 


This project uses Phaser 3 project template that uses esbuild for bundling. It supports hot-reloading for quick development workflow, includes TypeScript support and scripts to generate production-ready builds.
It can be found in this link: [Phaser 3 ESBuild Template](https://github.com/phaserjs/template-esbuild-ts)

### Versions

This template has been updated for:

- [Phaser 3.80.1](https://github.com/phaserjs/phaser)
- [esbuild 0.20.1](https://github.com/evanw/esbuild)
- [TypeScript 5.3.3](https://github.com/microsoft/TypeScript)

## Requirements

[Node.js](https://nodejs.org) is required to install dependencies and run scripts via `npm`.

## Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npm run dev` | Launch a development web server |
| `npm run build` | Create a production build in the `dist` folder |

## Writing Code

After cloning the repo, run `npm install` from your project directory. Then, you can start the local development server by running `npm run dev`.
Once the server is running you can edit any of the files in the `src` folder. esbuild will automatically recompile your code and then reload the browser.

## Template Project Structure

We have provided a default project structure to get you started. This is as follows:

- `public/index.html` - A basic HTML page to contain the game.
- `src` - Contains the game source code.
- `src/main.ts` - The main entry point. This contains the game configuration and starts the game.
- `src/scenes/` - The Phaser Scenes are in this folder.
- `src/global.d.ts` - Global TypeScript declarations, provide types information.
- `public/style.css` - Some simple CSS rules to help with page layout.
- `public/assets` - Contains the static assets used by the game.

## Deploying to Production
After you run the `npm run build` command, your code will be built into a single bundle and saved to the `dist` folder, along with any other assets your project imported, or stored in the public assets folder.
In order to deploy your game, you will need to upload *all* of the contents of the `dist` folder to a public facing web server.

