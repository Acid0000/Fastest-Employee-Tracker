// utils/prompts.js
const inquirer = require('inquirer');

const mainMenuPrompt = () => {
    return inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit'
        ]
    });
};

const addDepartmentPrompt = () => {
    return inquirer.prompt({
        name: 'name',
        type: 'input',
        message: 'Enter the name of the department:',
    });
};

const addRolePrompt = (departments) => {
    return inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'Enter the title of the role:',
        },
        {
            name: 'salary',
            type: 'input',
            message: 'Enter the salary for the role:',
        },
        {
            name: 'departmentId',
            type: 'list',
            message: 'Select the department for the role:',
            choices: departments.map(department => ({
                name: department.name,
                value: department.id
            }))
        }
    ]);
};

const addEmployeePrompt = (roles, managers) => {
    return inquirer.prompt([
        {
            name: 'firstName',
            type: 'input',
            message: 'Enter the first name of the employee:',
        },
        {
            name: 'lastName',
            type: 'input',
            message: 'Enter the last name of the employee:',
        },
        {
            name: 'roleId',
            type: 'list',
            message: 'Select the role for the employee:',
            choices: roles.map(role => ({
                name: role.title,
                value: role.id
            }))
        },
        {
            name: 'managerId',
            type: 'list',
            message: 'Select the manager for the employee:',
            choices: [
                { name: 'None', value: null },
                ...managers.map(manager => ({
                    name: `${manager.first_name} ${manager.last_name}`,
                    value: manager.id
                }))
            ]
        }
    ]);
};

const updateEmployeeRolePrompt = (employees, roles) => {
    return inquirer.prompt([
        {
            name: 'employeeId',
            type: 'list',
            message: 'Select the employee to update:',
            choices: employees.map(employee => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id
            }))
        },
        {
            name: 'roleId',
            type: 'list',
            message: 'Select the new role for the employee:',
            choices: roles.map(role => ({
                name: role.title,
                value: role.id
            }))
        }
    ]);
};

module.exports = {
    mainMenuPrompt,
    addDepartmentPrompt,
    addRolePrompt,
    addEmployeePrompt,
    updateEmployeeRolePrompt,
};
