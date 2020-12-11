//Delclaring form fieldnames
const Pname = document.AddStudent.surname;
const Gname = document.AddStudent.givenName;
const GenDer = document.AddStudent.gender;
const dOB = document.AddStudent.dob;
const nation = document.AddStudent.country;
const reside = document.AddStudent.residence;
const contact = document.AddStudent.phone;
const mail= document.AddStudent.email;


//Displaying data
const surname_error = document.getElementById('name');
const gname_error = document.getElementById('gName');
const gen_error = document.getElementById('gen')
const dob_error = document.getElementById('DOB');
const origin_error = document.getElementById('Country');
const res_error = document.getElementById('Presidence');
const Phone_error = document.getElementById('tel');
const email_error = document.getElementById('Email');

//Listeners
Pname.addEventListener("blur", PnameVerify, true);
Gname.addEventListener("blur", GnameVerify, true);
dOB.addEventListener("blur", dobVerify, true);
nation.addEventListener("blur", originVerify, true);
reside.addEventListener("blur", resVerify, true);
contact.addEventListener("blur", contactVerify, true);
mail.addEventListener("blur", mailVerify, true);


function validate(){

    if(Pname.value == ""){
        Pname.style.border = "1px solid red";
        surname_error.textContent = "Sur name is required"
        Pname.focus()
        return false
    }
    if(Gname.value == ""){
        Gname.style.border = "1px solid red";
        gname_error.textContent = "Given name is required"
        Gname.focus()
        return false
    }

    if (GenDer[0].checked != true &&
        GenDer[1].checked != true){
        gen_error.textContent = "Please select a gender";
        return false;
    }else{
        gen_error.innerHTML ="";
    }
    
    if(dOB.value == ""){
        dOB.style.border = "1px solid red";
        dob_error.textContent = "Date of Birth is  required"
        dOB.focus()
        return false
    }

    if(nation.value == "Default"){
        nation.style.border = "1px solid red";
        origin_error.textContent = "Country Field is required"
        nation.focus()
        return false
    }

    if(reside.value == ""){
        reside.style.border = "1px solid red";
        res_error.textContent = "This Field is required"
        reside.focus()
        return false
    }

    if(contact.value == ""){
        contact.style.border = "1px solid red";
        Phone_error.textContent = "This Field is required"
        contact.focus()
        return false
    }

    
    if(mail.value == ""){
        mail.style.border = "1px solid red";
        email_error.textContent = "This Field is required"
        mail.focus()
        return false
    }
    
}

//Event Handlers
function PnameVerify(){
    if(Pname.value != ""){
        Pname.style.border = "1px solid green";
        surname_error.innerHTML ="";
        return true;
    }
}

function GnameVerify(){
    if(Gname.value != "" ){
        Gname.style.border = "1px solid green";
        gname_error.innerHTML ="";
        return true;
    }
}

function dobVerify(){
    if(dOB.value != ""){
        dOB.style.border = "1px solid green";
        dob_error.innerHTML ="";
        return true;
    }
}

function originVerify(){
    if(nation.value != "Default" ){
        nation.style.border = "1px solid green";
        origin_error.innerHTML ="";
        return true;
    }
}

function resVerify(){
    if(reside.value != ""){
        reside.style.border = "1px solid green";
        res_error.innerHTML ="";
        return true;
    }
}


function contactVerify(){
    if(contact.value != " "){
        contact.style.border = "1px solid green";
        Phone_error.innerHTML ="";
        return true;
    }
}

function mailVerify(){
    if(mail.value != "Default"){
        mail.style.border = "1px solid green";
        email_error.innerHTML ="";
        return true;
    }
}