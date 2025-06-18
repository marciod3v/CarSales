
async function carregarCarros() {
    try {
        const response = await fetch("http://localhost:50622/api/getcarros");

        if (!response.ok) {
            throw new Error ("Erro ao buscar dados:" +response.status);
        }

        const carros = await response.json();

        preencherTabela(carros);

        return carros;

    } catch (error) {
        console.error("Erro ao carregar os carros:", error);
    }
}

async function getCarroById(id) {

    try {
        const response = await fetch(`http://localhost:50622/api/carros/${id}`);

        return await response.json();
    } catch (error) {
        console.error("Erro ao carregar o carro:", error);
        return null;
    }

}

async function getCarroByName(name) {
    try {
        const response = await fetch(`http://localhost:50622/api/carros/getbyname/${name}`);
        return await response.json();

    } catch (error) {
        console.error("Erro ao carregar o carro:", error);
    }
}

async function criarCarro(veiculo) {
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
}

async function editarCarro(Id,Nome,Valor) {

   carro = {
        id: Id,
        nome: Nome,
        valor: Valor
    }

    try {
        const response = await fetch(`http://localhost:50622/api/carros/${Id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(carro)
        });

        if (await response.ok) {
            alterarModal("Sucesso","Registro alterado");
            alterarCorModal("bg-success","bg-light");

            const modal = new bootstrap.Modal(document.getElementById("mainmodal"));
            modal.show();
        }

    } catch (error) {
        console.error(error);
    }   
}

async function deletarCarro(id) {
    try {

        const response = await fetch(`http://localhost:50622/api/carros/delete/${id}`,{
            method:"DELETE"
        });

        if (await response.ok) {
            alterarModal("Sucesso","Registro deletado");
            const modal = new bootstrap.Modal(document.getElementById("mainmodal"));
            modal.show();
        }

    } catch (error) {
       console.error(error);
    }
}


