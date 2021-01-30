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
            console.log(`
              ===========================
              user: ${user.name}
              subject: ${userSubject.subject}
              currentSubjectLoop: ${subject._id}
              =========================
              `);
            if (subject._id == userSubject.subject) {
              // console.log(`
              // ===========================
              // conditional ran because ${subject} id is the same as ${userSubject}
              // =========================
              // `);
              return userSubject.score;
            }
          }),
        ];
      })
      .flat(Infinity)
      .filter((value) => value != undefined);
    return payload;
  });
  console.log(perSubject);

  return 10;
};

module.exports = {
  getPercentageCorrectOverall,
  getpercentageCorrectPerSubject,
};
