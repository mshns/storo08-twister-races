import sportsmans from './sportsmans.js';

let arrSportsmans = [];
sportsmans.forEach(element => {
  arrSportsmans.push(element.nickname);
})

const leaderbord = document.querySelector('.board');

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
      li.textContent = `${num}) ${item.getElementsByTagName('column')[1].lastChild.nodeValue} ➞ ${item.getElementsByTagName('column')[2].lastChild.nodeValue}`;
      num++;
      leaderbord.append(li);
    }
  }
  const li = document.createElement('li');
  li.textContent = `${num} - ${arrSportsmans.length}) Остальные участники вне зоны топ-250 сетевой гонки, а значит и вне зоны трекинга`;
  leaderbord.append(li);
})