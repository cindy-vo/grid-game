# Grid Game

In a 100 by 100 2-D grid world, you are given a starting point A on one side of the grid, and an ending point B on the other side of the grid. Your objective is to get from point A to point B. Each grid space can be in a state of [“Blank”, “Speeder”, “Lava”, “Mud”]. You start out with 200 points of health and 450 moves. How much your health and moves are affected by landing on a grid space. Instructions to play can be found in the game and there's a fun little story that goes with the game as well. I hope you have fun!

## Set Up
-   Run `cd ./grid-game-frontend`
-   Run `npm install`
-   Run `npm run start`
-   Go to `localhost:3000` to play the game

## Future Improvements
- Support WASD as movement options
- Find a better way to design/implement the grid? Use images instead of colors?
- Create a feature where the user is able to find out if getting to Point A to Point B is possible and if so, find the most optimal path (minimize health and moves)
- Better format the instructions and game over modal/text
