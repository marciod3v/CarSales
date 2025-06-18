
async function getAllFuncionarios() {
    try {
        const response = await fetch("http://localhost:50622/api/getAllFuncionarios");

        if (!response.ok) {
            throw new Error ("Erro ao buscar dados:" +response.status);
        }

        const funcionarios = await response.json();

        preencherTabelaFunc(funcionarios);

        return funcionarios;

    } catch (error) {
        console.error("Erro:",error);
    }
}

async function getFuncionarioById(id) {
    try {
        const response = await fetch (`http://localhost:50622/api/getFuncionarioById/${id}`);
        
        if (!response.ok) {
            throw new Error("Erro ao buscar dados.");
        }

        return await response.json();

    } catch (error) {
        console.error("ERRO.",error);
    }
}

async function criarFunc(codigoDepartamento,primeiroNome,segundoNome,ultimoNome,dataNascimento,cpf,rg,endereco,cep,cidade,telefone,funcao,salario) {
    
    const funcionario = {
        CodigoDepartamento: codigoDepartamento,
        PrimeiroNome:primeiroNome,
        SegundoNome: segundoNome,
        UltimoNome: ultimoNome,
        DataNascimento: dataNascimento,
        CPF: cpf,
        RG: rg,
        Endereco: endereco,
        CEP: cep ,
        Cidade: cidade,
        Fone: telefone,
        Funcao: funcao,
        Salario: salario
    }

    try {
        const response = await fetch("http://localhost:50622/api/funcionarios",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(funcionario)
        });

        if (response.ok) {
            console.log("sucesso");
            return true;
        }else{
            console.log("Erro ao cadastrar");
            return false;
        }
        
    } catch (error) {
        console.error(error);
    }
}

async function editarFunc(id,codigoDepartamento,primeiroNome,segundoNome,ultimoNome,dataNascimento,cpf,rg,endereco,cep,cidade,telefone,funcao,salario) {
    
    const funcionario = {
        Codigo : id,
        CodigoDepartamento: codigoDepartamento,
        PrimeiroNome:primeiroNome,
        SegundoNome: segundoNome,
        UltimoNome: ultimoNome,
        DataNascimento: dataNascimento,
        CPF: cpf,
        RG: rg,
        Endereco: endereco,
        CEP: cep ,
        Cidade: cidade,
        Fone: telefone,
        Funcao: funcao,
        Salario: salario
    }
    
    try {
        const response = await fetch(`http://localhost:50622/api/putFuncionarios/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(funcionario)
        });

        if (response.ok) {
            console.log("alterado com sucesso");
        }

    } catch (error) {
        console.error("erro");
    }
}

async function deleteFuncionario(id) {
    try {
        const response = await fetch(`http://localhost:50622/api/deleteFuncionarios/${id}`,{
            method:"DELETE"
        });

        if (response.ok) {
            console.log("sucesso");
        } else {
            console.error("Erro ao deletar. Status:", response.status);
        }

    } catch (error) {
        console.error("ERRO, nenhum registro deletado");
    }
}