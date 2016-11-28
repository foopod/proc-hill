var ctx;
var canvas;
var pixelSize = 5;

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
    
    calculateRule();
//    console.log(ruleArray);
    
    perform();
    
}

function perform(){
    var num = 0;
    var centre = Math.floor(width/2);
    image[0][centre] = true;
    image[1][centre] = true;
    
//    console.log(image);
    
    for(var y = 2; y < height; y++){
        rule = ruleset[getRandomInt(0,ruleset.length)];
        calculateRule();
        for(var x =0; x < width; x++){
            if(x > 1 && x < width-2){
                var sub = image[y-1].slice(x-1,x+2);
//                var sub2 = image[y-2].slice(x-2,x+3);
                var num = 0;
                for(var t = 0; t < sub.length; t++){
                    if(sub[t]){
                        num++;
                    }
                }
//                console.log(sub);
//                console.log(calculateCell(sub));
                image[y][x] =calculateCell(sub);
//                if((num>=0 && num<2) || ((image[y-2][x+1] || image[y-2][x-1]))){
////                    console.log(true);
//                    if(num == 1 && (sub[0] || sub[4])){
//                        
////                    console.log(image);
//                       }else{
//                           
//                            image[y][x] = true;
//                           }
//            }
//                
            }
        }
    }
    
    for(var y = 0; y< height; y++){
        for(var x = 0; x< width; x++){
            if(image[y][x]){
                drawSquare(x*pixelSize,y*pixelSize, 'rgb('+Math.floor(height-y+255-y)+','+Math.floor(height-y+255-y)+','+Math.floor(height-y+255-y)+')', pixelSize);
                num++;
            } else {
                drawSquare(x*pixelSize,y*pixelSize, 'skyblue', pixelSize);
                var tmp = y;
                while(tmp>0){
                    if(image[tmp][x]){
                        drawSquare(x*pixelSize,y*pixelSize, 'rgb('+Math.floor(y*0.5)+','+Math.floor(y*0.5)+','+Math.floor(y*0.5)+')', pixelSize);
                        tmp=0;
                        console.log('rgb('+Math.ceil(height-y)+','+Math.ceil(height-y)+','+Math.ceil(height-y)+')');
                    }
                    tmp--;
                }
                if(y>1 && image[y-1][x]){
                    if(y>1 && image[y-2][x]){
                        drawSquare(x*pixelSize,y*pixelSize, 'rgb('+Math.floor(y*1)+','+Math.floor(y*1)+','+Math.floor(y*1)+')', pixelSize);
                    } else {
                        drawSquare(x*pixelSize,y*pixelSize, 'rgb('+Math.floor(y*0.5)+','+Math.floor(y*0.7)+','+Math.floor(y*0.8)+')', pixelSize);
                    }
                    
                }
            }
            
        }
    }
    if(num>30){
//        console.log(rule + " is good");
    }
//    console.log(rule);
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