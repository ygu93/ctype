# CType

[Live link][git]
[git]: https://ygu93.github.io/ctype/lib/index.html

CType is a clone of Ztype, a browser typing shooting game where you type the word next to an asteroid as they fly at you. You lose when the asteroid collides with your ship. This was made using Vanilla JavaScript and HTML Canvas.


## Features and Implementation


### Gameplay
In order to implement the gameplay, I did several things. First I created a words hash of a couple hundred random words. Each key is a letter and each letter has an array of words as a value. I then randomly select a fix number of asteroids to spawn in the beginning. A user can only type one word at a time. When a user begins typing a word, the game locks on to that word. On the off chance that a letter with the same first letter appears, the game will pick the closer one by picking the first element returned from the filter method, which filters according to all words that have the  same first letter as the input.

### Vectors
There are two types of vectors needed for this game. One is for the asteroid to the ship, the other is for the bullet to the ship. To calculate the vector needed I take the vector between the two positions and scaled it according to a speed.

### Words and asteroids are separate
A user can begin typing another word before the asteroid is destroyed on the screen. To accomplish allowing the user to type faster than the laser travels. The laser destroys the asteroid, not the typing. The asteroid won't disappear until it has received a set amount of bullets equal to the length of its original word. In addition a bullet is set to collide only with that certain asteroid. The bullet is homing, if you shoot a farther asteroid, won't affect any asteroids you pass. To do this, each bullet has an asteroid instance variable and its collideWith boolean only sets to true when the asteroid it collides with is the same as its asteroid instance variable.





## Future Features
There are still features CType is missing, the ones that are the most crucial are:

### Input your own Text
Feed the game paragraphs, the game makes levels out of it.

### Asteroid variety
Theres only one asteroid class currently, I'd like to implement bigger ones that split apart instead of being destroyed.

### Smarter wave generation
Right now words are chosen at random and speeds aren't increased as smart. I'd like to expand the dictionary as well as choosing easier words for the beginning and harder words for the later levels. Also, currently the speed just increase staticly per level, after a certain point the speed would be too fast. Better scaling would help.
