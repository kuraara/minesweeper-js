/* global Handlebars */
$(function(){
    
    var width = 10;
    var height = 10;
    
    function createCells(){
        var cells = new Array(width*height);
    
        for(var i = 0; i < height; i++){
            for(var j =0; j < width; j++){
                var id = (i*width) + j; 
                cells[ id ] = {ID:("#"+i)+j, y:i, x:j, xpos:(j*24), ypos:(i*24)};
            }
        }
        
        return cells;
    }
    
    // generate random X/Y values
    function randX(){
        return  Math.floor((Math.random() * 10)) % width;
    }
    
    function randY(){
        return  Math.floor((Math.random() * 10)) % height;
    }
    
    // Add a bomb to a random spot on the board
    function addRand(b)
    {
        var success = false;
        
        var x = randX();
        var y = randY();
        
        while(!success){
            if(b[y][x] == 0)
            {
                success = true;
                
            }
            else{
                x = randX();
                y = randY();
            }
        }
        b[y][x] = 1;
    }
    
    function getID(X,Y){
        var i = (Y*width)+X;
        var h = "#";
        if(i < 10){
            h = h + "0" + i;
        }
        else{
            h+=i;
        }
        return h;
    }
       
    var textCols = ["n1","n2","n3","n4","n5","n6","n7","n8"];
    
    var brd = setupBrd(12);
    var data = {cells: createCells()};
    var source = $("#cell-template").html();
    var template = Handlebars.compile(source);
    $(".board").append(template(data));
    function setIDs(){
        $(".cell").each(function(i,v){
            if(i < 10){
                $(v).attr("id", "0"+i);    
            }
            else{
                $(v).attr("id", i);
            }
        });
    }
    
    setIDs();     
       
    function xRnge(X,Y){
        
        var l = X;
        var r = X;
        
        while(l > 0){
            if(countNbrs(l,Y) == 0){
                l--;
            }
            else
            {
                break;
            }
        }
        while(r < width-1){
            if(countNbrs(r,Y) == 0){
                r++;
            }
            else
            {
                break;
            }
        }
        return [l,r];
    }
    
    function yRnge(X,Y){
        
        var u = Y;
        var d = Y;
        
        while(u >= 0){
            if(countNbrs(X,u) == 0 ){
                u--;
            }
            else
            {
                break;
            }
        }
        
        while(d < height-1){
            if(countNbrs(X,d) == 0){
                d++;
            }
            else
            {
                break;
            }
        }
        return [u,d];
    }
    
    function makeBlank(X,Y){
        var lr = xRnge(X,Y);
        
        for(var i = lr[0]; i < lr[1]+1; i++){
            var yr = yRnge(i, Y)
            
            for(var j = yr[0]; j < yr[1]+1;j++){
                var id = getID(i,j);
                
                $(id).removeClass("unpressed");
                $(id).addClass("pressed");
            }
        }
    }
    

        
    function press(e){
        if($(e).hasClass("unpressed")){
            $(e).removeClass("unpressed");
            $(e).addClass("pressed");
            var x = $(e).data("x");
            var y = $(e).data("y");
            var nbs = countNbrs(x,y);
            if(brd[y][x] == 0){
                if( nbs > 0 ){
                    $(e).html(nbs);
                    $(e).addClass(textCols[nbs-1]);
                }
                else{
                    makeBlank(x,y);  
                }
            }
            else{
                $(e).html("X");
                $(e).addClass("derp");
                gameOver();
            }
            
        }
    }
    
    function setupBrd(n){
        var b = new Array(10);
        for(var i = 0; i < 10; i++){
            b[i] = [0,0,0,0,0,0,0,0,0,0];
        }
        
        for(var i = 0; i < n; i++){
            addRand(b);
        }
        
        return b;
    }
    

    
    function gameOver(){
        
        for(var i = 0; i < height; i++){
            for(j = 0; j < width; j++){
                if(brd[i][j] == 1){
                    console.log("j: ", i, " j: ", j);
                    var b = $(getID(j,i));
                    $(b).addClass("pressed");
                    $(b).html("X");
                }
            }
        }
        
        alert("Game over.");
        resetGame();
        
    }
    
    function countNbrs(X,Y){
        var u = Y-1;
        var d = Y+1;
        var l = X-1;
        var r = X+1;
        
        var n = 0;
        
        if(u >= 0){
            if(l >= 0){
                n += brd[u][l];
            }
            if(r < width){
                n += brd[u][r];
            }
            n += brd[u][X];
        }
        if(d < height){
            if(l >= 0){
                n += brd[d][l];
            }
            if(r < width){
                n += brd[d][r];
            }
            n += brd[d][X];
        }
        if(l >= 0){
            n += brd[Y][l];
        }
        if(r < width){
            n += brd[Y][r];
        }
        return n;
        
    }
    
    $(".cell").click(function(){
            press($(this));
            
        }
    );    
    
    function resetGame(){
        brd = setupBrd(12)
        for(var i = 0; i < height; i++){
            for(j = 0; j < width; j++){
                var b = $(getID(j,i));
                $(b).removeClass("pressed");
                $(b).removeClass("derp");  
                $(b).addClass("unpressed");
                $(b).empty();
            }
        }
    }
    
});
