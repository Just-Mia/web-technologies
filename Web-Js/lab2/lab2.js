//function findMinMax(arr) {
//    if (arr.length === 0) {
//        return "Empty";
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

//let person1 = { name: "B", age: 1 };
//let person2 = { name: "B", age: 1 };

//console.log(compareObjects(person1, person2));




//function isInRange(number, min, max) {
//    return number >= min && number <= max;
//}

//console.log(isInRange(0, 1, 12));



//let isActive = true;

//isActive = !isActive;

//console.log(isActive);






//function getGradeText(grade) {
//    if (grade >= 90) {
//        return "A-mark";
//    } else if (grade >= 70) {
//        return "C-mark";
//    } else if (grade >= 50) {
//        return "D-mark";
//    } else {
//        return "F-mark";
//    }
//}
//console.log(getGradeText(80));


//function getGradeTextTernary(grade) {
//    return grade >= 90 ? "A-mark" :
//        grade >= 70 ? "C-mark" :
//            grade >= 50 ? "D-mark" :
//                "F-mark";
//}
//console.log(getGradeTextTernary(4));




//function getSeason(month) {
//    if (month === 12 || month === 1 || month === 2) {
//        return "W";
//    } else if (month >= 3 && month <= 5) {
//        return "Sp";
//    } else if (month >= 6 && month <= 8) {
//        return "S";
//    } else if (month >= 9 && month <= 11) {
//        return "F";
//    } else {
//        return "Error";
//    }
//}
//console.log(getSeason(4));



//function getSeasonTernary(month) {
//    return (month === 12 || month === 1 || month === 2) ? "   W" :
//        (month >= 3 && month <= 5) ? "Sp" :
//            (month >= 6 && month <= 8) ? "S" :
//                (month >= 9 && month <= 11) ? "F" :
//                    "Error2";
//}
//console.log(getSeasonTernary(6));