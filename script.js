// A URL e a API Key do seu projeto Supabase
const SUPABASE_URL = 'https://kgsswckrqumyejbzspkv.supabase.co/rest/v1/Leads';
const SUPABASE_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtnc3N3Y2tycXVteWVqYnpzcGt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwODU5NzQsImV4cCI6MjA2OTY2MTk3NH0.uuNjYfbEwJ6epHdWeq8jd80lcjB0mxrgu5ts3W8iJv8';

// Elemento DOM
const divFormulario = document.getElementById('form-oculto');
const formulario = document.getElementById('formulario-leads');
const divCadastroSucesso = document.getElementById('cadastro-sucesso');
const divCadastroErro = document.getElementById('cadastro-erro');
const btnSubmit = formulario.querySelector('button[type="submit"]');

/**
 * Exibe a div de feedback (sucesso ou erro) e gerencia o botão de fechar.
 * @param {HTMLElement} divFeedback - O elemento a ser exibido.
 */
const gerenciarExibicaoFeedback = (divFeedback) => {
    divFormulario.style.display = 'none';
    divFeedback.style.display = 'block';

    // Garante que o botão de fechar seja criado apenas uma vez
    if (!divFeedback.querySelector('.btn-fechar')) {
        const btnFechar = document.createElement('button');
        btnFechar.textContent = 'Fechar';
        btnFechar.classList.add('btn-fechar');
        
        btnFechar.addEventListener('click', () => {
            divFormulario.style.display = 'block';
            formulario.reset();
            divFeedback.style.display = 'none';
            btnFechar.remove();
        });
        
        divFeedback.appendChild(btnFechar);
    }
};

// Adiciona um "ouvinte" para o evento de envio do formulário
formulario.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Bloqueia o botão para evitar envios duplos
    btnSubmit.disabled = true;
    const textoOriginalBotao = btnSubmit.textContent;
    btnSubmit.textContent = 'Enviando...';

    const formData = new FormData(formulario);
    const lead = {
        nome: formData.get('nome'),
        email: formData.get('email'),
        telefone: `(${formData.get('ddd')}) ${formData.get('fone')}`
    };

    try {
        const response = await fetch(SUPABASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': SUPABASE_API_KEY,
                'Authorization': `Bearer ${SUPABASE_API_KEY}`,
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify(lead)
        });

        if (response.ok) {
            gerenciarExibicaoFeedback(divCadastroSucesso);
        } else {
            console.error('Erro na resposta do Supabase:', await response.json());
            gerenciarExibicaoFeedback(divCadastroErro);
        }
    } catch (error) {
        console.error('Erro de conexão:', error);
        gerenciarExibicaoFeedback(divCadastroErro);
    } finally {
        // Restaura o estado do botão
        btnSubmit.disabled = false;
        btnSubmit.textContent = textoOriginalBotao;
    }
});