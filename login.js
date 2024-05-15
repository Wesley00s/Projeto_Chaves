const loginBtn = document.querySelector("#enter_login");
const inputs = document.querySelectorAll(".dados_login");

loginBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const nome = inputs[0].value;
    const senha = inputs[1].value;

    if (nome === '' || senha === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
    console.log(nome);
    console.log(senha);

    const data = {
        nome: nome,
        senha: senha
    };

    try {
        const response = await fetch('http://192.168.0.128:8080/login-usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const responseData = await response.json();
            if(responseData.check) {
                window.location.href = "pag_principal.html";
            }
            alert(responseData.message)

        } else {
            console.error('Erro ao enviar dados:', response.status);
        }
    } catch (error) {
        console.error('Erro ao enviar requisição:', error);
    }
});
