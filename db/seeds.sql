INSERT INTO department (name)
VALUES  ("Management"),
        ("Engineering"),
        ("Marketing"),
        ("Product Development");

INSERT INTO role (title, salary, department_id)
VALUES  ("General Manager", 150000, 001),
        ("Product Manager", 150000, 001),
        ("Product Engineer", 125000, 002),
        ("Software Engineer", 125000, 002),
        ("Product Marketer", 80000, 003);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES  ("KD","Nagpal",null,001),
        ("Walter","White",001,003),
        ("Jesse","Pinkman",001,003),
        ("Gustavo","Fring",001,005),
        ("Saul","Goodman",001,002),
        ("Hank","Schrader",001,005);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;