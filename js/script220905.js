import sportsmans from './sportsmans220905.js';
import prizes from './prizes220905.js';

// popup

const btnRegistration = document.querySelector('.registration');
const btnRules = document.querySelector('.rules');
const information = document.querySelector('.information');
const infoReg = document.querySelector('.info-registration');
const infoRules = document.querySelector('.info-rules');
const shadow = document.querySelector('.shadow');
const linkReg = document.querySelector('.reg-link');
const linkRules = document.querySelector('.rules-link');

btnRegistration.addEventListener('click', function() {
  infoReg.classList.add('visible');
  infoRules.classList.remove('visible');
  information.classList.add('active');
  shadow.classList.add('active');
});

btnRules.addEventListener('click', function() {
  infoRules.classList.add('visible');
  infoReg.classList.remove('visible');
  information.classList.add('active');
  shadow.classList.add('active');
});

shadow.addEventListener('click', function() {
  information.classList.remove('active');
  shadow.classList.remove('active');
})

linkReg.addEventListener('click', function() {
  information.scroll(0, 0);
  infoRules.classList.remove('visible');
  infoReg.classList.add('visible');
})

linkRules.addEventListener('click', function() {
  information.scroll(0, 0);
  infoReg.classList.remove('visible');
  infoRules.classList.add('visible');
})

// leaderboar

const time = document.querySelector('.time');

const date = new Date();
const currentTime = date.toLocaleTimeString('ru-RU', { timeZone: "Europe/Moscow", day: "numeric", month: "long", hour: "numeric", minute: "numeric" });
time.textContent = `${currentTime} мск`;

let arrSportsmans = [];
sportsmans.forEach(element => {
  arrSportsmans.push(element.nickname.toLowerCase());
})

const leaderbord = document.querySelector('.current-board');

fetch(`https://www.ipoker.com/XMLs/twister-race-week-current.xml?${Math.ceil(Math.random() * 1000)}`)
.then(function(resp) {
  return resp.text();
})
.then(function(data) {
  let parser = new DOMParser(),
  xmlDoc = parser.parseFromString(data, 'text/xml'),
  players = xmlDoc.getElementsByTagName('row');
  let num = 1;
  for (let item of players) {
    if (arrSportsmans.includes(item.getElementsByTagName('column')[1].lastChild.nodeValue.toLowerCase())) {
      const li = document.createElement('li');
      const span = document.createElement('span');
      li.classList.add('table-item-leaderboard');
      span.classList.add('table-item-span');
      if (num < 36) {
        li.classList.add('table-item-prize');
      }
      li.textContent = `${num}. ${item.getElementsByTagName('column')[1].lastChild.nodeValue}`;
      span.innerHTML = item.getElementsByTagName('column')[2].lastChild.nodeValue;      
      
      num++;
      leaderbord.append(li);
      li.append(span);
    }
  }
  const li = document.createElement('li');
  li.classList.add('table-item-leaderboard');
  li.textContent = `${num} - ${arrSportsmans.length}. Остальные участники вне зоны трекинга`;
  leaderbord.append(li);
})

// results

const previousWeek = document.querySelector('.previous-week')

var beforeOneWeek = new Date(new Date().getTime() - 60 * 60 * 24 * 7 * 1000)
var beforeOneWeek2 = new Date(beforeOneWeek);
let day = beforeOneWeek.getDay()
let diffToMonday = beforeOneWeek.getDate() - day + (day === 0 ? -6 : 1)
let lastMonday = new Date(beforeOneWeek.setDate(diffToMonday)).toLocaleDateString('ru-RU', { timeZone: "Europe/Moscow", day: "numeric", month: "long" });
let lastSunday = new Date(beforeOneWeek2.setDate(diffToMonday + 6)).toLocaleDateString('ru-RU', { timeZone: "Europe/Moscow", day: "numeric", month: "long" });

previousWeek.textContent = lastMonday + ' - ' + lastSunday;

const results = document.querySelector('.previous-board');

fetch(`https://www.ipoker.com/XMLs/twister-race-week-previous.xml?${Math.ceil(Math.random() * 1000)}`)
.then(function(resp) {
  return resp.text();
})
.then(function(data) {
  let parser = new DOMParser(),
  xmlDoc = parser.parseFromString(data, 'text/xml'),
  players = xmlDoc.getElementsByTagName('row');
  let num = 1;
  for (let item of players) {
    if (arrSportsmans.includes(item.getElementsByTagName('column')[1].lastChild.nodeValue.toLowerCase()) && num < 36) {
      const li = document.createElement('li');
      const span = document.createElement('span');
      li.classList.add('table-item', 'table-item-prize');
      li.textContent = `${num}. ${item.getElementsByTagName('column')[1].lastChild.nodeValue} ➞ ${item.getElementsByTagName('column')[2].lastChild.nodeValue}`;
      span.classList.add('table-item-span');
      let tickets = '';
      if (num === 1) {
        tickets = prizes.step1;
      } else if (num === 2) {
        tickets = prizes.step2;
      } else if (num === 3) {
        tickets = prizes.step3;
      } else if (num === 4) {
        tickets = prizes.step4;
      } else if (num === 5) {
        tickets = prizes.step5;
      } else if (num === 6) {
        tickets = prizes.step6;
      } else if (num === 7) {
        tickets = prizes.step7;
      } else if (num === 8) {
        tickets = prizes.step8;
      } else if (num === 9) {
        tickets = prizes.step9;
      } else if (num >= 9 && num <= 19) {
        tickets = prizes.step10;
      } else if (num >= 20 && num <= 29) {
        tickets = prizes.step11;
      }  else {
        tickets = prizes.step12;
      }
      let bonus = '';
      if (item.getElementsByTagName('column')[2].lastChild.nodeValue > 100000) {
        bonus = prizes.bonus100;
      } else if (item.getElementsByTagName('column')[2].lastChild.nodeValue > 50000) {
        bonus = prizes.bonus50;
      }
      span.innerHTML = tickets + bonus;
      num++;
      results.append(li);
      li.append(span);
    }
  }
})