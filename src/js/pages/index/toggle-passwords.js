// funcao para ver e nao ver senha
function togglePasswordVisibility(inputId, toggleId) { // recebe dois argumentos

    // guarda os id's
    const input = document.getElementById(inputId);
    const toggle = document.getElementById(toggleId);

    // quando um tipo de id for clicado
    toggle.addEventListener("click", () => {

        input.type = input.type === "password" ? "text" : "password";
        toggle.src = input.type === "password" 
            ? "https://img.icons8.com/?size=100&id=59814&format=png&color=67B0B4" 
            : "https://img.icons8.com/?size=100&id=60022&format=png&color=67B0B4";
    });
}

togglePasswordVisibility("password", "togglePassword");
togglePasswordVisibility("passwordRegister", "togglePasswordRegister");