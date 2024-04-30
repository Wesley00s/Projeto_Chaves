//Java script parte front-end

//INTERATIVIDADE PÁGINA DE LOGIN
// Função assíncrona para lidar com o login
async function login() {
    // Obtém o valor dos campos de usuário e senha
    const username = document.getElementById('username').value;
    // Obtém o valor do campo de senha
    const password = document.getElementById('password').value;
  
    try {
      // Envia uma requisição POST para a URL especificada, com os dados de usuário e senha no corpo da requisição
      const response = await fetch('http://exemplo.com/login', {
        // Método da requisição
        method: 'POST',
        // Tipo de conteúdo da requisição
        headers: {
          'Content-Type': 'application/json'
        },
        // Corpo da requisição, convertido para JSON
        body: JSON.stringify({ username, password })
      });
  
      // Verifica se a resposta da requisição foi bem-sucedida
      if (response.ok) {
        // Redireciona para a página principal
        window.location.href = "pag_principal.html";
      } else {
        // Se a resposta não foi bem-sucedida, exibe uma mensagem de usuário ou senha inválidos
        alert("Usuário ou senha inválidos. Por favor verifique se está digitando corretamente.");
      }
    } catch (error) {
      // Se ocorrer um erro durante a requisição, exibe uma mensagem de erro genérica
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login. Verifique sua conexão com a internet.');
    }
  }

//INTERARIVIDADE DA PÁGINA PRINCIPAL
// Função para mudar a cor dos botões e aplicar a mudança em outra página
function clicar(btnClicado) {
    // Seleciona os elementos HTML dos botões
    const entrega = document.getElementById('entrega');
    const devolucao = document.getElementById('devolucao');
  
    // Verifica qual botão foi clicado e aplica a mudança de cor
    if (btnClicado === entrega) {
      entrega.classList.add('ativo');
      devolucao.classList.remove('ativo');
    } else if (btnClicado === devolucao) {
      devolucao.classList.add('ativo');
      entrega.classList.remove('ativo');
    }
  }
  
  // Função para registrar os dados no banco de dados
  async function registrar() {
    // Obtém os valores dos campos de formulário
    const mes = document.getElementById('mes').value;
    const data = document.getElementById('data').value;
    const setor = document.getElementById('setor').value;
    const nome = document.getElementById('nome').value;
    const hora = document.getElementById('hora').value;
  
    try {
      // Envia uma requisição POST para a URL especificada, com os dados do formulário no corpo da requisição
      const response = await fetch('http://exemplo.com/registrar_dados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mes, data, setor, nome, hora })
      });
  
      // Verifica se a resposta da requisição foi bem-sucedida
      if (response.ok) {
        alert("Dados registrados com sucesso!");
        // Redirecionar para outra página (opcional)
        // window.location.href = "outra_pagina.html";
      } else {
        alert("Erro ao registrar dados.");
      }
    } catch (error) {
      console.error('Erro ao registrar dados:', error);
      alert('Erro ao registrar dados. Verifique se todos os campos foram preenchidos corretamente.');
    }
  }
  
  // Funções para abrir as páginas
  function abrir_pag_chave() {
    window.open('pag_chaves.html');
  }
  
  function abrir_pag_registros() {
    window.open('pag_registros.html');
  }

//INTERATIVIDADE DA PÁGINA DE CHAVES
// Função para registrar a mudança de status
document.addEventListener('DOMContentLoaded', function() {
    // Obtém o valor da operação armazenada no localStorage
    const operacao = localStorage.getItem('operacao');
  
    // Verifica qual operação foi realizada e aplica a mudança de cor
    if (operacao === 'entrega') {
      document.getElementById('cor-chave2').style.backgroundColor = 'red';
    } else if (operacao === 'devolucao') {
      document.getElementById('cor-chave2').style.backgroundColor = 'green';
    }
  });

//INTERATIVIDADE DA PÁGINA DE REGISTROS
// Função para carregar os registros da API e atualizar a tabela na página
function carregarRegistros() {
    // Faz uma requisição GET para a API de registros
    fetch('http://localhost:3000/api/registros')
        // Processa a resposta da requisição como JSON
        .then(response => response.json())
        // Quando os registros são recebidos com sucesso, executa o seguinte bloco de código
        .then(registros => {
            // Seleciona a tabela de registros na página pelo ID e obtém o corpo da tabela
            const tabela = document.getElementById('tabela-registros').getElementsByTagName('tbody')[0];
            // Limpa o conteúdo atual da tabela para evitar duplicatas
            tabela.innerHTML = '';
            // Para cada registro recebido, cria uma nova linha na tabela e insere os dados nas células
            registros.forEach(registro => {
                const row = tabela.insertRow();
                row.insertCell(0).textContent = registro.data;
                row.insertCell(1).textContent = registro.setor;
                row.insertCell(2).textContent = registro.hora;
                row.insertCell(3).textContent = registro.responsavel;
                row.insertCell(4).textContent = registro.hora;
                row.insertCell(5).textContent = registro.responsavel;
                
            });
        })
        // Se houver algum erro durante a requisição ou processamento, executa o seguinte bloco de código
        .catch(error => {
            // Exibe o erro no console do navegador
            console.error('Erro:', error);
            // Exibe um alerta para o usuário informando sobre o erro
           /* alert('Erro ao carregar registros.');*/
        });
}
