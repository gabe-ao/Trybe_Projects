/* Função para preencher o quadro de pixels com divs para colorir */
function criarQuadroPixels() {
        const quadro = document.getElementById('pixel-board');
        
    for (let contador = 1; contador <= 25; contador += 1) {
        const pixel = document.createElement('div');
        pixel.className = 'pixel';
        quadro.appendChild(pixel);
    }
}

/* Função para o usuário selecionar a cor desejada */
function selecionarCor(evento) {
    if (evento.target.className === 'color') {
        const corSelecionada = document.getElementsByClassName('color selected');
        corSelecionada[0].className = 'color';
        evento.target.className = 'color selected';
    } 
}

/* Função para pintar os pixels do quadro */
function pintarPixel(evento) {
    if (evento.target.className === 'pixel') {
        let corSelecionada = document.getElementsByClassName('color selected');
        corSelecionada = window.getComputedStyle(corSelecionada[0]).backgroundColor;
        evento.target.style.backgroundColor = corSelecionada;
    }
}

/* Função para limpar o quadro de pixels */
function limparQuadro(evento) {
    if (evento.target.id === 'clear-board') {
        const pixeis = document.getElementsByClassName('pixel');
        for (let contador = 0; contador < pixeis.length; contador += 1) {
            pixeis[contador].style.backgroundColor = 'white';
        }
    }
}

/* Chamada das rotinas que fazem o setup da página */
window.onload = function() {
    criarQuadroPixels();
    
    /* Seguindo a dica sobre event bubbling, eu decide setar os event listeners todos direto no documento de uma só vez. Para isso precisei criar uma função anônima que invoca todos os tratadores de eventos */
    document.addEventListener('click', function(evento) { selecionarCor(evento); pintarPixel(evento); limparQuadro(evento); });
}