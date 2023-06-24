let clickCount = 0;
let text;

function clickHandler(evt){
   clickCount++;
   console.log(evt);
   let str = "Thanks for clicking " + clickCount;
   this.innerText = str;
}

let p = document.getElementById("pElement");
p.addEventListener("click", clickHandler);

function bodyClick()
{
    console.log("Du sollst auf den Text drücken");
}

function btnClick()
{
    p.innerHTML = prompt("Geben sie einen Text ein:");
}

let btn = document.getElementById("btnElement");
btn.addEventListener("click", btnClick);

function loadCallback()
{
    alert("Webseite ist geladen...");
}

window.onload = loadCallback;

function keyCallback(evt)
{
    console.log(evt.key);
}

window.onkeydown = keyCallback;


function bodyClick(evt)
{
    console.log("Body was clicked... ", evt.pageX, evt.pageY);
}

window.onclick = bodyClick;

function setup()
{
    createCanvas(500, 500);
    background("red");
}
function mouseClicked() 
{
    console.log(mouseX, mouseY);
}