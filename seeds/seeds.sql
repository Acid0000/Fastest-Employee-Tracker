
INSERT INTO department (name) VALUES ('Sales');
INSERT INTO department (name) VALUES ('Engineering');
INSERT INTO department (name) VALUES ('Finance');
INSERT INTO department (name) VALUES ('Human Resources');

INSERT INTO role (title, salary, department_id) VALUES ('Salesperson', 100, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Software Engineer', 200, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Accountant', 500, 3);
INSERT INTO role (title, salary, department_id) VALUES ('HR Manager', 1000000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Patrick', 'Star', 1, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Sandy', 'Cheeks', 2, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Squidward', 'Tenticles', 3, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Mr.', 'Crabs', 4, NULL);
