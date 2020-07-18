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
  masOfPhrase = ['в пути', 'на середине пути', 'скоро прибудет в пункт назначения', 'только выехал', 'ожидает', 'на таможне'],

  newsInnerContent = document.querySelector('.news__inner-content'),
  newsItems = document.querySelectorAll('.news__inner-content > .item'),
  newsInnerButton = document.querySelector('.news__inner-button');
  let counterNews = 0;
  
  const burger = document.querySelector('.burger'),
  nav = document.querySelector('.nav'),
  
  mainheader = document.querySelector('.mainheader'),
  home = document.querySelector('.home'),
  header = document.querySelector('.header'),
  
  homeInnerDown = document.querySelector('.home__inner-down'),
  description = document.querySelector('.description'),
  
  links = document.querySelectorAll('.nav__link > ul > li'),
  
  left = document.querySelector('.left'),
  right = document.querySelector('.right'),
  reviewsInnerSlider = document.querySelector('.reviews__inner-slider'),
  reviewsSlides = document.querySelectorAll('.reviews__inner-slider__item'),
  
  modalButtons = document.querySelectorAll('.modal__button'),
  modal = document.querySelector('.modal'),
  windowHeaderSpan = document.querySelector('.window__header > span'),
  windowContentP = document.querySelector('.window__content > p'),
  close = document.querySelector('.close'),
  
  videoInnerContent = document.querySelector('.home__inner-content__video'),
  video = document.querySelector('.home__inner-content__video > video'),
  videoPlay = document.querySelector('.manage__play'),
  videoTime = document.querySelector('.manage__time'),
  videoTimeline = document.querySelector('.manage__timeline'),
  videoTimelineImg = document.querySelector('.manage__timeline > img'),
  videoVolume= document.querySelector('.manage__volume'),
  videoQuality = document.querySelector('.manage__quality'),
  videoFullscrin = document.querySelector('.manage__fullscrin');

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

const slider = (btn) => {
  let index;
  reviewsSlides.forEach((item, i) => {
    if (getComputedStyle(item).display === 'flex') {
      item.style.display = 'none';
      index = i;
    }
  })

  if (btn.classList.contains('left')) {
    if (index === 0) {
      reviewsSlides[2].style.display = 'flex';
    } else if (index === 1) {
      reviewsSlides[0].style.display = 'flex';
    } else if (index === 2) {
      reviewsSlides[1].style.display = 'flex';
    }
  } else if (btn.classList.contains('right')) {
    if (index === 0) {
      reviewsSlides[1].style.display = 'flex';
    } else if (index === 1) {
      reviewsSlides[2].style.display = 'flex';
    } else if (index === 2) {
      reviewsSlides[0].style.display = 'flex';
    }
  }
}
//Calculator
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

    event.preventDefault();
    windowHeaderSpan.textContent = 'Расчет';
    windowContentP.textContent = `Стоимость: ${price}`;

    modal.classList.add('modal_show');

  } else {
    alert('Вы ввели не все данные или недопустимые значения');
  }
});
//Light
points.forEach((item) => {
  item.addEventListener('mouseover', () => {
    lightOn(event)
  });
  item.addEventListener('mouseout', () => {
    lightOff(event);
  });
});
//Order
chekingInnerButton.addEventListener('click', (event) => {
  const curCode = chekingInnerInput1.value;
  const curNumber = chekingInnerInput2.value;

  event.preventDefault();

  if (curCode > 0 && curNumber > 0 ) { 
    windowHeaderSpan.textContent = 'Проверка';
    windowContentP.textContent = `Заказ с номером: ${curNumber} ${masOfPhrase[randomInteger(0, 5)]}`;

    modal.classList.add('modal_show');
  } else {
    alert('Вы ввели не все данные или недопустимые значения');
  }
})
//Render news
newsInnerButton.addEventListener('click', () => {
  if (counterNews < 9) {
    newsItems.forEach((item) => {
      let elem = document.createElement('div');
      elem.innerHTML = item.innerHTML;
      elem.className = 'news__inner-content__item item';

      newsInnerContent.append(elem);
      counterNews++;
    })

    if (counterNews === 9) {
      newsInnerButton.style.display = 'none';
    }
  } 
});
//Burger
burger.addEventListener('click', () => {
  burger.classList.toggle('burger_active');
  nav.classList.toggle('nav_show');
});
//Fixed header
window.addEventListener('scroll', () => {
  let scrollTop = window.pageYOffset;
  let needHeight = header.offsetHeight + home.offsetHeight;

  if (scrollTop >= needHeight) {
    mainheader.classList.add('mainheader_fixed');
  } else {
    mainheader.classList.remove('mainheader_fixed');
  }
})
//Smooth scroll
homeInnerDown.addEventListener('click', () => {
  description.scrollIntoView({behavior: "smooth"});
});

links.forEach((item) => {
  item.closest('.nav__link').addEventListener('click', (event) => {
    event.preventDefault(); 
  }); 

  item.addEventListener('click', (event) => {
    event.preventDefault();

    const blockName = item.closest('.nav__link').dataset.link;
    const block = document.querySelector(`.${blockName}`);
    const scrollTop = block.offsetTop;

    window.scrollTo({
      top: scrollTop - 93,
      behavior: "smooth"
    });
  })
})
//Own slider
left.addEventListener('click', () => {
  slider(left);
})

right.addEventListener('click', () => {
  slider(right);
})
//Modal
modalButtons.forEach((item) => {
  item.addEventListener('click', (event) => {
    event.preventDefault();
    windowHeaderSpan.textContent = 'Заявка';
    windowContentP.textContent = 'Ваша заявка успешно отправлена!';

    modal.classList.add('modal_show');
  })
});

close.addEventListener('click', () => {
  modal.classList.remove('modal_show');
});

document.body.addEventListener('click', (event) => {
  const target = event.target;

  if (modal.classList.contains('modal_show') && !target.classList.contains('modal__button') && !target.classList.contains('cheking__inner-button') && !target.classList.contains('calculation__inner-button')) {
    if (!target.closest('.window')) {
      modal.classList.remove('modal_show');
    }
  }
})
//Own video player
videoPlay.addEventListener('click', () => {
  if (video.paused) {
    video.play();
    videoPlay.style.borderColor = 'transparent transparent transparent gray';
  } else {
    video.pause();
    videoPlay.style.borderColor = 'transparent transparent transparent #E93B3B';
  }
})

video.addEventListener('timeupdate', () => {
  const time = video.currentTime;

  if (time < 60) {
    videoTime.textContent = `00: ${Math.round(time)}`;
  } else {
    videoTime.textContent = `${Math.round(time / 60)}: ${Math.round(time % 60)}`;
  }
})

videoTimeline.addEventListener('click', (event) => {
  let newTime = event.offsetX;
  videoTimelineImg.style.left = `${newTime}px`;
  if (newTime > video.duration) {
    newTime = video.duration;
  }
  video.currentTime = newTime;
})

videoVolume.addEventListener('click', () => {
  console.log(video.volume);
  if (video.volume > 0.1) {
    video.volume -= 0.1;
  }
})

videoFullscrin.addEventListener('click', () => {
  videoInnerContent.classList.toggle('video_full');

  if (videoInnerContent.classList.contains('video_full')) {
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
  } else {
    document.body.style.overflow = 'auto';
  }
})





