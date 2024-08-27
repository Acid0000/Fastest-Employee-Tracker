// db/queries.js
const db = require('./connection');

const getDepartments = async () => {
    const res = await db.query('SELECT * FROM department');
    return res.rows;
};

const getRoles = async () => {
    const res = await db.query('SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id');
    return res.rows;
};

const getEmployees = async () => {
    const res = await db.query(`
        SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
        FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee manager ON employee.manager_id = manager.id
    `);
    return res.rows;
};

const addDepartment = async (name) => {
    const res = await db.query('INSERT INTO department (name) VALUES ($1) RETURNING *', [name]);
    return res.rows[0];
};

const addRole = async (title, salary, departmentId) => {
    const res = await db.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *', [title, salary, departmentId]);
    return res.rows[0];
};

const addEmployee = async (firstName, lastName, roleId, managerId) => {
    const res = await db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *', [firstName, lastName, roleId, managerId]);
    return res.rows[0];
};

const updateEmployeeRole = async (employeeId, roleId) => {
    const res = await db.query('UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING *', [roleId, employeeId]);
    return res.rows[0];
};

module.exports = {
    getDepartments,
    getRoles,
    getEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
};
