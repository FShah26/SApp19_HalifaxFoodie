var SQL = require("mysql2");

const sqlCon = SQL.createConnection({
  host: "fooddelivery5410.cy8c8vgerfgo.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "password1234",
  database: "mfa",
});

sqlCon.connect();

const fetchAllRestaurants = () => {
  const FETCH_QUERY = "SELECT * FROM hfoodie.restaurants;";

  return new Promise((resolve, reject) => {
    sqlCon.query(FETCH_QUERY, (err, res, flds) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const handler = async (event) => {
  let response = { success: false };

  await fetchAllRestaurants()
    .then((d) => {
      response = { success: true, data: d };
    })
    .catch((e) => {
      response = { success: false, message: e.message };
    });

  return response;
};

exports.handler = handler;
