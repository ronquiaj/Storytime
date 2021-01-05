// Logic to format the time

const timer = (time, amount) => {
  // time is represented by seconds
  const endTime = formatTime(time);
  const { seconds, minutes, hours } = endTime;
  console.log(`End Time: ${hours}:${minutes}:${seconds}`);
};

const formatTime = (time) => {
  const currentTime = new Date(); // Get current time
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  console.log(`Start Time: ${hours}:${minutes}:${seconds}`);
  let newSeconds,
    newMinutes,
    newHours,
    carryMinute = 0,
    carryHour = 0;
  if (seconds + time >= 60) {
    newSeconds = seconds + time - 60;
    carryMinute = 1;
    console.log("carrying minutes");
  } else {
    newSeconds = seconds + time;
  }

  if (minutes + carryMinute >= 60) {
    newMinutes = minutes + carryMinute - 60;
    carryHour = 1;
    console.log("carrying hour");
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
