var DexVSManApp = angular.module ('DexVSManApp', []);
DexVSManApp.controller('DexVSManController', function ($scope) { 	

	$scope.showScreen1 = true;									// FIRST WINDOW: INTRO, START BUTTON
  	$scope.showScreen2 = false;									// SECOND WINDOW: RULES, ENTER PLAYER NAMES 
  	$scope.submitdone = false;									// MAIN WINDOW ELEMENTS: CHARACTERS, SCORE BOARD, ETC. 
	$scope.cells = [' ',' ',' ',' ',' ',' ',' ',' ',' ']; 		// TIC-TAC-TOE-BOARD
	var winCombo = [											// POSSIBLE WINNING COMBINATIONS
				[0,1,2], [3,4,5], [6,7,8],
				[0,3,6], [1,4,7], [2,5,8],
				[0,4,8], [2,4,6] 
				];
	$scope.turns = -1;											// DETERMINES PLAYER TURN. EVEN- PLAYER1. ODD- PLAYER2
	$scope.player1name = "";									// Player 1 name variable.
  	$scope.player2name = ""; 									// Player 2 name variable.
	$scope.player1=[];											// PLAYER 1 ARRAY.
	$scope.player2=[];											// PLAYER 2 ARRAY.
	var x = 0;													// variable used to itterate through winCombo array
	var s = 0;													// Nunber of matches (if s = 3 -- MATCH! WIN!)
	$scope.notifyWin1 = false;  								// false = lose! true = win!
	$scope.player1score= 0;										// PLAYER 1 SCORE. (BEST OF 3)
	$scope.notifyWin2 = false;   								// false = lose! true = win!
	$scope.player2score= 0;										// PLAYER 2 SCORE. (BEST OF 3)
	$scope.round = 0;											
	$scope.overall1 = false;									// WHEN P1 WINS, NG-SHOW WINDOW: "P1 WINS!" 
	$scope.overall2 = false;									// WHEN P2 WINS, NG-SHOW WINDOW: "P2 WINS!"

  	$scope.start = function () {								// NG-CLICK: Start button
       $scope.showScreen1 = false;								// Hide Window 1
       $scope.showScreen2 = true;								// Show Window 2
    }

  	$scope.submit = function () {								// NG-CLICK: Submit button
       $scope.showScreen2 = false;								// Hide Window 1
       $scope.submitdone = true;								// Show main window elements
    }

	$scope.resetGame = function (resetGame) {
		for (var i=0; i<9; i++){
				$scope.cells[i]= ' ';
		}
		$scope.turns = -1;
		$scope.player1=[];
		$scope.player2=[];
		x = 0;												// variable used to itterate through winCombo array
		s = 0;												// nunber of matches (s = 3 -- MATCH!)
		$scope.notifyWin1 = false;  						//false = lose! true = win!
		$scope.notifyWin2 = false;
	}
	
	$scope.PickBox = function(index) { 	
		if ($scope.cells[index]==' ' && !$scope.notifyWin1 && !$scope.notifyWin2) {		//BOX AVAILABLE AND THERE IS NO WINNER.
	 								
		$scope.turns++; 
		if ($scope.turns % 2 === 0) {							 // EVEN TURN: Player 1																
			$scope.cells[index]= 'x';							 // Put red flask.
			$scope.player1.push(index);							 // Push index# to player 1 array.
			console.log("player1 ") ;
			console.log("["+ $scope.player1 +"]"+"turn "+$scope.turns);
			
				if ($scope.turns === 8) {						 // Turn 8: Last Turn
					checkWin1();

					if ($scope.notifyWin1 === false) {			 // If no match to winning combination then tie!
						alert("TIE!");	
					}
		
				} else if ($scope.turns >= 3) {
					checkWin1();
				}
														
		} else {													// ODD TURN: Player 2							
				$scope.cells[index]= 'o';							// Put green flask.
				$scope.player2.push(index);							// Push index# to player 2 array.
				console.log("player2 ") ;
				console.log("["+ $scope.player2 +"]"+"turn "+$scope.turns);
				
				if ($scope.turns >= 4) {
					checkWin2();
				}												
		}	

 		} else 	if ($scope.notifyWin1 || $scope.notifyWin2) {
 			console.log("Round finished!");							// When there's a winner, boxes cannot be clicked.
 		}	 
  	}

  	function checkWin1(){
  		console.log("Turn "+ $scope.turns + " Player1 check");
  		for (x=0; x < winCombo.length; x++) {
  		 for (i=0; i < winCombo[x].length; i ++) {
  			 for (j=0; j<$scope.player1.length; j++) {
    			if ($scope.player1[j] == winCombo[x][i]) {
      				s++;
      				break;
      			}    
    		}
  		}
  				if (s == 3) {
    				$scope.notifyWin1=true;    						// If s=3, player 1 wins!
    				break;
  				}	
  					s=0;
		}

		if ($scope.notifyWin1 === true) { 	
			console.log("Player 1 wins!")
			$scope.round++;
			alert($scope.player1name + " wins round " + $scope.round + "!" );
			$scope.player1score++;
			console.log($scope.player1score);
			if ($scope.player1score === 3) {						//if score = 3, player 2 is the overall winner!	
					console.log("OVERALL WINNER!!");
					$scope.overall1 = true;
					$scope.submitdone = false;
			}

		} 
  	}

  	function checkWin2() {
  		console.log("Turn "+ $scope.turns + " Player2 check");
  		for (x=0; x < winCombo.length; x++){
  			for (i=0; i < winCombo[x].length; i ++) {
  				for (j=0; j<$scope.player2.length; j++) {
    				if ($scope.player2[j] == winCombo[x][i]) {
      					s++;
      					break;
      				}    
    			}
  			}
  				if (s == 3) {
    				$scope.notifyWin2=true;    						// If s = 3, player 2 wins!
    				break;
  				}	
  					s=0;
		}

		if ($scope.notifyWin2 === true) { 	
			console.log("Player 2 wins!")
			$scope.round++;
			alert($scope.player2name + " wins round " + $scope.round + "!" );
			$scope.player2score++;
			console.log($scope.player2score);
			if ($scope.player2score === 3) {						//if score = 3, player 2 is the overall winner!	
					console.log("OVERALL WINNER!!");
					$scope.overall2 = true;
					$scope.submitdone = false;
			}

		} 
  	}
 
 });  
 //END OF CONTROLLER






