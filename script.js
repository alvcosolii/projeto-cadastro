const formulario = document.querySelector("#formulario")
const nome = document.querySelector("#nome")
const numero = document.querySelector("#numero")
const email = document.querySelector("#e-mail")
const lista = document.querySelector("#lista")

formulario.addEventListener("submit", (e) => {
    e.preventDefault()
    adicionarCadastro(nome.value, numero.value, email.value)
    salvarNoLocalStorage(nome.value, numero.value, email.value)
})

function adicionarCadastro(nomeValor, numeroValor, emailValor) {
    const novo_cadastro = document.createElement("li")

    const novo_nome = document.createElement("h2")
    novo_nome.textContent = `Nome: ${nomeValor}`

    const novo_numero = document.createElement("p")
    novo_numero.textContent = `Número: ${numeroValor}`

    const novo_email = document.createElement("p")
    novo_email.textContent = `E-mail: ${emailValor}`

    const botao_excluir = document.createElement("button")
    botao_excluir.textContent = "Excluir"
    botao_excluir.addEventListener("click", () => {
        lista.removeChild(novo_cadastro)
        removerDoLocalStorage(nomeValor, numeroValor, emailValor)
    })

    const botao_editar = document.createElement("button")
    botao_editar.textContent = "Editar"
    botao_editar.addEventListener("click", () => {
        editarCadastro(novo_cadastro, nomeValor, numeroValor, emailValor)
    })

    novo_cadastro.append(novo_nome, novo_email, novo_numero, botao_editar, botao_excluir)
    lista.appendChild(novo_cadastro)
}

function editarCadastro(cadastro, nomeValor, numeroValor, emailValor) {
    cadastro.innerHTML = ''

    const input_nome = document.createElement("input")
    input_nome.type = "text"
    input_nome.value = nomeValor

    const input_numero = document.createElement("input")
    input_numero.type = "text"
    input_numero.value = numeroValor

    const input_email = document.createElement("input")
    input_email.type = "text"
    input_email.value = emailValor

    const botao_salvar = document.createElement("button")
    botao_salvar.textContent = "Salvar"
    botao_salvar.addEventListener("click", () => {
        const novos_dados = {
            nome: input_nome.value,
            numero: input_numero.value,
            email: input_email.value
        }
        atualizarCadastro(cadastro, novos_dados)
        atualizarNoLocalStorage(nomeValor, numeroValor, emailValor, novos_dados)
    })

    cadastro.append(input_nome, input_numero, input_email, botao_salvar)
}

function atualizarCadastro(cadastro, novos_dados) {
    cadastro.innerHTML = ''

    const novo_nome = document.createElement("h2")
    novo_nome.textContent = `Nome: ${novos_dados.nome}`

    const novo_numero = document.createElement("p")
    novo_numero.textContent = `Número: ${novos_dados.numero}`

    const novo_email = document.createElement("p")
    novo_email.textContent = `E-mail: ${novos_dados.email}`

    const botao_editar = document.createElement("button")
    botao_editar.textContent = "Editar"
    botao_editar.addEventListener("click", () => {
        editarCadastro(cadastro, novos_dados.nome, novos_dados.numero, novos_dados.email)
    })

    const botao_excluir = document.createElement("button")
    botao_excluir.textContent = "Excluir"
    botao_excluir.addEventListener("click", () => {
        lista.removeChild(cadastro)
        removerDoLocalStorage(novos_dados.nome, novos_dados.numero, novos_dados.email)
    })

    cadastro.append(novo_nome, novo_email, novo_numero, botao_editar, botao_excluir)
}

function salvarNoLocalStorage(nome, numero, email) {
    const lista_de_cadastro = JSON.parse(localStorage.getItem("lista_de_dados")) || []
    const objeto = { nome, numero, email }
    lista_de_cadastro.push(objeto)
    localStorage.setItem("lista_de_dados", JSON.stringify(lista_de_cadastro))
}

function removerDoLocalStorage(nome, numero, email) {
    const lista_de_cadastro = JSON.parse(localStorage.getItem("lista_de_dados")) || []
    const nova_lista = lista_de_cadastro.filter(cadastro =>
        cadastro.nome !== nome || cadastro.numero !== numero || cadastro.email !== email)
    localStorage.setItem("lista_de_dados", JSON.stringify(nova_lista))
}

function atualizarNoLocalStorage(nomeAntigo, numeroAntigo, emailAntigo, novosDados) {
    const lista_de_cadastro = JSON.parse(localStorage.getItem("lista_de_dados")) || []
    const indice = lista_de_cadastro.findIndex(cadastro =>
        cadastro.nome === nomeAntigo && cadastro.numero === numeroAntigo && cadastro.email === emailAntigo)
    if (indice !== -1) {
        lista_de_cadastro[indice] = novosDados
        localStorage.setItem("lista_de_dados", JSON.stringify(lista_de_cadastro))
    }
}

function carregarDados() {
    const lista_de_cadastro = JSON.parse(localStorage.getItem("lista_de_dados")) || []
    lista_de_cadastro.forEach((cadastro) => {
        adicionarCadastro(cadastro.nome, cadastro.numero, cadastro.email)
    })
}

carregarDados()