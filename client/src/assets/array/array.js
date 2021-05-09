const tileMap = [
  /* -01 */[["#",'q'],"#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#",["#","]"],["#","]"]],
  /* 00 */ [["#","q"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","~"],["#","e"], ["#","e"]],
  /* 01 */ [["#","["],".",".",".",".",".",".",".",".",".",".",".",".",[".", 'h'],[".", 'H'],"#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".",["#","]"],["#","]"]],
  /* 02 */ [["#","["],".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".",["#","]"],["#","]"]],
  /* 03 */ [["#","["],".",".",".",".",[".","J"],".",[".", "@"],".",[".","J"],".",".",".",".",".","#",".",".",".",".",[".","J"],".",[".","T"],".",[".","J"],".",".",".",".",".","#",".",".",".",".",[".","J"],".",[".","Y"],".",[".","J"],".",".",".",".",".","#",".",".",".",".",[".","J"],".",[".","P"],".",[".","J"],".",".",".",".",".","#",".",".",".",".",[".","J"],".",[".","S"],".",[".","J"],".",".",".",".",".","#",".",".",".",".",[".","J"],".",[".","D"],".",[".","J"],".",".",".",".",".","#",".",".",".",".",[".","J"],".",[".","Z"],".",[".","J"],".",".",".",".",".","#",".",".",".",".",[".","J"],".",[".","S"],".",[".","J"],".",".",".",".",".","#",".",".",".",".",[".","J"],".",[".","C"],".",[".","J"],".",".",".",".",".","#",".",".",".",".",[".","O"],".",[".","F"],".",[".","O"],".",".",".",".",".",["#","]"],["#","]"]],
  /* 04 */ [["#","["],".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",[".","t"],".",".",".",".",".",".",".","#",".",".",".",".",".",".",[".", "y"],".",".",".",".",".",".",".","#",".",".",".",".",".",".",[".","p"],".",".",".",".",".",".",".","#",".",".",".",".",".",".",[".","s"],".",".",".",".",".",".",".","#",".",".",".",".",".",".",[".","d"],".",".",".",".",".",".",".","#",".",".",".",".",".",".",[".","z"],".",".",".",".",".",".",".","#",".",".",".",".",".",".",[".","s"],".",".",".",".",".",".",".","#",".",".",".",".",".",".",[".","c"],".",".",".",".",".",".",".","#",".",".",".",".",".",".",[".","f"],".",".",".",".",".",".",".",["#","]"],["#","]"]],
  /* 05 */ [["#","["],".",".",".",".",".",".",[".","R"],".",".",".",".",".",".",".",'#',".",".",".",".",".",".",".",".",".",".",".",".",".",".",'#',".",".",".",".",".",".",".",".",".",".",".",".",".",".",'#',".",".",".",".",".",".",".",".",".",".",".",".",".",".",'#',".",".",".",".",".",".",".",".",".",".",".",".",".",".",'#',".",".",".",".",".",".",".",".",".",".",".",".",".",".",'#',".",".",".",".",".",".",".",".",".",".",".",".",".",".",'#',".",".",".",".",".",".",".",".",".",".",".",".",".",".",'#',".",".",".",".",".",".",".",".",".",".",".",".",".",".",'#',".",".",".",".",".",".",".",".",".",".",".",".",".",".",["#","]"],["#","]"]],
  /* 06 */ [["#","["],".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",[".","G"],".",[".","g"],".",[".", "k"],".",".",".",".",".",["#","]"],["#","]"]],
  /* 07 */ [["#","["],".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".",["#","]"],["#","]"]],
  /* 08 */ [["#","["],".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".",["#","]"],["#","]"]],
  /* 09 */ [["#","["],".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",[".","B"],".",".",".",".",".",".","#",".",".",".",".",".",".",".",[".","B"],".",".",".",".",".",".","#",".",".",".",".",".",".",".",[".","B"],".",".",".",".",".",".","#",".",".",".",".",".",".",".",[".","B"],".",".",".",".",".",".","#",".",".",".",".",".",".",".",[".","B"],".",".",".",".",".",".","#",".",".",".",".",".",".",".",[".","B"],".",".",".",".",".",".","#",".",".",".",".",".",".",".",[".","B"],".",".",".",".",".",".","#",".",".",".",".",".",".",".",[".","B"],".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".",["#","]"],["#","]"]],
  /* 10 */ [["#","["],".",".",".",".",".",".",".",".",".",".",".",".",".",".",'#',".",".",".",".",".",".",".",".",".",".",".",".",".",".",'#',".",".",".",".",".",".",".",".",".",".",".",".",".",".",'#',".",".",".",".",".",".",".",".",".",".",".",".",".",".",'#',".",".",".",".",".",".",".",".",".",".",".",".",".",".",'#',".",".",".",".",".",".",".",".",".",".",".",".",".",".",'#',".",".",".",".",".",".",".",".",".",".",".",".",".",".",'#',".",".",".",".",".",".",".",".",".",".",".",".",".",".",'#',".",".",".",".",".",".",".",".",".",".",".",".",".",".",'#',".",".",".",".",".",".",".",".",".",".",".",".",".",".",["#","]"],["#","]"]],
  /* 11 */ [["#","["],".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".",["#","]"],["#","]"]],
  /* 12 */ [["#","["],".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".",["#","]"],["#","]"]],
  /* 13 */ [["#","["],".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".",["#","]"],["#","]"]],
  /* 14 */ [["#","["],".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".",["#","]"],["#","]"]],
  /* 15 */ [["#","["],'#','#','#','#',["#","I"],'#',["#","L"],["#","K"],'#',["#","I"],'#','#','#','#','#','#','#','#','#',["#","I"],'#',["#","L"],["#","K"],'#',["#","I"],'#','#','#','#','#','#','#','#','#',["#","I"],'#',["#","L"],["#","K"],'#',["#","I"],'#','#','#','#','#','#','#','#','#',["#","I"],'#',["#","L"],["#","K"],'#',["#","I"],'#','#','#','#','#','#','#','#','#',["#","I"],'#',["#","L"],["#","K"],'#',["#","I"],'#','#','#','#','#','#','#','#','#',["#","I"],'#',["#","L"],["#","K"],'#',["#","I"],'#','#','#','#','#','#','#','#','#',["#","I"],'#',["#","L"],["#","K"],'#',["#","I"],'#','#','#','#','#','#','#','#','#',["#","I"],'#',["#","L"],["#","K"],'#',["#","I"],'#','#','#','#','#','#','#','#','#',["#","I"],'#',["#","L"],["#","K"],'#',["#","I"],'#','#','#','#','#','#','#','#','#',["#","I"],'#',["#","L"],["#","K"],'#',["#","I"],'#','#','#','#',["#","]"],["#","]"]],
  /* 16 */ [["#","["],".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".",["#","]"],["#","]"]],
  /* 17 */ [["#","["],".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".",["#","]"],["#","]"]],
  /* 18 */ [["#","["],".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".",["#","]"],["#","]"]],
  /* 19 */ [["#","["],".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".",["#","]"],["#","]"]],
  /* 20 */ [["#","["],".",".",".",".",".",".",".",".",".",".",".",".",".",".",'#',".",".",".",".",".",".",".",".",".",".",".",".",".",".",'#',".",".",".",".",".",".",".",".",".",".",".",".",".",".",'#',".",".",".",".",".",".",".",".",".",".",".",".",".",".",'#',".",".",".",".",".",".",".",".",".",".",".",".",".",".",'#',".",".",".",".",".",".",".",".",".",".",".",".",".",".",'#',".",".",".",".",".",".",".",".",".",".",".",".",".",".",'#',".",".",".",".",".",".",".",".",".",".",".",".",".",".",'#',".",".",".",".",".",".",".",".",".",".",".",".",".",".",'#',".",".",".",".",".",".",".",".",".",".",".",".",".",".",["#","]"],["#","]"]],
  /* 21 */ [["#","["],".",".",".",".",".",".",".",".",".",".",".",".",".",".",[".","M"],".",".",".",".",".",".",".",".",".",".",".",".",".",".",[".","M"],".",".",".",".",".",".",".",".",".",".",".",".",".",".",[".","M"],".",".",".",".",".",".",".",".",".",".",".",".",".",".",[".","M"],".",".",".",".",".",".",".",".",".",".",".",".",".",".",[".","M"],".",".",".",".",".",".",".",".",".",".",".",".",".",".",[".","M"],".",".",".",".",".",".",".",".",".",".",".",".",".",".",[".","M"],".",".",".",".",".",".",".",".",".",".",".",".",".",".",[".","M"],".",".",".",".",".",".",".",".",".",".",".",".",".",".",[".","M"],".",".",".",".",".",".",".",".",".",".",".",".",".",".",["#","]"],["#","]"]],
  /* 22 */ [["#","["],".",".",".",".",".",".",".",".",".",".",".",".",".",".",[".","N"],".",".",".",".",".",".",".",".",".",".",".",".",".",".",[".","N"],".",".",".",".",".",".",".",".",".",".",".",".",".",".",[".","N"],".",".",".",".",".",".",".",".",".",".",".",".",".",".",[".","N"],".",".",".",".",".",".",".",".",".",".",".",".",".",".",[".","N"],".",".",".",".",".",".",".",".",".",".",".",".",".",".",[".","N"],".",".",".",".",".",".",".",".",".",".",".",".",".",".",[".","N"],".",".",".",".",".",".",".",".",".",".",".",".",".",".",[".","N"],".",".",".",".",".",".",".",".",".",".",".",".",".",".",[".","N"],".",".",".",".",".",".",".",".",".",".",".",".",".",".",["#","]"],["#","]"]],
  /* 23 */ [["#","["],".",".",".",".",".",".",".",".",".",".",".",".",".",".",[".","N"],".",".",".",".",".",".",".",".",".",".",".",".",".",".",[".","N"],".",".",".",".",".",".",".",".",".",".",".",".",".",".",[".","N"],".",".",".",".",".",".",".",".",".",".",".",".",".",".",[".","N"],".",".",".",".",".",".",".",".",".",".",".",".",".",".",[".","N"],".",".",".",".",".",".",".",".",".",".",".",".",".",".",[".","N"],".",".",".",".",".",".",".",".",".",".",".",".",".",".",[".","N"],".",".",".",".",".",".",".",".",".",".",".",".",".",".",[".","N"],".",".",".",".",".",".",".",".",".",".",".",".",".",".",[".","N"],".",".",".",".",".",".",".",".",".",".",".",".",".",".",["#","]"],["#","]"]],
  /* 24 */ [["#","["],".",".",".",".",".",".",".",".",".",".",".",".",".",".",[".","M"],".",".",".",".",".",".",".",".",".",".",".",".",".",".",[".","M"],".",".",".",".",".",".",".",".",".",".",".",".",".",".",[".","M"],".",".",".",".",".",".",".",".",".",".",".",".",".",".",[".","M"],".",".",".",".",".",".",".",".",".",".",".",".",".",".",[".","M"],".",".",".",".",".",".",".",".",".",".",".",".",".",".",[".","M"],".",".",".",".",".",".",".",".",".",".",".",".",".",".",[".","M"],".",".",".",".",".",".",".",".",".",".",".",".",".",".",[".","M"],".",".",".",".",".",".",".",".",".",".",".",".",".",".",[".","M"],".",".",".",".",".",".",".",".",".",".",".",".",".",".",["#","]"],["#","]"]],
  /* 25 */ [["#","["],".",".",".",".",".",".",".",".",".",".",".",".",".",".",'#',".",".",".",".",".",".",".",".",".",".",".",".",".",".",'#',".",".",".",".",".",".",".",".",".",".",".",".",".",".",'#',".",".",".",".",".",".",".",".",".",".",".",".",".",".",'#',".",".",".",".",".",".",".",".",".",".",".",".",".",".",'#',".",".",".",".",".",".",".",".",".",".",".",".",".",".",'#',".",".",".",".",".",".",".",".",".",".",".",".",".",".",'#',".",".",".",".",".",".",".",".",".",".",".",".",".",".",'#',".",".",".",".",".",".",".",".",".",".",".",".",".",".",'#',".",".",".",".",".",".",".",".",".",".",".",".",".",".",["#","]"],["#","]"]],
  /* 26 */ [["#","["],".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".",["#","]"],["#","]"]],
  /* 27 */ [["#","["],".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".",["#","]"],["#","]"]],
  /* 28 */ [["#","["],".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".",["#","]"],["#","]"]],
  /* 29 */ [["#","["],".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".",".",".",".",".",".",".",".",".",".",".",".",".",["#","]"],["#","]"]],
  /* 30 */ [["#","["],"#","#","#",["#","I"],"#","#","#","#","#","#",["#","I"],"#","#","#","#","#","#","#",["#","I"],"#","#","#","#","#","#",["#","I"],"#","#","#","#","#","#","#",["#","I"],"#","#","#","#","#","#",["#","I"],"#","#","#","#","#","#","#",["#","I"],"#","#","#","#","#","#",["#","I"],"#","#","#","#","#","#","#",["#","I"],"#","#","#","#","#","#",["#","I"],"#","#","#","#","#","#","#",["#","I"],"#","#","#","#","#","#",["#","I"],"#","#","#","#","#","#","#",["#","I"],"#","#","#","#","#","#",["#","I"],"#","#","#","#","#","#","#",["#","I"],"#","#","#","#","#","#",["#","I"],"#","#","#","#","#","#","#",["#","I"],"#","#","#","#","#","#",["#","I"],"#","#","#","#","#","#","#",["#","I"],"#","#","#","#","#","#",["#","I"],"#","#","#",["#","]"],["#","]"]],
  /* 31 */ [["#",'['],"#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#",["#","]"],["#","]"]]
]

export default tileMap
