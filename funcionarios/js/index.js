let IdAtual = null;
const modalEdit = new bootstrap.Modal(document.getElementById("modalEdit"));
 
 function preencherTabelaFunc(funcionarios) {
    const tabela = document.getElementById("tabelaFuncionarios");
    tabela.innerHTML = "";

    funcionarios.forEach(f => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${f.Codigo}</td>
            <td>${f.CodigoDepartamento}</td>
            <td>${f.PrimeiroNome}</td>
            <td>${f.SegundoNome}</td>
            <td>${f.UltimoNome}</td>
            <td>${new Date(f.DataNascimento).toLocaleDateString("pt-BR")}</td>
            <td>${f.CPF}</td>
            <td>${f.RG}</td>
            <td>${f.Endereco}</td>
            <td>${f.CEP}</td>
            <td>${f.Cidade}</td>
            <td>${f.Fone}</td>
            <td>${f.Funcao}</td>
            <td>${f.Salario.toFixed(2)}</td>
            <td><button id="btnEditar" type="button" class = "btn btn-primary btn-editar" data-id = ${f.Codigo}> <i class="bi bi-pencil"></button></td>
            <td><button id="btnDeletar" type="button" class ="btn btn-danger btn-deletar" data-id = ${f.Codigo} ><i class="bi bi-trash"></i></button></td>
            
        `;

        tabela.appendChild(linha);
    });

    document.querySelectorAll(".btn-deletar").forEach(botao =>{
        botao.addEventListener("click",async function () {
            const id = this.getAttribute("data-id");

            const confirmar = confirm(("Tem certeza que deseja deletar esse registro?"));
            if (confirmar) {
                await deleteFuncionario(id);
                getAllFuncionarios();
            }
       
        })
    });

    document.querySelectorAll(".btn-editar").forEach(botao => {
        botao.addEventListener("click",async function(){
            const id = this.getAttribute("data-id");
            IdAtual = id;

            const f = await getFuncionarioById(id);

            document.getElementById("codigoDepartamentoInputModal").value = f.CodigoDepartamento;
            document.getElementById("primeiroNomeInputModal").value = f.PrimeiroNome;
            document.getElementById("segundoNomeInputModal").value = f.SegundoNome;
            document.getElementById("ultimoNomeInputModal").value = f.UltimoNome;
            document.getElementById("dataNascimentoInputModal").value = f.DataNascimento.split("T")[0];
            document.getElementById("CPFInputModal").value = f.CPF;
            document.getElementById("RGInputModal").value = f.RG;
            document.getElementById("enderecoInputModal").value = f.Endereco;
            document.getElementById("CEPInputModal").value = f.CEP;
            document.getElementById("cidadeInputModal").value = f.Cidade;
            document.getElementById("telefoneInputModal").value = f.Fone;
            document.getElementById("funcaoInputModal").value = f.Funcao;
            document.getElementById("salarioInputModal").value = f.Salario;

            modalEdit.show();

        });
    });

    document.getElementById("btnSalvar").addEventListener("click",async function() {
        
        const codigoDepartamento =  document.getElementById("codigoDepartamentoInputModal").value;
        const primeiroNome = document.getElementById("primeiroNomeInputModal").value.trim();
        const segundoNome = document.getElementById("segundoNomeInputModal").value.trim();
        const ultimoNome = document.getElementById("ultimoNomeInputModal").value.trim();
        const dataNascimento = document.getElementById("dataNascimentoInputModal").value.trim();
        const cpf = document.getElementById("CPFInputModal").value;
        const rg = document.getElementById("RGInputModal").value;
        const endereco = document.getElementById("enderecoInputModal").value.trim();
        const cep = document.getElementById("CEPInputModal").value;
        const cidade = document.getElementById("cidadeInputModal").value;
        const telefone = document.getElementById("telefoneInputModal").value;
        const funcao = document.getElementById("funcaoInputModal").value;
        const salario = document.getElementById("salarioInputModal").value;

        await editarFunc(IdAtual,codigoDepartamento,primeiroNome,segundoNome,ultimoNome,dataNascimento,cpf,rg,endereco,cep,cidade,telefone,funcao,salario)
        
        getAllFuncionarios();
        modalEdit.hide();
    });

 }
window.addEventListener("load", function () {
    getAllFuncionarios(); 
});