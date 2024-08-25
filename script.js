document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form")
  const formBusca = document.getElementById("form_busca")
  const resultado = document.getElementById("resultado")
  const buscar = document.getElementById("buscar")

  let livros = JSON.parse(localStorage.getItem("livros")) || []

  function adicionarLivro(event) {
    event.preventDefault()

    const titulo = document.getElementById("titulo").value
    const autor = document.getElementById("autor").value
    const genero = document.getElementById("genero").value
    const anoPublicacao = document.getElementById("ano_publicacao").value
    const avaliacao = document.getElementById("avaliacao").value

    if (titulo && autor && genero && anoPublicacao && avaliacao) {
      const livro = {
        titulo,
        autor,
        genero,
        anoPublicacao,
        avaliacao,
      }
        livros.push(livro)
        localStorage.setItem("livros", JSON.stringify(livros))

      form.reset()

      mostrarLivros()
    } else {
      alert("Por favor, preencha todos os campos.")
    }
  }

  function mostrarLivros() {
    resultado.innerHTML = ""
    livros.forEach((livro, index) => {
      resultado.innerHTML += `
                <div>
                    <h3>${livro.titulo}</h3>
                    <p><strong>Autor:</strong> ${livro.autor}</p>
                    <p><strong>Gênero:</strong> ${livro.genero}</p>
                    <p><strong>Ano de Publicação:</strong> ${livro.anoPublicacao}</p>
                    <p><strong>Avaliação:</strong> ${livro.avaliacao}</p>
                    <button onclick="removerLivro(${index})">Remover</button>
                </div>
            `
    })
  }

  window.removerLivro = function (index) {
    livros.splice(index, 1)
    localStorage.setItem("livros", JSON.stringify(livros))
    mostrarLivros()
  }

  function buscarLivro(event) {
    event.preventDefault()
    const termoBusca = prompt("Digite o título do livro que deseja buscar:")
    const resultadoBusca = livros.filter((livro) =>
      livro.titulo.toLowerCase().includes(termoBusca.toLowerCase())
    );

    buscar.innerHTML = ""
    if (resultadoBusca.length > 0) {
      resultadoBusca.forEach((livro) => {
        buscar.innerHTML += `
                    <div>
                        <h3>${livro.titulo}</h3>
                        <p><strong>Autor:</strong> ${livro.autor}</p>
                        <p><strong>Gênero:</strong> ${livro.genero}</p>
                        <p><strong>Ano de Publicação:</strong> ${livro.anoPublicacao}</p>
                        <p><strong>Avaliação:</strong> ${livro.avaliacao}</p>
                    </div>
                `
      })
    } else {
      buscar.innerHTML = "<p>Nenhum livro encontrado.</p>";
    }
  }

  mostrarLivros()

  form.addEventListener("submit", adicionarLivro)
  formBusca.addEventListener("submit", buscarLivro)
})