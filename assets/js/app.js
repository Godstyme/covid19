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
      console.log(obj.state,obj.confirmedCases,obj.discharged,obj.death)
      
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