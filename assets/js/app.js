let reqHeaders = new Headers({
  'Content-Type': 'application/json'
});

let requestOptions = {
  method: 'GET',
  headers: reqHeaders,
  redirect: 'follow'
};
let obj, state;
const userRquest = new Request('https://covidnigeria.herokuapp.com/api')
fetch(userRquest, requestOptions)
  .then(async response => {
    const record = await response.json()
    const data = record.data.states
    for (let key in data) {
      obj = data[key];
      state = obj.state
      console.log(state)
      // console.log(+key+1,obj.state,obj.confirmedCases,obj.discharged,obj.death)
      ;(() => {
        // creating a new tr
        document.querySelector('.tableCon').style.visibility = 'visible'
        const tbody = document.querySelector('#tble')
        const tr = document.createElement('tr')
        tbody.appendChild(tr);
        tr.appendChild(document.createElement('td')).textContent = +key+1
        tr.appendChild(document.createElement('td')).textContent = obj.state
        tr.appendChild(document.createElement('td')).textContent = obj.confirmedCases
        tr.appendChild(document.createElement('td')).textContent = obj.discharged
        tr.appendChild(document.createElement('td')).textContent = obj.death
    })()
  }
    const sampleTestRecord = document.querySelector('.sampRecord')
    const totalConfirmedRecord = document.querySelector('.confirmedRecord')
    const totalDischargeRecord = document.querySelector('.dischargedRecord')
    const totalActiveRecord = document.querySelector('.activeRecord')
    const totalDeathRecord = document.querySelector('.deathsRecord')
    const inputHolder = document.querySelector('#inputHolder')
    sampleTestRecord.innerHTML = record.data.totalSamplesTested
    totalConfirmedRecord.innerHTML = record.data.totalConfirmedCases
    totalConfirmedRecord.style.visibility = 'visible'
    sampleTestRecord.style.visibility = 'visible'
    totalDischargeRecord.innerHTML = record.data.discharged
    totalDischargeRecord.style.visibility = 'visible'
    totalActiveRecord.innerHTML = record.data.totalActiveCases
    totalActiveRecord.style.visibility = 'visible'
    totalDeathRecord.innerHTML = record.data.death
    totalDeathRecord.style.visibility = 'visible'
    inputHolder.style.visibility = 'visible'
    // console.log(record.data.totalConfirmedCases)
  })
  .catch(error =>{
    console.log(error)
  })

const dateBuilder = (d) => {
  const months = ['Jan','Feb','Mar','April','May','June','July','Aug','Sept','Oct','Nov','Dec']
  const days = ['Sun','Mon','Tue','Wed','Thur','Fri','Sat']
  const day = days[d.getDay()]
  const date = d.getDate()
  const month = months[d.getMonth()]
  const year = d.getFullYear()
  return `${day}, ${date} ${month} ${year}.`
}
const now = new Date()
const date = document.querySelector('#date').innerHTML = dateBuilder(now)
document.querySelector('#tradeMarkDate').innerHTML = now.getFullYear()

let search = () => {
  let input, filter, table, tr, td, cell, i;
  input = document.querySelector("#searchInput");
  filter = input.value.toUpperCase();
  table = document.querySelector("table");
  tr = table.querySelectorAll("tr");
  for (i = 1; i < tr.length; i++) {
    // Hide the row initially.
    tr[i].style.display = "none";
    td = tr[i].querySelectorAll("td");
    for (let j = 0; j < td.length; j++) {
      cell = tr[i].querySelectorAll("td")[j];
      if (cell) {
        if (cell.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
          break;
        }
      }
    }
  }
}
document.addEventListener('keyup',search);



// https://openi.nlm.nih.gov/api/search?m=1&n=10
// {
//   "content-length": "60",
//   "content-type": "application/json;charset=UTF-8",
//   "date": "Fri, 02 Oct 2020 12:37:29 GMT",
//   "server": "Apache/2.4.6 (Red Hat Enterprise Linux) OpenSSL/1.0.2k-fips mod_jk/1.2.43",
//   "status": "200",
//   "strict-transport-security": "max-age=31536000; includeSubDomains; preload"
// }

// about map 
var data = [
  ['Rivers', 0],
  // ['ng-kt', 1],
  // ['ng-so', 2],
  // ['ng-za', 3],
  // ['ng-yo', 4],
  // ['ng-ke', 5],
  // ['ng-ad', 6],
  // ['ng-bo', 7],
  // ['ng-ak', 8],
  // ['ng-ab', 9],
  // ['ng-im', 10],
  // ['ng-by', 11],
  // ['ng-be', 12],
  // ['ng-cr', 13],
  // ['ng-ta', 14],
  // ['ng-kw', 15],
  // ['ng-la', 16],
  // ['ng-ni', 17],
  // ['ng-fc', 18],
  // ['ng-og', 19],
  // ['ng-on', 20],
  // ['ng-ek', 21],
  // ['ng-os', 22],
  // ['ng-oy', 23],
  // ['ng-an', 24],
  // ['ng-ba', 25],
  // ['ng-go', 26],
  // ['ng-de', 27],
  // ['ng-ed', 28],
  // ['ng-en', 29],
  // ['ng-eb', 30],
  // ['ng-kd', 31],
  // ['ng-ko', 32],
  // ['ng-pl', 33],
  // ['ng-na', 34],
  // ['ng-ji', 35],
  // ['ng-kn', 36]
];
// let a = data[1][1]
// console.log(a)
for (const key in data) {
  let c = data[key][0]
  // console.log(c)
  if (c === obj) {
    console.log('u try')
  }
}

// Create the chart
Highcharts.mapChart('container', {
  chart: {
    map: 'countries/ng/ng-all'
  },

  title: {
    text: 'New cases recorded'
  },

  subtitle: {
    text: 'Source map: <a href="http://code.highcharts.com/mapdata/countries/ng/ng-all.js">Nigeria</a>'
  },

  mapNavigation: {
    enabled: true,
    buttonOptions: {
      verticalAlign: 'bottom'
    }
  },

  colorAxis: {
    min: 0
  },

  series: [{
    data: data,
    name: 'Random data',
    states: {
      hover: {
        color: '#BADA55'
      }
    },
    dataLabels: {
      enabled: true,
      format: '{point.name}'
    }
  }]
});
