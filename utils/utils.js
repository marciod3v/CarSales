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
