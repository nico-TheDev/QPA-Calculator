const subjectName = document.getElementById("name"),
    subjectUnits = document.getElementById("units"),
    summativeScore = document.getElementById("sm-score"),
    summativePercent = document.getElementById("sm-percent"),
    seatworkScore = document.getElementById("sw-score"),
    seatworkPercent = document.getElementById("sw-percent"),
    addBtn = document.querySelector(".add"),
    finalBtn = document.querySelector('.final'),
    inputs = document.querySelectorAll("input"),
    table = document.querySelector('.table');

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
        this.numerical = (this.smPercent * this.smScore) + (this.swPercent * this.swScore);
    }

    getQualityPoint(){
        let numericalGrade = Math.ceil(this.numerical);

        if(numericalGrade >= 92 && numericalGrade <= 100){
            this.letterGrade = 'A';
            this.qualityPoint = 4;
        }
        else if(numericalGrade >= 85 && numericalGrade <= 91){
            this.letterGrade = 'B+';
            this.qualityPoint = 3.5;
        }
        else if(numericalGrade >= 78 && numericalGrade <= 84){
            this.letterGrade = 'B';
            this.qualityPoint = 3;
        }
        else if(numericalGrade >= 71 && numericalGrade <=77){
            this.letterGrade = 'C+';
            this.qualityPoint = 2.5;
        }
        else if(numericalGrade >= 64 && numericalGrade <= 70){
            this.letterGrade = 'C';
            this.qualityPoint = 2;
        }
        else if(numericalGrade >= 57 && numericalGrade <= 63){
            this.letterGrade = 'D+';
            this.qualityPoint = 1.5;
        }
        else if(numericalGrade >= 50 && numericalGrade <= 56){
            this.letterGrade = 'D';
            this.qualityPoint = 1;
        }
        else if(numericalGrade < 50){
            this.letterGrade = 'F';
            this.qualityPoint = 0;
        }

        this.weightedQP = this.qualityPoint * this.units;
    }
}

addBtn.addEventListener("click", addToTable);
finalBtn.addEventListener('click',computeFinal);
window.addEventListener('keypress',(e)=>{
    if(e.keyCode === 13 || e.which === 13){
        addToTable();
    }
})

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
        let newGrade = new GradeForSubject(name,units,smScore,smPercent,swScore,swPercent);
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

        table.insertAdjacentHTML('beforeend',markup);

        inputs.forEach(input => {
            input.value = '';
        })

    } else {
        alert("Something in your input does not add up");
    }
}

function computeFinal(){
    // const totalWQP = grades.reduce((acc,cur)=>{
    //     acc += cur.weightedQP;
    // },0)
    // const totalUnits = grades.reduce((acc,cur)=>{
    //     acc += cur.units;
    // },0)

    let totalWQP = 0,
        totalUnits = 0;

        grades.forEach(subj => {
            totalWQP += subj.weightedQP;
        });
        grades.forEach(subj => {
            totalUnits += subj.units;
        });

    const semestralGrade = totalWQP / totalUnits;

    // console.log(semestralGrade);
    alert(`Your Semestral Grade: ${semestralGrade}`);   
}