const structureTime = (time) => {
  let t = parseInt(time.toFixed(0));
  if (t < 10) {
    return `0${t}`;
  }
  return `${t}`;
};
// percentage correct overall
const getPercentageCorrectOverall = (allUsers) => {
  let userScores = allUsers.map((user) => {
    return [
      ...user.subjects.map((subject) => {
        return subject.score;
      }),
    ];
  });
  userScores = userScores.flat(Infinity);
  const totalLength = userScores.length;
  const totalScore = userScores.reduce((total, value) => {
    return total + value;
  }, 0);

  const totalCorrectAnswers = totalLength * 100;

  //   averageUserScore = totalScore / totalLength;
  //   console.log(averageUserScore);
  let percentageCorrectOverall = (totalScore / totalCorrectAnswers) * 100;
  if (Number.isNaN(percentageCorrectOverall)) {
    percentageCorrectOverall = 0;
  }
  return percentageCorrectOverall.toFixed(2);
};

// getpercentageCorrectPerSubject
const getpercentageCorrectPerSubject = (allUsers, allSubjects) => {
  //  const scoresPerSubject = allUsers.map((user => {

  //  }))

  const perSubject = allSubjects.map((subject) => {
    const payload = {
      subject: subject,
    };
    payload.scores = allUsers
      .map((user) => {
        return [
          ...user.subjects.map((userSubject) => {
            if (subject.name == userSubject.subject.name) {
              return userSubject.score;
            }
          }),
        ];
      })
      .flat(Infinity)
      .filter((value) => value != undefined)
      .reduce((total, a) => total + a, 0)
      .toFixed(2);

    payload.timeTaken = allUsers
      .map((user) => {
        return [
          ...user.subjects.map((userSubject) => {
            if (subject.name == userSubject.subject.name) {
              return userSubject.counter;
            }
          }),
        ];
      })
      .flat(Infinity)
      .filter((value) => value != undefined)
      .map((current) => {
        const time = current.split(":");
        const hours = parseInt(time[0]);
        const mins = parseInt(time[1]);
        const seconds = parseInt(time[2]);
        return { hours, mins, seconds };
      });
    const timeTakenLength = payload.timeTaken.length;
    payload.timeTaken = payload.timeTaken.reduce(
      (accm, current) => {
        accm.hours += current.hours;
        accm.mins += current.mins;
        accm.seconds += current.seconds;
        return accm;
      },
      { hours: 0, mins: 0, seconds: 0 }
    );

    console.log("time taken", payload.timeTaken);

    payload.timeTaken.hours /= timeTakenLength;
    payload.timeTaken.mins /= timeTakenLength;
    payload.timeTaken.seconds /= timeTakenLength;

    // check for nan
    if (Number.isNaN(payload.timeTaken.hours)) {
      payload.timeTaken.hours = 0;
    }
    if (Number.isNaN(payload.timeTaken.mins)) {
      payload.timeTaken.mins = 0;
    }
    if (Number.isNaN(payload.timeTaken.seconds)) {
      payload.timeTaken.seconds = 0;
    }

    payload.timeTaken = `${structureTime(
      payload.timeTaken.hours
    )}:${structureTime(payload.timeTaken.mins)}:${structureTime(
      payload.timeTaken.seconds
    )}`;

    if (Number.isNaN(payload.scores)) {
      payload.scores = 0;
      payload.scores = payload.scores.toFixed(2);
    }
    return payload;
  });

  return perSubject;
};

const getAverageTimeTaken = (allUsers) => {
  const timetakenArrayPerUser = [
    ...allUsers.map((user) => {
      return [
        ...user.subjects.map((subject) => {
          return subject.counter;
        }),
      ];
    }),
  ];
  const timetakenArray = timetakenArrayPerUser.flat(Infinity);
  const payload = timetakenArray.map((current) => {
    const time = current.split(":");
    const hours = parseInt(time[0]);
    const mins = parseInt(time[1]);
    const seconds = parseInt(time[2]);
    return { hours, mins, seconds };
  });

  const accm = { hours: 0, mins: 0, seconds: 0 };
  const length = payload.length;
  for (let index = 0; index < payload.length; index++) {
    accm.hours += payload[index].hours;
    accm.mins += payload[index].mins;
    accm.seconds += payload[index].seconds;
  }

  accm.hours = accm.hours / length;
  accm.mins = accm.mins / length;
  accm.seconds = accm.seconds / length;

  return `${structureTime(accm.hours)}:${structureTime(
    accm.mins
  )}:${structureTime(accm.seconds)}`;
};

const getPercentCorrectForUser = (user) => {
  const scores = user.subjects.map((subject) => {
    return subject.score;
  });
  const totalLength = scores.length;
  const totalScore = scores.reduce((total, value) => {
    return total + value;
  }, 0);

  const totalCorrectAnswers = totalLength * 100;

  //   averageUserScore = totalScore / totalLength;
  //   console.log(averageUserScore);
  let percentageCorrectOverall = (totalScore / totalCorrectAnswers) * 100;

  if (Number.isNaN(percentageCorrectOverall)) {
    percentageCorrectOverall = 0;
  }
  return percentageCorrectOverall.toFixed(2);
};

const getAverageTimeTakenForUser = (user) => {
  const timeTakenArray = user.subjects.map((subject) => {
    return subject.counter;
  });
  const payload = timeTakenArray.map((current) => {
    const time = current.split(":");
    const hours = parseInt(time[0]);
    const mins = parseInt(time[1]);
    const seconds = parseInt(time[2]);
    return { hours, mins, seconds };
  });

  const accm = { hours: 0, mins: 0, seconds: 0 };
  const length = payload.length;
  for (let index = 0; index < payload.length; index++) {
    accm.hours += payload[index].hours;
    accm.mins += payload[index].mins;
    accm.seconds += payload[index].seconds;
  }

  accm.hours = accm.hours / length;
  accm.mins = accm.mins / length;
  accm.seconds = accm.seconds / length;

  if (Number.isNaN(accm.hours)) {
    accm.hours = 0;
  }
  if (Number.isNaN(accm.mins)) {
    accm.mins = 0;
  }
  if (Number.isNaN(accm.seconds)) {
    accm.seconds = 0;
  }
  return `${structureTime(accm.hours)}:${structureTime(
    accm.mins
  )}:${structureTime(accm.seconds)}`;
};

module.exports = {
  getPercentageCorrectOverall,
  getpercentageCorrectPerSubject,
  getAverageTimeTaken,
  getPercentCorrectForUser,
  getAverageTimeTakenForUser,
};
