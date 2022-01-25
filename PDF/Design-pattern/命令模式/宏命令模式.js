var study =  {
  execute : function () {
    console.log('好好学习，天天向上')
  }
}

var getUpEarly = {
  execute : function () {
    console.log('早睡早起身体好')
  }
}

var gogo = {
  execute : function () {
    console.log('gogo吃饭饭')
  }
}

var MacroCommand = function(){ 
  return { 
    commandsList: [], 
    add: function( command ){ 
      this.commandsList.push( command ); 
    }, 
    execute: function(){ 
      for ( var i = 0 ; i < this.commandsList.length; i ++ ){ 
        this.commandsList[i].execute(); 
      } 
    } 
  } 
}; 
 var macroCommand = MacroCommand(); 
 macroCommand.add( getUpEarly ); 
 macroCommand.add( study ); 
 macroCommand.add( gogo ); 
 macroCommand.execute(); 

