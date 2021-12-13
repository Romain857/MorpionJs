const readline = require("readline-sync");

board = [" ", " ", " ", " ", " ", " ", " ", " ", " "]
players = ['X', 'O']
ending = false
console.log(board.join('\n'));

function init_game() {
    console.log("Jeu du Morpion")
    current_player = players[0]
    display_board()
    game_loop(current_player)
}

function display_board() {
    i = 0
    console.log(" ---  ---  ---")
    while (i < board.length) {
        process.stdout.write("| " + board[i] + " |")
        i += 1
        if (i % 3 == 0) {
            console.log("")
            console.log(" ---  ---  ---")
        }
    }
}

function game_loop(current_player) {
    turn = 1
    while (turn < 5 || ending == false) {
        play(current_player)
        ending = check_victory(current_player)

        if (current_player == players[0]) {
            current_player = players[1]
        }
        else {
            current_player = players[0]
        }
        turn += 1
        if (turn > 9 && ending == false) {
            console.log("Egalité !")
            break
        }
    }
}

function play(current_player) {
    num_box = readline.question("Entrez le numero de la case dans laquelle vous voulez jouer (1-9) : ")
    while (num_box > 9 || num_box < 1 || board[num_box - 1] != " ") {
        num_box = readline.question("Entrez un numero valide (1-9) : ")
    }
    board[num_box - 1] = current_player
    display_board()
}

function check_victory(current_player){
    if( board[0] != " " && board[0] == board[1] && board[0] == board[2] ||
    board[3] != " " && board[3] == board[4] && board[3] == board[5] ||
    board[6] != " " && board[6] == board[7] && board[6] == board[8] ||
    board[0] != " " && board[0] == board[3] && board[0] == board[6] ||
    board[1] != " " && board[1] == board[4] && board[1] == board[7] ||
    board[2] != " " && board[2] == board[5] && board[2] == board[8] ||
    board[0] != " " && board[0] == board[4] && board[0] == board[8] ||
    board[2] != " " && board[2] == board[4] && board[2] == board[6]){
        if (current_player == players[0]){
            console.log("Félicitation ! Le joueur 'X' a gagné !")
        }
        else{
            console.log("Félicitation ! Le joueur 'O' a gagné !")
        }
        return true
    }
    return false
}
init_game()