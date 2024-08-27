// index.js
const {
    getDepartments,
    getRoles,
    getEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
} = require('./db/queries');
const {
    mainMenuPrompt,
    addDepartmentPrompt,
    addRolePrompt,
    addEmployeePrompt,
    updateEmployeeRolePrompt,
} = require('./utils/prompts');

async function startApp() {
    const { action } = await mainMenuPrompt();

    switch (action) {
        case 'View all departments':
            const departments = await getDepartments();
            console.table(departments);
            break;
        case 'View all roles':
            const roles = await getRoles();
            console.table(roles);
            break;
        case 'View all employees':
            const employees = await getEmployees();
            console.table(employees);
            break;
        case 'Add a department':
            const { name } = await addDepartmentPrompt();
            await addDepartment(name);
            console.log(`Added ${name} to departments.`);
            break;
        case 'Add a role':
            const deptChoices = await getDepartments();
            const roleData = await addRolePrompt(deptChoices);
            await addRole(roleData.title, roleData.salary, roleData.departmentId);
            console.log(`Added ${roleData.title} to roles.`);
            break;
        case 'Add an employee':
            const roleChoices = await getRoles();
            const managerChoices = await getEmployees();
            const employeeData = await addEmployeePrompt(roleChoices, managerChoices);
            await addEmployee(employeeData.firstName, employeeData.lastName, employeeData.roleId, employeeData.managerId);
            console.log(`Added ${employeeData.firstName} ${employeeData.lastName} to employees.`);
            break;
        case 'Update an employee role':
            const employeeChoices = await getEmployees();
            const newRoleChoices = await getRoles();
            const updateData = await updateEmployeeRolePrompt(employeeChoices, newRoleChoices);
            await updateEmployeeRole(updateData.employeeId, updateData.roleId);
            console.log(`Updated employee's role.`);
            break;
        default:
            console.log('Exiting the application.');
            process.exit();
    }

    // Restart the application loop
    startApp();
}

startApp();
