var SQL = require("mysql2");

const sqlCon = SQL.createConnection({
  host: "fooddelivery5410.cy8c8vgerfgo.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "password1234",
  database: "mfa",
});

sqlCon.connect();

const getQuestionsString = (email) => {
  const SELECT_QUERY = "SELECT questions FROM mfa.questions WHERE email=?;";

  return new Promise((resolve, reject) => {
    sqlCon.query(SELECT_QUERY, [email], (err, res, flds) => {
      if (err) {
        reject(err);
      } else {
        if (res.length > 0) {
          resolve(res[0]["questions"]);
        } else {
          reject();
        }
      }
    });
  });
};

const putQuestionsString = (email, questions) => {
  const INSERT_QUERY =
    "INSERT INTO mfa.questions (email, questions) VALUES (?, ?);";

  return new Promise((resolve, reject) => {
    sqlCon.query(INSERT_QUERY, [email, questions], (err, res, flds) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const jsonToString = (qArray) => {
  return new Promise((resolve, reject) => {
    let resString = "";
    qArray.forEach((element) => {
      resString += element.q + ";" + element.a + "|";
    });
    resolve(resString);
  });
};

const stringToJSON = (questionString) => {
  let eachQuestions = questionString.split("|");
  let resArr = [];

  for (let i = 0; i < 3; i++) {
    const [question, answer] = eachQuestions[i].split(";");
    resArr.push({ q: question, a: answer });
  }
  console.log(resArr);
  return resArr;
};

const handler = async (event) => {
  console.log("Event Logged" + JSON.stringify(event));
  let response = { success: false };
  let qString;

  if (event.questions) {
    //Inserting questions
    let strToInsert;
    await jsonToString(event.questions).then((data) => {
      strToInsert = data;
    });

    await putQuestionsString(event.email, strToInsert)
      .then(() => {
        response = { success: true };
      })
      .catch((err) => {
        console.error(err);
        response = { success: false, message: err.message };
      });
  } else {
    await getQuestionsString(event.email)
      .then((data) => {
        qString = data;
        console.log("From Database:", qString);
      })
      .catch((e) => {});
  }
  if (qString) {
    const jsonArray = stringToJSON(qString);
    response = { success: true, questions: jsonArray };
  }

  return response;
};

handler({ email: "hashikdonthineni@gmail.com" });
exports.handler = handler;
