'use strict'

const extradition = document.querySelector('.extradition'),
  kind = document.querySelector('.kind'),
  city = document.querySelector('.city'),
  variant = document.querySelector('.variant'),
  width = document.querySelector('.width'),
  length = document.querySelector('.length'),
  height = document.querySelector('.height'),
  weight = document.querySelector('.weight'),
  size = document.querySelector('.size'),
  calculationInnerButton = document.querySelector('.calculation__inner-button'),

  points = document.querySelectorAll('.point'),
  lineInnerBox = document.querySelectorAll('.line__inner-box'),
  
  chekingInnerButton = document.querySelector('.cheking__inner-button'),
  chekingInnerInput1 = document.querySelector('.cheking__inner-content > input:first-child'),
  chekingInnerInput2 = document.querySelector('.cheking__inner-content > input:last-child'),
  masOfPhrase = ['в пути', 'на середине пути', 'скоро прибудет в пункт назначения', 'только выехал', 'ожидает', 'на таможне'];

const findOption = (select) => {
  for (let i = 0; i < select.length; i++) {
    if (select[i].selected) {
      return select[i];
    }
  }
}

const randomInteger = (min, max) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

const lightOn = (event) => {
  const number = event.target.closest('.point').dataset.num - 1;

  lineInnerBox[number].classList.add('box_active');
}

const lightOff = (event) => {
  const number = event.target.closest('.point').dataset.num - 1;

  lineInnerBox[number].classList.remove('box_active');
}

calculationInnerButton.addEventListener('click', () => {
  let price = 500;
  const curExtradition = findOption(extradition);
  const curKind = findOption(kind);
  const curCity = findOption(city);
  const curVariant = findOption(variant);
  const curWidth = width.value;
  const curLength = length.value;
  const curHeight = height.value;
  const curWeight = weight.value;
  const curSize = size.value;

  if (curWidth > 0 && curLength > 0 && curHeight > 0 && curWeight > 0 && curSize > 0) {
    price = Math.round(price * curExtradition.dataset.koef * curKind.dataset.koef * curCity.dataset.koef * curVariant.dataset.koef * curWidth * width.dataset.koef * curLength * length.dataset.koef * curHeight * height.dataset.koef * curWeight * weight.dataset.koef * curSize * size.dataset.koef);

    alert(price);

  } else {
    alert('Вы ввели не все данные или недопустимые значения');
  }
});

points.forEach((item) => {
  item.addEventListener('mouseover', () => {
    lightOn(event)
  });
  item.addEventListener('mouseout', () => {
    lightOff(event);
  });
});

chekingInnerButton.addEventListener('click', () => {
  const curCode = chekingInnerInput1.value;
  const curNumber = chekingInnerInput2.value;

  if (curCode > 0 && curNumber > 0 ) {
    alert(`Заказ с номером: ${curNumber} ${masOfPhrase[randomInteger(0, 5)]}`);
  } else {
    alert('Вы ввели не все данные или недопустимые значения');
  }
})




