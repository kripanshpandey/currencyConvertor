const Base_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("#submit");
const btn2 = document.querySelector('#Exc')
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for(let select of dropdown){
    for (currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if(select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt) => {
    updateFlag(evt.target);
    });
}


const updateExchangeRate = async() => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal<1) {
        amtVal = 1;
        amount.value = "1";
    }
    
    const URL = `${Base_URL}/${fromCurr.value.toLowerCase()}.json`
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    console.log(rate);

    let finalAmount = amtVal*rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
};

const updateFlag = (element) =>  {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener ("click",(evt) => {
    evt.preventDefault();
    updateExchangeRate();
})

btn2.addEventListener ("click",(evt) => {
    evt.preventDefault();
    swapButton();
})


window.addEventListener("load", () => {
    updateExchangeRate();
})



const swapButton = () => {
    
        let temp = fromCurr.value;
        fromCurr.value = toCurr.value;
        toCurr.value = temp;
        updateFlag(fromCurr);
        updateFlag(toCurr);
    }

    