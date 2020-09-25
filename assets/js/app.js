let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

let requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};
fetch("https://covidnigeria.herokuapp.com/api", requestOptions)
  .then(async response => {
    const record = await response.json()
    const data = record.data.states
    for (let key in data) {
      let obj = data[key];
      console.log(+key+1,obj.state,obj.confirmedCases,obj.discharged,obj.death);
      (() => {
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
    const totalConfirmedRecord = document.querySelector('#totalConfirmedRecord')
    const totalDischargeRecord = document.querySelector('#totalDischargeRecord')
    const totalDeathRecord = document.querySelector('#totalDeathRecord')
    totalConfirmedRecord.innerHTML = record.data.totalConfirmedCases
    totalConfirmedRecord.style.visibility = 'visible'
    totalDischargeRecord.innerHTML = record.data.discharged
    totalDischargeRecord.style.visibility = 'visible'
    totalDeathRecord.innerHTML = record.data.death
    totalDeathRecord.style.visibility = 'visible'
    console.log(record.data.totalConfirmedCases)
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