// A URL e a API Key do seu projeto Supabase
const SUPABASE_URL = 'https://kgsswckrqumyejbzspkv.supabase.co/rest/v1/Leads';
const SUPABASE_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtnc3N3Y2tycXVteWVqYnpzcGt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwODU5NzQsImV4cCI6MjA2OTY2MTk3NH0.uuNjYfbEwJ6epHdWeq8jd80lcjB0mxrgu5ts3W8iJv8';

const conteinerPrincipal = document.querySelector('.conteiner-principal');

// Cria a constante para o formulário e as mensagens de sucesso/erro
const divFormulario = document.getElementById('form-oculto');

// Seleciona o formulário pelo ID
const formulario = document.getElementById('formulario-leads');

// Cria a constante para os elementos de sucesso e erro
const divCadastroSucesso = document.getElementById('cadastro-sucesso');
const divCadastroErro = document.getElementById('cadastro-erro');

// Adiciona um "ouvinte" para o evento de envio do formulário
formulario.addEventListener('submit', async (event) => {
    // Impede o comportamento padrão de recarregar a página
    event.preventDefault();

    // Obtém os valores dos campos
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const ddd = document.getElementById('ddd').value;
    const fone = document.getElementById('fone').value;
    
    // Concatena DDD e Fone para ter um único campo de telefone
    const telefone = `(${ddd}) ${fone}`;

    // Cria o objeto de dados que será enviado ao Supabase
    // Certifique-se de que os nomes das propriedades (nome, email e telefone)
    // correspondem exatamente aos nomes das colunas na sua tabela 'Leads'
    const lead = {
        nome: nome,
        email: email,
        telefone: telefone
    };

    try {
        // Envia a requisição POST para a API do Supabase
        const response = await fetch(SUPABASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': SUPABASE_API_KEY,
                'Authorization': `Bearer ${SUPABASE_API_KEY}`
            },
            body: JSON.stringify(lead)
        });

        // Verifica se a requisição foi bem-sucedida
        if (response.ok) {
            // alert('Cadastro realizado com sucesso! 🎉');
            divCadastroSucesso.style.display = 'block'; // Exibe a mensagem de sucesso
            divFormulario.style.display = 'none'; // Oculta o formulário após o sucesso
            const btnFechar = document.createElement('button');
            btnFechar.textContent = 'Fechar';
            btnFechar.classList.add('btn-fechar');
            divCadastroSucesso.appendChild(btnFechar);
            btnFechar.addEventListener('click', () => {
                divFormulario.style.display = 'block'; // Exibe o formulário novamente
                formulario.reset(); // Limpa o formulário
                divCadastroSucesso.style.display = 'none'; // Oculta a mensagem de sucesso
                btnFechar.remove(); // Remove o botão de fechar
            });
        } else {
            const errorData = await response.json();
            // alert(`Erro ao cadastrar: ${JSON.stringify(errorData.message)}`);
            divCadastroErro.style.display = 'block'; // Exibe a mensagem de erro
            divFormulario.style.display = 'none'; // Oculta o formulário após o erro
            const btnFechar = document.createElement('button');
            btnFechar.textContent = 'Fechar';
            btnFechar.classList.add('btn-fechar');
            divCadastroErro.appendChild(btnFechar);
            btnFechar.addEventListener('click', () => {
                divFormulario.style.display = 'block'; // Exibe o formulário novamente
                formulario.reset(); // Limpa o formulário
                divCadastroErro.style.display = 'none'; // Oculta a mensagem de erro
                btnFechar.remove(); // Remove o botão de fechar
        });
        }
    } catch (error) {
        // Captura erros de rede ou outros problemas
        alert('Erro na conexão. Tente novamente mais tarde. 🙁');
        console.error('Erro:', error);
    }
});