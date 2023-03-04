/*PRIMA DEL CERCA*/
let datalist = document.querySelector('datalist');

let cities = 'Aarhus, Adelaide, Albuquerque, Almaty, Amsterdam, Anchorage, Andorra, Ankara, Asheville, Asuncion, Athens, Atlanta, Auckland, Austin, Baku, Bali, Baltimore, Bangkok, Barcelona, Beijing, Beirut, Belfast, Belgrade, Belize City, Bengaluru, Bergen, Berlin, Bern, Bilbao, Birmingham, Birmingham, Bogota, Boise, Bologna, Bordeaux, Boston, Boulder, Bozeman, Bratislava, Brighton, Brisbane, Bristol, Brno, Brussels, Bucharest, Budapest, Buenos Aires, Buffalo, Cairo, Calgary, Cambridge, Cape Town, Caracas, Cardiff, Casablanca, Charleston, Charlotte, Chattanooga, Chennai, Chiang Mai, Chicago Chisinau, Christchurch, Cincinnati, Cleveland, Cluj-Napoca, Cologne, Colorado Springs, Columbus, Copenhagen, Cork, Curitiba, Dallas, Dar es Salaam, Delhi, Denver, Des Moines, Detroit, Doha, Dresden, Dubai, Dublin, Dusseldorf, Edinburgh Edmonton, Eindhoven, Eugene, Florence, Florianopolis, Fort Collins, Frankfurt, Fukuoka, Galway, Gdansk, Geneva, Gibraltar, Glasgow, Gothenburg, Grenoble, Guadalajara, Guatemala City, Halifax, Hamburg, Hannover, Havana, Helsinki, Ho Chi Minh City, Hong Kong, Honolulu, Houston, Hyderabad, Indianapolis, Innsbruck, Istanbul, Jacksonville, Jakarta, Johannesburg, Kansas City, Karlsruhe, Kathmandu, Kiev, Kingston, Knoxville, Krakow, Kuala Lumpur, Kyoto, Lagos, La Paz, Las Palmas de Gran Canaria, Las Vegas, Lausanne, Leeds, Leipzig, Lille, Lima, Lisbon, Liverpool, Ljubljana, London, Los Angeles, Louisville, Luxembourg, Lviv, Lyon, Madison, Madrid, Malaga, Malmo, Managua, Manchester, Manila, Marseille, Medellin, Melbourne, Memphis, Mexico City, Miami, Milan, Milwaukee, Minneapolis-Saint Paul, Minsk, Montevideo, Montreal, Moscow, Mumbai, Munich Nairobi, Nantes, Naples, Nashville, New Orleans, New York, Nice, Nicosia, Oklahoma City, Omaha, Orlando, Osaka, Oslo, Ottawa, Oulu, Oxford, Palo Alto Panama, Paris, Perth, Philadelphia, Phnom Penh, Phoenix, Phuket, Pittsburgh, Portland, Portland, Porto, Porto Alegre, Prague, Providence, Quebec, Quito, Raleigh, Reykjavik, Richmond, Riga, Rio De Janeiro, Riyadh, Rochester, Rome, Rotterdam, Saint Petersburg, Salt Lake City, San Antonio, San Diego, San Francisco Bay Area, San Jose, San Juan, San Luis Obispo, San Salvador, Santiago, Santo Domingo, Sao Paulo, Sarajevo, Saskatoon, Seattle, Seoul, Seville, Shanghai, Singapore, Skopje, Sofia, St. Louis, Stockholm, Stuttgart, Sydney, Taipei, Tallinn, Tampa Bay Area, Tampere, Tartu, Tashkent, Tbilisi, Tehran, Tel Aviv, The Hague Thessaloniki, Tokyo, Toronto, Toulouse, Tunis, Turin, Turku, Uppsala, Utrecht, Valencia, Valletta, Vancouver, Victoria, Vienna, Vilnius, Warsaw, Wellington, Winnipeg, Wroclaw, Yerevan, Zagreb, Zurich';

let arrayCities = cities.split(', ');

arrayCities.forEach(element => {
    let option = document.createElement('option');
    option.textContent = element;
    datalist.appendChild(option);
});

/*DOPO IL CERCA*/

let but = document.querySelector('button');

function downloadJson(nameCity){
    let nameCityOkay = nameCity.toLowerCase().replace(/ /g, "-");
    fetch(`https://api.teleport.org/api/urban_areas/slug:${nameCityOkay}/scores/`)
    .then(response => response.text())
    .then(data => {
        const parseData = JSON.parse(data);
        addContainer();
        title()
        addTitle(nameCity)

        for(let i = 0; i < 17; i++){
            result(parseData.categories[i].name, Math.round(parseData.categories[i].score_out_of_10), parseData.categories[i].color);
        }

    })
    .catch(error => {
        console.error(error);
    });
}

function addContainer() {
    let container = document.querySelector('.container');
    let results = document.createElement('div');
    results.classList.add('results');
    container.appendChild(results);
}

function title() {
    let container = document.querySelector('.results');
    let results = document.createElement('div');
    results.classList.add('title');
    container.appendChild(results);
}

function addTitle(nameCity) {
    let container = document.querySelector('.title');
    let title1 = document.createElement('h1');
    let title2 = document.createElement('h1');
    title2.classList.add('city');
    title1.textContent = 'LIFE QUALITY SCORE IN';
    title2.textContent = `${nameCity}`;
    container.appendChild(title1);
    container.appendChild(title2);
}

function result(name, number, color) {
    let container = document.querySelector('.results');
    let results = document.createElement('div');
    results.classList.add('result');
    container.appendChild(results);

    let div = document.createElement('h3');
    div.textContent = `${name}`;
    results.appendChild(div);

    let div2 = document.createElement('div');
    div2.classList.add('right');
    results.appendChild(div2);

    let div3 = document.createElement('div');
    div3.classList.add('count');
    div3.textContent = `${number}`;
    div2.appendChild(div3);

    let div4 = document.createElement('div')
    div4.classList.add(`color-bar`);
    div2.appendChild(div4);

    div4.style.background = `linear-gradient(to right, ${color}, ${color} ${number}0%, #ddd ${number}0%, #ddd)`;

}

but.addEventListener('click', function(event) {
    event.preventDefault();
    let prova = document.querySelector('.results');
    let isPresent = !!prova;
    if (isPresent) {
        prova.parentNode.removeChild(prova);
    }
    console.log(isPresent);
    let input = document.getElementById('state');
    downloadJson(input.value);
})
