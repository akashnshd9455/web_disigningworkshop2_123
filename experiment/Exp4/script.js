function calculateResult() {
    let numSubjects = document.getElementById("numSubjects").value;
    let resultBox = document.getElementById("resultBox");

    if (numSubjects === "" || numSubjects <= 0) {
        alert("Please enter a valid number of subjects");
        return;
    }

    let total = 0;

    for (let i = 1; i <= numSubjects; i++) {
        let marks = prompt(`Enter marks for subject ${i}:`);
        
        if (marks === null || marks === "" || isNaN(marks)) {
            alert("Invalid input!");
            return;
        }

        total += parseFloat(marks);
    }

    let percentage = total / numSubjects;

    let grade = "";
    if (percentage >= 90) grade = "A+";
    else if (percentage >= 75) grade = "A";
    else if (percentage >= 60) grade = "B";
    else if (percentage >= 50) grade = "C";
    else grade = "Fail";

    resultBox.classList.remove("d-none");

    resultBox.innerHTML = `
        <div class="alert alert-success text-center">
            <h4>Total Marks: ${total}</h4>
            <h4>Percentage: ${percentage.toFixed(2)}%</h4>
            <h4>Grade: ${grade}</h4>
        </div>
    `;
}