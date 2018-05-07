document.body.setAttribute("style", "margin: 0")

var container= document.createElement("div")
container.classList.add("container")
document.body.appendChild(container)
var canvas= document.createElement("canvas");
canvas.id= "canvas"
canvas.width= 500
canvas.height= 500
canvas.setAttribute("style", " float: left;")
container.appendChild(canvas)
var ctx= canvas.getContext("2d");
var img= new Image();
canvas.style.border= "2px solid black";
var img2= new Image();

var upload = document.createElement('input');
upload.type= "file"
container.appendChild(upload)

upload.addEventListener('change', function(e) {
    url = URL.createObjectURL(e.target.files[0]);  
    img.setAttribute('src', url);
        setInterval(function(){
            img2.setAttribute('src', url);
        })


});





    var barway= document.createElement("div");
    barway.classList.add("barway");
    barway.setAttribute("style","width: 200px; height: 3px; background: gray; float: left; position: absolute; top: 10%; left: 80%");
    document.body.appendChild(barway)

    var barinside= document.createElement("div");
    barinside.setAttribute("style", "position: realtive; width: 100%; height: 100%")
    barway.appendChild(barinside)

    var bar= document.createElement("div");
    bar.classList.add("bar");
    bar.setAttribute("style", "top: -250%; position: absolute; left:0; width: 20px; height: 20px; border-radius: 100%; background: red;")
    barinside.appendChild(bar)

    var displayer= document.createElement("div");
    displayer.classList.add("displayer");
    displayer.setAttribute("style", "position: absolute; top: 15px; left: 0;");
    barinside.appendChild(displayer)

    var a= 0;
    var b= 0;
    bar.addEventListener("mousedown", function(event){
        event.preventDefault();
        if(b==0){
            a= event.clientX;
            b++
        }
        window.addEventListener("mousemove", move)})


    window.addEventListener("mouseup", function(event){
        event.preventDefault();
        window.removeEventListener("mousemove", move)
    })

    function move(e){
        var diff= e.clientX- a;
        if(diff/2>100){
            diff= 200;
        }
        if(diff/2<0){
            diff=0;
        }
        bar.style.left= (diff/2)+"%"
        displayer.innerHTML= ""+(Math.floor(bar.offsetLeft/2))+"% Zoom"
    }


    function draw(){
        img.onload=function(){
            ctx.drawImage(img, 0,0,this.width,this.height, 0,0, canvas.width,canvas.height)
        }
        
    }
setInterval(function(){
    draw()
},1)

var croper = document.createElement("div")
croper.classList.add("div");
croper.setAttribute("style", "min-height: 50px; min-width: 50px; resize: both; overflow: hidden; border: 2px solid blue; width: 50px; height: 50px; position: absolute; left: 0%; top: 0%; z-index: 5555; ");
container.appendChild(croper)

var drag= document.createElement("div");
drag.classList.add("drag")
drag.innerHTML= "DRAG"
drag.setAttribute("style", "text-align: center; cursor: all-scroll;user-select: none; width: 100%; height: 15px; color: white");
croper.appendChild(drag)
var l=0;
var Xwidth=0;
var Yheight=0;

function mover(e){
    x= e.clientX-Xwidth;
    y= e.clientY-Yheight;
 
        croper.style.left= x+"px";
  
    croper.style.top= y+"px"
    if((parseInt(croper.style.left)+croper.clientWidth)>canvas.clientWidth){
        croper.style.left= (canvas.clientWidth-croper.clientWidth)+"px"
    }
    if(parseInt(croper.style.top)+croper.clientHeight>canvas.clientHeight){
        croper.style.top= (canvas.clientHeight-croper.clientHeight)+"px"
    }
    if(parseInt(croper.style.top)<0){
        croper.style.top= 0+"px"
    }
    if(parseInt(croper.style.left)<0){
        croper.style.left= 0+"px"
    }
}
drag.addEventListener("mousedown", function(e){
    
    window.addEventListener("mousemove", mover)
    Xwidth= e.clientX- parseInt(croper.style.left)
    Yheight= e.clientY- parseInt(croper.style.top)
})
window.addEventListener("mouseup", function(){

    window.removeEventListener("mousemove", mover)
})

var canvas2=  document.createElement("canvas");
canvas2.id= "canvas2"
canvas2.width= 500;
canvas2.height= 500;
canvas2.setAttribute("style", "float: left; border: 2px solid black; margin-left: 20px;");
container.appendChild(canvas2)

var ctx2 = canvas2.getContext("2d");


function draw2(){
    img2.onload=function(){

        var k=croper.clientWidth*(this.width/500)-(bar.offsetLeft*4)
        var k2= croper.clientHeight*(this.height/500)-(bar.offsetLeft*2)
        if(k<10){
            k=10;
        }
        if(k2<10){
            k2=10
        }
        ctx2.drawImage(img2, (parseInt(croper.style.left)*(this.width/500))+(bar.offsetLeft*2), (parseInt(croper.style.top)*(this.height/500)+(bar.offsetLeft/2)),(k), (k2), 0,0, canvas2.width,canvas2.height)

    }

    croper.style.maxHeight= (canvas.clientHeight- parseInt(croper.style.top))+"px"
    croper.style.maxWidth= (canvas.clientWidth- parseInt(croper.style.left))+"px"    
    setInterval(function(){
        img2.src;
    },1)
}
setInterval(function(){
draw2()
},1)
