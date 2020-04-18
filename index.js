const buttons = document.querySelectorAll("button");
const input = document.querySelector("input"); 
input.focus();

var validValues = "0123456789. ";
var plusMinus = "+-";
var timesDivided = "x/×÷*";
var validOperations = plusMinus + timesDivided;
var validChars = validValues + validOperations;
var allowDot = false;


for(var i = 0; i < buttons.length; i++){
  buttons[i].onclick = function(){
    switch(this.innerHTML){

      case "←":
        input.value = input.value.substring(0, input.value.length - 1);
        break;
      case "=":
        execute();
        break;
      case "−":
        input.value += "-";
        break;
      default:
        input.value += this.innerHTML;
        break;
    }
    input.focus();    
  };
}


input.onkeydown = (event)=>{
  

  if(event.key == "Enter" || event.key == "="){
    event.preventDefault();
    execute();
  }
  if(event.key == "."){

    if(input.value.length == 1){
      allowDot = true;
    }else{
      allowDot = false;
    }

    for(var i = 0; i < input.value.length; i++){
      if(input.value[i] == "."){
        allowDot = false;
      }else if(validOperations.indexOf(input.value[i])!=-1 && i != input.value.length -1){
        allowDot = true;
      }
    }
    if(!allowDot){
      event.preventDefault();
    }
  }
  if(validChars.indexOf(event.key) == -1){
    if(event.key != "Backspace" 
      && event.key != "ArrowLeft"
      && event.key != "ArrowRight"
      && event.key != "ArrowUp"
      && event.key != "ArrowDown"
      && event.key != "Control"
      && event.key != "Alt"
      && event.key != "Tab"
      && event.key != "Shift"
      && event.key != "Escape"
    ){
      event.preventDefault();
    }
    
  }
}

input.onkeyup = input.onkeypress = (event)=>{
  while(input.value.indexOf("x") != -1){
    input.value = input.value.replace("x", "×");
  }
  while(input.value.indexOf("*") != -1){
    input.value = input.value.replace("*", "×");
  }
  while(input.value.indexOf("/") != -1){
    input.value = input.value.replace("/", "÷");
  }
}


function execute(){
  var value = input.value;

  while(value.indexOf(" ") != -1){
    value = value.replace(" ", "");
  }

  var nums = [];
  var num = "";

  for(var i = 0; i < value.length; i++){
    if(i > 0 && plusMinus.indexOf(value[i]) != -1){
      if(num != "")nums.push(num);
      num = "";
    }
    num += value[i];
    if(timesDivided.indexOf(value[i]) !=-1){
      nums.push(num);
      num = "";
    }
  }
  nums.push(num);

  nums = levelTwo(nums);
  var result = levelOne(nums);

  input.value = round(result, 2);
  if(input.value == "NaN"){
    alert("I'm sorry, try it again.");
    input.value = "";
  }
}  

function levelTwo(nums){
  var newNums = [];

  for(var i = 0; i < nums.length; i++){
    if(nums[i] != null){
      var num = multip(nums[i], i);
      newNums.push(num);
    }    
  }

  return newNums;


  function multip(num, c){
    var result;

    if(num.indexOf("×") != -1){
      result = Number(num.replace("×", "")) * multip(nums[c+1], c+1);
    }else if(num.indexOf("÷") != -1){
      result = Number(num.replace("÷", "")) / multip(nums[c+1], c+1);
    }else{
      result = Number(num);
    }

    nums[c] = null;

    return result;
  }
}

function levelOne(nums){
  var result = 0;

  for(var i = 0; i < nums.length; i++){
    result = result + Number(nums[i]);
  }

  return result;
}


function round(x, precision){
    var y = Math.round(x * Math.pow(10, precision));
    return y / Math.pow(10, precision);
}