## z-type clone

### Background

z-type is an online web typing game. It has a very similar interface to asteroids but the gameplay is involves typing instead. Players are a static ship near the bottom of the grid and asteroids come flying at them. Each asteroid represents a word. A user must type the full word to destroy the asteroid and cannot switch targets once they've begun typing a word. The user loses when the asteroid collides with their ship.

### Functionality & MVP

With this clone of ztype, users will be able to:

- [] Start and pause the game as well as the background music
- [] Type words to destroy asteroids
- [] Be able to see their score at the end of the game
- [] Be able to use a bomb to wipe all the current asteroids on the screen.

In addition this project will include:
- [] a production readme

### Wireframes

The game will have an opening screen that will allow the user to start the game or click a how to play button to be taken to a how to play screen. There will be an icon on the side to turn the sound off.

![wireframes](https://github.com/ygu93/ztype/readme-image/wireframe.png)


### Architecture and technologies

- The game will use mostly vanilla JavaScript and some jQuery for the overall game and logic.
- HTML5 Canvas and maybe also Easel.js library will be used to render everything.
- Webpack to bundle the files together.

There will be a game.js file that will handle the logic of the game such as removing a letter off an asteroid and destroying the asteroids.

There will be classes for bullets, asteroid and ship as well.

An Asteroid will have a word assigned to it. When a user begins to type a word the current asteroid is set and the user must make the asteroid's name property to be empty in order to destroy it.


### Implementation Timeline
Day 1: Set up necessary node modules/webpack and begin writing classes. First step will be to do asteroids class and then a ship class. Learn basics of Easel.js to render objects on a screen. Goals are to setup basic structure and write an asteroids class and learn enough easel to render a board.

Day 2: Start building out the rest of the classes such as bullet and ship.

Day 3: Handle all game logic that will go in the game.js file. Logic includes setting up criteria for destroying an asteroid, destroying a ship, locking on to the asteroid.

Day 4: Style the frontend such as making the how to play screen and installing all the necessary keybindings.

### Bonus features
 - Uploading your own text file so you can practice typing specific words
 - More asteroids, bigger asteroids that split into smaller words/letters when you type them for more interesting gameplay.
