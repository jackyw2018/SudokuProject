// two puzzle arrays
// SH: Overall really great job with this project! It works and you wrote some nice code to make it happen.
// I left a few comments on optimizing it. Let me know if you have any questions on what I commented.

let puzzleTrue = [[ 8,9,5,7,4,2,1,3,6 ],
              [ 2,7,1,9,6,3,4,8,5 ],
              [ 4,6,3,5,8,1,7,9,2 ],
              [ 9,3,4,6,1,7,2,5,8 ],
              [ 5,1,7,2,3,8,9,6,4 ],
              [ 6,8,2,4,5,9,3,7,1 ],
              [ 1,5,9,8,7,4,6,2,3 ],
              [ 7,4,6,3,2,5,8,1,9 ],
              [ 3,2,8,1,9,6,5,4,7 ]];

console.log("true?", sudokuIsValid(puzzleTrue));
// => true

let puzzleFalse = [[ 8,9,5,7,4,2,1,3,6 ],
              [ 8,7,1,9,6,3,4,8,5 ],
              [ 4,6,3,5,8,1,7,9,2 ],
              [ 9,3,4,6,1,7,2,5,8 ],
              [ 5,1,7,2,3,8,9,6,4 ],
              [ 6,8,2,4,5,9,3,7,1 ],
              [ 1,5,9,8,7,4,6,2,3 ],
              [ 7,4,6,3,2,5,8,1,9 ],
              [ 3,2,8,1,9,6,5,4,7 ]];

console.log("false?", sudokuIsValid(puzzleFalse));
// => false

// create a sudoku checker that accepts a single sudoku and return true if it is valid 
// SH: Nice use of boolean operators. But you can use your if conditional and make this a one line function if you want. Ie:
// function sudokuIsValid(puzzle) {
//   return columnNoRepeat(puzzle) && rowNoRepeat(puzzle) && sectionNoRepeat(puzzle);
// }
function sudokuIsValid(puzzle) {
    if (columnNoRepeat(puzzle) && rowNoRepeat(puzzle) && sectionNoRepeat(puzzle)) {
        return true;
    } else {
        return false;  
    };
};

// a function that generates an empty sudoku grid
// SH: I dont think this is being used
function createGrid(rowNum, colNum) {
    let sudokuBoard = [];

    for (let i = 0; i < rowNum; i++ ) {
        sudokuBoard[i] = [];
        for (let j = 0; j < colNum; j++) {
          sudokuBoard[i][j] = [];
        };
    }
    return sudokuBoard;
};

// a function that accepts row and col length and returns all the coordinates
// SH: I dont think this is being used
function displayCoordinate(rowNum, colNum) {
    // create an empty grid
    let grid = createGrid(rowNum, colNum);

    // input coordinates
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            grid[i][j][0] = i;
            grid[i][j][1] = j;
        };
    };
    return grid;
};

// a function that accepts a puzzle and rowNum to return an array
// of numbers by x row
// SH: Good job, but can you simplify this function? I think you could make this a one line function.
function getRow(puzzle, rowNum) {
    let array = [];
    
    for (let i = 0; i < puzzle[rowNum].length; i++) {
        array.push(puzzle[rowNum][i]);
    };

    return array;
};

// a function that accepts a puzzle and colNum to return an array
// of numbers by x col
// SH: Nice job!
function getColumn(puzzle, colNum) {
    let array = [];

    for (let i = 0; i < puzzle.length; i++) {
        array.push(puzzle[i][colNum]);
    };
    return array;
};

// a function that accepts a puzzle, colNum, rowNum to return an array
// SH: Good job! Nice use of math to get the values in the for loop
function getSection(puzzle, colNum, rowNum) {
    let array = [];

    for (let i = rowNum * 3; i < (rowNum + 1) * 3; i++) {
        for (let j = colNum * 3; j < (colNum + 1) * 3; j++) {
            array.push(puzzle[i][j]);
        }
    }
    return array;
};

// a function that accepts an array and return true or false if it includes 1 to 9
function includes1to9(array) {
    // SH: Just a reminder that .sort() is a mutative method. I would use slice to make a copy first, just in case you want to use the inputted array for something after. Ie:
    // let sortedArray = array.slice().sort();
    let sortedArray = array.sort();
    for (let i = 0; i < 9; i++) {
      if (sortedArray[i] !== i+1) {
        return false;
      } 
    };
    return true;
  };

// a function that accepts a puzzle and check if all column is valid
// SH: Nice!
function columnNoRepeat(puzzle) {
    for (let i = 0; i < 9; i++) { // QUESTION: I originally coded this line as: for (let i = 0; i < puzzle[i].length; i++); this code threw me an error, and I could not debug it. Why? 
        // SH: You were unable to do it because you were using `i` in the for loop. Instead: `for (let i = 0; i < puzzle.length; i++) { ... }`
        let columnArray = getColumn(puzzle,i)// each column is turned into an array
        if (!includes1to9(columnArray)) {
            return false;
        };
    };
    return true;
};

// SH: Nice!
function rowNoRepeat(puzzle) {
    for (let i = 0; i < puzzle.length; i++) {
        let rowArray = getRow(puzzle,i)// each column is turned into an array
        if (!includes1to9(rowArray)) {
            return false; 
        }
    };
    return true;
};

// SH: Great job!
function sectionNoRepeat(puzzle) {
    for (let colNum = 0; colNum < 3; colNum++) {
        for (let rowNum = 0; rowNum < 3; rowNum++) {
            let rowArray = getSection(puzzle,colNum, rowNum )// each column is turned into an array
            if (!includes1to9(rowArray)) {
                return false; 
            }
        };
    };
    return true;
};

// console.log(sudokuIsValid(puzzleTrue));
// console.log(sudokuIsValid(puzzleFalse));


// a function isSame that takes two sudoku puzzles as aprameters and returns a boolean whether they are identical puzzles

function isSame(puzzle1, puzzle2) {
    // SH: I dont think you need to initialize these outside of the for loop, since you are only using them inside of the for loop.
    let array1 = [];
    let array2 = [];

    for (let i = 0; i < puzzle1.length; i++) {
        array1 = getRow(puzzle1,i);
        array2 = getRow(puzzle2,i);
        // SH: This inner for loop should be looping over the length of one of the arrays. What if we made a board 9 rows by 12 columns, here we would only be looping over the first 9 elements in each row instead of 12.
        for (let j = 0; j < puzzle1.length; j++) {
            if (array1[j] !== array2[j]) {
                return false;
            }
        };
    };
    return true;
};