-- UP

INSERT INTO Courses (id, name, description, entry_requirements, date, price) VALUES (1, "Technology", "Technological stuff");
INSERT INTO Courses (id, name, description, entry_requirements, date, price) VALUES (2, "Business", "Business stuff", );

-- DOWN

DELETE FROM Courses WHERE id IN (1, 2);