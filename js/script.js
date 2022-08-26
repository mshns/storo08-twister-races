const time = document.querySelector('.time')

const date = new Date();
const currentTime = date.toLocaleTimeString('ru-RU', { timeZone: "Europe/Moscow", day: "numeric", month: "long", hour: "numeric", minute: "numeric" });
time.textContent = `Лидерборд на ${currentTime} по мск.`;

import sportsmans from './sportsmans.js';

let arrSportsmans = [];
sportsmans.forEach(element => {
  arrSportsmans.push(element.nickname);
})

const leaderbord = document.querySelector('.current-board');

fetch('https://www.ipoker.com/XMLs/twister-race-week-current.xml')
.then(function(resp) {
  return resp.text();
})
.then(function(data) {
  let parser = new DOMParser(),
  xmlDoc = parser.parseFromString(data, 'text/xml'),
  players = xmlDoc.getElementsByTagName('row');
  let num = 1;
  for (let item of players) {
    if (arrSportsmans.includes(item.getElementsByTagName('column')[1].lastChild.nodeValue)) {
      const li = document.createElement('li');
      li.classList.add('table-item');
      if (num < 36) {
        li.classList.add('table-item-prize');
      }
      li.textContent = `${num}) ${item.getElementsByTagName('column')[1].lastChild.nodeValue} ➞ ${item.getElementsByTagName('column')[2].lastChild.nodeValue}`;
      num++;
      leaderbord.append(li);
    }
  }
  const li = document.createElement('li');
  li.textContent = `${num} - ${arrSportsmans.length}) Остальные участники вне зоны топ-250 сетевой гонки, а значит и вне зоны трекинга`;
  leaderbord.append(li);
})

const results = document.querySelector('.previous-board');
import prizes from './prizes.js';

fetch('https://www.ipoker.com/XMLs/twister-race-week-previous.xml')
.then(function(resp) {
  return resp.text();
})
.then(function(data) {
  let parser = new DOMParser(),
  xmlDoc = parser.parseFromString(data, 'text/xml'),
  players = xmlDoc.getElementsByTagName('row');
  let num = 1;
  for (let item of players) {
    if (arrSportsmans.includes(item.getElementsByTagName('column')[1].lastChild.nodeValue) && num < 36) {
      const li = document.createElement('li');
      const span = document.createElement('span');
      li.classList.add('table-item', 'table-item-prize');
      li.textContent = `${num}) ${item.getElementsByTagName('column')[1].lastChild.nodeValue} ➞ ${item.getElementsByTagName('column')[2].lastChild.nodeValue}`;
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