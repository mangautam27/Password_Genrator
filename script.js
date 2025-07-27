// Select elements
const passwordDisplay = document.getElementById("passwordDisplay");
const copyBtn = document.getElementById("copyBtn");
const lengthInput = document.getElementById("lengthInput");
const lengthSlider = document.getElementById("lengthSlider");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const generateBtn = document.getElementById("generateBtn");
const strengthLabel = document.getElementById("strengthLabel");
const strengthColor = document.getElementById("strengthColor");

// Characters to choose from
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>/?";

// Sync slider and number input
lengthSlider.addEventListener("input", () => {
  lengthInput.value = lengthSlider.value;
});

lengthInput.addEventListener("input", () => {
  if (lengthInput.value > 20) lengthInput.value = 20;
  if (lengthInput.value < 1) lengthInput.value = 1;
  lengthSlider.value = lengthInput.value;
});

// Generate random character from a string
function getRandomChar(str) {
  return str[Math.floor(Math.random() * str.length)];
}

// Generate password
function generatePassword() {
  let characters = "";
  if (uppercaseCheckbox.checked) characters += uppercaseChars;
  if (lowercaseCheckbox.checked) characters += lowercaseChars;
  if (numbersCheckbox.checked) characters += numberChars;
  if (symbolsCheckbox.checked) characters += symbolChars;

  const length = parseInt(lengthInput.value);
  if (!characters || length === 0) {
    passwordDisplay.value = "";
    return;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    password += getRandomChar(characters);
  }

  passwordDisplay.value = password;
  updateStrength(password);
}

// Password strength
function updateStrength(password) {
  const length = password.length;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  let strength = 0;
  if (hasUpper) strength++;
  if (hasLower) strength++;
  if (hasNumber) strength++;
  if (hasSymbol) strength++;
  if (length >= 12) strength++;

  if (strength <= 2) {
    strengthLabel.textContent = "Weak";
    strengthColor.style.backgroundColor = "red";
  } else if (strength === 3 || strength === 4) {
    strengthLabel.textContent = "Moderate";
    strengthColor.style.backgroundColor = "orange";
  } else {
    strengthLabel.textContent = "Strong";
    strengthColor.style.backgroundColor = "green";
  }
}

// Copy to clipboard
copyBtn.addEventListener("click", () => {
  if (passwordDisplay.value) {
    navigator.clipboard.writeText(passwordDisplay.value);
    copyBtn.title = "Copied!";
    setTimeout(() => (copyBtn.title = "Copy to clipboard"), 2000);
  }
});

// Generate button click
generateBtn.addEventListener("click", generatePassword);
