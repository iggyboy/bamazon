///dependencies
let inquirer = require("inquirer");
let mysql = require("mysql");
let divider = "--------------------------------";


// Creating connection to db
let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "dbpassword",
  database: "bamazon_db"
});

// Log if connec;tion successful, then runs afterConnection
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
});


function afterConnection() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    console.log("Welcome to Bamazon! These are our products!");
    console.log(divider);
    for (let item of res) {
      console.log(divider);
      console.log("ID:", item.id);
      console.log("Product:", item.product_name);
      console.log("Price:", "$" + item.price);
    }
    console.log(divider);

    inquirer
      .prompt([
        {
          type: "number",
          message: "So, what'ya buyin? (enter id)",
          name: "choice"
        }
      ]).then(function (data) {
        let product = res[data.choice - 1].product_name
        console.log(product + "? Ahhhh, now that's a good choice, strangeh");
        inquirer.prompt([
          {
            type: "number",
            message: "Soo, how many ya' need?",
            name: "amount"
          }
        ]).then(function (deAmount) {
          console.log("So, you want " + deAmount.amount + " " + product + "(s), let me see if we can do that...");

          if (res[data.choice - 1].stock_quantity < deAmount.amount) {
            console.log("Sorry, strangeh. We don't have enough");
            connection.end();
          }
          else {
            console.log("You're in luck, we got enough for ya");
            connection.query("UPDATE products SET stock_quantity = ? WHERE id = ?", [(res[data.choice - 1].stock_quantity - deAmount.amount), (data.choice)], function () {
              console.log("Ya total comes out to $" + (parseInt(res[data.choice - 1].price) * deAmount.amount));
              connection.end();
            });
          }
        })
      })
  });
}