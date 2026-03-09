const REGEX = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    uppercase: /[A-Z]/,
    lowercase: /[a-z]/,
    number: /\d/,
    specialChar: /[@$!%*?&]/,
    minLength: /.{8,}/
};

const signInForm = document.getElementById('signInForm');
const signUpForm = document.getElementById('signUpForm');
const loginFormEl = document.getElementById('loginForm');
const registerFormEl = document.getElementById('registerForm');

const signInEmail = document.getElementById('signInEmail');
const signInPassword = document.getElementById('signInPassword');
const signInTogglePassword = document.getElementById('signInTogglePassword');
const signInBtn = document.getElementById('signInBtn');
const signInEmailError = document.getElementById('signInEmailError');
const signInPasswordError = document.getElementById('signInPasswordError');
const signInRememberMe = document.getElementById('signInRememberMe');
const toggleToSignUp = document.getElementById('toggleToSignUp');

const signUpEmail = document.getElementById('signUpEmail');
const signUpPassword = document.getElementById('signUpPassword');
const signUpConfirmPassword = document.getElementById('signUpConfirmPassword');
const signUpTogglePassword = document.getElementById('signUpTogglePassword');
const signUpBtn = document.getElementById('signUpBtn');
const signUpEmailError = document.getElementById('signUpEmailError');
const signUpPasswordError = document.getElementById('signUpPasswordError');
const signUpConfirmError = document.getElementById('signUpConfirmError');
const signUpStrengthBar = document.getElementById('signUpStrengthBar');
const signUpStrengthText = document.getElementById('signUpStrengthText');
const agreeTerms = document.getElementById('agreeTerms');
const toggleToSignIn = document.getElementById('toggleToSignIn');

const toast = document.getElementById('toast');
const successMessage = document.getElementById('successMessage');
const userEmailDisplay = document.getElementById('userEmail');
const logoutBtn = document.getElementById('logoutBtn');

const state = {
    signIn: {
        emailValid: false,
        passwordValid: false
    },
    signUp: {
        emailValid: false,
        passwordValid: false,
        confirmValid: false,
        termsAccepted: false
    }
};


document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    checkAuthState();
});

function initializeApp() {
    toggleToSignUp.addEventListener('click', (e) => {
        e.preventDefault();
        switchForms('signUp');
    });

    toggleToSignIn.addEventListener('click', (e) => {
        e.preventDefault();
        switchForms('signIn');
    });

    signInEmail.addEventListener('input', handleSignInEmailInput);
    signInEmail.addEventListener('blur', handleSignInEmailBlur);
    signInPassword.addEventListener('input', handleSignInPasswordInput);
    signInPassword.addEventListener('blur', handleSignInPasswordBlur);
    signInTogglePassword.addEventListener('click', (e) => handleTogglePassword(e, 'signIn'));
    loginFormEl.addEventListener('submit', handleSignInSubmit);
    signInRememberMe.addEventListener('change', () => {
        localStorage.setItem('rememberMeSignIn', signInRememberMe.checked);
    });

    signUpEmail.addEventListener('input', handleSignUpEmailInput);
    signUpEmail.addEventListener('blur', handleSignUpEmailBlur);
    signUpPassword.addEventListener('input', handleSignUpPasswordInput);
    signUpPassword.addEventListener('blur', handleSignUpPasswordBlur);
    signUpConfirmPassword.addEventListener('input', handleSignUpConfirmInput);
    signUpConfirmPassword.addEventListener('blur', handleSignUpConfirmBlur);
    signUpTogglePassword.addEventListener('click', (e) => handleTogglePassword(e, 'signUp'));
    registerFormEl.addEventListener('submit', handleSignUpSubmit);
    agreeTerms.addEventListener('change', updateSignUpButtonState);

    logoutBtn.addEventListener('click', handleLogout);

    const savedRememberMe = localStorage.getItem('rememberMeSignIn');
    if (savedRememberMe === 'true') {
        signInRememberMe.checked = true;
    }
}

function switchForms(formType) {
    if (formType === 'signUp') {
        signInForm.classList.remove('active');
        signInForm.classList.add('exit-left');

        setTimeout(() => {
            signInForm.classList.remove('exit-left');
            signUpForm.classList.add('active');
        }, 300);
    } else {
        signUpForm.classList.remove('active');
        signUpForm.classList.add('exit-left');

        setTimeout(() => {
            signUpForm.classList.remove('exit-left');
            signInForm.classList.add('active');
        }, 300);

        resetSignInForm();
    }
}


function validateEmail(email) {
    return REGEX.email.test(email);
}

function handleSignInEmailInput(e) {
    const email = e.target.value.trim();

    if (email === '') {
        state.signIn.emailValid = false;
        clearInputState(signInEmail);
        clearError(signInEmailError);
        return;
    }

    const isValid = validateEmail(email);
    state.signIn.emailValid = isValid;

    if (isValid) {
        setInputValid(signInEmail);
        clearError(signInEmailError);
    } else {
        setInputInvalid(signInEmail);
        showError(signInEmailError, 'Please enter a valid email address');
    }

    updateSignInButtonState();
}

function handleSignInEmailBlur(e) {
    const email = e.target.value.trim();

    if (email === '') {
        showError(signInEmailError, 'Email is required');
        setInputInvalid(signInEmail);
        state.signIn.emailValid = false;
    }

    updateSignInButtonState();
}

function handleSignInPasswordInput(e) {
    const password = e.target.value;

    if (password === '') {
        state.signIn.passwordValid = false;
        clearInputState(signInPassword);
        clearError(signInPasswordError);
        return;
    }

    state.signIn.passwordValid = password.length > 0;

    if (password.length > 0) {
        setInputValid(signInPassword);
        clearError(signInPasswordError);
    } else {
        setInputInvalid(signInPassword);
        showError(signInPasswordError, 'Password is required');
    }

    updateSignInButtonState();
}

function handleSignInPasswordBlur(e) {
    const password = e.target.value;

    if (password === '') {
        showError(signInPasswordError, 'Password is required');
        setInputInvalid(signInPassword);
        state.signIn.passwordValid = false;
    }

    updateSignInButtonState();
}

function updateSignInButtonState() {
    if (state.signIn.emailValid && state.signIn.passwordValid) {
        signInBtn.disabled = false;
    } else {
        signInBtn.disabled = true;
    }
}


function handleSignUpEmailInput(e) {
    const email = e.target.value.trim();

    if (email === '') {
        state.signUp.emailValid = false;
        clearInputState(signUpEmail);
        clearError(signUpEmailError);
        return;
    }

    const isValid = validateEmail(email);
    state.signUp.emailValid = isValid;

    if (isValid) {
        setInputValid(signUpEmail);
        clearError(signUpEmailError);
    } else {
        setInputInvalid(signUpEmail);
        showError(signUpEmailError, 'Please enter a valid email address');
    }

    updateSignUpButtonState();
}

function handleSignUpEmailBlur(e) {
    const email = e.target.value.trim();

    if (email === '') {
        showError(signUpEmailError, 'Email is required');
        setInputInvalid(signUpEmail);
        state.signUp.emailValid = false;
    } else {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const emailExists = users.some(user => user.email === email);

        if (emailExists) {
            setInputInvalid(signUpEmail);
            showError(signUpEmailError, 'This email is already registered');
            state.signUp.emailValid = false;
        }
    }

    updateSignUpButtonState();
}

function validatePassword(password) {
    return REGEX.password.test(password);
}

function getPasswordStrength(password) {
    if (password.length === 0) return null;

    let strength = 0;
    let missingRequirements = [];

    if (REGEX.minLength.test(password)) strength++;
    else missingRequirements.push('8 characters');

    if (REGEX.uppercase.test(password)) strength++;
    else missingRequirements.push('uppercase');

    if (REGEX.lowercase.test(password)) strength++;
    else missingRequirements.push('lowercase');

    if (REGEX.number.test(password)) strength++;
    else missingRequirements.push('number');

    if (REGEX.specialChar.test(password)) strength++;
    else missingRequirements.push('special character');

    if (strength <= 2) {
        return {
            level: 'weak',
            message: 'Weak Password',
            missing: missingRequirements
        };
    } else if (strength <= 4) {
        return {
            level: 'medium',
            message: 'Medium Password',
            missing: missingRequirements
        };
    } else {
        return {
            level: 'strong',
            message: 'Strong Password',
            missing: []
        };
    }
}

function handleSignUpPasswordInput(e) {
    const password = e.target.value;

    if (password === '') {
        state.signUp.passwordValid = false;
        clearInputState(signUpPassword);
        clearError(signUpPasswordError);
        clearPasswordStrength();
        validateConfirmPassword();
        return;
    }

    const strength = getPasswordStrength(password);

    if (strength) {
        updateStrengthIndicator(strength);
    }

    const isValid = validatePassword(password);
    state.signUp.passwordValid = isValid;

    if (isValid) {
        setInputValid(signUpPassword);
        clearError(signUpPasswordError);
    } else {
        setInputInvalid(signUpPassword);
        const strength = getPasswordStrength(password);
        if (strength && strength.missing.length > 0) {
            const missingText = strength.missing.join(', ');
            showError(signUpPasswordError, `Missing: ${missingText}`);
        } else {
            showError(signUpPasswordError, 'Password does not meet requirements');
        }
    }

    if (signUpConfirmPassword.value) {
        validateConfirmPassword();
    }

    updateSignUpButtonState();
}

function handleSignUpPasswordBlur(e) {
    const password = e.target.value;

    if (password === '') {
        showError(signUpPasswordError, 'Password is required');
        setInputInvalid(signUpPassword);
        state.signUp.passwordValid = false;
        clearPasswordStrength();
    }

    updateSignUpButtonState();
}

function handleSignUpConfirmInput(e) {
    const confirmPassword = e.target.value;

    if (confirmPassword === '') {
        state.signUp.confirmValid = false;
        clearInputState(signUpConfirmPassword);
        clearError(signUpConfirmError);
        return;
    }

    validateConfirmPassword();
    updateSignUpButtonState();
}

function handleSignUpConfirmBlur(e) {
    const confirmPassword = e.target.value;

    if (confirmPassword === '') {
        showError(signUpConfirmError, 'Please confirm your password');
        setInputInvalid(signUpConfirmPassword);
        state.signUp.confirmValid = false;
    }

    updateSignUpButtonState();
}

function validateConfirmPassword() {
    const password = signUpPassword.value;
    const confirmPassword = signUpConfirmPassword.value;

    if (confirmPassword === '') {
        state.signUp.confirmValid = false;
        clearInputState(signUpConfirmPassword);
        clearError(signUpConfirmError);
        return;
    }

    if (password === confirmPassword) {
        state.signUp.confirmValid = true;
        setInputValid(signUpConfirmPassword);
        clearError(signUpConfirmError);
    } else {
        state.signUp.confirmValid = false;
        setInputInvalid(signUpConfirmPassword);
        showError(signUpConfirmError, 'Passwords do not match');
    }
}

function updateStrengthIndicator(strength) {
    signUpStrengthBar.className = `strength-bar ${strength.level}`;
    signUpStrengthText.textContent = strength.message;
    signUpStrengthText.className = `strength-text ${strength.level}`;
}

function clearPasswordStrength() {
    signUpStrengthBar.className = 'strength-bar';
    signUpStrengthText.textContent = '';
    signUpStrengthText.className = 'strength-text';
}

function updateSignUpButtonState() {
    if (
        state.signUp.emailValid &&
        state.signUp.passwordValid &&
        state.signUp.confirmValid &&
        agreeTerms.checked
    ) {
        signUpBtn.disabled = false;
    } else {
        signUpBtn.disabled = true;
    }
}


function handleTogglePassword(e, formType) {
    e.preventDefault();

    if (formType === 'signIn') {
        const isPassword = signInPassword.type === 'password';
        signInPassword.type = isPassword ? 'text' : 'password';
        signInTogglePassword.textContent = isPassword ? '🙈' : '👁️';
    } else {
        const isPassword = signUpPassword.type === 'password';
        signUpPassword.type = isPassword ? 'text' : 'password';
        signUpTogglePassword.textContent = isPassword ? '🙈' : '👁️';
    }
}


function setInputValid(input) {
    input.classList.remove('invalid');
    input.classList.add('valid');
}

function setInputInvalid(input) {
    input.classList.remove('valid');
    input.classList.add('invalid');
}

function clearInputState(input) {
    input.classList.remove('valid', 'invalid');
}

function showError(errorElement, message) {
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function clearError(errorElement) {
    errorElement.textContent = '';
    errorElement.classList.remove('show');
}


async function handleSignInSubmit(e) {
    e.preventDefault();

    if (!state.signIn.emailValid || !state.signIn.passwordValid) {
        showToast('Please fix the errors before submitting', 'error');
        return;
    }

    const email = signInEmail.value.trim();
    const password = signInPassword.value;

    signInBtn.classList.add('loading');
    signInBtn.disabled = true;

    try {
        await new Promise(resolve => setTimeout(resolve, 1500));

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            const loginData = {
                email: email,
                timestamp: new Date().toISOString(),
                rememberMe: signInRememberMe.checked
            };

            localStorage.setItem('currentUser', JSON.stringify(loginData));
            localStorage.setItem('isLoggedIn', 'true');

            signInBtn.classList.remove('loading');
            showToast('Login successful!', 'success');
            showSuccessMessage(email);

            setTimeout(() => {
                resetSignInForm();
            }, 2000);
        } else {
            signInBtn.classList.remove('loading');
            signInBtn.disabled = false;
            showToast('Invalid email or password', 'error');
        }
    } catch (error) {
        signInBtn.classList.remove('loading');
        signInBtn.disabled = false;
        showToast('An error occurred. Please try again.', 'error');
        console.error('Sign in error:', error);
    }
}

async function handleSignUpSubmit(e) {
    e.preventDefault();

    if (
        !state.signUp.emailValid ||
        !state.signUp.passwordValid ||
        !state.signUp.confirmValid ||
        !agreeTerms.checked
    ) {
        showToast('Please fix all errors before submitting', 'error');
        return;
    }

    const email = signUpEmail.value.trim();
    const password = signUpPassword.value;

    signUpBtn.classList.add('loading');
    signUpBtn.disabled = true;

    try {
        await new Promise(resolve => setTimeout(resolve, 1500));

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.some(u => u.email === email)) {
            signUpBtn.classList.remove('loading');
            signUpBtn.disabled = false;
            showToast('Email already registered', 'error');
            return;
        }

        const newUser = {
            email: email,
            password: password,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        signUpBtn.classList.remove('loading');
        showToast('Account created successfully! Switching to Sign In...', 'success');

        setTimeout(() => {
            resetSignUpForm();
            switchForms('signIn');
            signInEmail.value = email;
            signInEmail.dispatchEvent(new Event('input'));
        }, 1500);
    } catch (error) {
        signUpBtn.classList.remove('loading');
        signUpBtn.disabled = false;
        showToast('An error occurred. Please try again.', 'error');
        console.error('Sign up error:', error);
    }
}


function showSuccessMessage(email) {
    userEmailDisplay.textContent = email;
    successMessage.classList.remove('hidden');

    setTimeout(() => {
        successMessage.classList.add('hidden');
    }, 5000);
}


function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    successMessage.classList.add('hidden');
    resetSignInForm();
}

function resetSignInForm() {
    loginFormEl.reset();
    state.signIn.emailValid = false;
    state.signIn.passwordValid = false;
    clearInputState(signInEmail);
    clearInputState(signInPassword);
    clearError(signInEmailError);
    clearError(signInPasswordError);
    updateSignInButtonState();
    signInPassword.type = 'password';
    signInTogglePassword.textContent = '👁️';
}

function resetSignUpForm() {
    registerFormEl.reset();
    state.signUp.emailValid = false;
    state.signUp.passwordValid = false;
    state.signUp.confirmValid = false;
    state.signUp.termsAccepted = false;
    clearInputState(signUpEmail);
    clearInputState(signUpPassword);
    clearInputState(signUpConfirmPassword);
    clearError(signUpEmailError);
    clearError(signUpPasswordError);
    clearError(signUpConfirmError);
    clearPasswordStrength();
    updateSignUpButtonState();
    signUpPassword.type = 'password';
    signUpTogglePassword.textContent = '👁️';
}


function showToast(message, type = 'error') {
    toast.textContent = message;
    toast.className = `toast ${type}`;

    if (toast.classList.contains('hidden')) {
        toast.classList.remove('hidden');
    }

    setTimeout(() => {
        toast.classList.add('hidden');
    }, 4000);
}
function checkAuthState() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'true') {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            userEmailDisplay.textContent = currentUser.email;
            successMessage.classList.remove('hidden');
        }
    }
}

