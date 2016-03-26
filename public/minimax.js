(function() {



    /*
    function makeMove(state, depth, alpha, beta, maximizingPlayer)

    Input:
    state: A state (see state.js)
    
    Output: Returns an integer indicating the location
    to drop the piece.

    This function is the only function called
    by others.html and self.html.  Only changes to this
    (and to functions called by it) will influence
    the behavior of your agent.

    Note that minimax_specs.js doesn't test this at all.
    After all, it makes perfectly legal moves just with
    the code below...
	*/
    var DEPTH = 4;
    var makeMove = function(state) {

        //To get all legal moves.
        //This will be useful.
        var allLegalMoves = state.legalMoves();

        var playerMoving = state.nextMovePlayer;
        // To get a successor state following a move,
        // do the following.  This will be useful.

        var minimax_moves = allLegalMoves.map(function(someLegalMove){
        	var successor = state.move(someLegalMove); 
        	return minimax(successor,DEPTH,playerMoving);    	
        });

        //To get the side which is moving (either
        //an 'x' or an 'o', do this.

        //You'll want to change this...		
        //Currently moves randomly.
        return allLegalMoves[minimax_moves.indexOf(Math.max.apply(null, minimax_moves))];
    }



    //Bonus function.  Might be useful.
    //Takes an array and a function, and returns 
    //the element of the array which gives the highest
    //value when fed into the function.
    var max = function(arr, func) {
        return arr.reduce(function(tuple, cur, index) {
            var value = func(cur)
            return (tuple.value >= value) ? tuple : { element: cur, value: value };
        }, { element: arr[0], value: func(arr[0]) }).element;
    }



    /*
    function heuristic(state, maximizingPlayer)

    Input:
    state: A state (see state.js)
    maximizingPlayer: The player who is maximizing ('x' or 'o');
	
    Output: A number evaluating how good the state is from
    the perspective of the player who is maximizing.
	
    The number should be higher the better the position is for the
    maximizing player, and lower the better the position is for
    the minimizing player.
	
    A useful method on state here would be .numLines, which takes an integer and a player
    like "state.numLines(2,'x')" and returns the number of lines of that length that 
    player. 
	
    You'll want to pass some of the tests defined in minimax_specs.js.
    If you have mocha installed generally, just type "mocha minimax_specs.js"
    at the command line in the correct folder to see if you
    pass it.
    */
    var heuristic = function(state, maximizingPlayer) {
        var x4lines = state.numLines(4, 'x');
        var o4lines = state.numLines(4, 'o');
        var x3lines = state.numLines(3, 'x');
        var o3lines = state.numLines(3, 'o');
        var x2lines = state.numLines(2, 'x');
        var o2lines = state.numLines(2, 'o');
        var direction = 1;
        if (maximizingPlayer === 'o') {
            direction = -1;
        }

        if (x4lines > o4lines) {
            return 100 * direction;
        } else if (x4lines < o4lines) {
            return -100000 * direction;
        } else {
            if (x3lines > o3lines) {
                return 50 * direction;
            } else if (x3lines < o3lines) {
                return -50 * direction;
            } else {
		        if (x2lines > o2lines) {
		            return 50 * direction;
		        } else if (x2lines < o2lines) {
		            return -50 * direction;
		        } else {
		            return 0 * direction;
		        }
            }
        }
        throw new Error('Nothing getting hit in heuristic');
    };



    /*
    function minimax(state, depth, maximizingPlayer)

    Input:
    state: A state (see state.js)
    depth: An integer, >= 0.  The function should return the value
       of heuristic, defined above, if depth == 0.
    maximizingPlayer: 'x' or 'o'
    
    Output: Returns a number evaluating the state, just
    like heuristic does.
	
	You'll need to use state.nextStates(), which returns 
	a list of possible successor states to the state passed in
	as an argument.
	
	You'll also probably need to use state.nextMovePlayer,
	which returns whether the next moving player is 'x' or 'o',
	to see if you are maximizing or minimizing.

	That should be about all the API from State that you need to
	know, I believe.
	*/
    var minimax = function(state, depth, maximizingPlayer) {
        var possibleStates = state.nextStates();
        var currentPlayer = state.nextMovePlayer;

        if (depth === 0 || possibleStates.length === 0) {
            return heuristic(state, maximizingPlayer);
        }
        if (currentPlayer === maximizingPlayer) {
            return Math.max.apply(null, possibleStates.map(function(state) {
                return minimax(state, depth - 1, maximizingPlayer);
            }));
        } else {
            return Math.min.apply(null, possibleStates.map(function(state) {
                return minimax(state, depth - 1, maximizingPlayer);
            }));
        }

    }



    var minimaxAlphaBetaWrapper = function(state, depth, maximizingPlayer) {
        /*
	    function minimaxAB(state, depth, alpha, beta, maximizingPlayer)

	    Input:
	    state: A state (see state.js)
	    depth: An integer, >= 0.  The function should return the value
	       of heuristic, defined above, if depth == 0.
	    alpha: What the maximizing player can certainly guarantee,
	       if it plays well.
	    beta: What the minimizing player can certainly guarantee, if
	       it plays well.
	    maximizingPlayer: 'x' or 'o'
	    
	    Output: Returns a number evaluating the state.

	    minimax_specs.js doesn't test this at all either.
		*/
        var minimaxAB = function(state, depth, alpha, beta) {
            //Need some code here.
        }
        return minimaxAB(state, depth, -10000, 10000)
    }




    //Ignore everything here.
    if (typeof window === 'undefined') {
        module.exports = {
            makeMove: makeMove,
            minimax: minimax,
            heuristic: heuristic
        }
    } else {
        set('makeMove', makeMove)
    }

})()
