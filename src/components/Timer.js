// Returns the current time plus the inputted time, represents the time from now plus time
const formatTime = (time) => {
  const currentTime = getCurrentTime(); // Get current time
  const { seconds, minutes, hours } = currentTime;
  let newSeconds,
    newMinutes,
    newHours,
    carryMinute = 0,
    carryHour = 0;
  if (seconds + time >= 60) {
    newSeconds = (seconds + time) % 60;
    carryMinute = Math.floor((seconds + time) / 60);
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
    hours: newHours
  };
  return endTime;
};

// Accepts a time interval, and then the amount of rounds for this current story, returns an object
// with the endtime for each round
const partitionRounds = (time, rounds) => {
  const roundEndTimes = [];
  for (let i = 0; i < rounds; i++) {
    roundEndTimes.push(formatTime(time * i));
  }
  return roundEndTimes;
};

// Accepts two objects with hours, minutes, and seconds. Compares against the times, and returns true if currentime is greater than othertime, and false otherwise
const compareTime = (currentTime, otherTime) => {
  if (currentTime.hours > otherTime.hours) {
    return true;
  } else if (currentTime.hours === otherTime.hours) {
    if (currentTime.minutes > otherTime.minutes) {
      return true;
    } else if (currentTime.minutes === otherTime.minutes) {
      if (currentTime.seconds >= otherTime.seconds) {
        return true;
      }
    }
  }
  return false;
};

// Returns the difference in seconds between the current time and other time and current time
const calculateTimeDifference = (currentTime, otherTime) => {
  const { seconds, minutes, hours } = otherTime;
  const { seconds: currentSeconds, minutes: currentMinutes, hours: currentHours } = currentTime;

  // calculate the difference
  const secondsDifference =
    seconds -
    currentSeconds +
    (minutes * 60 - currentMinutes * 60) +
    (hours * 3600 - currentHours * 3600);
  return secondsDifference;
};

// Returns an object with the current seconds, minutes, and hours in utc
const getCurrentTime = () => {
  const current = new Date();
  const utc = current.toUTCString();
  const timestamp = utc.slice(17, utc.length - 1);
  const hours = parseInt(timestamp.slice(0, 2));
  const minutes = parseInt(timestamp.slice(3, 5));
  const seconds = parseInt(timestamp.slice(6, 8));
  const timeObject = {
    seconds,
    minutes,
    hours
  };
  return timeObject;
};

export { getCurrentTime, calculateTimeDifference, compareTime, partitionRounds };
