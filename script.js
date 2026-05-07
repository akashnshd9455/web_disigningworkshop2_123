function calculateresult() {
    let subject=Number(document.getElementById("subjects").value);
    let total=0;
    for(let i=1;i<=subjects;i++) {
        let marks=Number(prompt("enter marks for subjects"+i));
        total+=marks;
    }
    let average =total/subject;
    let grade;
    let result;
    if(average>=90) {
        grade="a";
        result="pass";
    } else if(grade<90 && grade>=80) {
        grade="b";
        result="pass";
    } else {
        grade="d";
        result="fail";
    }
    document.getElementById("output").innerHTML=
    "total marks: "+total+"<br>"+
    "average marks"
}