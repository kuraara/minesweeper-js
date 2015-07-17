$(function(){
    
    var width = 10;
    var height = 10;
    
    function getID(X,Y){
        return ("#"+Y) + X;
    }
    
    function setIDs(){
        $(".cell").each(function(i,v){
            console.log(i);
            $(v).attr("id", i);
        });
    }
    
    setIDs();
    
    function setupBrd(){
        var b = new Array(10);
        for(var i = 0; i < 10; i++){
            b[i] = [0,0,0,0,0,0,0,0,0,0];
        }
        
        b[0][1] = 1;
        b[0][0] = 1;
        b[0][4] = 1;
        b[0][7] = 1;
        b[3][1] = 1;
        b[4][2] = 1;
        b[5][3] = 1;
        b[5][5] = 1;
        
        
        return b;
    }
    
    var textCols = ["n1","n2","n3","n4","n5"];
    
    var brd = setupBrd();
    
    function fill(X,Y){
        
        if(brd[Y][X] == 0){
            var id = getID(X,Y);
            $(id).removeClass("unpressed");
            $(id).addClass("pressed");
            
            var L = X-1;
            var R = X;
            var U = Y;
            var D = Y+1;
            
            for(var l = L; l >= 0; l--){
                for(var u = U; u >= 0; u--){
                    if(brd[u][l] == 0 && countNbrs(l,u) == 0 )
                    {
                        id = getID(l,u);
                        $(id).removeClass("unpressed");
                        $(id).addClass("pressed");
                    }
                    else
                    {
                        break;
                    }
                }// uo
                
                for(var d = D; d < height; d++){
                    if(brd[d][l] == 0 && countNbrs(l,d) == 0 )
                    {
                        id = getID(l,d);
                        $(id).removeClass("unpressed");
                        $(id).addClass("pressed");
                    }
                    else
                    {
                        break;
                    }
                }
            } // left
            
            for(var l = R; l < height; l++){
                for(var u = U; u >= 0; u--){
                    if(brd[u][l] == 0 && countNbrs(l,u) == 0 )
                    {
                        id = getID(l,u);
                        $(id).removeClass("unpressed");
                        $(id).addClass("pressed");
                    }
                    else
                    {
                        break;
                    }
                }// uo
                
                for(var d = D; d < height; d++){
                    if(brd[d][l] == 0 && countNbrs(l,d) == 0 )
                    {
                        id = getID(l,d);
                        $(id).removeClass("unpressed");
                        $(id).addClass("pressed");
                    }
                    else
                    {
                        break;
                    }
                }
            } // right
                        
            
        }
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
    
    console.log($(brd));
    
    $(".cell").click(function(){
            if($(this).hasClass("unpressed")){
                $(this).removeClass("unpressed");
                $(this).addClass("pressed");
            }
            
            var x = $(this).data('x');
            var y = $(this).data('y');
            
            var id = getID(x,y);
            
            var v = brd[y][x];
            console.log("id: "+id+ " x: " + x + " y: " + y + " val: " + v);
            
            if(v == 0){
                var nbs = countNbrs(x,y);
                if(nbs > 0){
                    $(this).html(nbs);
                    $(this).addClass(textCols[nbs-1]);
                }
                else
                {
                    fill(x,y);
                }
            }
            else{
                $(this).html("X");
            }
            
        }
    );    
    
    
});
