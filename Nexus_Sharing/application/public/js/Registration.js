const form = document.getElementById('registration_form');

//Function checkUsername
function checkUsername(){
    var errorMsg = document.getElementById('username_error');
    var valid = /^[a-zA-Z/d]+$/.test(username.value);

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

const username = document.getElementById('uname');
username.addEventListener('blur', checkUsername,false);
//--End of checkUsername function--

//Function checkEmail()
function checkEmail(){
    var errorMsg = document.getElementById('email_error');
    var valid = /[^@]+@[^@]+/.test(email.value)

    if(this.value.length === 0){
        errorMsg.textContent = 'An email is required';
    }else if (!valid){
        errorMsg.textContent = 'Please enter a valid email';
    }else{
        errorMsg.textContent = ' ';
    }
}
const email = document.getElementById('email');
email.addEventListener('blur',checkEmail, false);
//--End of checkEmail function--

//Function checkPassword
function checkPassword(){
    var valid = password.value.length >= 8;
    var errorMsg = document.getElementById('pass_error');
    var RegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password.value);
    if(this.value.length === 0){
        errorMsg.textContent = 'password missing';
    }else if (!valid){
        errorMsg.textContent = 'password shorter than 8 characters';
    }else if(!RegEx) {
        errorMsg.textContent = 'wrong';
    } else{
            errorMsg.textContent = ' '
        }
}
const password = document.getElementById('psw');
password.addEventListener('blur',checkPassword,false);
//--End of checkPassword function--

function checkConfirm(){

    var compare = (password.value === confirPassword.value);
    var errorMsg = document.getElementById('confirm_error');
    if (!compare){
        errorMsg.textContent = 'not the same';
    }else{
        errorMsg.textContent = ''
    }
}
const confirPassword = document.getElementById('repeat_psw');
confirPassword.addEventListener('blur', checkConfirm, false);
