// quando clicar em cadastrar, vai ocultar login e biometria e habilitar form de cadastro
document.getElementById("showRegister").addEventListener("click", function () {
    document.getElementById("loginForm").classList.add("hidden");
    document.getElementById("biometricAuth").classList.add("hidden");
    document.getElementById("registerForm").classList.remove("hidden");
});

// quando clicar em login, vai ocultar cadastro e habilitar form de login e biometrtia
document.getElementById("showLogin").addEventListener("click", function () {
    document.getElementById("registerForm").classList.add("hidden");
    document.getElementById("biometricAuth").classList.remove("hidden");
    document.getElementById("loginForm").classList.remove("hidden");
});