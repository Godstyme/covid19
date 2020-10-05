let reqHeaders = new Headers({
  'Content-Type': 'application/json'
});

let requestOptions = {
  method: 'GET',
  headers: reqHeaders,
  redirect: 'follow'
};
const userRquest = new Request('https://covidnigeria.herokuapp.com/api')
fetch(userRquest, requestOptions)
  .then(async response => {
    const record = await response.json()
    const data = record.data.states
    for (let key in data) {
      let obj = data[key];
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

