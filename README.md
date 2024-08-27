# Fastest Employee Tracker

Fastest Employee Tracker is a command-line application that allows business owners to manage their company's employee database efficiently. This application provides an easy-to-use interface for viewing and managing departments, roles, and employees within an organization using Node.js, Inquirer, and PostgreSQL.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Database Schema](#database-schema)
- [Video](#video)
- [License](#license)

## Installation

To use Fastest Employee Tracker, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/fastest-employee-tracker.git
   cd fastest-employee-tracker
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set Up the Database:**
   - Make sure PostgreSQL is installed and running on your machine.
   - Create the `employee_management` database:
     ```sql
     CREATE DATABASE employee_management;
     ```
   - Create the necessary tables and seed the database using the `seeds.sql` file:
     ```bash
     psql -U postgres -d employee_management -f seeds.sql
     ```

4. **Update Database Connection:**
   - Ensure that the `db/connection.js` file is correctly configured with your PostgreSQL credentials.

## Usage

To start using the application, run:

```bash
node index.js
```

You'll be presented with a menu of options to view and manage departments, roles, and employees.

## Features

- **View All Departments:** Displays a table of department names and IDs.
- **View All Roles:** Displays job titles, role IDs, associated departments, and salaries.
- **View All Employees:** Displays employee IDs, names, job titles, departments, salaries, and managers.
- **Add a Department:** Prompts you to enter a new department name and adds it to the database.
- **Add a Role:** Prompts you to enter the role's title, salary, and associated department, then adds it to the database.
- **Add an Employee:** Prompts you to enter the employee's first name, last name, role, and manager, then adds them to the database.
- **Update an Employee Role:** Prompts you to select an employee and update their role.

## Database Schema

The application's database schema includes three tables:

- **Department:**
  - `id`: SERIAL PRIMARY KEY
  - `name`: VARCHAR(30) UNIQUE NOT NULL

- **Role:**
  - `id`: SERIAL PRIMARY KEY
  - `title`: VARCHAR(30) UNIQUE NOT NULL
  - `salary`: DECIMAL NOT NULL
  - `department_id`: INTEGER REFERENCES department(id)

- **Employee:**
  - `id`: SERIAL PRIMARY KEY
  - `first_name`: VARCHAR(30) NOT NULL
  - `last_name`: VARCHAR(30) NOT NULL
  - `role_id`: INTEGER REFERENCES role(id)
  - `manager_id`: INTEGER REFERENCES employee(id)

## Video
https://youtu.be/dGHHNgBAc14

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
