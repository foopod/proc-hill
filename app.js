var ctx;
var canvas;
var pixelSize = 6;

var rule = 62;
var ruleArray = new Array(8);

var ruleset = [30,118, 46,56];

var width,height,image;

function init(){
    canvas = document.getElementById('hill');
	ctx = canvas.getContext('2d');
    resizeCanvas();
    
     width = canvas.width/pixelSize;
    height = canvas.height/pixelSize;
    
     image = Array.matrix(height, width,false);
    ctx.fillStyle ='#2f5d87';
    ctx.fillRect(0,0,width*pixelSize,width*height);
    calculateRule();
//    console.log(ruleArray);
    
    perform();
    
}

function perform(){
    var num = 0;
    var centre = Math.floor(width/2);
    image[0][centre] = true;
    
//    console.log(image);
    
    for(var y = 1; y < height; y++){
        rule = ruleset[getRandomInt(0,ruleset.length)];
        calculateRule();
        for(var x =0; x < width; x++){
            if(x > 1 && x < width-2){
                var sub = image[y-1].slice(x-1,x+2);
//                var sub2 = image[y-2].slice(x-2,x+3);
//                var num = 0;
//                for(var t = 0; t < sub.length; t++){
//                    if(sub[t]){
//                        num++;
//                    }
//                }
                image[y][x] =calculateCell(sub);   
                if(!image[y][x]){
                    if(Math.random()<0.000005 *y){
                        
                        image[y][x] = true;
                    }
                }
            }
        }
    }
    
    for(var y = 0; y< height; y++){
        for(var x = 0; x< width; x++){
            if(image[y][x]){
                drawSquare(x*pixelSize,y*pixelSize, 'white', pixelSize);
                //Caves
                if(image[y][x-3] && image[y][x-2] && image[y][x-1]&& image[y][x+1]&& image[y][x+2]&& image[y][x+3]&&Math.random()<0.03){
                    drawSquare(x*pixelSize,(y-1)*pixelSize, 'black', pixelSize);
                    drawSquare((x-1)*pixelSize,(y-1)*pixelSize, 'black', pixelSize);
                    drawSquare((x+1)*pixelSize,(y-1)*pixelSize, 'black', pixelSize);
                    drawSquare(x*pixelSize,(y-2)*pixelSize, 'black', pixelSize);
                    drawSquare((x-1)*pixelSize,(y-2)*pixelSize, 'black', pixelSize);
                    drawSquare((x+1)*pixelSize,(y-2)*pixelSize, 'black', pixelSize);
                    drawSquare(x*pixelSize,(y-3)*pixelSize, 'black', pixelSize);
                    
                    drawSquare((x-2)*pixelSize,(y-1)*pixelSize, 'dimgray', pixelSize);
                    drawSquare((x+2)*pixelSize,(y-1)*pixelSize, 'dimgray', pixelSize);
                    drawSquare((x-2)*pixelSize,(y-2)*pixelSize, 'dimgray', pixelSize);
                    drawSquare((x+2)*pixelSize,(y-2)*pixelSize, 'dimgray', pixelSize);
                    drawSquare((x-1)*pixelSize,(y-3)*pixelSize, 'dimgray', pixelSize);
                    drawSquare((x+1)*pixelSize,(y-3)*pixelSize, 'dimgray', pixelSize);
                    drawSquare(x*pixelSize,(y-4)*pixelSize, 'dimgray', pixelSize);
                }
                //Draw Tree
                if(Math.random()<0.0001*y ){
                    drawSquare(x*pixelSize,(y-1)*pixelSize, '#422c10', pixelSize);
                    drawSquare(x*pixelSize,(y-2)*pixelSize, '#1a4a3c', pixelSize);
                    drawSquare((x+1)*pixelSize,(y-2)*pixelSize, '#1a4a3c', pixelSize);
                    drawSquare((x-1)*pixelSize,(y-2)*pixelSize, '#1a4a3c', pixelSize);
                    drawSquare((x+1)*pixelSize,(y-3)*pixelSize, '#1a4a3c', pixelSize);
                    drawSquare((x-1)*pixelSize,(y-3)*pixelSize, '#1a4a3c', pixelSize);
                    drawSquare(x*pixelSize,(y-3)*pixelSize, '#1a4a3c', pixelSize);
                    drawSquare(x*pixelSize,(y-4)*pixelSize, '#1a4a3c', pixelSize);
                    drawSquare(x*pixelSize,(y-5)*pixelSize, '#1a4a3c', pixelSize);
                }
                //Draw Rock
                if(y>1 && !image[y-1][x] && Math.random()<0.001*y ){
                    drawSquare(x*pixelSize,(y-1)*pixelSize, 'silver', pixelSize);
                }
            } else {
                drawSquare(x*pixelSize,y*pixelSize, '#2f5d87', pixelSize);
                var tmp = y;
                while(tmp>0){
                    if(image[tmp][x]){
                        drawSquare(x*pixelSize,y*pixelSize, 'lightgray', pixelSize);
                        tmp=0;
                    }
                    tmp--;
                }
                if(y>1 && image[y-1][x]){
                    if(y>1 && image[y-2][x]){
                        drawSquare(x*pixelSize,y*pixelSize, 'grey)', pixelSize);
                    } else {
                        drawSquare(x*pixelSize,y*pixelSize, 'silver', pixelSize);
                    }
                    
                }
            }
            
        }
    }
    
    //2nd Pass for waterfalls
    var waterfallNum = 0.0;
    for(var y = 4; y< height-1; y++){
        for(var x = 1; x< width-1; x++){
            if(Math.random()<0.00005*y*pixelSize){
                if(waterfallNum<5){
                    if(!image[y][x] && !image[y][x-1]&& !image[y][x+1] && 
                       !image[y-1][x] && !image[y-1][x-1]&& !image[y-1][x+1] && 
                       !image[y-2][x] && !image[y-2][x-1]&& !image[y-2][x+1] && 
                       !image[y-3][x] && !image[y-3][x-1]&& !image[y-3][x+1] && 
                       image[y-4][x] && image[y-4][x-1]&& image[y-4][x+1]){
                        drawSquare(x*pixelSize,y*pixelSize, 'dimgrey', pixelSize);
                        waterfallNum++;
                        for(var i = 1; i < height-y; i++){
                            if(!image[y+i][x]){
                                drawSquare(x*pixelSize,(y+i)*pixelSize, 'skyblue', pixelSize);
                            } else if(image[y+i][x-1]){
                                drawSquare((x-1)*pixelSize,(y+i)*pixelSize, 'skyblue', pixelSize);
                            } else if(image[y+i][x+1]){
                                drawSquare((x+1)*pixelSize,(y+i)*pixelSize, 'skyblue', pixelSize);
                            }
                        }
                    }
                    
                }
            }
        }
    }
}

function calculateCell(a){
    var n = 0, l = a.length;
    for (var i = 0; i < l; ++i) {
        n = (n << 1) + (a[i] ? 1 : 0);
    }
//    console.log(ruleArray.length-n);
    
    return ruleArray[ruleArray.length-n-1];
}

function buildRuleArray(){
    var base2 = (rule).toString(2);
    while(ruleArray.length != base2.length){
        base2 = 0 + base2;
    }
    for(var index in base2){
        if(base2[index] == 0){
            ruleArray[index] = false;
        } else {
            ruleArray[index] = true;
        }
    }
}

function calculateRule(){
    var base2 = (rule).toString(2);
    while(ruleArray.length != base2.length){
        base2 = 0 + base2;
    }
    for(var index in base2){
        if(base2[index] == 0){
            ruleArray[index] = false;
        } else {
            ruleArray[index] = true;
        }
    }
}

function drawPixel(x,y,color){
    var id = ctx.createImageData(1,1);
    var d  = id.data;                  
    d[0]   = color[0];
    d[1]   = color[1];
    d[2]   = color[2];
    d[3]   = color[3];
    ctx.putImageData( id, x, y ); 
}

function drawSquare(x,y,color,size){
    ctx.fillStyle =color;
    ctx.fillRect(x,y,size,size);
}

function resizeCanvas(e) {
	canvas.width = document.body.clientWidth;
	canvas.height = document.body.clientHeight;
}

Array.matrix = function(numrows, numcols, initial){
   var arr = [];
   for (var i = 0; i < numrows; ++i){
      var columns = [];
      for (var j = 0; j < numcols; ++j){
         columns[j] = initial;
      }
      arr[i] = columns;
    }
    return arr;
}


function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}