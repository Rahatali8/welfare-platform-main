# 15 Din Ka MySQL Course for Beginners (Roman Urdu)

Yeh 15 din ka course apko MySQL database ke har zaroori topic ko Roman Urdu mein seekhaye ga. Har din ke topics detailed explanation, practical tasks, aur code examples ke sath honge. Har code line ki explanation bhi hogi taake ap samajh saken ke kya ho raha hai aur kyun. Course ke end tak, ap ek professional MySQL database bana saken ge.

---

## Day 1: MySQL aur Database ka Introduction

### Topics Covered
- **Database Kya Hai?**: Database ek tarteeb se rakha gaya data ka collection hai jo computer system mein store hota hai. Masalan, ek school ke students ka data (naam, umar, marks) ek database mein save ho sakta hai.
- **MySQL Kya Hai?**: MySQL ek free, open-source relational database management system (RDBMS) hai jo Structured Query Language (SQL) use karta hai data ko manage karne ke liye.
- **MySQL Kyun Use Hota Hai?**: Yeh fast, reliable, aur scalable hai. Web applications jaise WordPress ya e-commerce websites isse bohot use karte hain.
- **Key Concepts**:
  - **Tables**: Data rows aur columns mein store hota hai, jaise ek Excel sheet.
  - **Primary Key**: Har row ka unique identifier hota hai, masalan student ID.
  - **Foreign Key**: Do tables ke darmiyan relation banata hai.
- **MySQL Install Karna**: MySQL Community Server aur MySQL Workbench (GUI tool) download karen [mysql.com](https://www.mysql.com/) se.

### Daily Task
1. MySQL Community Server aur MySQL Workbench install karen.
2. Ek simple database aur table banayein niche diye code se.

### Code Example
```sql
-- Database banayein
CREATE DATABASE school;

-- Database select karen
USE school;

-- Table banayein
CREATE TABLE students (
    student_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    age INT
);
```

### Code Explanation (Roman Urdu)
- `CREATE DATABASE school;`: Yeh command ek naya database banata hai jiska naam "school" hai. Database ek folder ki tarah hota hai jisme tables store hote hain.
- `USE school;`: Isse hum MySQL ko batate hain ke hum "school" database ke sath kaam karna chahte hain.
- `CREATE TABLE students ...`: Ek table banata hai jisme 4 columns hain:
  - `student_id`: Integer type ka unique ID jo har student ko alag karta hai (Primary Key).
  - `first_name`, `last_name`: String fields jo naam store karte hain, max 50 characters.
  - `age`: Integer field jo student ki umar store karta hai.

### Task
- Upar wala code MySQL Workbench mein run karen.
- `SHOW DATABASES;` aur `SHOW TABLES;` commands se verify karen ke database aur table ban gaye hain.

---

## Day 2: Data Insert aur Select Karna

### Topics Covered
- **INSERT**: Table mein naya data daal sakte hain.
- **SELECT**: Table se data nikalne ke liye use hota hai.
- **SELECT ke Zaroori Clauses**:
  - `SELECT *`: Table ke sab columns nikalte hain.
  - `SELECT column_name`: Sirf specific columns nikalte hain.
  - `WHERE`: Data filter karta hai condition ke mutabiq.

### Daily Task
1. `students` table mein data insert karen.
2. `SELECT` queries likhein aur conditions ke sath data nikalein.

### Code Example
```sql
-- Students table mein data daalein
INSERT INTO students (student_id, first_name, last_name, age)
VALUES (1, 'Ali', 'Khan', 20),
       (2, 'Sara', 'Ahmed', 19),
       (3, 'Usman', 'Malik', 21);

-- Sab data nikalein
SELECT * FROM students;

-- Specific columns nikalein
SELECT first_name, age FROM students;

-- Condition ke sath data nikalein
SELECT * FROM students WHERE age > 19;
```

### Code Explanation (Roman Urdu)
- `INSERT INTO students ... VALUES ...`: Yeh command 3 students ka data table mein daalta hai. Har row ke liye `student_id`, `first_name`, `last_name`, aur `age` define kiye gaye hain.
- `SELECT * FROM students;`: Table ke sab columns aur rows ko display karta hai.
- `SELECT first_name, age ...`: Sirf `first_name` aur `age` columns dikhaega.
- `WHERE age > 19`: Sirf un students ko dikhaega jinki umar 19 se zyada hai.

### Task
- Upar wale queries run karen.
- Ek query likhein jo students ke naam nikale jinke `first_name` 'A' se shuru hote hain, masalan: `SELECT * FROM students WHERE first_name LIKE 'A%';`.

---

## Day 3: Data Update aur Delete Karna

### Topics Covered
- **UPDATE**: Table ke existing data ko modify karta hai.
- **DELETE**: Table se data hata deta hai.
- **WHERE Clause ka Zaroorat**: Bina WHERE ke poori table ka data change ya delete ho sakta hai, jo dangerous hai.

### Daily Task
1. Ek student ki umar update karen.
2. Ek student ka record delete karen.

### Code Example
```sql
-- Student ki umar update karen
UPDATE students
SET age = 22
WHERE student_id = 1;

-- Student delete karen
DELETE FROM students
WHERE student_id = 2;

-- Changes verify karen
SELECT * FROM students;
```

### Code Explanation (Roman Urdu)
- `UPDATE students SET age = 22 ...`: `student_id = 1` wale student ki umar ko 22 karta hai.
- `DELETE FROM students ...`: `student_id = 2` wale student ka record hata deta hai.
- `SELECT * ...`: Table ke baad ke changes ko check karta hai.

### Task
- Ek student ka `last_name` update karen.
- 20 se zyada umar ke sab students delete karen aur results verify karen.

---

## Day 4: Data Types aur Constraints

### Topics Covered
- **Common Data Types**:
  - `INT`: Pura number, jaise 1, 100.
  - `VARCHAR(n)`: String data, max n characters tak.
  - `DATE`: Date store karta hai (YYYY-MM-DD format).
  - `DECIMAL(m,n)`: Decimal numbers, jaise prices (m total digits, n decimal ke baad).
- **Constraints**:
  - `NOT NULL`: Column mein NULL value nahi ho sakti.
  - `UNIQUE`: Har value unique honi chahiye.
  - `PRIMARY KEY`: Har row ko uniquely identify karta hai.
  - `FOREIGN KEY`: Do tables ke darmiyan relation banata hai.

### Daily Task
1. Ek nayi table banayein jo alag data types aur constraints use kare.
2. Data insert karen aur constraints test karen.

### Code Example
```sql
-- Table banayein constraints ke sath
CREATE TABLE courses (
    course_id INT PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL,
    credits INT NOT NULL,
    start_date DATE,
    UNIQUE(course_name)
);

-- Data insert karen
INSERT INTO courses (course_id, course_name, credits, start_date)
VALUES (1, 'Mathematics', 3, '2025-09-01'),
       (2, 'Physics', 4, '2025-09-01');

-- Invalid data insert karne ki koshish (NOT NULL ki wajah se fail hoga)
INSERT INTO courses (course_id, course_name)
VALUES (3, 'Chemistry');
```

### Code Explanation (Roman Urdu)
- `CREATE TABLE courses ...`: Ek table banata hai jisme:
  - `course_id`: Unique ID (Primary Key).
  - `course_name`: String, NULL nahi ho sakta aur unique hona chahiye.
  - `credits`: Integer, NULL nahi ho sakta.
  - `start_date`: Date field, optional hai.
- `INSERT INTO courses ...`: Valid data daalta hai.
- Aakhri `INSERT` fail hoga kyunke `credits` `NOT NULL` hai aur value nahi di gayi.

### Task
- Ek `teachers` table banayein jo data types aur constraints use kare.
- Kam se kam 3 records insert karen aur constraints test karen (invalid data ke sath).

---

## Day 5: Multiple Tables ke Sath Relations

### Topics Covered
- **Table Relationships**:
  - **One-to-Many**: Ek record ek table mein, doosri table mein multiple records se relate karta hai (jaise ek teacher, multiple courses).
  - **Many-to-Many**: Junction table ke zariye banaye jate hain (jaise students aur courses).
- **FOREIGN KEY**: Do tables ko link karta hai aur data integrity maintain karta hai.

### Daily Task
1. Ek table banayein jo foreign key use kare.
2. Related data insert karen aur tables ke darmiyan query likhein.

### Code Example
```sql
-- Foreign key wali table banayein
CREATE TABLE enrollments (
    enrollment_id INT PRIMARY KEY,
    student_id INT,
    course_id INT,
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

-- Data insert karen
INSERT INTO enrollments (enrollment_id, student_id, course_id)
VALUES (1, 1, 1),
       (2, 3, 2);

-- Related data query karen
SELECT s.first_name, c.course_name
FROM enrollments e
JOIN students s ON e.student_id = s.student_id
JOIN courses c ON e.course_id = c.course_id;
```

### Code Explanation (Roman Urdu)
- `CREATE TABLE enrollments ...`: Ek junction table banata hai jo students aur courses ko link karta hai:
  - `student_id` aur `course_id` foreign keys hain jo `students` aur `courses` tables se link karte hain.
- `INSERT INTO enrollments ...`: Students ko courses mein enroll karta hai.
- `JOIN`: `enrollments`, `students`, aur `courses` tables ko combine karke student ke naam aur course ke naam dikhaega.

### Task
- Ek `departments` table banayein aur `courses` table ko isse foreign key se link karen.
- Data insert karen aur `courses` aur `departments` ko join karke query likhein.

---

## Day 6: Advanced SELECT Queries

### Topics Covered
- **Aggregate Functions**:
  - `COUNT`: Rows count karta hai.
  - `SUM`, `AVG`, `MIN`, `MAX`: Calculations karte hain.
- **GROUP BY**: Similar values ko group karta hai.
- **HAVING**: Grouped data ko filter karta hai.
- **ORDER BY**: Results ko sort karta hai.

### Daily Task
1. Aggregate functions aur grouping ke sath queries likhein.
2. Results sort aur filter karen.

### Code Example
```sql
-- Har course mein students count karen
SELECT c.course_name, COUNT(e.student_id) AS student_count
FROM courses c
LEFT JOIN enrollments e ON c.course_id = e.course_id
GROUP BY c.course_name;

-- Courses filter karen jahan 1 se zyada students hain
SELECT c.course_name, COUNT(e.student_id) AS student_count
FROM courses c
LEFT JOIN enrollments e ON c.course_id = e.course_id
GROUP BY c.course_name
HAVING COUNT(e.student_id) > 1;

-- Students ko umar ke hisaab se sort karen
SELECT * FROM students
ORDER BY age DESC;
```

### Code Explanation (Roman Urdu)
- `COUNT(e.student_id)`: Har course mein kitne students enrolled hain, yeh count karta hai.
- `GROUP BY c.course_name`: Results ko course ke naam ke hisaab se group karta hai.
- `HAVING COUNT(e.student_id) > 1`: Sirf un courses ko dikhaega jahan 1 se zyada students hain.
- `ORDER BY age DESC`: Students ko umar ke hisaab se bade se chhote tak sort karta hai.

### Task
- Ek query likhein jo har course ke students ki average umar nikale.
- Courses ko enrolled students ke number ke hisaab se sort karen.

---

## Day 7: Joins ka Gahra Samajh

### Topics Covered
- **Joins ke Types**:
  - `INNER JOIN`: Sirf matching records dono tables se.
  - `LEFT JOIN`: Left table ke sab records, right table ke non-matching ke liye NULL.
  - `RIGHT JOIN`: Right table ke sab records.
  - `FULL JOIN`: Dono tables ke sab records.

### Daily Task
1. Alag alag joins ke sath queries likhein.
2. Results ka farq dekhein.

### Code Example
```sql
-- INNER JOIN
SELECT s.first_name, c.course_name
FROM students s
INNER JOIN enrollments e ON s.student_id = e.student_id
INNER JOIN courses c ON e.course_id = c.course_id;

-- LEFT JOIN
SELECT s.first_name, c.course_name
FROM students s
LEFT JOIN enrollments e ON s.student_id = e.student_id
LEFT JOIN courses c ON e.course_id = c.course_id;

-- RIGHT JOIN
SELECT s.first_name, c.course_name
FROM students s
RIGHT JOIN enrollments e ON s.student_id = e.student_id
RIGHT JOIN courses c ON e.course_id = c.course_id;
```

### Code Explanation (Roman Urdu)
- `INNER JOIN`: Sirf un students ko dikhaega jo kisi course mein enrolled hain.
- `LEFT JOIN`: Sab students dikhaega, chahe enrolled na bhi hon (course_name NULL hoga).
- `RIGHT JOIN`: Sab courses dikhaega, chahe koi student enrolled na ho.

### Task
- `FULL JOIN` ka query likhein (agar support ho) ya `UNION` se simulate karen.
- `INNER JOIN` aur `LEFT JOIN` ke results ka comparison karen.

---

## Day 8: Subqueries

### Topics Covered
- **Subquery Kya Hai?**: Ek query jo doosri query ke andar hoti hai.
- **Types**:
  - Single-row: Ek row return karta hai.
  - Multiple-row: Multiple rows return karta hai (`IN`, `ANY`, `ALL` ke sath).
- **Use Cases**: Filtering, calculations, ya comparison ke liye.

### Daily Task
1. Subqueries ke sath queries likhein.
2. Subqueries aur joins ka comparison karen.

### Code Example
```sql
-- Single-row subquery
SELECT first_name, age
FROM students
WHERE age > (SELECT AVG(age) FROM students);

-- Multiple-row subquery
SELECT course_name
FROM courses
WHERE course_id IN (
    SELECT course_id
    FROM enrollments
    WHERE student_id = 1
);
```

### Code Explanation (Roman Urdu)
- `SELECT AVG(age) ...`: Students ki average umar nikalti hai aur usse zyada umar wale students filter karta hai.
- `WHERE course_id IN ...`: Specific student ke enrolled courses ke naam nikalti hai.

### Task
- Ek subquery likhein jo specific course mein enrolled students nikale.
- Isi query ko join ke sath rewrite karen aur efficiency compare karen.

---

## Day 9: Indexes aur Performance

### Topics Covered
- **Index Kya Hai?**: Ek data structure jo queries ko tezi se run karta hai.
- **Types**:
  - `PRIMARY KEY`: Automatically indexed.
  - `UNIQUE`: Unique values ke liye index.
  - `INDEX`: General-purpose index.
- **Trade-offs**: Reads tezi se, writes slow ho sakte hain.

### Daily Task
1. Ek table par index banayein.
2. Query performance index ke sath aur bina index ke compare karen.

### Code Example
```sql
-- Index banayein
CREATE INDEX idx_student_age ON students(age);

-- Index ke sath query
SELECT * FROM students WHERE age = 20;

-- Index hataein
DROP INDEX idx_student_age ON students;
```

### Code Explanation (Roman Urdu)
- `CREATE INDEX ...`: `age` column par index banata hai taake search tezi se ho.
- `DROP INDEX ...`: Index ko hata deta hai jab zarurat na ho.

### Task
- `course_name` par index banayein `courses` table mein.
- Ek query likhein aur index ke sath aur bina index ke performance dekhein (`EXPLAIN` use karen agar possible ho).

---

## Day 10: Transactions aur Data Integrity

### Topics Covered
- **Transaction Kya Hai?**: Ek set of operations jo ek unit ke tor par execute hota hai.
- **ACID Properties**:
  - **Atomicity**: Sab operations complete hon ya koi na ho.
  - **Consistency**: Database hamesha valid state mein rahe.
  - **Isolation**: Transactions ek doosre se interfere na karen.
  - **Durability**: Committed changes permanent hon.
- **Commands**: `START TRANSACTION`, `COMMIT`, `ROLLBACK`.

### Daily Task
1. Related data insert karne ke liye transaction use karen.
2. Rollback functionality test karen.

### Code Example
```sql
-- Transaction shuru karen
START TRANSACTION;

-- Data insert karen
INSERT INTO students (student_id, first_name, last_name, age)
VALUES (4, 'Hassan', 'Raza', 22);

INSERT INTO enrollments (enrollment_id, student_id, course_id)
VALUES (3, 4, 1);

-- Transaction commit karen
COMMIT;

-- Rollback test karen
START TRANSACTION;
INSERT INTO students (student_id, first_name, last_name, age)
VALUES (5, 'Fatima', 'Zahra', 23);
ROLLBACK;
```

### Code Explanation (Roman Urdu)
- `START TRANSACTION`: Transaction shuru karta hai.
- `COMMIT`: Sab changes permanent karta hai.
- `ROLLBACK`: Agar kuch galat ho to changes undo karta hai.

### Task
- Ek transaction banayein jo student aur uski enrollment insert kare, phir commit karen.
- Ek aur transaction banayein, data insert karen aur rollback karen.

---

## Day 11: Views

### Topics Covered
- **View Kya Hai?**: Ek virtual table jo query ke result se banta hai.
- **Use Cases**: Complex queries ko simple karta hai, data access restrict karta hai.
- **Syntax**: `CREATE VIEW`, `SELECT FROM view`.

### Daily Task
1. Ek view banayein complex query ko simplify karne ke liye.
2. View se query karen aur modify karen.

### Code Example
```sql
-- View banayein
CREATE VIEW student_courses AS
SELECT s.first_name, s.last_name, c.course_name
FROM students s
JOIN enrollments e ON s.student_id = e.student_id
JOIN courses c ON e.course_id = c.course_id;

-- View se query karen
SELECT * FROM student_courses;

-- View hataein
DROP VIEW student_courses;
```

### Code Explanation (Roman Urdu)
- `CREATE VIEW ...`: Ek virtual table banata hai jo students aur courses ka data combine karta hai.
- `SELECT * FROM student_courses`: View ko regular table ki tarah query karta hai.
- `DROP VIEW ...`: View ko delete karta hai.

### Task
- Ek view banayein jo students aur unke total credits (enrolled courses se) dikhae.
- View query karen aur drop karen.

---

## Day 12: Stored Procedures

### Topics Covered
- **Stored Procedure Kya Hai?**: Precompiled SQL statements ka set jo database mein store hota hai.
- **Fayde**: Reusable, secure, aur performance improve karta hai.
- **Syntax**: `CREATE PROCEDURE`, `CALL`.

### Daily Task
1. Ek stored procedure banayein jo student insert kare.
2. Procedure call karen aur verify karen.

### Code Example
```sql
-- Stored procedure banayein
DELIMITER //
CREATE PROCEDURE AddStudent(
    IN p_student_id INT,
    IN p_first_name VARCHAR(50),
    IN p_last_name VARCHAR(50),
    IN p_age INT
)
BEGIN
    INSERT INTO students (student_id, first_name, last_name, age)
    VALUES (p_student_id, p_first_name, p_last_name, p_age);
END //
DELIMITER ;

-- Procedure call karen
CALL AddStudent(6, 'Bilal', 'Hussain', 21);

-- Verify karen
SELECT * FROM students;
```

### Code Explanation (Roman Urdu)
- `DELIMITER //`: Multiple statements ke liye delimiter change karta hai.
- `CREATE PROCEDURE ...`: Ek procedure banata hai jo student insert karta hai.
- `CALL AddStudent ...`: Procedure ko parameters ke sath call karta hai.

### Task
- Ek stored procedure banayein jo student ko course mein enroll kare.
- Ise call karen aur enrollment verify karen.

---

## Day 13: Triggers

### Topics Covered
- **Trigger Kya Hai?**: Specific events (INSERT, UPDATE, DELETE) par automatically chalne wala code.
- **Use Cases**: Auditing, rules enforce karna, ya related tables update karna.
- **Syntax**: `CREATE TRIGGER`, `BEFORE`/`AFTER`.

### Daily Task
1. Ek trigger banayein jo `students` table ke changes log kare.
2. Trigger test karen.

### Code Example
```sql
-- Log table banayein
CREATE TABLE student_log (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    action VARCHAR(50),
    log_date TIMESTAMP
);

-- Trigger banayein
DELIMITER //
CREATE TRIGGER after_student_insert
AFTER INSERT ON students
FOR EACH ROW
BEGIN
    INSERT INTO student_log (student_id, action, log_date)
    VALUES (NEW.student_id, 'INSERT', NOW());
END //
DELIMITER ;

-- Trigger test karen
INSERT INTO students (student_id, first_name, last_name, age)
VALUES (7, 'Ayesha', 'Khan', 20);

-- Verify karen
SELECT * FROM student_log;
```

### Code Explanation (Roman Urdu)
- `CREATE TABLE student_log ...`: Ek table banata hai jo changes log karega.
- `CREATE TRIGGER ...`: Har naye student insert hone par log entry banata hai.
- `NEW.student_id`: Naye inserted row ke `student_id` ko refer karta hai.

### Task
- Ek trigger banayein jo student ki umar ko condition ke mutabiq update kare.
- Trigger test karen aur verify karen.

---

## Day 14: User Management aur Security

### Topics Covered
- **MySQL Users**: Database access control karte hain.
- **Privileges**: `GRANT`, `REVOKE` commands se access dete ya lete hain.
- **Security Best Practices**: Strong passwords, least privilege principle.

### Daily Task
1. Ek user banayein aur specific privileges dein.
2. Access test karen aur privileges revoke karen.

### Code Example
```sql
-- User banayein
CREATE USER 'school_user'@'localhost' IDENTIFIED BY 'securepassword';

-- Privileges dein
GRANT SELECT, INSERT ON school.* TO 'school_user'@'localhost';

-- User access test karen (school_user ke tor par login karke)
SELECT * FROM students;

-- Privileges wapas lein
REVOKE INSERT ON school.* FROM 'school_user'@'localhost';
```

### Code Explanation (Roman Urdu)
- `CREATE USER ...`: Ek naya user banata hai password ke sath.
- `GRANT ...`: User ko `school` database par `SELECT` aur `INSERT` permissions deta hai.
- `REVOKE ...`: `INSERT` permission wapas le leta hai.

### Task
- Ek user banayein jo sirf `courses` table par `SELECT` access rakhe.
- Access test karen aur privileges revoke karen.

---

## Day 15: Capstone Project - Poora Database Banayein

### Topics Covered
- **Project Overview**: Ek school management database banayein jo sab concepts use kare.
- **Steps**:
  - Tables design karen relations ke sath.
  - Sample data insert karen.
  - Complex queries, procedures, aur triggers likhein.
  - Indexes se optimize karen aur user privileges se secure karen.

### Daily Task
1. School management database design aur implement karen.
2. Queries likhein aur procedures/triggers test karen.

### Code Example
```sql
-- Tables banayein
CREATE TABLE departments (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(50) NOT NULL
);

CREATE TABLE teachers (
    teacher_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);

-- Sample data insert karen
INSERT INTO departments (dept_id, dept_name)
VALUES (1, 'Computer Science'), (2, 'Mathematics');

INSERT INTO teachers (teacher_id, first_name, dept_id)
VALUES (1, 'Dr. Aslam', 1), (2, 'Prof. Naeem', 2);

-- View banayein
CREATE VIEW teacher_dept AS
SELECT t.first_name, d.dept_name
FROM teachers t
JOIN departments d ON t.dept_id = d.dept_id;

-- Procedure banayein
DELIMITER //
CREATE PROCEDURE AddTeacher(
    IN p_teacher_id INT,
    IN p_first_name VARCHAR(50),
    IN p_dept_id INT
)
BEGIN
    INSERT INTO teachers (teacher_id, first_name, dept_id)
    VALUES (p_teacher_id, p_first_name, p_dept_id);
END //
DELIMITER ;

-- Procedure call karen
CALL AddTeacher(3, 'Sana', 1);

-- Index banayein
CREATE INDEX idx_teacher_dept ON teachers(dept_id);

-- View query karen
SELECT * FROM teacher_dept;
```

### Code Explanation (Roman Urdu)
- Yeh code sab concepts ko combine karta hai: tables, relations, views, procedures, aur indexes.
- Ek school management database banata hai jo departments aur teachers ko link karta hai.
- Real-world application dikhaega MySQL ka.

### Task
- Database ko extend karen, masalan `exams` aur `grades` tables add karen.
- 5 complex queries likhein jo joins, subqueries, aur aggregates use karen.
- `teachers` table ke changes log karne ke liye trigger banayein.

---

### Course Wrap-Up
Is 15 din ke course se ap ne seekha:
- Database aur table banana.
- Data insert, select, update, aur delete karna.
- Advanced queries (joins, subqueries, aggregates).
- Performance optimization (indexes).
- Automation (triggers, procedures).
- Security (user management).
- Ek capstone project jo sab skills ko apply karta hai.

Ab practice jari rakhein aur complex databases banayein. Agar koi topic aur deeply samajhna hai to batayein!