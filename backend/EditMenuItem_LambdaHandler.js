const mysql = require('mysql2');
const con = mysql.createConnection({
  host     : process.env.RDS_HOSTNAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  port     : process.env.RDS_PORT,
  database : process.env.RDS_DATABASE
});
con.connect();

const editData = (menuItemId,name,price,ingredients) => {
  const sql = "UPDATE menuItems SET name = '" + name + "', price=" + price + ",ingredients='" + ingredients + "' where Id = " + menuItemId;
  
  return new Promise((resolve,reject)=>{
    con.query(sql,(err,res,fields) =>{
      if(err){
        reject(err);
      }
      else
      {
        resolve(res);
      }
    });
  });
}
exports.handler = async (event,context,callback) => {
  // allows for using callbacks as finish/error-handlers
  // context.callbackWaitsForEmptyEventLoop = false;
  let message="";
  let menuItemId=0;
  let price=0;
  let ingredients='';
  let name='';
  let responseCode = 500;
  let sql = "";
  let response = {};
  console.log(event);
  if (event.Id && event.name && event.price && event.ingredients) {
        menuItemId = event.Id;
        name=event.name;
        price=event.price;
        ingredients=event.ingredients;
        responseCode=200;
        await editData(menuItemId,name,price,ingredients).then((res)=>{
          response = {
            statusCode:responseCode,
            message:"Item Updated successfully",
          }
        })
        .catch((e)=>{
          response={
            statusCode:500,
            message : "Internal Server Error Occurred",
          }
        })
    }
    else
    {
      response={
            statusCode:400,
            message : "Bad request",
          }
    }
    return response;
};