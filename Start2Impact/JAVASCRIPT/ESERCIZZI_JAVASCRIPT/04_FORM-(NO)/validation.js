function validate() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let errorBox = document.getElementById('errorMessage');
    let alertDiv = '<div class="alert alert-danger alert-dismissible" role="alert">';
    let alertBtn = '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';

    email.style.border = "1px solid #CCC";
    password.style.border = "1px solid #CCC";

    if(email.value == '') {
        /*alert(`mail non inserita`);*/
        errorBox.innerHTML = alertDiv + alertBtn + `<strong>Attento!</strong> Hai dimenticato di inserire l'email.` + `</div>`;
        email.focus();
        email.style.border = "3px solid red";
        
        return false;
    }

    if(password.value == '') {
        /*alert(`password non inserita`);*/
        errorBox.innerHTML = alertDiv + `<strong>Attento!</strong> Hai dimenticato di inserire la password.` + `</div>`;
        password.focus();
        password.style.border = "3px solid red";
        return false;
    }

    return true;
}