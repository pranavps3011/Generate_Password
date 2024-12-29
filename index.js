const displayPassword = document.querySelector(".display-pass");
const imgCopy = document.querySelector(".img-copy");
const displayNumber = document.querySelector(".number");
const range = document.querySelector("input[type=range]");
const checkboxDiv = document.querySelectorAll("input[type=checkbox]");
const uppercase = document.querySelector("#uppercase");
const lowercase = document.querySelector("#lowercase");
const numbers = document.querySelector("#numbers");
const symboles = document.querySelector("#symboles");
const strength = document.querySelector(".strength");
const generateDiv = document.querySelector(".generate-div");
const copyMes = document.querySelector(".copy-mes");
const symbole = `!@#$%^&*(,){.}[|\':;<>?/+-_]`;


let password ="";
let passLen = 10;
let checkcount = 0;
handelRange();

function handelRange (){
    range.value=passLen;
    displayNumber.innerText = passLen;
    const min = range.min;
    const max = range.max;
}



function getRanInt(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}

function generateRanNumber(){
    return getRanInt(0,10);
}
function generateRanUppercase(){
    return String.fromCharCode(getRanInt(65,90));
}
function generateRanlowercase(){
    return String.fromCharCode(getRanInt(97,123));
}
function generateRanSymbole(){
    return symbole[getRanInt(0,symbole.length)];
}

function calcStrenthness(){
    let hasupper = false;
    let haslower = false;
    let hasnum = false;
    let hassym = false;
    if(uppercase.checked) hasupper=true;
    if(lowercase.checked) haslower=true;
    if(numbers.checked) hasnum=true;
    if(symboles.checked) hassym=true;

    if(hasupper && haslower && (hasnum || hassym) && passLen>=8){
        strength.style = "background-color:green";
    }
    else if((hasupper || haslower) && (hasnum || hassym) && passLen>=4){
        strength.style = "background-color:grey";
    }
    else{
        strength.style = "background-color:red";
    }

}


async function copyContent(){
    try{
    await navigator.clipboard.writeText(displayPassword.value);
    copyMes.innerText ="copied";
    }
    catch(er){
        copyMes.innerText="failed";
    }

    copyMes.classList.add("active");

    setTimeout(()=>{
        copyMes.classList.remove("active");
        copyMes.innerText ="";
    },2000);

}



function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}



function handelCheckbox(){
    checkcount=0;
    checkboxDiv.forEach((box) =>{
        if(box.checked){
            checkcount++;
        }
    })

    if(passLen < checkcount){
        passLen=checkcount;
        handelRange();
    }
}

checkboxDiv.forEach((box) =>{
    box.addEventListener("change" , handelCheckbox)
})


range.addEventListener('input' ,(e) =>{
    passLen = e.target.value;
    handelRange();
});


imgCopy.addEventListener("click" , ()=>{
     if(displayPassword.value){
        copyContent();
     }
})


generateDiv.addEventListener("click" , ()=>{
    if(checkcount == 0) 
        return;

    if(passLen < checkcount) {
        passLen = checkcount;
        handelRange();
    }
   password="";
    console.log(1);
    let funcArr = [];

    if(uppercase.checked)
        funcArr.push(generateRanUppercase);

    if(lowercase.checked)
        funcArr.push(generateRanlowercase);

    if(numbers.checked)
        funcArr.push(generateRanNumber);

    if(symboles.checked)
        funcArr.push(generateRanSymbole);

    //compulsory addition
    for(let i=0; i<funcArr.length; i++) {
        password += funcArr[i]();
    }

    //remaining adddition
    for(let i=0; i<passLen-funcArr.length; i++) {
        let randIndex = getRanInt(0 , funcArr.length);
        password += funcArr[randIndex]();
    }
    
    //shuffle the password
    password = shufflePassword(Array.from(password));
    
    //show in UI
    displayPassword.value = password;
    //calculate strength
    calcStrenthness();
})