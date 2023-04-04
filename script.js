var count = 0;
var students = [];

//CREATE
function addStudent() {

    const name   = document.getElementById('name');
    const email  = document.getElementById('email');
    const age    = document.getElementById('age');
    const grade  = document.getElementById('grade');
    const degree = document.getElementById('degree');

    // required fields check
    if (name.value == '' || email.value == '' || age.value == '' || grade.value == '' || degree.value == '') {
        alert("All fields are required!")
        return;
    }

    //Incrementing the ID
    count++;

    students.push({
        ID: count, name: name.value, email: email.value, age: age.value, grade: grade.value, degree: degree.value
    });

    // Store the updated students array in local storage
    localStorage.setItem("students", JSON.stringify(students));

    // Clear the input fields   
       name.value   = "";
       email.value  = "";
       age.value    = "";
       grade.value  = "";
       degree.value = "";
       console.log(students);
       showTable();
}

function showTable() {
    const tableBody = document.getElementById('tbody');
    while (tableBody.hasChildNodes()) {
       tableBody.removeChild(tableBody.firstChild);
    }

    tableBody.value = ""; 
    students.forEach((student) => 
    {
        const row = document.createElement("tr");
        var keys = Object.keys(student);
        var id = document.createElement('td');

        const name = document.createElement('td');
        const email = document.createElement('td');
        const age = document.createElement('td');
        const grade = document.createElement('td');
        const degree = document.createElement('td');

        keys.forEach((key) => {
            if (key == 'ID') {
                id.innerHTML = student[key];
            }
            else if (key == 'name') {
                name.innerHTML = student[key];
            }
            else if (key == 'email') {
                email.innerHTML = student[key];
            }
            else if (key == 'age') {
                age.innerHTML = student[key];
            }
            else if (key == 'grade') {
                grade.innerHTML = student[key];
            }
            else{
                degree.innerHTML = `<span>${
                    student[key]
                }
                </span> <span class="icons"><a onClick="edit(${student['ID']})" class='fa'>&#xf044;</a> <a onClick="del(${student['ID']})" class='fa'>&#xf1f8;</a> </span> `;
            }
            row.appendChild(id);
            row.appendChild(name);
            row.appendChild(email);
            row.appendChild(age);
            row.appendChild(grade);
            row.appendChild(degree);
        })
        tableBody.appendChild(row);
    })
}
//READ
function search() {
    var input, filter, table, tr, td, i, txtValue, txtValue1, txtValue2;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("tbody");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];  // name idx = 1
        td1 = tr[i].getElementsByTagName("td")[2]; // email idx = 2
        td2 = tr[i].getElementsByTagName("td")[5]; // degree idx = 5

        if (td || td1 || td2) {
            txtValue = td.textContent || td.innerText; //name value
            txtValue1 = td1.textContent || td1.innerText; // email value
            txtValue2 = td2.textContent || td2.innerText; // degree value

            if (txtValue.toUpperCase().includes(filter) || txtValue1.toUpperCase().includes(filter) || txtValue2.toUpperCase().includes(filter)) {
                tr[i].style.display = ""; // by default
            }
            else {
                tr[i].style.display = "none";
            }
        }
    }
}
//UPDATE
function edit(id) {
    students.forEach((student) => {
        if (student['ID'] == id) {
            const name   = document.getElementById('name');
            const email  = document.getElementById('email');
            const age    = document.getElementById('age');
            const grade  = document.getElementById('grade');
            const degree = document.getElementById('degree');
            const submit = document.getElementById('submit');
            
            name.value = student['name'];
            email.value = student['email'];
            age.value = student['age'];
            grade.value = student['grade'];
            degree.value = student['degree'];

            submit.innerText = 'Edit Student';

            document.getElementById("submit").onclick = function jsFunc() {

                student['name']   = name.value;
                student['email']  = email.value;
                student['age']    = age.value;
                student['grade']  = grade.value;
                student['degree'] = degree.value;

                name.value = "";
                email.value = "";
                age.value = "";
                grade.value = "";
                degree.value = "";

                submit.innerText = 'Add Student';

                showTable();
                document.getElementById("submit").setAttribute("onclick","addStudent()");
            }
           
        }
    })
}

//DELETE
function del(id) {
    students.forEach((student, index) => {
        if (student['ID'] == id) {
            students.splice(index, 1);
            showTable();
        }
    })
}

//RESETING COUNT IF ALL DATA DELETED
window.onload = () => {
    students = JSON.parse(localStorage.getItem('students')) || [];
    count = students.reduce((max, student) => Math.max(max, student.ID), 0);
    showTable();
};

window.onbeforeunload = () => {
    localStorage.setItem('students', JSON.stringify(students));
};