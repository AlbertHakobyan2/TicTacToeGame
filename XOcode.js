let reader = require('readline-sync');
module.exports = tictactoe = {
  execCount: 0,
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
                this.execCount++;
                this.checkers.tieCondition(this.execCount);
                    let positionkeeperX = reader.question("You play as: " + "X, " + "Please insert Your Position" +"'xy'" + "for it (from 1-3): ");
                    if (this.checkers.inputcheck(positionkeeperX)!=true){       
                       console.log("told you what to do you stupid (x and y from 1-3)");
                       tictactoe.execCount = tictactoe.execCount - 1; 
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
                         console.log("krec O");
                         this.checkers.playAgain();
                  } else return this.xoboard;
            },
            
            InsertO: function (mat){
              if (this.starto === 0 && this.checkers.checkWin(this.xoboard) === false){ 
                this.execCount++;
                this.checkers.tieCondition(this.execCount);
                  let positionkeeperO = reader.question("You play as: " + "O, " + "Please insert Your Position" +"'xy'" + "for it: ");  
                  if (this.checkers.inputcheck(positionkeeperO)!=true){
                      console.log("told you what to do you stupid (x and y from 1-3)");
                      tictactoe.execCount = tictactoe.execCount - 1; 
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
                           console.log(" X Won This Time ");
                           this.checkers.playAgain(); 
                    }else return mat;
                  },
                  
                  
                  checkers: a = { 
                    normalMat: [[],[],[]],
                    coltoRow:  [[],[],[]],
                    
              playAgain: function () {
                let again = reader.question("Game is Over. Do you want to star over? (yes or no): ");
                let mat;
                if (again == "yes") {
                  tictactoe.execCount = 0;
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
                  tictactoe.execCount = tictactoe.execCount - 1;
                  console.log('\n' +"The position is occupied by: " + mat[pk[0]-1][pk[1]-1] +". Choose x and y, each from 1-3" + '\n');
                  return true;
                } else return false;
              },
              
              wincheckX: function(str){
                 return ((str === "X")) 
              },
              wincheckO: function(str){
                return str === "O"; 
             },
              
             
             
             backToNormal: function (mat){             
                 for(let i = 0; i < mat.length; i++){
                   for (let j = 0; j < mat[i].length; j++){  
                     this.normalMat[i][j] = mat[j][i]; 
                    }
                  }
                return this.normalMat; 
              },
              colmatrixbuilder: function(mat){
                this.backToNormal(mat);
                 for(let i = 0; i < this.normalMat.length; i++ ){
                  this.coltoRow[i] =  this.normalMat[i].slice();
                 } 
                return this.coltoRow;
              },
              
              colcheck: function (x, mat){
                this.colmatrixbuilder(mat);
               return this.rowcheck(x, this.coltoRow);
              },
              
              colWin: function(x, mat){
                if (this.colcheck(x, mat)){
                return true;
                } else return false;
              },
              rowcheck: function(elements, mat){
                  return (mat[elements].every(r => this.wincheckX(r)) || 
                          mat[elements].every(r => this.wincheckO(r)));
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
              diagXOcheck: function(elements, arr){
                return (arr.every(r => this.wincheckX(r)) || 
                        arr.every(r => this.wincheckO(r)));
              },                
              diagcheck: function (x, mat){
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
                  return (this.diagXOcheck(x, diag1) || this.diagXOcheck(x, diag2));
               },
              checkWin: function(mat) { 
                let win = false;
                for (let i = 0; i < mat.length; i++){
                  if (this.rowWin(i, mat) || this.colWin(i, mat) || this.diagcheck(i, mat)){
                    win = true; break;
                  } else if (!this.rowWin(i, mat) && !this.colWin(i, mat)&& !this.diagcheck(i, mat)){
                    win = false;
                  }                                                          
                } return win; 
              },

              tieCondition: function(steps){
                if (steps == 10){
                console.log("\n" + "TIE" + "\n");
                  return this.playAgain();
                } 
              }
           }
}
                
                