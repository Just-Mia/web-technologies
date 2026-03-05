//function findMinMax(arr) {
//    if (arr.length === 0) {
//        return "Масив порожній";
//    }

//    let min = arr[0];
//    let max = arr[0];

//    for (let i = 1; i < arr.length; i++) {
//        if (arr[i] < min) {
//            min = arr[i];
//        }
//        if (arr[i] > max) {
//            max = arr[i];
//        }
//    }

//    return { min: min, max: max };
//}

//console.log(findMinMax([3, 7, 1, 9, 4]));




//function compareObjects(obj1, obj2) {
//    return obj1.name === obj2.name && obj1.age === obj2.age;
//}

//let person1 = { name: "Anna", age: 20 };
//let person2 = { name: "Anna", age: 20 };

//console.log(compareObjects(person1, person2));




//function isInRange(number, min, max) {
//    return number >= min && number <= max;
//}

//console.log(isInRange(5, 1, 10));



//let isActive = true;

//isActive = !isActive;

//console.log(isActive);





//function getGradeText(grade) {
//    if (grade >= 90) {
//        return "Відмінно";
//    } else if (grade >= 70) {
//        return "Добре";
//    } else if (grade >= 50) {
//        return "Задовільно";
//    } else {
//        return "Незадовільно";
//    }
//}



//function getGradeTextTernary(grade) {
//    return grade >= 90 ? "Відмінно" :
//        grade >= 70 ? "Добре" :
//            grade >= 50 ? "Задовільно" :
//                "Незадовільно";
//}





//function getSeason(month) {
//    if (month === 12 || month === 1 || month === 2) {
//        return "Зима";
//    } else if (month >= 3 && month <= 5) {
//        return "Весна";
//    } else if (month >= 6 && month <= 8) {
//        return "Літо";
//    } else if (month >= 9 && month <= 11) {
//        return "Осінь";
//    } else {
//        return "Невірний місяць";
//    }
//}




//function getSeasonTernary(month) {
//    return (month === 12 || month === 1 || month === 2) ? "Зима" :
//        (month >= 3 && month <= 5) ? "Весна" :
//            (month >= 6 && month <= 8) ? "Літо" :
//                (month >= 9 && month <= 11) ? "Осінь" :
//                    "Невірний місяць";
//}