const { DateTime, Settings } = require("luxon");


//borrowed from https://github.com/vexuas/nessie/blob/develop/commands/maps/battle-royale.js
exports.getCountDown = (timer) => {
    const countdown = timer.split(':');
    const isOverAnHour = countdown[0] && countdown[0] !== '00';
    return `${isOverAnHour ? `${countdown[0]} hr ` : ''}${countdown[1]} mins ${countdown[2]} secs`;
  }



//https://moment.github.io/luxon/index.html#/
exports.timeFormatTwentyFour = (time) => {
  return DateTime.fromSeconds(time, {zone: "utc+1"}).toLocaleString(DateTime.TIME_24_WITH_SHORT_OFFSET)
}

exports.timeFormatTwentyFourPlusTwo = (time) => {
  return DateTime.fromSeconds(time, {zone: "utc+2"}).toLocaleString(DateTime.TIME_24_WITH_SHORT_OFFSET)
}


exports.timeFormatLuxonAmPm = (time) => {
  return DateTime.fromSeconds(time, {zone: "America/New_York"}).toLocaleString(DateTime.TIME_WITH_SHORT_OFFSET)
}



