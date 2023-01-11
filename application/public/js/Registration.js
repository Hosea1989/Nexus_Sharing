const form = document.getElementById('registrationForm');
const username = document.getElementById('uname');
const email = document.getElementById('email');
const password = document.getElementById('psw');
const confirmPassword = document.getElementById('repeat_psw');
const fix_errors = document.getElementById('fix_error');
//Function checkUsername

function checkUsername(username){
    const errorMsg = document.getElementById('username_error');
    const valid = /^[a-zA-Z/d]+$/.test(username.value);

    if (this.value.length === 0){
        errorMsg.textContent = 'Username is required';
    } else if (this.value.length <= 3) {
        errorMsg.textContent = 'Username must be greater than 3 alphanumeric characters';
    } else if (!valid){
        errorMsg.textContent = "Username must start with letter";
    } else{
        errorMsg.textContent = ' ';
    }

}
username.addEventListener('blur', checkUsername,false);
//--End of checkUsername function--

//Function checkEmail()
function checkEmail(){
    const errorMsg = document.getElementById('email_error');
    const valid = /[^@]+@[^@]+/.test(email.value);

    if(this.value.length === 0){
        errorMsg.textContent = 'An email is required';
        return false;

    }else if (!valid){
        errorMsg.textContent = 'Please enter a valid email';
        return false;

    }else{
        errorMsg.textContent = ' ';
        return false;

    }
}

email.addEventListener('blur',checkEmail, false);
//--End of checkEmail function--

//Function checkPassword
function checkPassword(){
    const valid = password.value.length >= 8;
    const errorMsg = document.getElementById('pass_error');
    const RegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password.value);
    if(this.value.length === 0){
        errorMsg.textContent = 'password missing';
        return false;
    }else if (!valid){
        errorMsg.textContent = 'password shorter than 8 characters';
        return false;
    }else if(!RegEx) {
        errorMsg.textContent = 'wrong';
        return false;
    } else{
            errorMsg.textContent = ' ';
        return false;
        }
}

password.addEventListener('blur',checkPassword,false);
//--End of checkPassword function--

function checkConfirm(){
    const errorMsg = document.getElementById('confirm_error');

    if (password.value !== confirmPassword.value){
        errorMsg.textContent = 'not the same';
        return false;
    }else {
        errorMsg.textContent = '';
        return false;
    }
}

confirmPassword.addEventListener('blur', checkConfirm, false);

const button = document.getElementById('button');

if (form){
    form.addEventListener('submit', function(e) {

        console.log(username.value);
        console.log(email.value);
        console.log(password.value);
        console.log(confirmPassword.value);
        e.preventDefault();

    })
}
// button.addEventListener('click', function(e){
//
//     console.log(username.value);
//     console.log(email.value);
//     console.log(password.value);
//     console.log(confirmPassword.value);
//     e.preventDefault();
//     // let messages = [];
//     //
//     // if(username.value === ' ' || username.value === null){
//     //     messages.push('name is required')
//     // }
//     //
//     //
//     // if(email.value === ' ' || email.value === null ){
//     //     messages.push('use valid email')
//     // }
//     //
//     // if(password.value.length < 8 || password.value.length === 0 ){
//     //     messages.push('password must be longer than 8 chars')
//     // }
//     //
//     // if(password !== confirmPassword){
//     //     messages.push('Password not the same')
//     // }
//     //
//     // if(messages > 0){
//     //     e.preventDefault();
//     // }
//
//
// })


// function validateForm(){
//
//     checkUsername(uname);
//     checkEmail();
//     checkPassword();
//     checkConfirm();
//
//     if
//
// }

// form.addEventListener('onClick', return validateForm());
