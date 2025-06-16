let idCarroAtual = null;

function preencherTabela(carros){
    const tabela = document.getElementById("tabelaCarros");
    tabela.innerHTML = "";

    carros.forEach(carro => {
        const linha = document.createElement("tr");

        linha.innerHTML= `
            <td>${carro.Id}</td>
            <td>${carro.Nome}</td>
            <td>R$ ${carro.Valor.toFixed(2)}</td>
            <td><button id="btnEditar" type="button" class = "btn btn-primary btn-editar" data-id = ${carro.Id}> <i class="bi bi-pencil"></button></td>
            <td><button id="btnDeletar" type="button" class ="btn btn-danger btn-deletar" data-id = ${carro.Id} ><i class="bi bi-trash"></i></button></td>
            
        `;

        tabela.appendChild(linha);
    });

    document.querySelectorAll(".btn-deletar").forEach(botao => {
        botao.addEventListener("click",async function () {
            const id = this.getAttribute("data-id");
    
            const confirmar = confirm("Tem certeza que deseja deletar esse registro?");
            if (confirmar) {
                await deletarCarro(id);
                await carregarCarros();
            }
        })
    });
    
    document.querySelectorAll(".btn-editar").forEach(botao => {
        botao.addEventListener("click",async function () {
           const id = this.getAttribute("data-id");
        
           const carro = await getCarroById(id);
           idCarroAtual = id; 

           document.getElementById("nomeInputModal").value = carro.Nome;
           document.getElementById("valorInputModal").value = carro.Valor;
            
           alterarCorModal("bg-primary","bg-light");
           const modal = new bootstrap.Modal(document.getElementById("editModal"));
           modal.show();
    });
});

}
window.addEventListener("load", function () {
   carregarCarros();
});

document.getElementById("btnSalvar").addEventListener("click",async function () {

    var nome = document.getElementById("nomeInputModal").value.trim();
    var valor = parseFloat(document.getElementById("valorInputModal").value);

    await editarCarro(idCarroAtual,nome,valor);
    
    const modal = bootstrap.Modal.getInstance(document.getElementById("editModal"));
    modal.hide();
    await carregarCarros();
});

document.getElementById("btnPesquisar").addEventListener("click",async function () {
    
    const nome =  document.getElementById("NomeInput").value.trim();
    const id = parseInt(document.getElementById("IdInput").value);

    if (id && !nome) {
        
        var carro = await getCarroById(id);
        preencherTabela([carro]);
    } else if (nome && !id) {
        var carros = await getCarroByName(nome);
        preencherTabela(carros)
    } else if (id && nome) {
        alterarModal("ATENÇÃO","Preencha apenas 1 dos campos.");
        alterarCorModal("bg-warning","bg-light");

        const modal = new bootstrap.Modal(document.getElementById("mainmodal"));
        modal.show();
        return;
    } else {
        alterarModal("ATENÇÃO","Preencha pelo menos 1 dos campos.");
        alterarCorModal("bg-warning","bg-light");

        const modal = new bootstrap.Modal(document.getElementById("mainmodal"));
        modal.show();
        return;
    }

});

