// Name 
let Name = document.getElementById("name");

if (Name === null){
    return;
}

function validateName(Name){
    if(Name.length < 10 && Name.length > 0){
        return true;
    }else{
        return false;
    }
}
while(validateName(Name) === false){
 Name = prompt("Name must be less than 10 and greater than 0")
}


// Email address
let email = document.getElementById("email");

if (email === null){
    return;
}

function validateEmail(email){
    var emailCheck =  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    emailCheckResult = emailCheck.test(email);
    if (emailCheckResult === true){
        return true;
    }else{
        return false;
    }
}
while(validateEmail(email) === false){
    email = prompt("Enter a valid email")
};