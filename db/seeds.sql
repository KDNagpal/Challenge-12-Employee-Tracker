INSERT INTO departments (id, department_name)
VALUES  (001, "Management"),
        (002, "Engineering"),
        (003, "Marketing"),
        (004, "Product Development"),
        (005, "Janitoral"),
        (006, "Intership"),
        (007, "Human Resources"),
        (008, "Guy We Keep Around Cause He's Funny"),
        (009, "Other");

INSERT INTO roles (title, salary, department_id)
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

INSERT INTO employees (first_name, last_name, manager_id, role_id)
VALUES  ("KD","Nagpal",001,009),
        ("Walter","White",002,004),
        ("Jesse","Pinkman",null,004),
        ("Gustavo","Fring",003,003),
        ("Saul","Goodman",004,007),
        ("Hank","Schrader",null,005),
        ("Mike","Ehrmantraut",null,005),
        ("Skyler","White",005,001),
        ("Lydia","Rodarte-Quayle",null,002),
        ("Walter","White Jr",null,006),
        ("Tuco","Salamanca",006,003),
        ("Skinny","Pete",null,006),
        ("Jane","Margolis",null,006),