const dbConnection = require('./connection');

const fetchDepartments = async () => {
    try {
        const result = await dbConnection.query('SELECT * FROM department');
        return result.rows;
    } catch (error) {
        console.error("Error fetching departments:", error);
        throw error;
    }
};

const fetchRoles = async () => {
    try {
        const query = `
            SELECT role.id, role.title, role.salary, department.name AS department
            FROM role
            JOIN department ON role.department_id = department.id
        `;
        const result = await dbConnection.query(query);
        return result.rows;
    } catch (error) {
        console.error("Error fetching roles:", error);
        throw error;
    }
};

const fetchEmployees = async () => {
    try {
        const query = `
            SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, 
                   CONCAT(manager.first_name, ' ', manager.last_name) AS manager
            FROM employee
            LEFT JOIN role ON employee.role_id = role.id
            LEFT JOIN department ON role.department_id = department.id
            LEFT JOIN employee manager ON employee.manager_id = manager.id
        `;
        const result = await dbConnection.query(query);
        return result.rows;
    } catch (error) {
        console.error("Error fetching employees:", error);
        throw error;
    }
};

const createDepartment = async (departmentName) => {
    try {
        const result = await dbConnection.query('INSERT INTO department (name) VALUES ($1) RETURNING *', [departmentName]);
        return result.rows[0];
    } catch (error) {
        console.error("Error adding department:", error);
        throw error;
    }
};

const createRole = async (roleTitle, roleSalary, departmentId) => {
    try {
        const query = `
            INSERT INTO role (title, salary, department_id)
            VALUES ($1, $2, $3)
            RETURNING *
        `;
        const result = await dbConnection.query(query, [roleTitle, roleSalary, departmentId]);
        return result.rows[0];
    } catch (error) {
        console.error("Error adding role:", error);
        throw error;
    }
};

const createEmployee = async (firstName, lastName, roleId, managerId) => {
    try {
        const query = `
            INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const result = await dbConnection.query(query, [firstName, lastName, roleId, managerId]);
        return result.rows[0];
    } catch (error) {
        console.error("Error adding employee:", error);
        throw error;
    }
};

const modifyEmployeeRole = async (employeeId, newRoleId) => {
    try {
        const result = await dbConnection.query('UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING *', [newRoleId, employeeId]);
        return result.rows[0];
    } catch (error) {
        console.error("Error updating employee role:", error);
        throw error;
    }
};

module.exports = {
    fetchDepartments,
    fetchRoles,
    fetchEmployees,
    createDepartment,
    createRole,
    createEmployee,
    modifyEmployeeRole,
};
