//borrowed from https://github.com/vexuas/nessie/blob/develop/commands/maps/battle-royale.js
exports.getCountDown = (timer) => {
    const countdown = timer.split(':');
    const isOverAnHour = countdown[0] && countdown[0] !== '00';
    return `${isOverAnHour ? `${countdown[0]} hr ` : ''}${countdown[1]} mins ${countdown[2]} secs`;
  }

exports.timeFormater = (time) => {
    return new Date(time * 1000).toLocaleTimeString('en-GB');
}

exports.timeFormaterAmPm = (time) => {
  return new Date(time * 1000).toLocaleTimeString();
}

