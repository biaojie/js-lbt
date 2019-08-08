var count = 0;
var picUl = document.getElementsByTagName('ul')[0],
    moveWidth = picUl.children[0].offsetWidth;
var iall = document.getElementsByTagName('i'),
    iLen = iall.length;
var left = document.getElementsByClassName('left')[0],
    right = document.getElementsByClassName('right')[0],
    box = document.getElementsByTagName('div')[0];
var boolean = true;
var realPicNum = picUl.children.length - 1;
var timer = setInterval(autoMove,2000);
left.onclick = function (){
    autoMove(-1)
}
right.onclick = function (){
    autoMove(1)
}
box.onmouseover = function(){
    clearInterval(timer);
}
box.onmouseout = function (){
    timer = setInterval(autoMove,2000)
}
for(var i = 0; i < iLen; i++) {
    iall[i].onclick = (function (i){
        return function(){
            count = i;
            changCir(count);
            move(picUl,{left: - moveWidth * i},function () {
                boolean = true;
            })
        }
    })(i)
}



function move(obj, data,func) {
    clearInterval(obj.timer);
    var iSpeed,
        iCur,
        name;

    startTimer = obj.timer = setInterval(function (){
        var bStop = true;
        for(var attr in data){
            if(attr === 'opacity'){
                name = attr;
                iCur = parseFloat(getStyle(obj,attr)) * 100;
            }else{
                
                iCur = parseInt(getStyle(obj,attr));
            }
            iSpeed = (data[attr] - iCur) / 8;
            if(iSpeed > 0){
                iSpeed = Math.ceil(iSpeed);
            }else{
                
                iSpeed = Math.floor(iSpeed);   //  -50
            }
            if(attr === 'opacity'){
                obj.style.opacity = (iCur + iSpeed) / 100;
            }else{
                obj.style[attr] = iCur + iSpeed + 'px';      //  -50
            }
            if(Math.floor(Math.abs(data[attr] - iCur)) != 0){
                bStop = false;
            }
        }
        if(bStop){
            clearInterval(obj.timer);
            if(name === 'opacity'){
                obj.style.opacity = data[name] / 100;
            }
            func();
        }
    },30);
}
function autoMove(demo) {
    if (boolean){
        boolean = false;
        if(demo == 1 || !demo){
            count ++;
            if(count == 5){
                count = 0;
            }
            changCir(count);
            move(picUl,{left:picUl.offsetLeft - moveWidth},function () {
                if(count == 0){
                    picUl.style.left = '0px';
                }
                boolean = true;
            })
        }else if (demo == -1){
            if(picUl.offsetLeft == 0){
                
                picUl.style.left = -moveWidth * realPicNum + 'px';
                count = realPicNum;
            }
            count --;
            changCir(count);
            move(picUl,{left:picUl.offsetLeft + moveWidth},function () {
                boolean = true;
            })
        }
    }
}
function getStyle(elem,style){
    if(window.getComputedStyle){
        return window.getComputedStyle(elem,null)[style];
    }else{
        return elem.currentStyle[style];
    }
}
function changCir (demo){
    for(var i = 0; i < iLen; i++){
        iall[i].className = '';
    }
    iall[demo].className = 'circle'
}