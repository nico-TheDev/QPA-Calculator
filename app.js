const subjectName = document.getElementById("name"),
    subjectUnits = document.getElementById("units"),
    summativeScore = document.getElementById("sm-score"),
    summativePercent = document.getElementById("sm-percent"),
    seatworkScore = document.getElementById("sw-score"),
    seatworkPercent = document.getElementById("sw-percent"),
    addBtn = document.querySelector(".add"),
    finalBtn = document.querySelector(".final"),
    inputs = document.querySelectorAll("input"),
    table = document.querySelector(".table"),
    modal = document.querySelector(".howto-bg"),
    modalBtn = document.querySelector(".nav__about"),
    closeBtn = document.querySelector(".close"),
    howTo = document.querySelector(".howto"),
    finalModal = document.querySelector(".semgrade"),
    finalGrade = document.querySelector(".final-grade__number"),
    finalLetter = document.querySelector(".final-grade__letter");
// Data structure

const grades = [];

class GradeForSubject {
    constructor(name, units, smScore, smPercent, swScore, swPercent) {
        this.name = name;
        this.units = units;
        this.smScore = smScore;
        this.smPercent = smPercent;
        this.swScore = swScore;
        this.swPercent = swPercent;
        this.numerical =
            this.smPercent * this.smScore + this.swPercent * this.swScore;
        // this.qualityPoint = 0;
        // this.letterGrade = '';
        // this.weightedQP = 0;
    }

    computeQualityPoint() {
        getQualityPoint(
            this.numerical,
            this.letterGrade,
            this.qualityPoint,
            this.weightedQP,
            this.units
        );
    }

    getQualityPoint() {
        let numericalGrade = Math.ceil(this.numerical);

        if (numericalGrade >= 92 && numericalGrade <= 100) {
            this.letterGrade = "A";
            this.qualityPoint = 4;
        } else if (numericalGrade >= 85 && numericalGrade <= 91) {
            this.letterGrade = "B+";
            this.qualityPoint = 3.5;
        } else if (numericalGrade >= 78 && numericalGrade <= 84) {
            this.letterGrade = "B";
            this.qualityPoint = 3;
        } else if (numericalGrade >= 71 && numericalGrade <= 77) {
            this.letterGrade = "C+";
            this.qualityPoint = 2.5;
        } else if (numericalGrade >= 64 && numericalGrade <= 70) {
            this.letterGrade = "C";
            this.qualityPoint = 2;
        } else if (numericalGrade >= 57 && numericalGrade <= 63) {
            this.letterGrade = "D+";
            this.qualityPoint = 1.5;
        } else if (numericalGrade >= 50 && numericalGrade <= 56) {
            this.letterGrade = "D";
            this.qualityPoint = 1;
        } else if (numericalGrade < 50) {
            this.letterGrade = "F";
            this.qualityPoint = 0;
        }

        this.weightedQP = this.qualityPoint * this.units;
    }
}

addBtn.addEventListener("click", addToTable);
finalBtn.addEventListener("click", computeFinal);
modalBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", removeModal);

document.addEventListener("keydown", (e) => {
    if (e.key === 13 || e.which === 13) {
        addToTable();
    } else if (e.key === "Escape") {
        removeModal();
    }
});

function openModal() {
    modal.classList.add("openModal");
    howTo.classList.add("openModal");
}
function removeModal() {
    modal.classList.remove("openModal");
    howTo.classList.remove("openModal");
    finalModal.classList.remove("openModal");
}
function addToTable() {
    let allowed;
    // input checking
    for (let i = 1; i < inputs.length; i++) {
        if (
            inputs[i].value === "" ||
            subjectName.value === "" ||
            Number(summativePercent.value) + Number(seatworkPercent.value) !==
                100
        ) {
            allowed = false;
        } else {
            allowed = true;
        }
    }

    if (allowed) {
        //variables for the object
        const name = subjectName.value;
        const units = parseInt(subjectUnits.value);
        const smScore = eval(summativeScore.value) * 100;
        const smPercent = parseFloat(summativePercent.value) / 100;
        const swScore = eval(seatworkScore.value) * 100;
        const swPercent = parseFloat(seatworkPercent.value) / 100;
        let newGrade = new GradeForSubject(
            name,
            units,
            smScore,
            smPercent,
            swScore,
            swPercent
        );
        newGrade.getQualityPoint();
        grades.push(newGrade);
        console.log(grades);

        const markup = `
        <div class="row">
            <p class="cell span-3">${newGrade.name}</p>
            <p class="cell">${newGrade.units}</p>
            <p class="cell">${newGrade.letterGrade}</p>
            <p class="cell">${newGrade.qualityPoint}</p>
            <p class="cell">${newGrade.weightedQP.toFixed(2)}</p>
        </div>
        `;

        table.insertAdjacentHTML("beforeend", markup);

        inputs.forEach((input) => {
            input.value = "";
        });
    } else {
        alert("Something in your input does not add up");
    }
}

function computeFinal() {
    if (grades.length === 0) {
        alert("NO GRADES YET");
    } else {
        let totalWQP = 0,
            totalUnits = 0;

        grades.forEach((subj) => {
            totalWQP += subj.weightedQP;
        });
        grades.forEach((subj) => {
            totalUnits += subj.units;
        });

        const semestralGrade = totalWQP / totalUnits;

        finalGrade.textContent = semestralGrade.toFixed(2);
        finalModal.classList.add("openModal");
    }
}

// let numericalGrade = Math.ceil(semestralGrade);

// if (numericalGrade >= 92 && numericalGrade <= 100) {
//     letterGrade = "A";
// } else if (numericalGrade >= 85 && numericalGrade <= 91) {
//     letterGrade = "B+";
// } else if (numericalGrade >= 78 && numericalGrade <= 84) {
//     letterGrade = "B";
// } else if (numericalGrade >= 71 && numericalGrade <= 77) {
//     letterGrade = "C+";
// } else if (numericalGrade >= 64 && numericalGrade <= 70) {
//     letterGrade = "C";
// } else if (numericalGrade >= 57 && numericalGrade <= 63) {
//     letterGrade = "D+";
// } else if (numericalGrade >= 50 && numericalGrade <= 56) {
//     letterGrade = "D";
// } else if (numericalGrade < 50) {
//     letterGrade = "F";
// }

// console.log(semestralGrade);
// alert(`Your Semestral Grade: ${semestralGrade}`);
