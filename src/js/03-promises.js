import Notiflix from "notiflix";
const form = document.querySelector('.form');
const delay = document.querySelector('input[name="delay"]');
const step = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');

form.addEventListener("submit", (evt) => {
  evt.preventDefault();


  const delayValue = parseInt(delay.value);
  const stepValue = parseInt(step.value);
  const amountValue = parseInt(amount.value);

  for (let i = 0; i < amountValue; i++) {
    const position = i + 1;
    const promiseDelay = delayValue + i * stepValue;
    createPromise(position, promiseDelay).then(({ position, delay }) => {
      Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
    }).catch(({ position, delay }) => {
      Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
    });
  }});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) { 
        resolve({position,delay})
      }
      else {
        reject({position, delay})  
      }

    }, delay);
  });
    
}

