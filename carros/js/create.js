
document.getElementById("btnCadastrar").addEventListener("click",async function () {

    const nome = document.getElementById("NomeInput").value.trim();
    const valor = parseFloat(document.getElementById("ValorInput").value);

    if (!nome || isNaN(valor)) {

        alterarModal("ERRO","Preencha os dados corretamente.");
        alterarCorModal("bg-warning","bg-light");

        const modal = new bootstrap.Modal(document.getElementById("mainmodal"));
        modal.show();
        return;
    };

    const veiculo = {
        nome: nome,
        valor: valor
    };

    await criarCarro(veiculo);
});