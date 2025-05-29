const dropdowns = document.querySelectorAll('.dropdown select');
let btn = document.querySelector("form button");
let fromcurr = document.querySelector('.from select');
let tocurr = document.querySelector('.to select');

for (select of dropdowns) {
    for(currcode in countryList) {
        let option = document.createElement('option');
        option.innerText = currcode;
        option.value = currcode;
        if (select.name === "from" && currcode == 'USD') {
            option.selected = "selected";
        }else if(select.name === "to" && currcode == 'INR') {
            option.selected = "selected";
        }
        select.append(option);
    }
    select.addEventListener('change', e => {
        updateFlag(e.target);
    });
}

const updateFlag = (ele) => {
    let currcode = ele.value;
    let concode = countryList[currcode];
    let URL = `https://flagsapi.com/${concode}/flat/64.png`;
    let img = ele.parentElement.querySelector('img');
    img.src = URL;
}

updatecurr = async() => {
  let amount = document.querySelector('.amt input');
    let amtvalue = amount.value;
    if (amtvalue === "" || amtvalue <= 0) {
        amtvalue = 1;
        amount.value = amtvalue;
        return;
    }

    let  URL = `https://api.frankfurter.app/latest?from=${fromcurr.value}&to=${tocurr.value}`;
    
    let res = await fetch(URL);
    let data = await res.json();;
    let rate = data.rates[tocurr.value];
    let total = (rate * amtvalue).toFixed(2);
    let result = document.querySelector('.msg');
    result.innerText = ` ${amtvalue} ${fromcurr.value} = ${total} ${tocurr.value}`;
    window.history.replaceState({}, '', `${location.pathname}?from=${fromcurr.value}&to=${tocurr.value}`);

}

btn.addEventListener('click', (evt) => {
    evt.preventDefault();
    updatecurr();
});

window.addEventListener('load', () => {
    updatecurr();
})
 
