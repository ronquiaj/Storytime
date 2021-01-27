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
    newSeconds = (seconds + time) % 60;
    carryMinute = Math.floor((seconds + time) / 60)
  } else {
    newSeconds = seconds + time;
  }

  if (minutes + carryMinute >= 60) {
    newMinutes = (minutes + carryMinute) % 60;
    carryHour = Math.floor((carryMinute + minutes) / 60);
  } else {
    newMinutes = minutes + carryMinute;
  }

  if (hours + carryHour >= 24) {
    newHours = (hours + carryHour) % 24;
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

// Accepts two objects with hours, minutes, and seconds. Compares against the times, and returns true if currentime is greater than othertime, and false otherwise
const compareTime = (currentTime, otherTime) => {
  if (currentTime.hours > otherTime.hours) {
    return true
  } else if (currentTime.hours === otherTime.hours) {
    if (currentTime.minutes > otherTime.minutes) {
      return true
    } else if (currentTime.minutes == otherTime.minutes) {
      if (currentTime.seconds >= otherTime.seconds) {
        return true
      }
    }
  }
  return false;
}
export {
  partitionRounds, compareTime
};
///we are going to be going through roundsends, and checking to see if our current time is greater than the other times