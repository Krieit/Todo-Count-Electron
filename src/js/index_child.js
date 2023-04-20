const cardShow = document.getElementById("card-show");
var widgetStyle = ""
const calDay = (d) => {
  var date1 = new Date(d);
  var date2 = new Date();
  var difDate = date1.getTime() - date2.getTime();
  var days = Math.round(difDate / (1000 * 3600 * 24));
  return days;
};

const colorScale = (perc) => {
  var r,g,b = 0;
  if (perc < 50) {
    r = 255;
    g = Math.round(5.1 * perc);
  } else {
    g = 255;
    r = Math.round(510 - 5.1 * perc);
  }
  var h = r * 0x10000 + g * 0x100 + b * 0x1;
  return "#" + ("000000" + h.toString(16)).slice(-6);
};

const returnCard = (cards) => {
  return cards
    .map((card) => {
      var perc = (calDay(card.start) / 30) * 100;
      perc = perc > 100 ? 99 : perc;
      console.log(perc);
      return `    
  <div class="card ${widgetStyle}" style="text-align: center;;background: transparent;border: none;">
<div class="single-chart">
  <svg viewBox="0 0 36 36" class="circular-chart" >
    <path class="circle-bg ${widgetStyle}"
      d="M18 2.0845
        a 15.9155 15.9155 0 0 1 0 31.831
        a 15.9155 15.9155 0 0 1 0 -31.831"
    />
    <path class="circle" style="stroke:${colorScale(perc)};"
      stroke-dasharray="${perc}, 100"
      d="M18 2.0845
        a 15.9155 15.9155 0 0 1 0 31.831
        a 15.9155 15.9155 0 0 1 0 -31.831"
    />
    ${calDay(card.start) == 0 ? `<text x="18" y="20" class="percentage ${widgetStyle}" style="font-size:0.5em;">Today</text>` :`<text x="18" y="19" class="percentage ${widgetStyle}" style="font-size:0.75em;">${calDay(card.start)}</text>`}
    <text x="18" y="24" class="percentage ${widgetStyle}" style="font-size: 0.25em;">${calDay(card.start) == 0 ? "" : "Days"}</text>
  </svg>
</div>
<div class="card-body">
  <p class="card-text">${card.title}</p>
</div>
</div>
`;
    })
    .join(" ");
};

window.onload = async function () {
  const tasks = JSON.parse(await window.localStorage.getItem('tasks'))
  var mainWidget = document.getElementById('widget-main')
  mainWidget.style.background = `rgba(0, 0, 0, 0.7)`
  // console.log(tasks)
  if(window.localStorage.getItem("light-mode-widget") == 'true'){
    mainWidget.style.background = `rgba(225, 225, 225, 0.6)`
    widgetStyle = "light-mode"
  }
  cardShow.innerHTML = returnCard(tasks);
};

setInterval(function() {window.location.reload()}, 3600000)