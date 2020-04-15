// let field = document.createElement('div');
// document.body.appendChild(field);
// field.classList.add('field');

// for (let i = 1; i < 65; i++) {
//     let excel = document.createElement('div');
//     field.appendChild(excel);
//     excel.classList.add('excel');

// }
// let excel = document.getElementsByClassName('excel');


// let x = 1, y = 8;
// for (let i = 0; i < excel.length; i++) {
//     if (x > 8) {
//         x = 1;
//         y--;
//     }
//     excel[i].setAttribute('posX', x);
//     excel[i].setAttribute('posY', y);
//     x++;
//     if ((i % 2 == 0 && y % 2 == 0) || (i % 2 != 0 && y % 2 != 0)) {
//         excel[i].style.background = "rgb(255,248,220)";
//     } else {
//         excel[i].style.background = "brown";
//     }
// }

// let a = Math.round(Math.random() * 63);
// excel[a].classList.add('current');
// excel[a].classList.add('set');






// again and again
const useCircle = false;

// create board
let board = document.createElement('div')
board.classList.add('board');
document.body.appendChild(board);

// create cells
for (let i = 0; i < 64; i++) {
    let cell = document.createElement('div');
    cell.classList.add('cell');
    board.appendChild(cell);
}

let cells = document.querySelectorAll('.cell');
let x = 1, y = 8;
cells.forEach(function (cell) {
    if (x > 8) {
        x = 1;
        y--;
    }
    cell.setAttribute('data-pos-x', x++);
    cell.setAttribute('data-pos-y', y);

    if ((x % 2 == 0 && y % 2 == 0) || (x % 2 != 0 && y % 2 != 0)) {
        cell.style.backgroundColor = '#fad390';
    } else {
        cell.style.backgroundColor = '#3E2723';
    }
});

// set horse to cell
let index = Math.round(Math.random() * 63);
cells[index].classList.add('current');
cells[index].classList.add('set');

// set number for cell
let step = 1;
cells[index].innerHTML = step;

// gets x and y for first cell
let currentX = cells[index].getAttribute('data-pos-x');
let currentY = cells[index].getAttribute('data-pos-y');

// init horse move matrix
const horseMoves = [
    [-2, 1], [-2, -1], // left
    [-1, 2], [1, 2],   // top
    [2, -1], [2, 1],   // right
    [1, -2], [-1, -2]  // down
];

let interval = setInterval(() => {
    move(currentX, currentY)
}, 50);



// move horse
function move(x, y) {
    debug("----------------------------");
    debug("Step: ", step);
    let possibleMoves = getPosibleMoveCells(horseMoves, x, y);

    if (possibleMoves.length == 0) {
        alert("ERROR! Cannot possible movies in this step: " + step);
    }
    // debug
    debug("Possible moves:", possibleMoves);

    let possibleMoveCount = possibleMoves.map(element => {
        const _x = element.getAttribute('data-pos-x');
        const _y = element.getAttribute('data-pos-y');
        return getPosibleMoveCells(horseMoves, _x, _y).length;
    });

    // debug
    debug("Possible moves in layer 2:", possibleMoveCount);

    // get index for min possible move count
    let minIndex = possibleMoveCount.indexOf(getMinMoveCount(possibleMoveCount));
    // debuf
    debug("Min move count index:", minIndex);

    // clear select cell
    document.querySelector('.current').classList.remove('current');
    // move to next cell
    let nextCell = possibleMoves[minIndex];
    // debug
    debug("Next cell:", nextCell);

    nextCell.classList.add('current');
    nextCell.classList.add('set');
    nextCell.innerHTML = ++step;

    // set new value for x and y
    currentX = nextCell.getAttribute('data-pos-x');
    currentY = nextCell.getAttribute('data-pos-y');

    if (step == 64) {
        clearInterval(interval);
        setTimeout(() => {
            alert("Good job!");
            if (useCircle) document.location.reload(true);
        }, 200);
    }
}

// get can move cells
function getPosibleMoveCells(moveTemplate, x, y) {
    let possibleCells = new Array;
    let count = 0;
    moveTemplate.forEach(function (move) {
        let _x = +x + move[0];
        let _y = +y + move[1];
        let cell = document.querySelector(`.cell[data-pos-x="${_x}"][data-pos-y="${_y}"]`);
        if (cell && !cell.classList.contains('set')) {
            possibleCells[count++] = cell;
        }
    });
    return possibleCells;
}

// gets minial value in array
function getMinMoveCount(arr) {
    return Math.min.apply(null, arr);
}

// log function
function debug(message, value = null) {
    if (value != null) console.log(message, value);
    else console.log(message);
}