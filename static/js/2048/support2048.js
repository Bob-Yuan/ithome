documentWidth = window.screen.availWidth;
gridContainerWidth = 0.92 * documentWidth;
cellSideLength = 0.18 * documentWidth;
cellSpace = 0.04 * documentWidth;

function getPosTop(i, j){
    return cellSpace + i*(cellSpace+cellSideLength);
}

function getPosLeft(i, j){
    return cellSpace + j*(cellSpace+cellSideLength);
}


function getNumberBackgroundColor(number){
    switch(number){
        case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break;
        case 8:return "#f2b179";break;
        case 16:return "#f59563";break;
        case 32:return "#f67c5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#edcf72";break;
        case 256:return "#edcc61";break;
        case 512:return "#99cc00";break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#0099cc";break;
        case 4096:return "#aa66cc";break;
        case 8192:return "#9933cc";break;
    }
    return "black";
}


function getNumberColor(number){
    if( number <= 4)
        return "#776e65";

    return "white";
}

function nospace(board){

    for(var i=0; i<4; i++){
        for(var j=0; j<4; j++){
            if(board[i][j] == 0){
                return false;
            }
        }
    }
    return true;
}

function canMoveLeft( board ){
    //判断右边三列能否向左移动（最左一列不能向左移动）
        //首先找到不为0的数字
        //1、左边一格为空
        //2、左侧一格不为空，但数字和自己相等

    for(var i=0; i<4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i][j-1] == 0 || board[i][j-1] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveRight( board ){
    //判断左边三列能否向右移动（最右一列不能向右移动）
        //首先找到不为0的数字
        //1、右边一格为空
        //2、右侧一格不为空，但数字和自己相等

    for(var i=0; i<4; i++){
        for(var j=2; j>=0; j--){
            if(board[i][j] != 0){
                if(board[i][j+1] == 0 || board[i][j] == board[i][j+1]){
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveUp( board ){
    //判断下边三行能否向上移动（最上一行不能向上移动）
        //1、上边一格为空
        //2、上边一格不为空，但数字和自己相等

    for(var j=0; j<4; j++) {
        for (var i = 1; i < 4; i++) {
            if (board[i][j] != 0) {
                if (board[i-1][j] == 0 || board[i-1][j] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveDown( board ){
    //判断上边三行能否向下移动（最下一行不能向下移动）
        //1、下边一格为空
        //2、下边一格不为空，但数字和自己相等

    for(var j=0; j<4; j++){
        for(var i=2; i>=0; i--){
            if(board[i][j] != 0){
                if(board[i+1][j] == 0 || board[i][j] == board[i+1][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveLeftDown( board ){
    for(var S=1; S<4; S++){
        for(var j=1; j<=S; j++){
            if(board[S-j][j] != 0){
                if(board[S-j+1][j-1]==0 || board[S-j][j]==board[S-j+1][j-1]){
                    return true;
                }
            }
        }
    }
    for(var S=4; S<6; S++){
        for(var i=2;i>=S-3;i--){
            if(board[i][S-i] != 0){
                if(board[i+1][S-i-1]==0 || board[i][S-i]==board[i+1][S-i-1]){
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveRightUp( board ){
    for(var i=1; i<4; i++){
        for(var S=i; S<4; S++){
            if(board[i][S-i] != 0){
                if(board[i-1][S-i+1]==0 || board[i][S-i]==board[i-1][S-i+1]){
                    return true;
                }
            }
        }
    }
    for(var S=4; S<6; S++){
        for(var j=2; j>=S-3; j--){
            if(board[S-j][j] != 0){
                if(board[S-j-1][j+1]==0 || board[S-j][j]==board[S-j-1][j+1]){
                    return true
                }
            }
        }
    }
    return false;
}

function canMoveRightDown( board ){
    for(var i=2; i>=0; i--){
        for(var j=2; j>=0; j--){
            if(board[i][j] != 0){
                if(board[i+1][j+1]==0 || board[i][j]==board[i+1][j+1]){
                    return true;
                }
            }
        }
    }
}

function canMoveLeftUp( board ){
    for(var i=1; i<4; i++){
        for(var j=1; j<4; j++){
            if(board[i][j] != 0){
                if(board[i-1][j-1]==0 || board[i][j]==board[i-1][j-1]){
                    return true;
                }
            }
        }
    }
}

function noBlockHorizontal(row, col1, col2, board){
    for(var i = col1 + 1; i<col2; i++){
        if(board[row][i] != 0)
            return false;
    }
    return true;
}

function noBlockVertical(col, row1, row2, board){
    for(var i = row1 + 1; i<row2; i++){
        if(board[i][col] != 0)
            return false;
    }
    return true;
}

function noBlockLeftDownRightUp(S, col1, col2, board){     //col1为左下角的位置，col2为右上角
    for(var j=col1+1; j<col2; j++){
        if(board[S-j][j] != 0)
            return false;
    }
    return true;
}

function noBlockLeftUpRightDown(row1, col1, col2, board){       //col1为左上角，col2为右下角
    for(var j=col1+1; j<col2; j++){
        if(board[j+row1-col1][j] != 0)
            return false;
    }
    return true;
}

function nomove(board) {
    if(canMoveLeft(board) ||
        canMoveRight(board) ||
        canMoveUp(board) ||
        canMoveDown(board) ||
        canMoveLeftDown(board) ||
        canMoveRightDown(board) ||
        canMoveLeftUp(board) ||
        canMoveRightUp(board))
        return false;

    return true;
}