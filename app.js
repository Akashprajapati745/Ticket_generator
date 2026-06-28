const form = document.querySelector("#ticket-form");

const fileInput =    document.querySelector("#file-input");
const dropArea =    document.querySelector("#drop-area");
const uploadedImage =    document.querySelector("#uploaded-image");
const uploadHint = document.querySelector('#upload-hint');
const messageAction =   document.querySelector("#message-action"); 
const fileActions =  document.querySelector("#file-actions");
const removebtn =    document.querySelector("#remove-image");
const changeBtn =    document.querySelector("#change-image");

const textInputs = document.querySelectorAll(".required");


const formData={
  image:'',
  name:'',
  email:'',
  githubUsername:''
}

// 🔹 click pe file open
dropArea.addEventListener('click', () => {
  fileInput.click()
})

dropArea.addEventListener('dragover', (e) => {
  e.preventDefault();
})

dropArea.addEventListener('drop' , (e) => {
  e.preventDefault();

  const files = e.dataTransfer.files;
  fileInput.files = files;

  validateFile(fileInput , uploadHint);
})

fileInput.addEventListener('change', () => {
  // user cancelled
  if (!fileInput.files[0]) {
    return
  }

  validateFile(fileInput, uploadHint)
})

removebtn.addEventListener('click' ,(e) =>{
  e.preventDefault();
  e.stopPropagation();
  resetUpload();
})

changeBtn.addEventListener('click' , (e) =>{
  e.preventDefault();
  e.stopPropagation();
  fileInput.click();
})

function validateFile(input , hint){
  const file = input.files[0];
  let isValid = true;

  if(!file){
    hint.classList.add('error');
    // svg
    hint.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"
                     width="16"
                     height="16"
                     fill="none"
                     viewBox="0 0 16 16">

                  <path stroke="#f57261"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z"/>

                  <path fill="#f57261"
                        d="M8.004 10.462V7.596ZM8 5.57v-.042Z"/>

                  <path stroke="#f57261"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8.004 10.462V7.596M8 5.569v-.042"/>
                </svg>
                Please upload an image.`

                isValid = false;
  }
  else{

      const validTypes = ["image/jpeg" , "image//png"];
      const validSize = 500 * 1024;

  if(!validTypes.includes(file.type)){
    hint.classList.add('error');
    // svg
    hint.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"
                     width="16"
                     height="16"
                     fill="none"
                     viewBox="0 0 16 16">

                  <path stroke="#f57261"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z"/>

                  <path fill="#f57261"
                        d="M8.004 10.462V7.596ZM8 5.57v-.042Z"/>

                  <path stroke="#f57261"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8.004 10.462V7.596M8 5.569v-.042"/>
                </svg>
                Image type should be jpeg or png.`
                input.value = '';
                isValid = false;
  }
  else if(file.size > validSize){
    hint.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"
                     width="16"
                     height="16"
                     fill="none"
                     viewBox="0 0 16 16">

                  <path stroke="#f57261"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z"/>

                  <path fill="#f57261"
                        d="M8.004 10.462V7.596ZM8 5.57v-.042Z"/>

                  <path stroke="#f57261"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8.004 10.462V7.596M8 5.569v-.042"/>
                </svg>
                File is to large . Please upload a photo under 500kb`
                input.value = '';
                isValid = false;
  }
  else{
    hint.classList.remove('error');
    hint.innerHTML = '<img src="assets/images/icon-upload.svg" alt=""> Upload your photo (JPG or PNG, max size: 500KB).'
    displayImage(file);
  }
  }
  return isValid;
}


function resetUpload(){
  const defaultUploadIcon = 'assets/images/icon-upload.svg';

  fileInput.value = '';
  uploadedImage.src = defaultUploadIcon;
  messageAction.classList.remove('hide');
  fileActions.classList.remove('shows');
  uploadHint.classList.remove('error');
  uploadHint.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="none"
                      viewBox="0 0 16 16">
                 
                   <path stroke="#ffffff"
                         stroke-linecap="round"
                         stroke-linejoin="round"
                         d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z"/>
                 
                   <path fill="#ffffff"
                         d="M8.004 10.462V7.596ZM8 5.57v-.042Z"/>
                 
                   <path stroke="#ffffff"
                         stroke-linecap="round"
                         stroke-linejoin="round"
                         d="M8.004 10.462V7.596M8 5.569v-.042"/>
                   </svg>
                   Upload your photo (JPG or PNG, max size: 500KB).
            </p>`
}

function displayImage(file){

  const reader = new FileReader();

  reader.onload = e => {
    uploadedImage.src = e.target.result;
    fileActions.classList.add('shows');
    messageAction.classList.add('hide');
  }
  reader.readAsDataURL(file);
}

// Text ke liye

function validateTextInputs() {
  let isValid = true

  textInputs.forEach(input => {
    const hint = input.nextElementSibling
    const value = input.value.trim()

    // 🔹 EMPTY CHECK
    if (value === '') {
      input.classList.add('error')
      hint.classList.add('error')
      isValid = false
      return
    }

    // 🔹 NAME VALIDATION (min 3 letters)
    if (input.id === "full-name") {
      if (value.length < 3) {
        input.classList.add('error')
        hint.classList.add('error')
        isValid = false
      } else {
        input.classList.remove('error')
        hint.classList.remove('error')
      }
    }

    // 🔹 EMAIL VALIDATION
    else if (input.type === "email") {
     const emailRegex = /^[a-zA-Z]+[0-9]+@gmail\.com$/

      if (!emailRegex.test(value)) {
        input.classList.add('error')
        hint.classList.add('error')
        isValid = false
      } else {
        input.classList.remove('error')
        hint.classList.remove('error')
      }
    }

    // 🔹 GITHUB VALIDATION (@username)
    else if (input.id === "Github") {
      const githubRegex = /^@[a-zA-Z0-9][a-zA-Z0-9-]{3,38}$/

      if (!githubRegex.test(value)) {
        input.classList.add('error')
        hint.classList.add('error')
        isValid = false
      } else {
        input.classList.remove('error')
        hint.classList.remove('error')
      }
    }

  })

  return isValid
}


form.addEventListener("submit", (e) => {
  e.preventDefault()

  const isTextValid = validateTextInputs()
  const imgValid = validateFile(fileInput, uploadHint)

  if (isTextValid && imgValid) {

    displayFormData();
    document.querySelector('.form-content').classList.add('hide')

    document.getElementById('display-data').style.display = "block"
  }
})

function displayFormData(){
  form.image = uploadedImage.src;
  form.name = document.querySelector('#full-name').value.trim();
  form.email = document.querySelector('#Email').value.trim();
  form.githubUsername = document.querySelector('#Github').value.trim();

  document.querySelector('#header-name').textContent = form.name;
  document.querySelector('#display-email').textContent = form.email;
  document.querySelector('.display-image').src = form.image;
  document.querySelector('#display-name').textContent = form.name;
  document.querySelector('#display-github').textContent = form.githubUsername;
}