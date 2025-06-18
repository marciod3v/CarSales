const cpfInput = document.getElementById("CPFInput");
Inputmask("999.999.999-99").mask(cpfInput);

const foneInput = document.getElementById("telefoneInput");
Inputmask("(99) 9999[9]-9999").mask(foneInput);

const rgInput = document.getElementById("RGInput");
Inputmask("99.999.999-9").mask(rgInput);

const cepInput = document.getElementById("CEPInput");
Inputmask("99999-999").mask(cepInput);


document.getElementById("btnCadastrar").addEventListener("click",async function () {
    let codigoDepartamento = parseInt(document.getElementById("codigoDepartamentoInput").value);
    let primeiroNome = document.getElementById("primeiroNomeInput").value.trim();
    let segundoNome = document.getElementById("segundoNomeInput").value.trim();
    let ultimoNome = document.getElementById("ultimoNomeInput").value.trim();
    let dataNascimento = document.getElementById("dataNascimentoInput").value.trim();
    let cpf = cpfInput.inputmask.unmaskedvalue();
    let rg = rgInput.inputmask.unmaskedvalue();
    let endereco = document.getElementById("enderecoInput").value.trim();
    let cep = cepInput.inputmask.unmaskedvalue();
    let cidade = document.getElementById("cidadeInput").value.trim();
    let telefone = foneInput.inputmask.unmaskedvalue();
    let funcao = document.getElementById("funcaoInput").value.trim();
    let salario = parseFloat(document.getElementById("salarioInput").value);

    const modal = new bootstrap.Modal(document.getElementById("mainmodal"));

    if (    isNaN(codigoDepartamento) ||
    primeiroNome === "" ||
    segundoNome === "" ||
    ultimoNome === "" ||
    dataNascimento === "" ||
    cpf === "" ||
    rg === "" ||
    endereco === "" ||
    cep === "" ||
    cidade === "" ||
    telefone === "" ||
    funcao === "" ||
    isNaN(salario)) {
        alterarModal("Atenção","Preencha todos os dados corretamente.");
        alterarCorModal("bg-warning","bg-light");
        modal.show();
        return;
    }

    if ( await criarFunc(codigoDepartamento,primeiroNome,segundoNome,ultimoNome,dataNascimento,cpf,rg,endereco,cep,cidade,telefone,funcao,salario)) {
        alterarModal("Sucesso","Funcionário cadastrado.");
        alterarCorModal("bg-success","bg-light");
        modal.show();
        document.querySelector("form").reset();
    }else{
        alterarModal("ERRO","Funcionário não cadastrado.");
        alterarCorModal("bg-warning","bg-light");
        modal.show();
        document.querySelector("form").reset();
    }
});

