let number_button=document.getElementsByClassName('number');
let display=document.getElementById("display");
let all_clear=document.getElementById("All_Clear");
let clear_last=document.getElementById("clear_last");
let answer=document.getElementById("answer");
let square=document.getElementById("square");
let exponential=document.getElementById("exponential");
let sin=document.getElementById("sin");
let cos=document.getElementById("cos");
let tan=document.getElementById("tan");
let deg=document.getElementById("degree/radian");
let second=document.getElementById("second");
let fraction=document.getElementById("fraction");
let pi=document.getElementById("pi");
let root=document.getElementById("root");
let log=document.getElementById("log");
let ln=document.getElementById("ln");
let percentage=document.getElementById("percentage");
let factorial=document.getElementById("factorial");
let e=document.getElementById("e");

let sound=new Audio("click.wav");

fraction.addEventListener("click",(event)=>{
    input=display.value;
    if(input=="0")
        input='';
    input="1/"+input;
    display.value=input;
    let sound=new Audio("click.wav");
    sound.play();
})

root.addEventListener("click",(event)=>{
    display.value="root("
    flag=4;
    sound.play();
})

log.addEventListener("click",(event)=>{
    display.value="log("
    flag=5;
    sound.play();
})

ln.addEventListener("click",(event)=>{
    display.value="ln("
    flag=6;
    sound.play();
})

percentage.addEventListener("click",(event)=>{
    display.value=display.value+"%";
    flag=7;
    sound.play();
})

factorial.addEventListener("click",(event)=>{
    display.value=display.value+"!";
    flag=8;
    sound.play();
})

pi.addEventListener("click",(event)=>{
    display.value=display.value+"3.14";
    sound.play();
})

e.addEventListener("click",(event)=>{
    display.value=display.value+"2.72";
    sound.play();
})



second.addEventListener("click",(event)=>{
    if(sin.innerText=="sin")
    {
        sin.innerText="asin";
        cos.innerText="acos";
        tan.innerText="atan";
    }
    else
    {
        sin.innerText="sin";
        cos.innerText="cos";
        tan.innerText="tan";
    }
    sound.play();
})

let flag=0;

console.log(deg.innerText);


deg.addEventListener("click",(event)=>{
    if(deg.innerText=="deg")
        deg.innerText="rad"
    else
        deg.innerText="deg"
    sound.play();
})

for(let i=0;i<number_button.length;i++)
{
    number_button[i].addEventListener("click",(event)=>{
        console.log(event.target.attributes.id.nodeValue);
        let input='';
        if(display.value!=0)
            input=display.value;
        input=input+event.target.attributes.id.nodeValue;
        display.value=input;
        sound.play();
    })
}

all_clear.addEventListener("click",(event)=>{
    sound.play();
    display.value="0";
})

clear_last.addEventListener("click",(event)=>{
    sound.play();
    let input=display.value;
    let newinput='';
    for(let i=0;i<input.length-1;i++)
    {
        newinput=newinput+input[i];
    }
    if(newinput=='')
        newinput='0'
    display.value=newinput;
})

function precedence(op) {
    if (op === '+' || op === '-') {
        return 1;
    }
    if (op === '*' || op === '/') {
        return 2;
    }
    if(op=='^'){
        return 3;
    }
    return 0;
}

// Function to perform arithmetic operations
function applyOp(a, b, op) {
    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return Math.floor(a / b); // Ensuring integer division
        case '^': return Math.floor(Math.pow(a,b)); 
    }
}

function evaluate(tokens) {
    let values = []; // Stack to store integer values
    let ops = [];    // Stack to store operators

    for (let i = 0; i < tokens.length; i++) {
        // Current token is a whitespace, skip it
        if (tokens[i] === ' ') {
            continue;
        }

        // Current token is an opening brace, push it to 'ops'
        if (tokens[i] === '(') {
            ops.push(tokens[i]);
        }

        // Current token is a number, push it to stack for numbers
        else if (tokens[i] >= '0' && tokens[i] <= '9') {
            let val = 0;

            // There may be more than one digits in number
            while (i < tokens.length && tokens[i] >= '0' && tokens[i] <= '9') {
                val = (val * 10) + (tokens[i] - '0');
                i++;
            }
            values.push(val);

            // right now the i points to the character next to the digit,
            // since the for loop also increases the i, we would skip one
            // token position; we need to decrease the value of i by 1 to
            // correct the offset
            i--;
        }

        // Closing brace encountered, solve entire brace
        else if (tokens[i] === ')') {
            while (ops.length !== 0 && ops[ops.length - 1] !== '(') {
                let val2 = values.pop();
                let val1 = values.pop();
                let op = ops.pop();
                values.push(applyOp(val1, val2, op));
            }

            // pop opening brace
            if (ops.length !== 0) {
                ops.pop();
            }
        }

        // Current token is an operator
        else {
            // While top of 'ops' has same or greater precedence to current token,
            // which is an operator. Apply operator on top of 'ops' to top two elements
            // in values stack
            while (ops.length !== 0 && precedence(ops[ops.length - 1]) >= precedence(tokens[i])) {
                let val2 = values.pop();
                let val1 = values.pop();
                let op = ops.pop();
                values.push(applyOp(val1, val2, op));
            }

            // Push current token to 'ops'
            ops.push(tokens[i]);
        }
    }

    // Entire expression has been parsed at this point, apply remaining ops to remaining values
    while (ops.length !== 0) {
        let val2 = values.pop();
        let val1 = values.pop();
        let op = ops.pop();
        values.push(applyOp(val1, val2, op));
    }

    // Top of 'values' contains result, return it
    return values[values.length - 1];
}

function isNumeric(token){
    if(token>='0' && token<='9')
    {
        return 1;
    }
    else return 0;
}

answer.addEventListener("click",(event)=>{
    sound.play();
    let ans=0;
    if(flag!=0)
    {
        let input=display.value;
        let number=0;
        let i;
        let isNeg=0;
        for(i=0;i<input.length;i++)
        {
            if(input[i]=='-')
                isNeg=1
            if(isNumeric(input[i]))
                break;
        }
        console.log(i);
        let isFloat=0;
        let floatnumber='';
        while(isNumeric(input[i]))
        {
            console.log("hello");
            floatnumber+=input[i];
            number=number*10+(input[i]-'0');
            i++;
            if(input[i]=='.'){
                floatnumber+=input[i];
                i++;
                isFloat=1;
            }
        }
        floatnumber=parseFloat(floatnumber);
        let radian=0;
        if(isFloat)
            number=floatnumber;
        if(isNeg){
            number=-number;
            floatnumber=-floatnumber;
        }
        if(deg.innerText=="deg"){
            radian=number * (Math.PI / 180);
        }
        else{
            radian=number;
        }
        console.log(number);
        console.log(radian);
        if(flag==1)
        {
            if(sin.innerText=="sin")
                ans=Math.sin(radian);
            else
            {
                ans=Math.asin(floatnumber);
            }
        }
        else if(flag==2)
        {
            if(cos.innerText=="cos")
                ans=Math.cos(radian);
            else
                ans=Math.acos(floatnumber);
        }
        else if(flag==3)
        {
            if(tan.innerText=="tan")
                ans=Math.tan(radian);
            else
                ans=Math.atan(floatnumber);
        }
        else if(flag==4)
        {
            ans=Math.pow(floatnumber,0.5);
        }
        else if(flag==5)
        {
            ans=Math.log10(floatnumber);
        }
        else if(flag==6)
        {
            ans=Math.log(floatnumber);
        }
        else if(flag==7)
        {
            ans=floatnumber/100;
        }
        else if(flag==8)
        {
            ans=1;
            for(let i=1;i<=floatnumber;i++)
                ans=ans*i;
        }
        flag=0;
    }
    else{
        ans=evaluate(display.value);
    }
    display.value=ans;
})

square.addEventListener("click",(event)=>{
    let input=display.value;
    sound.play();
    input=input+"^2";
    display.value=input;
})

exponential.addEventListener("click",(event)=>{
    sound.play();
    let input=display.value;
    input=input+"^";
    display.value=input;
})

sin.addEventListener("click",(event)=>{
    sound.play();
    if(sin.innerText=="sin"){
        let input="Sin(";
        flag=1;
        display.value=input;
    }
    else{
        let input="aSin(";
        flag=1;
        display.value=input;
    }
})

cos.addEventListener("click",(event)=>{
    sound.play();
    if(cos.innerText=="cos"){
        let input="Cos(";
        flag=2;
        display.value=input;
    }
    else{
        let input="aCos(";
        flag=2;
        display.value=input;
    }
})

tan.addEventListener("click",(event)=>{
    
    if(tan.innerText=="tan"){
        let input="Tan(";
        flag=3;
        display.value=input;
    }
    else{
        let input="aTan(";
        flag=3;
        display.value=input;
    }
    sound.play();
})
