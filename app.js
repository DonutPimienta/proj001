// Passo 1: Usar a API nativa 'fetch' para fazer o pedido do ficheiro XML ao servidor/pasta local
fetch('filmes.xml')
    
    // Passo 2: Quando a resposta chega, convertemo-la para texto puro (string)
    .then(resposta => resposta.text())
    
    // Passo 3: Com o texto gerado, vamos transforma-lo num Documento XML manipulavel
    .then(texto => {
        // Instanciar o analisador (parser) nativo do navegador
        let parser = new DOMParser();
        
        // Converter a string de texto puro numa arvore XML (DOM - Document Object Model)
        let xml = parser.parseFromString(texto, "text/xml");

        // Passo 4: Pesquisar dentro do XML todos os nos/tags chamados <filme>
        let filmes = xml.querySelectorAll("filme");
        
        // Passo 5: Criar uma variavel vazia para ir acumulando o codigo HTML que vamos gerar
        let conteudoLista = "";

        // Passo 6: Percorrer cada filme que encontramos no ficheiro XML
        filmes.forEach(filme => {
            // Extrair o texto que esta dentro da tag <titulo>
            let titulo = filme.querySelector("titulo").textContent;
            
            // Extrair o texto que esta dentro da tag <ano>
            let ano = filme.querySelector("ano").textContent;
            
            // Construir a linha de HTML (List Item - <li>) com os dados lidos e juntar a variavel conteudoLista
            // A tag <strong> poe o titulo a negrito
            conteudoLista += `<li><strong>${titulo}</strong> (${ano})</li>\n`;
        });

        // Passo 7: Encontrar o elemento HTML com o id "lista-filmes" e substituir o seu interior pelo HTML gerado
        document.getElementById("lista-filmes").innerHTML = conteudoLista;
    })
    
    // Passo 8: Se houver algum erro (ficheiro nao encontrado, bloqueio CORS, etc.), capturamos aqui
    .catch(erro => console.error("Ocorreu um erro ao carregar o XML:", erro));
