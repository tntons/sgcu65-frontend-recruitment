function postData(data) {
    fetch('http://isd-test.cucheck.in/users',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(data)
        }
    )
    .then(respond => {
        if(respond.ok){
            window.location.href = "../name-list/index.html";
        } else {
            console.log(respond);
        }
    })
    .catch(err => console.log(err));
}



// form validation

const form=document.getElementById('form');
const name=document.getElementById('name');
const surname=document.getElementById('surname');
const user=document.getElementById('user');
const email=document.getElementById('email');
const password=document.getElementById('password');
const confirmpassword=document.getElementById('confirmpassword');
const submit=document.getElementById('submit')

form.addEventListener('submit',function(e){
    e.preventDefault();
    if(checkInput([name,surname,user,email,password,confirmpassword])){
        let data = { 
            name: name.value, 
            surname: surname.value, 
            username: user.value,
            email: email.value, 
            password: password.value 
        };
        // console.log(data);
        postData(data);
    }
})

function showError(input,message){
    const formControl=input.parentElement;
    formControl.className='form-group error';
    const small=formControl.querySelector('small');
    small.innerText=message;
}

function showSuccess(input){
    const formControl=input.parentElement;
    formControl.className='form-group success';
}

function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function checkInput(inputArray){
    inputArray.forEach(function(input){
        if(input.value.trim() === ''){
            showError(input,`กรุณากรอก${input.placeholder}`)
            return false;
        }
        else{
            showSuccess(input);
        }
    });
    if(email.value!='' && !validateEmail(email.value)){
        showError(email,'อีเมลไม่ถูกต้อง');
        return false;
    }
    if(password.value!=confirmpassword.value){
        showError(password,'รหัสผ่านไม่ตรงกัน');
        showError(confirmpassword,'รหัสผ่านไม่ตรงกัน');
        return false;
    }
    if(!checkUser(user.value)){
        showError(user,'ชื่อผู้ใช้ไม่ถูกต้อง');
        return false;
    }
    return true;
}

function checkUser(input){
    if(input.match(/^[a-zA-Z0-9]*$/)){
        return true;
    } 
    return false;
}