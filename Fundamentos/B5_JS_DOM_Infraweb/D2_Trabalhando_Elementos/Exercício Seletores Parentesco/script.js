let resposta = [];
/* Cada elemento da variável respo corresponde a resposta de uma das perguntas do exercício */
resposta[0] = "Não tem pergunta zero! :)";
resposta[1] = document.getElementById("elementoOndeVoceEsta");
resposta[2] = document.getElementById("elementoOndeVoceEsta").parentNode.style.color="green";
resposta[3] = document.getElementById("elementoOndeVoceEsta").firstElementChild.innerText="The finest of Temeria finests!!!";
resposta[4] = document.getElementById("pai").firstElementChild;
resposta[5] = document.getElementById("elementoOndeVoceEsta").previousElementSibling;
resposta[6] = document.getElementById("elementoOndeVoceEsta").nextSibling;
resposta[7] = document.getElementById("elementoOndeVoceEsta").nextElementSibling;
resposta[8] = document.getElementById("pai").lastElementChild.previousElementSibling;

for (let i = 0; i < resposta.length; i += 1) {
    console.log("Resposta da pergunta " + i + ":");
    console.log(resposta[i]);
}
