function alterarModal(titulo,texto){
    let title = document.getElementById("modaltitle").textContent = titulo;
    let text = document.getElementById("modaltext").textContent = texto;
}

function alterarCorModal(headercolor,footercolor){
    let header = document.getElementById("modalheader");
    let footer = document.getElementById("modalfooter");

    header.className = "modal-header " + headercolor;
    footer.className = "modal-footer " + footercolor;

}

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

    try {
        const response = await fetch("http://localhost:50622/api/postcarros",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(veiculo)
        });

        if (await response.ok) {

            const successModal = new bootstrap.Modal(document.getElementById('mainmodal'));

            successModal.show();

            document.querySelector("form").reset();
        }else{
            alert("Erro ao cadastrar veículo." + response.status);

        }

    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro ao conectar com a API.");
    }
});