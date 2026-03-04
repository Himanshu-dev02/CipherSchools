-- CipherSQLStudio — PostgreSQL Sandbox Schema & Sample Data
--Departments --
CREATE TABLE IF NOT EXISTS departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    budget DECIMAL(12, 2) NOT NULL
);

INSERT INTO departments (name, location, budget) VALUES
('Engineering', 'San Francisco', 1500000.00),
('Marketing', 'New York', 800000.00),
('Sales', 'Chicago', 600000.00),
('Human Resources', 'San Francisco', 400000.00),
('Finance', 'New York', 900000.00),
('Operations', 'Chicago', 700000.00);

-- Employees --
CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    department_id INTEGER REFERENCES departments(id),
    salary DECIMAL(10, 2) NOT NULL,
    hire_date DATE NOT NULL,
    job_title VARCHAR(100) NOT NULL
);

INSERT INTO employees (first_name, last_name, email, department_id, salary, hire_date, job_title) VALUES
('Alice', 'Johnson', 'alice.johnson@company.com', 1, 95000.00, '2022-01-15', 'Software Engineer'),
('Bob', 'Smith', 'bob.smith@company.com', 2, 85000.00, '2022-03-20', 'Marketing Specialist'),
('Carol', 'Williams', 'carol.williams@company.com', 3, 75000.00, '2022-05-10', 'Sales Associate'),
('David', 'Brown', 'david.brown@company.com', 4, 65000.00, '2022-07-15', 'Human Resources Specialist'),
('Eve', 'Davis', 'eve.davis@company.com', 5, 70000.00, '2022-09-10', 'Financial Analyst'),
('Frank', 'Miller', 'frank.miller@company.com', 6, 75000.00, '2022-11-01', 'Operations Manager'),
('Grace', 'Wilson', 'grace.wilson@company.com', 1, 80000.00, '2022-12-01', 'Senior Software Engineer'),
('Hank', 'Moore', 'hank.moore@company.com', 2, 85000.00, '2023-01-15', 'Marketing Manager'),
 
-- Customers --
CREATE TABLE IF NOT EXISTS customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(50) NOT NULL,
    registration_date DATE NOT NULL
);

INSERT INTO customers (name, email, city, country, registration_date) VALUES
('Acme Corp', 'hello@acme.com', 'New York', 'USA', '2022-01-15'),
('Globex Inc', 'info@globex.com', 'Los Angeles', 'USA', '2022-02-20'),
('Initech', 'contact@initech.com', 'Austin', 'USA', '2022-03-10'),
('Umbrella Ltd', 'info@umbrella.com', 'London', 'UK', '2022-04-15'),
('Stark Industries', 'info@starkindustries.com', 'New York', 'USA', '2022-05-20'),
 
-- Orders --
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    product VARCHAR(100) NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    price DECIMAL(10, 2) NOT NULL,
    order_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending'
);

INSERT INTO orders (customer_id, product, quantity, price, order_date, status) VALUES
(1, 'Enterprise License', 5, 1200.00, '2022-01-20', 'completed'),
(1, 'Support Package', 1, 500.00, '2022-02-15', 'completed'),
(2, 'Basic License', 10, 300.00, '2022-03-01', 'completed'),
(3, 'Enterprise License', 2, 1200.00, '2022-03-15', 'pending'),
(4, 'Premium License', 3, 800.00, '2022-04-10', 'completed'),
(5, 'Enterprise License', 8, 1200.00, '2022-04-25', 'completed'),
(5, 'Training Package', 2, 1500.00, '2022-05-05', 'shipped'),
(6, 'Basic License', 15, 300.00, '2022-05-20', 'completed'),
(7, 'Premium License', 1, 800.00, '2022-06-10', 'pending'),
(2, 'Support Package', 3, 500.00, '2022-06-25', 'shipped')
