// fetch("https://covid-19-data.p.rapidapi.com/help/countries?format=json", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "covid-19-data.p.rapidapi.com",
// 		"x-rapidapi-key": "eb5f4d933fmsh1ed78c184783231p1c98d5jsn4fd0295cc79e"
// 	}
// })
// .then(response => {
// 	console.log(response.json());
// })
// .catch(err => {
// 	console.log(err);
// });

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