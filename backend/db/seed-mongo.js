/**
 * MongoDB Seed Script — Populates assignments collection
 *
 * Usage: node db/seed-mongo.js
 *
 * This script is idempotent: it clears existing assignments before inserting.
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Assignment = require('../models/Assignment');

const assignments = [
    {
        title: 'Employee Directory',
        description:
            'Practice basic SELECT queries by retrieving employee information from the employees table.',
        difficulty: 'Easy',
        question:
            'Write a query to retrieve the first name, last name, and job title of all employees.',
        expectedTables: ['employees'],
    },
    {
        title: 'Department Budget Analysis',
        description:
            'Use filtering and sorting to analyze department budgets.',
        difficulty: 'Easy',
        question:
            'Write a query to find all departments with a budget greater than $700,000, sorted by budget in descending order.',
        expectedTables: ['departments'],
    },
    {
        title: 'Employee-Department Join',
        description:
            'Practice JOIN operations by combining employee and department data.',
        difficulty: 'Medium',
        question:
            'Write a query to display each employee\'s full name along with their department name. Include all employees.',
        expectedTables: ['employees', 'departments'],
    },
    {
        title: 'Order Summary by Customer',
        description:
            'Use aggregation functions to summarize order data per customer.',
        difficulty: 'Medium',
        question:
            'Write a query to show each customer\'s name and the total amount they have spent (quantity × price) across all their orders.',
        expectedTables: ['customers', 'orders'],
    },
    {
        title: 'High-Value Orders',
        description:
            'Combine filtering, joins, and calculations to identify high-value transactions.',
        difficulty: 'Medium',
        question:
            'Write a query to find all completed orders where the total value (quantity × price) exceeds $3,000. Show the customer name, product, and total value.',
        expectedTables: ['customers', 'orders'],
    },
    {
        title: 'Salary Analysis by Department',
        description:
            'Use GROUP BY, aggregate functions, and HAVING to perform advanced salary analysis.',
        difficulty: 'Hard',
        question:
            'Write a query to show each department\'s name, the number of employees, the average salary, and the highest salary. Only include departments with more than 2 employees.',
        expectedTables: ['employees', 'departments'],
    },
    {
        title: 'Customer Order Frequency',
        description:
            'Combine multiple joins and subqueries to analyze customer ordering patterns.',
        difficulty: 'Hard',
        question:
            'Write a query to find customers who have placed more than 2 orders. Display their name, total number of orders, and their most recent order date.',
        expectedTables: ['customers', 'orders'],
    },
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB connected for seeding');

        // Clear existing assignments
        await Assignment.deleteMany({});
        console.log('🗑️  Cleared existing assignments');

        // Insert new assignments
        const inserted = await Assignment.insertMany(assignments);
        console.log(`✅ Inserted ${inserted.length} assignments`);

        await mongoose.disconnect();
        console.log('✅ Seeding complete. MongoDB disconnected.');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seeding error:', err.message);
        process.exit(1);
    }
};

seedDB();
