DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products
(
    id INT NOT NULL
    AUTO_INCREMENT PRIMARY KEY,
product_name VARCHAR
    (60) NOT NULL,
department_name VARCHAR
    (60) NOT NULL,
price FLOAT NOT NULL,
stock_quantity INT NOT NULL
);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Cheez-its", "Food", 4, 1000),
        ("Laptop", "Electronics", 600, 250),
        ("Melange", "Spice", 100000, 10),
        ("Literally just Water", "Food", 1, 10000000),
        ("Headphones", "Electronics", 50, 150),
        ("Kitty Litter", "Pets", 10, 1000),
        ("Dress Socks", "Apparel", 15, 250),
        ("T-shirt", "Apparel", 20,  5000),
        ("Watch", "Accessories", 200, 100),
        ("Coffee Table", "Furniture", 250, 50);