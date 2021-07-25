var SQL = require("mysql2");

const sqlCon = SQL.createConnection({
  host: "fooddelivery5410.cy8c8vgerfgo.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "password1234",
  database: "mfa",
});

sqlCon.connect();

  const getMenuName = (event) => {
    const SELECT_QUERY = "select a.resname, b.price, b.name, b.restaurantId from hfoodie.restaurants as a, hfoodie.menuItems as b where a.resid = (select restaurantId from hfoodie.menuItems where Id = ?) and b.Id = ?";
  
    return new Promise((resolve, reject) => {
      sqlCon.query(SELECT_QUERY, [event.id, event.id], (err, res, flds) => {
        if (err) {
          reject(err);
        } else {
          if (res.length > 0) {
            console.log(res)
            resolve(res[0]["name"]);
            
            const INSERT_QUERY =
                "INSERT INTO hfoodie.orderHistory (restId, menuId, restaurantName, food, total_price) VALUES (?, ?, ?, ?, ?)";
           
                sqlCon.query(INSERT_QUERY, [res[0]["restaurantId"], event.id, res[0]["resname"], res[0]["name"], 
                res[0]["price"]], (err, res, flds) => {});
          }
        }
      });
    });
  }
  
  const putOrderFood = (resid, menuItemID, resname, name, price) => {
    const INSERT_QUERY =
      "INSERT INTO hfoodie.orderHistory (restId, menuId, restaurantName, food, total_price) VALUES (?, ?, ?, ?, ?);";
  
    return new Promise((resolve, reject) => {
      sqlCon.query(INSERT_QUERY, [resid, menuItemID, resname, name, price], (err, res, flds) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  };

  const handler = async (event) => {
    let response = { success: false };
    let qString;
      
    await getMenuName(event)
      .then((d) => {
        qString = d;
        response = { success: true, data: d };
      })
      .catch((e) => {
        console.error(e);
        response = { success: false, message: e.message };
      });
    
    return response;
  };
  
  exports.handler = handler;