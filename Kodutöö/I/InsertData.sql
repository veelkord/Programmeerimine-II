use schedule;
INSERT INTO users(firstName, lastName, email, password, role) VALUES
("Koviid", "Neintiin", "koviid@mail.ee","$2b$10$o/fvpIfz2yQuLkXE8u.BC.op0UilsH43/9lS7/13DNFFGeBOMjpwK", "Admin"),
("Krispi", "Kriim", "krispi@mail.ee", "$2b$10$GS/zudPQhyJX2lxZFpBnN.edI7jPzxuX8y.eYZwxqTs12Q9FX8YCe", "User");



INSERT INTO lecturers(firstName, lastName) VALUES
("Martti", "Raavel"),
("Laura", "Hein"),
("Hans", "Solo");

INSERT INTO rooms(room) VALUES
("Arvutilabor 204"),
("Arvutilabor 206");


INSERT INTO courses(course) VALUES
("RIF 1"),
("RIF 2");


INSERT INTO subjects(subject, scheduled, lecturers_id, courses_id) VALUES
("Programmeerimine II", "Neljapäev, 30.09.2021  14:15-17:30, Laupäev 13.11.2021 14:15-17:30", 1, 2),
("Riistvara ja operatsioonisüsteemide alused", "Reede, 08.10.2021  14:15-17:30,Neljapäev 21.10.2021 10:00-13:15", 1, 1),
("Kujundusgraafika", "Neljapäev, 07.10.2021  14:15-17:30, Reede 22.10.2021 10:00-13:15", 2, 1),
("Kujundusgraafika II", "Reede, 01.10.2021  14:15-17:30, Laupäev 16.10.2021 14:15-17:30", 2, 2);


drop schema schedule;

