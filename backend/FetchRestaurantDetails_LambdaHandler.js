const mysql = require('mysql2');
const con = mysql.createConnection({
  host     : process.env.RDS_HOSTNAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  port     : process.env.RDS_PORT,
  database : process.env.RDS_DATABASE
});
con.connect();

const fetchData = (email) => {
  const sql = "SELECT * FROM restaurants where useremail = " + email;
  
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
  let email=0;
  let responseCode = 500;
  let sql = "";
  let response = {};
  let data;
  if (event.email) {
        console.log("Received UserEmail: " + event.email);
        email = event.email;
        responseCode=200;
        message = "Data Found";
        await fetchData(email).then((res)=>{
          response = {
            statusCode:responseCode,
            message:message,
            data:res
          }
        })
        .catch((e)=>{
          response={
            statusCode:500,
            message : "Internal Server Error Occurred",
            data:[] 
          }
        })
    }
    else
    {
      response={
            statusCode:400,
            message : "Bad request",
            data:[] 
          }
    }
    return response;
};