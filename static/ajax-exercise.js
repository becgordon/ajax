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
function updateMelons(results) {
  if (results.code === "OK") {
    document.querySelector('#order-status').classList.remove('.order-error');
    document.querySelector('#order-status').innerHTML=`<p>${results.msg}</p>`;
  } 
  else {
    document.querySelector('#order-status').classList.add('.order-error');
    document.querySelector('#order-status').innerHTML=`<p>${results.msg}</p>`;

  };
}


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

// FURTHER STUDY

function getDog(evt) {
fetch('https://dog.ceo/api/breeds/image/random')
.then((response) => response.json())
.then((dogImage) => {
  const imageURL = dogImage.message;
  document.querySelector('#dog-image').insertAdjacentHTML('beforeend', `<div><img src=${imageURL}></div>`);
  });

};

document.querySelector('#get-dog-image').addEventListener('click', getDog);