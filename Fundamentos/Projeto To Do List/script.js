/* eslint-disable no-restricted-syntax */
/* Função para adicionar novas tarefas */
function adicionarTarefa(evento) {
    if (evento.target.id === 'criar-tarefa') {
        const entrada = document.getElementById('texto-tarefa');
        
        if (entrada.value !== '') {
            const novaTarefa = document.createElement('li');
            novaTarefa.innerText = entrada.value;
            document.getElementById('lista-tarefas').appendChild(novaTarefa);
            entrada.value = '';
        }
    }
}

/* Função para realçar itens da lista de tarefas, tanto adiciona quanto retira o realçe */
function realcarTarefa(evento) { 
    if (evento.target.tagName === 'LI') {
        const elementoClicado = evento.target;
        const selecionadoAnterior = document.getElementById('tarefa-selecionada');

        if (selecionadoAnterior !== null) {
            selecionadoAnterior.id = '';
        }

        if (elementoClicado === selecionadoAnterior) {
            return;
        }

        elementoClicado.id = 'tarefa-selecionada';
    }
}

/* Função para marcar tarefas como completas e risca-las */
function completarTarefa(evento) {
    if (evento.target.tagName === 'LI') {
        const elementoClicado = evento.target;

        if (elementoClicado.classList.contains('completed')) {
            elementoClicado.classList.remove('completed');
            return;
        }

        elementoClicado.classList.add('completed');
    }
}

/* Função que apaga a lista de tarefas */
function apagarTarefas(evento) {
    if (evento.target.id === 'apaga-tudo') {
        const lista = document.getElementById('lista-tarefas');

        /* Usando um loop while para apagar as tarefas uma por uma até acabarem */
        while (lista.children.length !== 0) {
            lista.firstElementChild.remove();
        }
    }
}

/* Função para remover as tarefas marcadas como completas */
function removerTarefasCompletas(evento) {
    if (evento.target.id === 'remover-finalizados') {
        const tarefasCompletas = document.getElementsByClassName('completed');

        /* Usando um loop while para apagar as tarefas completas uma por uma até acabarem */
        while (tarefasCompletas.length !== 0) {
            tarefasCompletas[0].remove();
        }        
    }
}

/* Chamada das rotinas de preparação da página */
window.onload = function () {
    /* Usando a dica de event bubbling (do projeto Pixel Art) para setar os event listeners direto no document da página */
    document.addEventListener('click', function(evento) { adicionarTarefa(evento); realcarTarefa(evento); apagarTarefas(evento); removerTarefasCompletas(evento); } );

    document.addEventListener('dblclick', function(evento) { completarTarefa(evento); } );

}
