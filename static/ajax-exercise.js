'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  fetch('/fortune').then((response)=>response.text()).then((serverData)=>{
    document.querySelector('#fortune-text').innerText=serverData;
  });


}

document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const url = '/weather.json';
  const zipcode = document.querySelector('#zipcode-field').value;

  fetch(`/weather.json?zipcode=${zipcode}`)
  .then((response)=>response.json())
  .then((responseJson)=>{document.querySelector('#weather-info').innerHTML=responseJson.forecast;});
}
document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();

  const formInputs = {
    melon_type: document.querySelector("#melon-type-field").value,
    qty: document.querySelector("#qty-field").value
  };

  fetch('/order-melons.json', { 
    method: 'POST',
    body: JSON.stringify(formInputs),
    headers: {'Content-Type': 'application/json',
  },
  })
  .then((response) => response.json())
  .then(updateMelons);
}
document.querySelector('#order-form').addEventListener('submit', orderMelons);
