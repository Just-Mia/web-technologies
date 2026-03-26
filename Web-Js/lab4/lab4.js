
function task1() {
    console.log("1");

    let fruits = ["A", "B", "C", "D"];

 
    fruits.pop();
    console.log("1:", fruits);

   
    fruits.unshift("E");
    console.log("2:", fruits);

  
    fruits.sort().reverse();
    console.log("3:", fruits);

   
    console.log("4:", fruits.indexOf("A"));
}


function task2() {
    console.log("\n2");

    let colors = ["2 Blue", "Red", "Green and Blue", "1 Blue", "Yellow"];

    
    let longest = colors.reduce((a, b) => a.length > b.length ? a : b);
    let shortest = colors.reduce((a, b) => a.length < b.length ? a : b);

    console.log("Longest:", longest);
    console.log("Shortest:", shortest);

    
    let filtered = colors.filter(c => c.includes("Blue"));
    console.log("Filtered:", filtered);

 
    let joined = filtered.join(", and ");
    console.log(" ", joined);
}


function task3() {
    console.log("\n3");

    let employees = [
        { name: "I", age: 25, position: "dev" },
        { name: "A", age: 30, position: "des" },
        { name: "B", age: 28, position: "dev" }
    ];

   
    employees.sort((a, b) => a.name.localeCompare(b.name));
    console.log("Sort:", employees);

    
    let devs = employees.filter(e => e.position === "dev");
    console.log("Dev:", devs);

    
    employees = employees.filter(e => e.age <= 28);
    console.log("Delet:", employees);


    employees.push({ name: "M", age: 22, position: "tester" });
    console.log("Added:", employees);
}


function task4() {
    console.log("\n4");

    let students = [
        { name: "A", age: 20, course: 2 },
        { name: "B", age: 22, course: 3 },
        { name: "C", age: 19, course: 1 }
    ];

  
    students = students.filter(s => s.name !== "A");

    
    students.push({ name: "M", age: 23, course: 4 });

   
    students.sort((a, b) => b.age - a.age);

    
    let thirdCourse = students.find(s => s.course === 3);

    console.log("Stud:", students);
    console.log("3 course:", thirdCourse);
}


function task5() {
    console.log("\n5");

    let numbers = [1, 2, 3, 4, 5];

  
    let squares = numbers.map(n => n * n);
    console.log("sq:", squares);

   
    let even = numbers.filter(n => n % 2 === 0);
    console.log("even:", even);

   
    let sum = numbers.reduce((a, b) => a + b, 0);
    console.log("sum:", sum);

   
    let newArr = [6, 7, 8, 9, 10];
    numbers = numbers.concat(newArr);
    console.log("added:", numbers);

  
    numbers.splice(0, 3);
    console.log("splice:", numbers);
}


function libraryManagement() {
    console.log("\n6");

    let books = [
        { title: "A1", author: "Au1", genre: "AAA", pages: 300, isAvailable: true },
        { title: "B2", author: "Au2", genre: "BBB", pages: 200, isAvailable: true }
    ];

    function addBook(title, author, genre, pages) {
        books.push({ title, author, genre, pages, isAvailable: true });
    }

    function removeBook(title) {
        books = books.filter(b => b.title !== title);
    }

    function findBooksByAuthor(author) {
        return books.filter(b => b.author === author);
    }

    function toggleBookAvailability(title, isBorrowed) {
        books.forEach(b => {
            if (b.title === title) {
                b.isAvailable = !isBorrowed;
            }
        });
    }

    function sortBooksByPages() {
        books.sort((a, b) => a.pages - b.pages);
    }

    function getBooksStatistics() {
        let total = books.length;
        let available = books.filter(b => b.isAvailable).length;
        let borrowed = total - available;
        let avgPages = books.reduce((sum, b) => sum + b.pages, 0) / total;

        return { total, available, borrowed, avgPages };
    }

   
    addBook("C3", "Au1", "CCC", 150);
    removeBook("B2");
    toggleBookAvailability("A1", true);
    sortBooksByPages();

    console.log("Books:", books);
    console.log("A1:", findBooksByAuthor("A1"));
    console.log("Res:", getBooksStatistics());
}


function task7() {
    console.log("\n7");

    let student = {
        name: "A",
        age: 21,
        course: 3
    };

   
    student.subjects = ["Eng", "Fre"];

   
    delete student.age;

    console.log("Stud:", student);
}


task1();
task2();
task3();
task4();
task5();
libraryManagement();
task7();