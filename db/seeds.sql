INSERT INTO department (name)
VALUES  ("Management"),
        ("Engineering"),
        ("Marketing"),
        ("Product Development"),
        ("Janitoral"),
        ("Intership"),
        ("Human Resources"),
        ("Guy We Keep Around Cause He's Funny"),
        ("Other");

INSERT INTO role (title, salary, department_id)
VALUES  ("General Manager", 150000, 001),
        ("Product Manager", 150000, 001),
        ("Product Engineer", 125000, 004),
        ("Software Engineer", 125000, 002),
        ("Product Marketer", 80000, 003),
        ("Human Resources Manager", 60000, 007),
        ("Inern", 25000, 006),
        ("Intern Manager", 65000, 001),
        ("Funny Guy", 100000, 008),
        ("Janitor", 40000, 005),
        ("Groundskeeper", 40000, 005),
        ("Other", 250000, 009);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES  ("KD","Nagpal",001,012),
        ("Walter","White",001,003),
        ("Jesse","Pinkman",null,003),
        ("Gustavo","Fring",001,005),
        ("Saul","Goodman",001,006),
        ("Hank","Schrader",null,010),
        ("Mike","Ehrmantraut",null,011),
        ("Skyler","White",002,008),
        ("Lydia","Rodarte-Quayle",null,004),
        ("Walter","White Jr",null,007),
        ("Tuco","Salamanca",002,005),
        ("Skinny","Pete",null,007),
        ("Jane","Margolis",null,007);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;