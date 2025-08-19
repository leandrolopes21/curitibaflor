// A URL e a API Key do seu projeto Supabase
const SUPABASE_URL = 'https://kgsswckrqumyejbzspkv.supabase.co/rest/v1/Leads';
const SUPABASE_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtnc3N3Y2tycXVteWVqYnpzcGt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwODU5NzQsImV4cCI6MjA2OTY2MTk3NH0.uuNjYfbEwJ6epHdWeq8jd80lcjB0mxrgu5ts3W8iJv8';

// Seleciona o formulário pelo ID
const formulario = document.getElementById('formulario-leads');

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
            alert('Cadastro realizado com sucesso! 🎉');
            formulario.reset(); // Limpa o formulário
        } else {
            const errorData = await response.json();
            alert(`Erro ao cadastrar: ${JSON.stringify(errorData.message)}`);
        }
    } catch (error) {
        // Captura erros de rede ou outros problemas
        alert('Erro na conexão. Tente novamente mais tarde. 🙁');
        console.error('Erro:', error);
    }
});