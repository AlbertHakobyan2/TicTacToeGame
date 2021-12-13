let reader = require('readline-sync');
module.exports = tictactoe = {
           gameRules: '\n'+"                      Welcome to TicTacToe Game" + 
      '\n'+'\n' +       "   The rules are simple: One player plays as X, the other as O. "  + "X always starts first" +
      '\n'+'\n' +       "1. The player should Insert a number for the position he wants his sign to be placed." + 
      '\n'+'\n' +       "2. The input for the position should be in a merged row and column index combination" + '\n' + 
                        "   i.e : 12, // 1 for the row, 2 for the column you want.)" +
      '\n'+'\n' +       "3. After the input, one must wait for the other player to make his input, unless the game stops." +
      '\n'+'\n' +       "4. If any of the players gets a chance to collect" + 
                        "3 of his signs in any of the column,  row or diagonal - HE WINS."+ 
      '\n'+'\n' +       "                            Good Luck!" + '\n', 

  stepCounter: 0,
  startx: 0,
  starto: 0,
  checkwin: false,
  xoboard: [   
              ["_","_","_"],
              ["_","_","_"],
              ["_","_","_"]
            ],
            
            printXOmatrix: function (mat){
              let result = "";
              for (let row = 0; row < mat.length; row++) {
                for (let col = 0; col < mat[row].length; col++) {
                  result += mat[row][col] + (col === mat[row].length - 1 ? '' : ' ');
                }
                result += (row === mat.length - 1 ? '' : '\n');
              }
              console.log(result);  return result; 
            },

            InsertX: function (){
              if (this.startx === 0 && this.checkers.checkWin(this.xoboard) == false){
                this.stepCounter++;
                this.checkers.tieCondition(this.stepCount);
                    let positionkeeperX = reader.question("You are player: X," + 
                    "Please insert Your Position for it: ");
                    if (!this.checkers.inputcheck(positionkeeperX)){       
                       console.log("Rule 2 was very simple to remember (x and y from 1-3)");
                       tictactoe.stepCount = tictactoe.stepCount - 1;  //normalizes the stepcounter
                       return this.InsertX();
                }else if (this.checkers.inputcheck(positionkeeperX)){
                       if(this.checkers.positionBusy(this.xoboard, positionkeeperX)){
                           this.InsertX();
                          }else if (!this.checkers.positionBusy(this.xoboard, positionkeeperX)){
                            let x = positionkeeperX[0] - 1;
                            let y = positionkeeperX[1] - 1;
                            this.xoboard[x][y]="X";
                                this.printXOmatrix(this.xoboard);
                                this.InsertO(this.xoboard);
                                this.startx++;
                                return this.startx, this.xoboard;
                              } 
                            }
                } else if (this.startx ===0 && this.checkers.checkWin(this.xoboard) == true){ 
                         console.log("           Congratulations! Player O Won this time" + '\n');
                         this.checkers.playAgain();
                  } else return this.xoboard;
            },
            
            InsertO: function (mat){
              if (this.starto === 0 && this.checkers.checkWin(this.xoboard) === false){ 
                this.stepCounter++;
                this.checkers.tieCondition(this.stepCounter);
                  let positionkeeperO = reader.question("You are player: O," + '\n' +
                   "Please insert Your Position for it: ");  
                  if (!this.checkers.inputcheck(positionkeeperO)){
                      console.log("Rule 2 was very simple to remember (x and y from 1-3)");
                      tictactoe.stepCounter = tictactoe.stepCounter - 1; 
                      return this.InsertO(mat);
                } else if (this.checkers.inputcheck(positionkeeperO)){
                       if(this.checkers.positionBusy(this.xoboard, positionkeeperO)){
                          this.InsertO(mat);
                         }else if (!this.checkers.positionBusy(this.xoboard, positionkeeperO)){
                            let x = positionkeeperO[0] - 1;
                            let y = positionkeeperO[1] - 1;
                            mat[x][y]="O";
                            this.checkers.checkWin(mat);
                            this.printXOmatrix(mat);
                            this.startx=0;
                            this.InsertX();
                            this.starto++;
                            return this.starto, mat; 
                          }  
                        } 
                      } else if (this.checkers.checkWin(this.xoboard) == true){ 
                        console.log("           Congratulations! player X Won This Time " + '\n');
                        this.checkers.playAgain(); 
                      }else return mat;
                  },
                  
                  
        checkers: a = { 
                    
                    normalMat: [[],[],[]],
                    coltoRow:  [[],[],[]],
                
                    tieCondition: function(steps){
                      if (steps == 10){
                        console.log("\n" + "TIE" + "\n");
                        return this.playAgain();
                      } 
                    },


              rangeCheck: function (elem1, elem2){
                      return ((elem1 > 0 && elem1 < 4) && (elem2 > 0 && elem2 < 4));
              },
              
              inputcheck: function(num){
                if (num.length==2 && this.rangeCheck(num[0], num[1])){
                  return true;
                }else if (num.length!=2 || this.rangeCheck(num[0], num[1])==false){ 
                  console.log("number out of range");  
                  return false;
                }
              },
              
              positionBusy:function (mat, pk){

                if ((mat[pk[0]-1][pk[1]-1]=="X")||((mat[pk[0]-1][pk[1]-1]=="O"))){
                  tictactoe.stepCounter = tictactoe.stepCounter - 1;
                  console.log('\n' +"The position is occupied by: " + mat[pk[0]-1][pk[1]-1] +
                  ". Choose x and y, each from 1-3" + '\n');
                  return true;
                } else return false;
              },
              
              checkWin: function(mat) { 
                let win = false;
                for (let i = 0; i < mat.length; i++){
                  if (this.rowWin(i, mat) || this.colWin(i, mat) || this.diagWin(mat)){
                    win = true; break;
                  } else if (!this.rowWin(i, mat) && !this.colWin(i, mat)&& !this.diagWin(i, mat)){
                    win = false;
                  }                                                          
                } return win; 
              },
              
              
              
              
              colWin: function(x, mat){
                  if (this.colcheck(x, mat)){
                    return true;
                  } else return false;
                },
                
                diagWin: function (mat){
                    let diag1 = [];
                    let diag2 = [];
                    for (let row = 0; row < mat.length; row++){   
                      diag1.push(mat[row][row]);
                      } 
                    for (let row = 0; row < mat.length; row++) {
                      for (let col = 0; col < mat[row].length; col++) {
                        if (col + row === mat[row].length - 1) {
                              diag2.push(mat[row][col]);
                            }
                      }
                    } 
                    return (this.diagXOcheck(diag1) || this.diagXOcheck(diag2));
                  },
                             diagXOcheck: function(arr){
                                     return (arr.every(r => this.wincheckX(r)) || 
                                     arr.every(r => this.wincheckO(r)));
                                     },                
                                     
              backToNormal: function (mat){                       // During the check processes, the XOboard (here:mat), secretly becomes 
                  for(let i = 0; i < mat.length; i++){            // a giant matrix that shows us its checked, shy and beautiful 
                    for (let j = 0; j < mat[i].length; j++){      // self every time. Thus we must have its instances independent from that 
                      this.normalMat[i][j] = mat[j][i];           //  giant monster. That's why its called BacktoNormal  ](:-])={:}==|==[
                    }
                  }
                  return this.normalMat; 
                },

                      colmatrixbuilder: function(mat){
                            this.backToNormal(mat);
                            for(let i = 0; i < this.normalMat.length; i++ ){    //since we are always sure about the nornakMat, 
                                this.coltoRow[i] =  this.normalMat[i].slice();  //we call the slice function that seperates elements of the array
                             } 
                              return this.coltoRow;       // This is the rotated matrix that will get checked by the same rowcheck
                       },
              
              colcheck: function (x, mat){
                this.colmatrixbuilder(mat);               // executes the 2 functions above and changes the instance of the matrix that gets rotated  
                return this.rowcheck(x, this.coltoRow);      
              },
              
              
              rowcheck: function(elements, mat){
                return (mat[elements].every(r => this.wincheckX(r)) || 
                        mat[elements].every(r => this.wincheckO(r)));
                        },
                          wincheckX: function(sign){
                                     return sign === "X";
                           },
                          wincheckO: function(sign){
                                     return sign === "O"; 
                           },
              
              rowWin: function(x, mat){
                let check = false;
                if ((x > 2)||!this.rowcheck(x, mat)) return check;
                else if ((x >=0)&&(x <= 2)&&!this.rowcheck(x, mat)){ 
                  return this.rowWin(x + 1, mat);
                } else if (this.rowcheck(x, mat)){ 
                  check = true;   
                } 
                return check;
              },
              
              playAgain: function () {
                let again = reader.question("Game is Over. Do you want to start over? (yes or no): ");
                let mat;
                if (again == "yes") {
                  tictactoe.stepCounter = 0;
                  mat = [   
                    ["_","_","_"],
                    ["_","_","_"],
                    ["_","_","_"]
                  ]; 
                  tictactoe.xoboard = mat;
                  return tictactoe.InsertX();
                } else if (again == "no"){
                  return console.log("Game Stoped");
                }else{ 
                  return console.log("Rewrite your choice"), 
                    this.playAgain();
                  }
                }
         }
}

