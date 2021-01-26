// Returns the current time plus the inputted time, represents the time from now plus time
const formatTime = (time) => {
  const currentTime = new Date(); // Get current time
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  let newSeconds,
    newMinutes,
    newHours,
    carryMinute = 0,
    carryHour = 0;
  if (seconds + time >= 60) {
    newSeconds = seconds + time - 60;
    carryMinute = 1;
  } else {
    newSeconds = seconds + time;
  }

  if (minutes + carryMinute >= 60) {
    newMinutes = minutes + carryMinute - 60;
    carryHour = 1;
  } else {
    newMinutes = minutes + carryMinute;
  }

  if (hours + carryHour >= 24) {
    newHours = hours + carryHour - 24;
  } else {
    newHours = hours + carryHour;
  }

  const endTime = {
    // Represents the end of time interval
    seconds: newSeconds,
    minutes: newMinutes,
    hours: newHours,
  };
  return endTime;
};

// Accepts a time interval, and then the amount of rounds for this current story, returns an object
// with the endtime for each round
const partitionRounds = (time, rounds) => {
  const roundEndTimes = {};
  for (let i = 1; i <= rounds; i ++) {
    roundEndTimes[i] = formatTime(time * i);
  }
  return roundEndTimes;
}

export default partitionRounds;