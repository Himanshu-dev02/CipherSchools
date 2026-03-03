-- ============================================================
-- CipherSQLStudio — PostgreSQL Sandbox Schema & Sample Data
-- ============================================================
-- Run this file against your PostgreSQL database to set up
-- the sandbox tables that students will query.
-- ============================================================

-- ─── Departments ──────────────────────────────────────
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

-- ─── Employees ────────────────────────────────────────
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
('Alice', 'Johnson', 'alice.johnson@company.com', 1, 95000.00, '2021-03-15', 'Senior Developer'),
('Bob', 'Smith', 'bob.smith@company.com', 1, 85000.00, '2022-07-01', 'Junior Developer'),
('Carol', 'Williams', 'carol.williams@company.com', 2, 72000.00, '2020-11-20', 'Marketing Manager'),
('David', 'Brown', 'david.brown@company.com', 3, 68000.00, '2023-01-10', 'Sales Representative'),
('Eve', 'Davis', 'eve.davis@company.com', 1, 110000.00, '2019-06-05', 'Tech Lead'),
('Frank', 'Miller', 'frank.miller@company.com', 4, 62000.00, '2022-09-12', 'HR Specialist'),
('Grace', 'Wilson', 'grace.wilson@company.com', 5, 88000.00, '2021-04-22', 'Financial Analyst'),
('Hank', 'Moore', 'hank.moore@company.com', 2, 55000.00, '2023-08-30', 'Content Writer'),
('Ivy', 'Taylor', 'ivy.taylor@company.com', 6, 75000.00, '2020-02-14', 'Operations Manager'),
('Jack', 'Anderson', 'jack.anderson@company.com', 3, 71000.00, '2021-12-01', 'Sales Manager'),
('Karen', 'Thomas', 'karen.thomas@company.com', 1, 92000.00, '2022-03-18', 'Backend Developer'),
('Leo', 'Jackson', 'leo.jackson@company.com', 5, 96000.00, '2020-08-25', 'Senior Accountant'),
('Mia', 'White', 'mia.white@company.com', 4, 58000.00, '2023-05-15', 'Recruiter'),
('Nathan', 'Harris', 'nathan.harris@company.com', 6, 65000.00, '2022-11-08', 'Logistics Coordinator'),
('Olivia', 'Martin', 'olivia.martin@company.com', 2, 78000.00, '2021-09-30', 'Digital Marketing Lead');

-- ─── Customers ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(50) NOT NULL,
    registration_date DATE NOT NULL
);

INSERT INTO customers (name, email, city, country, registration_date) VALUES
('Acme Corp', 'contact@acme.com', 'Los Angeles', 'USA', '2022-01-15'),
('Globex Inc', 'info@globex.com', 'London', 'UK', '2021-06-20'),
('Initech', 'hello@initech.com', 'Toronto', 'Canada', '2023-03-10'),
('Umbrella Ltd', 'sales@umbrella.com', 'Berlin', 'Germany', '2022-08-05'),
('Stark Industries', 'orders@stark.com', 'New York', 'USA', '2020-12-01'),
('Wayne Enterprises', 'info@wayne.com', 'Chicago', 'USA', '2021-04-18'),
('Cyberdyne Systems', 'support@cyberdyne.com', 'Tokyo', 'Japan', '2023-07-22'),
('Soylent Corp', 'hello@soylent.com', 'Sydney', 'Australia', '2022-11-30');

-- ─── Orders ───────────────────────────────────────────
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
(1, 'Enterprise License', 5, 1200.00, '2023-01-20', 'completed'),
(1, 'Support Package', 1, 500.00, '2023-02-15', 'completed'),
(2, 'Basic License', 10, 300.00, '2023-03-01', 'completed'),
(3, 'Enterprise License', 2, 1200.00, '2023-03-15', 'pending'),
(4, 'Premium License', 3, 800.00, '2023-04-10', 'completed'),
(5, 'Enterprise License', 8, 1200.00, '2023-04-25', 'completed'),
(5, 'Training Package', 2, 1500.00, '2023-05-05', 'shipped'),
(6, 'Basic License', 15, 300.00, '2023-05-20', 'completed'),
(7, 'Premium License', 1, 800.00, '2023-06-10', 'pending'),
(2, 'Support Package', 3, 500.00, '2023-06-25', 'shipped'),
(8, 'Basic License', 5, 300.00, '2023-07-15', 'completed'),
(3, 'Training Package', 1, 1500.00, '2023-08-01', 'pending'),
(1, 'Premium License', 4, 800.00, '2023-08-20', 'completed'),
(6, 'Enterprise License', 6, 1200.00, '2023-09-10', 'shipped'),
(4, 'Support Package', 2, 500.00, '2023-09-28', 'completed');
