var DexVSManApp = angular.module ('DexVSManApp', []);
DexVSManApp.controller('DexVSManController', function ($scope) { 	
	
	
	$scope.cells = [' ',' ',' ',' ',' ',' ',' ',' ',' ']; 

	var winCombo = [
				[0,1,2], [3,4,5], [6,7,8],
				[0,3,6], [1,4,7], [2,5,8],
				[0,4,8], [2,4,6] 
				];

	$scope.turns = -1;
	$scope.player1=[];
	$scope.player2=[];
	var x = 0;		//variable used to itterate through winCombo array
	var s = 0;		//nunber of matches (s = 3 -- MATCH!)
	var notifyWin1 = false;  //false = lose! true = win!
	$scope.player1score= 0;
	var notifyWin2 = false; 
	$scope.player2score= 0;
	var round = 0;



	$scope.resetGame = function (resetGame) {
			for (var i=0; i<9; i++){
				$scope.cells[i]= ' ';
			}
			$scope.turns = -1;
			$scope.player1=[];
			$scope.player2=[];
			x = 0;		//variable used to itterate through winCombo array
			s = 0;		//nunber of matches (s = 3 -- MATCH!)
			notifyWin1 = false;  //false = lose! true = win!
			notifyWin2 = false;
		
	}
	

	$scope.PickBox = function(index)
	{ 	


	if ($scope.cells[index]==' ' && !notifyWin1 && !notifyWin2){
	 								//BOX AVAILABLE FOR PLAY.
		$scope.turns++; 
		if ($scope.turns % 2 === 0) 									//EVEN TURN: Player 1
		{														
				$scope.cells[index]= 'x';
				$scope.player1.push(index);	
				console.log("player1 ") ;
				console.log("["+ $scope.player1 +"]"+"turn "+$scope.turns);
			
				if  ($scope.turns === 8)									
				{
					checkWin1();
					if (notifyWin1 === false){
						alert("TIE!");	
					}
					
				} else if ($scope.turns >= 3){
					checkWin1();
				}
														
		} else 															
		{			
				$scope.cells[index]= 'o';
				$scope.player2.push(index);								//ODD TURN: Player 2
				console.log("player2 ") ;
				console.log("["+ $scope.player2 +"]"+"turn "+$scope.turns);
				if ($scope.turns >= 4) 									
				{
					checkWin2();
				}
															
		}	

 	} else 	if (notifyWin1 || notifyWin2)
 		{
 			console.log("Round finished!");
 		}	
 																//BOX ALREADY CHOSEN. DISPLAY ERROR MESSAGE.
 
  	}

  

  	function checkWin1(){
  		console.log("Turn "+ $scope.turns + " Player1 check");
  		for (x=0; x < winCombo.length; x++)
  		{ for (i=0; i < winCombo[x].length; i ++)
  			{ for (j=0; j<$scope.player1.length; j++)
    			{ if ($scope.player1[j] == winCombo[x][i]) 
      				{
      				s++;
      				break;
      				}    
    			}
  			}
  				if (s == 3)
  					{
    				notifyWin1=true;    //win!
    				break;
  					}	
  					s=0;
		}

		if (notifyWin1 === true)
		{
			console.log("Player 1 wins!")
			round++;
			alert($scope.player1name + " wins round " + round + "!" );
			$scope.player1score ++;
			console.log(player1score);
		} 

  	}

  	function checkWin2(){
  		console.log("Turn "+ $scope.turns + " Player2 check");
  		for (x=0; x < winCombo.length; x++)
  		{ for (i=0; i < winCombo[x].length; i ++)
  			{ for (j=0; j<$scope.player2.length; j++)
    			{ if ($scope.player2[j] == winCombo[x][i]) 
      				{
      				s++;
      				break;
      				}    
    			}
  			}
  				if (s == 3)
  					{
    				notifyWin2=true;    //win!
    				break;
  					}	
  					s=0;
		}

		if (notifyWin2 === true)
		{ 	
			console.log("Player 2 wins!")
			round++;
			alert($scope.player2name + " wins round " + round + "!" );
			$scope.player2score ++;
			console.log(player2score);
			$scope.manScore[0].push(player2score);	


		} 

  	}




  	$scope.showScreen1 = true;
  	$scope.showScreen2 = false;
  	$scope.submitdone = false;
  	$scope.start = function () {
       $scope.showScreen1 = false;
       $scope.showScreen2 = true;
    }

  	$scope.player1name = "";
  	$scope.player2name = "";
  	$scope.submit = function () {
       $scope.showScreen2 = false;
       $scope.submitdone = true;
    }

    


 
 });  //END OF CONTROLLER

window.onload




