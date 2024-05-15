const loginBtn = document.querySelector("#enter_login");
const inputs = document.querySelectorAll(".dados_login");

loginBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const nome = inputs[0].value.trim();
    const senha = inputs[1].value.trim();
    const confirm_senha = inputs[2].value.trim();
    
    if (nome === '' || senha === '' || confirm_senha === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    if (senha === confirm_senha) {
        const data = {
            nome: nome,
            senha: senha
        };

        try {
            const response = await fetch('http://192.168.0.128:8080/registro-usuario', {
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
                alert(responseData.message);
            } else {
                console.error('Erro ao enviar dados:', response.status);
            }
        } catch (error) {
            console.error('Erro ao enviar requisição:', error);
        }
        
    } else {
        alert("Senhas não coincidem");
    }
});
