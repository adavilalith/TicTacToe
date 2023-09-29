function place(){
    if (game_state==false){
        alert("reset game");
        return;
    }
    if (this.textContent!=""){
        alert("full");
        return;
    }
    this.textContent=curr_turn;
    let num=this.getAttribute("id")[4];
    board[Number(num)]=curr_turn;
    if(check_winner()!=""){
        if(check_winner()=="xo"){
            turn_text.textContent="Draw";
            game_state=false;
            return ;
        }
        turn_text.textContent=curr_turn+" is winner!";
        game_state=false;
        return ;
    }
    console.log(1)
    if(curr_turn=="o"){
        curr_turn="x";
    } 
    else{
        curr_turn="o";
    }
    
    turn_text.textContent=curr_turn+"\'s turn";

}
function reset_func(){
    cells.forEach(cell =>{
        cell.textContent="";
        cell.style.color="rgba(255, 255, 255, 1 )"; 
        cell.style.animation="none";
    });
    for(let i=0;i<9;i++){
        board[i]="";
    }
    curr_turn="x";
    turn_text.textContent=curr_turn+"\'s turn";
    game_state=true;
}
function changing_board_colours(win_condition){
    
    for(let i=0;i<9;i++){
        if ((i==win_condition[0])||(i==win_condition[1])||(i==win_condition[2])){
            cells[i].style.animation= "animation-winning 0.5s steps(6) 3";
        }
        else{
            cells[i].style.color="rgba(255, 255, 255, 0.5 )";
        }
    }
}
function check_winner(){
    const win_condition=[[0,1,2],
                         [3,4,5],
                         [6,7,8],
                         [0,3,6],
                         [1,4,7],
                         [2,5,8],
                         [0,4,8],
                         [2,4,6]];
    var flag=true;
    for(let i=0;i<8;i++){
        if (board[i]==""){
            flag=false;
        }
        if ((board[win_condition[i][0]]=="x")&&
           (board[win_condition[i][1]]=="x")&&
           (board[win_condition[i][2]]=="x")){
            changing_board_colours(win_condition[i]);
            return "x";
        }
        if ((board[win_condition[i][0]]=="o")&&
            (board[win_condition[i][1]]=="o")&& 
            (board[win_condition[i][2]]=="o")){
            changing_board_colours(win_condition[i]);
            return "o";
        }
    }
    if(flag){
        return "xo";
    }
    return "";
}
var game_state=true;
const board=["","","","","","","","",""];
var curr_turn="x";
const turn_text=document.getElementById("turn");
const cells=document.querySelectorAll(".cell");
cells.forEach(cell => cell.addEventListener("click",place));
const reset=document.getElementById("reset");
reset.addEventListener("click",reset_func);

