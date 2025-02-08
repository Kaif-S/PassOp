import { createConnection } from "mysql";

const con = createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"kaif_0819",
    database:"passop"
})

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });