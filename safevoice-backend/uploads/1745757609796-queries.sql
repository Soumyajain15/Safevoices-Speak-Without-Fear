/*PRIMARY KEY=UNIQUE+NOT NULL*/
/*to update the value */
/*to delete the data*/
/*
truncate delete the table data 
drop delete the entire table
  */
/*create table student(
  id INT PRIMARY KEY,
  name varchar(50),
  age INT NOT NULL
);
insert into student  VALUES (1,"AMAN",28),(2,"RAJ",27);
select*from student;
update student 
set name="sam"
where age=28;
select*from student;
delete from student
where name="sam";
select * from student;


/* it will give the default value*/
/*create table emp(
id INT ,
salary INT DEFAULT 2500
);
INSERT INTO emp(id) VALUES (1),(2),(3),(4),(5),(6),(7),(8),(9);
select*from emp LIMIT 2
*/
create table dept(
  id INT PRIMARY KEY,
  name VARCHAR(50)
);
insert into dept values(100,"sam"),(101,"alex");
select * from dept;
create table teacher(
  id int PRIMARY KEY,
  name VARCHAR(50),
  dept_id INT,
  foreign KEY (dept_id) references dept(id)
);
insert into teacher values (100,"Adam",100),(101,"eve",101);
select * from teacher;
/*Joins in sql*/