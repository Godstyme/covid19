// ====== api header  =======
let reqHeaders = new Headers({
  'Content-Type': 'application/json'
});

let requestOptions = {
  method: 'GET',
  headers: reqHeaders,
  redirect: 'follow'
};

// ===== declared a global variable that hold a state name ===
let state;

// ==== fetch api request ======
const userRquest = new Request('https://covidnigeria.herokuapp.com/api')
fetch(userRquest, requestOptions)
  .then(async response => {
    const record = await response.json()
    // === collection Of States[array] that has each object of state which returns an array ===
    const collectionOfStates = record.data.states
    // === for in loop that iterate through the whole array ===
    for (let key in collectionOfStates) {

      // returns objects of each state
      let records = collectionOfStates[key];
      // console.log(+key+1,records.state,etc)
      (() => {
        // creating a new tr
        document.querySelector('.tableCon').style.visibility = 'visible'
        const tbody = document.querySelector('#tble')
        const tr = document.createElement('tr')
        tbody.appendChild(tr);
        tr.appendChild(document.createElement('td')).textContent = +key+1
        tr.appendChild(document.createElement('td')).textContent = records.state
        tr.appendChild(document.createElement('td')).textContent = records.confirmedCases
        tr.appendChild(document.createElement('td')).textContent = records.discharged
        tr.appendChild(document.createElement('td')).textContent = records.death
      })()
    }
    //js that queries each div and table
    const sampleTestRecord = document.querySelector('.sampRecord')
    const totalConfirmedRecord = document.querySelector('.confirmedRecord')
    const totalDischargeRecord = document.querySelector('.dischargedRecord')
    const totalActiveRecord = document.querySelector('.activeRecord')
    const totalDeathRecord = document.querySelector('.deathsRecord')
    const inputHolder = document.querySelector('#inputHolder')
    // Values are being added to the div and table and also dispaly it on the web page 
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

    let data = getStatesChartData(collectionOfStates);
    createChart(data);
  })
  .catch(error =>{
    console.log(error)
  })

  // date function that is being display on the web page 
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

// search queries that searches through the table 
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

// ======= about the map start here ======
let getSpecialCases = () => {
  // special statename 
  return {
    kaduna : 'ng-kd',
    kano : 'ng-kn',
    katsina : 'ng-kt',
    bayelsa : 'ng-by'
  }
}

let  getStateNameShort = (stateName) => {
  stateName = stateName.toLowerCase();
  specialCases = getSpecialCases();
  if(stateName in specialCases) return specialCases[stateName];
  return 'ng-' + stateName.substr(0, 2);
}

let getStatesChartData = (collection) => {
  return collection.filter((stateObj) => stateObj.confirmedCases).map((stateObj) => {
    let shortCode = getStateNameShort(stateObj.state);
    return [
      [shortCode][0] , stateObj.confirmedCases
    ]
  });
}

// Create the chart
let createChart = (data) => {
  Highcharts.mapChart('container', {
    chart: {
      map: 'countries/ng/ng-all'
    },

    title: {
      text: 'States with cases'
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
      showInLegend:true,
      showCheckbox:true,
      name: 'Confirmed Cases',
      states: {
        color: 'red',
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
}
// ======= about the map end here ======


// ==================== registration of service worker ============
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
    .register('./sw.js')
    .then((registration) => {
      console.log(`ServiceWorker registration successful with scope:, ${registration.scope}`);
    }, (error) => {
      console.log(`ServiceWorker registration failed:', ${error}`);
    })
  })
}