var board = new Array();
var score = 0;
var hasConflicted = new Array();

var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;

$(document).ready(function(){
    prepareForMobile();
    newgame();
});

function prepareForMobile(){

    if( documentWidth > 500 ){
        gridContainerWidth = 500;
        cellSpace = 20;
        cellSideLength = 100;
    }
    
    $('#grid-container').css('width',gridContainerWidth - 2*cellSpace);
    $('#grid-container').css('height',gridContainerWidth - 2*cellSpace);
    $('#grid-container').css('padding', cellSpace);
    $('#grid-container').css('border-radius',0.02*gridContainerWidth);

    $(".grid-cell").css('width', cellSideLength);
    $(".grid-cell").css('height', cellSideLength);
    $(".grid-cell").css('border-radius', 0.02*cellSideLength);
}

function newgame(){
    //1、初始化棋盘格
    init();
    //2、在随机的两个格子生成数字2或4
    generateOneNumber();
    generateOneNumber();
}

function init(){
    //1、对16个小格子位置进行定位
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){
            var gridCell = $("#grid-cell-"+i+"-"+j);
            gridCell.css('top', getPosTop(i, j));
            gridCell.css('left', getPosLeft(i, j));
        }
    }

    //2、在16个小格子上进行赋值
    for(i = 0; i < 4; i++){
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for(j=0; j<4; j++){
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }

    //3、显示每个格子中的数字
    updateBoardView();

    score = 0;
}


function updateBoardView(){
    //1、当前格子中如果已有元素，则删除
    $(".number-cell").remove();
    //2、设置值
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){

            $("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
            var theNumberCell = $('#number-cell-' + i + '-' + j);

            if( board[i][j] == 0){
                theNumberCell.css('width', '0px');
                theNumberCell.css('height', '0px');
                theNumberCell.css('top', getPosTop(i,j)+cellSideLength/2);
                theNumberCell.css("left", getPosLeft(i,j)+cellSideLength/2);
            }
            else{
                theNumberCell.css('width', cellSideLength);
                theNumberCell.css('height', cellSideLength);
                theNumberCell.css('top', getPosTop(i,j));
                theNumberCell.css("left", getPosLeft(i,j));
                theNumberCell.css("background-color", getNumberBackgroundColor(board[i][j]));
                theNumberCell.css("color", getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
                theNumberCell.css('line-height', cellSideLength+'px');
                theNumberCell.css('font-size', 0.6*cellSideLength+'px');
                if(board[i][j]>=1000){
                    theNumberCell.css('font-size', 0.6*0.75*cellSideLength+'px');
                }else if(board[i][j]>=10000){
                    theNumberCell.css('font-size', 0.6*0.6*cellSideLength+'px');
                }
            }

            hasConflicted[i][j] = false;
        }
    }
    $(".number-cell").css('line-height', cellSideLength+'px');
    // $(".number-cell").css('font-size', 0.6*cellSideLength+'px');
}

function generateOneNumber(){
    if(nospace(board))
        return false;

    //随机一个位置
    var times = 0;
    do{
        var randx = Math.floor(Math.random() * 4);
        var randy = Math.floor(Math.random() * 4);
        times++;
    }while(board[randx][randy] != 0 && times<50);

    if(times == 50){
        for(var i=0; i<4; i++){
            for(var j=0; j<4; j++){
                if(board[i][j]==0){
                    randx = i;
                    randy = j;
                }
            }
        }
    }

    //随机一个数字
    var randNumber = Math.random()<0.5 ? 2:4;

    //在随机位置显示随机数字
    board[randx][randy] = randNumber;
    showNumberWithAnimation( randx , randy , randNumber );

    return true;
}

$(document).keydown( function(event){
    switch(event.keyCode){
        case 37:  //left
        case 52:
        case 100:
            event.preventDefault();
            if(myMoveLeft()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 38: //up
        case 56:
        case 104:
            event.preventDefault();
            if(myMoveUp()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 39:  //right
        case 54:
        case 102:
            event.preventDefault();
            if(myMoveRight()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 40:  //down
        case 50:
        case 98:
            event.preventDefault();
            if(myMoveDown()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 49:
        case 97:
            event.preventDefault();
            if(MoveLeftDown()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 51:
        case 99:
            event.preventDefault();
            if(MoveRightDown()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 55:
        case 103:
            event.preventDefault();
            if(MoveLeftUp()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 57:
        case 105:
            event.preventDefault();
            if(MoveRightUp()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        default:
            break;
    }
} );

document.addEventListener('touchstart', function(event){
    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;
});

document.addEventListener('touchend', function(event){
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;

    var deltax = endx - startx;
    var deltay = endy - starty;

    if(Math.abs(deltax)<0.15*documentWidth && Math.abs(deltay)<0.15*documentWidth)
        return;

    if(Math.abs(deltax) >= Math.abs(deltay)){
        //x
        if(deltax > 0){
            //move right
            if(myMoveRight()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
        }
        else{
            //move left
            if(myMoveLeft()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
        }
    }else{
        //y
        if(deltay > 0){
            //move down
            if(myMoveDown()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
        }
        else{
            //move up
            if(myMoveUp()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
        }
    }
});

function isgameover(){
    //alert(nospace(board)+":"+nomove(board));
    if(nospace(board) && nomove(board)){
        gameover();
    }
}

function gameover(){
    alert("Game Over!");
}

function myMoveLeft(){

    if(!canMoveLeft( board )){
        return false;
    }

    //向左移动move left
    //对每一个数字得左侧位置进行判断，看是否可能为落脚点？
        //1、落脚位置为空，且移动路径中没有障碍物
        //2、落脚位置数字和待判定元素数字相等，且移动路径中没有障碍物

    for(var i=0; i<4; i++){
        for(var j=1;j<4;j++){
            //搜索位置上存在数字的位置
            if(board[i][j] != 0){
                //对其左侧所有元素进行考察
                for(var k=0; k<j; k++){
                    //1、若左侧有0且这个数字与这个0之间没有数挡着，则这个数可以移到0的位置
                    if(board[i][k] == 0 && noBlockHorizontal(i, k, j, board)){
                        //move
                        //首先进行移动showMoveAnimation，从（i，j）移动到（i，k）,动画就是从相应格子上显示出来这个被移动的数字
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    //2、若左侧和这个数值相同，则两数可以相加
                    else if(board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]){
                        //move and add
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[i][k];
                        updateScore(score);

                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);

    return true;
}

function myMoveRight(){

    if(!canMoveRight( board )){
        return false;
    }

    //向右移动move right
    //对每一个数字得左侧位置进行判断，看是否可能为落脚点？
        //1、落脚位置为空，且移动路径中没有障碍物
        //2、落脚位置数字和待判定元素数字相等，且移动路径中没有障碍物
    for(var i=0; i<4; i++){
        for(var j=2;j>=0;j--){
            //搜索存在数字的位置
            if(board[i][j] != 0){
                //对其右侧所有元素进行考察
                 for (var k=3; k>j; k--) {
                    //1、若左侧有0且这个数字与这个0之间没有数挡着，则这个数可以移到0的位置
                    if(board[i][k] == 0 && noBlockHorizontal(i, j, k, board)){
                        //move
                        //首先进行移动showMoveAnimation，从（i，j）移动到（i，k）,动画就是从相应格子上显示出来这个被移动的数字
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    //2、若左侧和这个数值相同，则两数可以相加
                    else if(board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConflicted[i][k]){
                        //move and add
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        //add score
                        score += board[i][k];
                        updateScore(score);

                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);

    return true;
}

function myMoveUp(){
    if(!canMoveUp( board )){
        return false;
    }

    //向上移动move up
    //对每一个数字的上边位置进行判断，看是否可能为落脚点？
        //1、落脚位置为空，且移动路径中没有障碍物
        //2、落脚位置数字和待判定元素数字相等，且移动路径中没有障碍物

    for(var j=0; j<4; j++){
        for(var i=1;i<4;i++){
            //搜索位置上存在数字的位置
            if(board[i][j] != 0){
                //对其上边所有元素进行考察
                for(var k=0; k<i; k++){
                    //1、若左侧有0且这个数字与这个0之间没有数挡着，则这个数可以移到0的位置
                    if(board[k][j] == 0 && noBlockVertical(j, k, i, board)){
                        //move
                        //首先进行移动showMoveAnimation，从（i，j）移动到（k，j）,动画就是从相应格子上显示出来这个被移动的数字
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    //2、若左侧和这个数值相同，则两数可以相加
                    else if(board[k][j] == board[i][j] && noBlockVertical(j, k, i, board) && !hasConflicted[k][j]){
                        //move and add
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        //add score
                        score += board[i][k];
                        updateScore(score);

                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);

    return true;
}

function myMoveDown(){
    if(!canMoveDown( board )){
        return false;
    }

    //向下移动move down
    //对每一个数字得下边位置进行判断，看是否可能为落脚点？
        //1、落脚位置为空，且移动路径中没有障碍物
        //2、落脚位置数字和待判定元素数字相等，且移动路径中没有障碍物
    for(var j=0; j<4; j++){
        for(var i=2;i>=0;i--){
            //搜索存在数字的位置
            if(board[i][j] != 0){
                //对其下侧所有元素进行考察
                 for (var k=3; k>i; k--) {
                    //1、若左侧有0且这个数字与这个0之间没有数挡着，则这个数可以移到0的位置
                    if(board[k][j] == 0 && noBlockVertical(j, i, k, board)){
                        //move
                        //首先进行移动showMoveAnimation，从（i，j）移动到（k，j）,动画就是从相应格子上显示出来这个被移动的数字
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    //2、若下侧和这个数值相同，则两数可以相加
                    else if(board[k][j] == board[i][j] && noBlockVertical(j, i, k, board) && !hasConflicted[k][j]){
                        //move and add
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        //add score
                        score += board[i][k];
                        updateScore(score);

                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);

    return true;
}

function MoveLeftDown(){
    if(!canMoveLeftDown( board )){
        return false;
    }

    //向左下移动move leftDown
    //对每一个数字得左下侧位置进行判断，看是否可能为落脚点？
        //1、落脚位置为空，且移动路径中没有障碍物
        //2、落脚位置数字和待判定元素数字相等，且移动路径中没有障碍物


    for(var S=1; S<4; S++){
        for(var j=1; j<=S; j++){
            if(board[S-j][j] != 0){
                //对其左下所有元素进行考察
                for(var k=0; k<j; k++){
                    if(board[S-k][k] == 0 && noBlockLeftDownRightUp(S, k, j, board)){
                        //move
                        //首先进行移动showMoveAnimation，从（S-j,j）移动到（S-k，k）,动画就是从相应格子上显示出来这个被移动的数字
                        showMoveAnimation(S-j, j, S-k, k);
                        board[S-k][k] = board[S-j][j];
                        board[S-j][j] = 0;
                        continue;
                    }
                    //2、若左下和这个数值相同，则两数可以相加
                    else if(board[S-k][k] == board[S-j][j] && noBlockLeftDownRightUp(S, k, j, board) && !hasConflicted[S-k][k]){
                        //move and add
                        showMoveAnimation(S-j, j, S-k, k);
                        board[S-k][k] += board[S-j][j];
                        board[S-j][j] = 0;

                        //add score
                        score += board[S-k][k];
                        updateScore(score);

                        hasConflicted[S-k][k] = true;
                        continue;
                    }
                }
            }
        }
    }

    for(var S=4; S<6; S++){
        for(var i=2;i>=S-3;i--){
            if(board[i][S-i] != 0){
                //对其左下所有元素进行考察 k为行i
                for(var k=3; k>i; k--){
                    if(board[k][S-k] == 0 && noBlockLeftDownRightUp(S, S-k, S-i, board)){
                        //move
                        //首先进行移动showMoveAnimation，从（S-j,j）移动到（k，S-k）,动画就是从相应格子上显示出来这个被移动的数字
                        showMoveAnimation(i, S-i, k, S-k);
                        board[k][S-k] = board[i][S-i];
                        board[i][S-i] = 0;
                        continue;
                    }
                    //2、若左下和这个数值相同，则两数可以相加
                    else if(board[k][S-k] == board[i][S-i] && noBlockLeftDownRightUp(S, S-k, S-i, board) && !hasConflicted[k][S-k]){
                        //move and add
                        showMoveAnimation(i, S-i, k, S-k);
                        board[k][S-k] += board[i][S-i];
                        board[i][S-i] = 0;

                        //add score
                        score += board[i][S-i];
                        updateScore(score);

                        hasConflicted[k][S-k] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);

    return true;
}

function MoveRightUp(){
    if(!canMoveRightUp( board )){
        return false;
    }

    for(var i=1; i<4; i++){
        for(var S=i; S<4; S++){
            if(board[i][S-i] != 0){
                for(var k=0; k<i; k++){
                    if(board[k][S-k] == 0 && noBlockLeftDownRightUp(S, S-i, S-k, board)){
                        showMoveAnimation(i, S-i, k, S-k);
                        board[k][S-k] = board[i][S-i];
                        board[i][S-i] = 0;
                        continue;
                    }
                    else if(board[k][S-k] == board[i][S-i] && noBlockLeftDownRightUp(S, S-i, S-k, board) && !hasConflicted[k][S-k] ){
                        //move and add
                        showMoveAnimation(i, S-i, k, S-k);
                        board[k][S-k] += board[i][S-i];
                        board[i][S-i] = 0;

                        //add score
                        score += board[i][S-i];
                        updateScore(score);

                        hasConflicted[k][S-k] = true;
                        continue;
                    }
                }
            }
        }
    }
    for(var S=4; S<6; S++){
        for(var j=2; j>=S-3; j--){
            if(board[S-j][j] != 0){
                for(var k=3; k>j; k--){
                    if(board[S-k][k] == 0 && noBlockLeftDownRightUp(S, j, S-k, board)){
                        showMoveAnimation(S-j, j, S-k, k);
                        board[S-k][k] = board[S-j][j];
                        board[S-j][j] = 0;
                        continue;
                    }
                    else if(board[S-j][j] == board[S-k][k] && noBlockLeftDownRightUp(S, j, k, board) && !hasConflicted[S-k][k]){
                        //move and add
                        showMoveAnimation(S-j, j, S-k, k);
                        board[S-k][k] += board[S-j][j];
                        board[S-j][j] = 0;

                        //add score
                        score += board[S-k][k];
                        updateScore(score);

                        hasConflicted[S-k][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);

    return true;
}

function MoveRightDown(){
    if(!canMoveRightDown( board )){
        return false;
    }

    for(var i=2; i>=0; i--) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                //对其所有右下元素进行考察
                if(i<=j){
                    for (var k = 3; k > j; k--) {
                        if (board[k+i-j][k] == 0 && noBlockLeftUpRightDown(i, j, k, board)) {
                            showMoveAnimation(i, j, k+i-j, k);
                            board[k+i-j][k] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        } else if (board[k+i-j][k] == board[i][j] && noBlockLeftUpRightDown(i, j, k, board) && !hasConflicted[k+i-j][k]) {
                            //move and add
                            showMoveAnimation(i, j, k+i-j, k);
                            board[k+i-j][k] += board[i][j];
                            board[i][j] = 0;

                            //add score
                            score += board[k+i-j][k];
                            updateScore(score);

                            hasConflicted[k+i-j][k] = true;
                            continue;
                        }
                    }
                }else{
                    for (var k = 3-i+j; k > j; k--) {
                        if (board[k+i-j][k] == 0 && noBlockLeftUpRightDown(i, j, k, board)) {
                            showMoveAnimation(i, j, k+i-j, k);
                            board[k+i-j][k] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        } else if (board[k+i-j][k] == board[i][j] && noBlockLeftUpRightDown(i, j, k, board) && !hasConflicted[k+i-j][k]) {
                            //move and add
                            showMoveAnimation(i, j, k+i-j, k);
                            board[k+i-j][k] += board[i][j];
                            board[i][j] = 0;

                            //add score
                            score += board[k+i-j][k];
                            updateScore(score);

                            hasConflicted[k+i-j][k] = true;
                            continue;
                        }
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);

    return true;
}

function MoveLeftUp(){
    if(!canMoveLeftUp( board )){
        return false;
    }
    for(var i=1; i<4; i++){
        for(var j=1; j<4; j++){
            if(board[i][j] != 0){
                //对其左上角元素进行考察
                for(var k=0; k<j; k++){
                    if(k+i-j >= 0){
                        if(board[k+i-j][k] == 0 && noBlockLeftUpRightDown(k+i-j, k, j, board)){
                            showMoveAnimation(i, j, k+i-j, k);
                            board[k+i-j][k] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        } else if(board[i][j] == board[k+i-j][k] && noBlockLeftUpRightDown(k+i-j, k, j, board) && !hasConflicted[k+i-j][k]){
                            //move and add
                            showMoveAnimation(i, j, k+i-j, k);
                            board[k+i-j][k] += board[i][j];
                            board[i][j] = 0;

                            //add score
                            score += board[k+i-j][k];
                            updateScore(score);

                            hasConflicted[k+i-j][k] = true;
                            continue;
                        }
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);

    return true;
}
