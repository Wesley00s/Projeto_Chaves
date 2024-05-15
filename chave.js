const section_chave = document.querySelector(".section_chave");

const criarChave = (numero, disponibilidade) => {
    // Criar uma nova div para a chave
    const chaveDiv = document.createElement('div');
    chaveDiv.classList.add('chave');

    // Criar a caixa de cor de disponibilidade
    const indisChaveDiv = document.createElement('div');
    indisChaveDiv.classList.add(disponibilidade);
    indisChaveDiv.setAttribute('id', 'cor_chave');
    var corChave2Div = document.createElement('div');
    corChave2Div.setAttribute('id', 'cor-chave2');
    indisChaveDiv.appendChild(corChave2Div);
    chaveDiv.appendChild(indisChaveDiv);

    // Adicionar o nome da sala
    const nameSalaDiv = document.createElement('div');
    nameSalaDiv.classList.add('name-sala');
    nameSalaDiv.textContent = 'Sala ' + (numero + 1).toString().padStart(2, '0');
    chaveDiv.appendChild(nameSalaDiv);

    // Adicionar a imagem da chave
    const imgChaveImg = document.createElement('img');
    imgChaveImg.setAttribute('src', 'img/chave.png');
    imgChaveImg.setAttribute('alt', 'imagem de uma chave');
    imgChaveImg.classList.add('img_chave');
    chaveDiv.appendChild(imgChaveImg);

    // Retornar a div completa da chave
    return chaveDiv;
}


async function fetchChaves() {
    try {
        const response = await fetch('http://192.168.0.128:8080/list-chaves', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const responseData = await response.json();

            responseData.forEach(e => {
                let disp
                if(e[1] === 1) {
                    disp = "disp_chave"
                } else {
                    disp = "indis_chave"
                }
                const chave = criarChave(e[0] - 1, disp);
                section_chave.appendChild(chave);
            });

        } else {
            console.error('Erro ao enviar dados:', response.status);
        }
    } catch (error) {
        console.error('Erro ao enviar requisição:', error);
    }
}

// Chamar a função para realizar a solicitação GET
fetchChaves();
