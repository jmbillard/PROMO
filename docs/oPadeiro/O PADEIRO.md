# O PADEIRO *script*

**pt-BR** ⚡ Ferramenta de preenchimento em massa de templates no After Effects ⚡

<br/>

# 📟 Interface
![ui](images/o_padeiro_ui.png)

# 📌 funcionamento básico

após executar o script '**O PADEIRO.jsx**':
1. selecione o template desejado da lista '**templates**'.
2. preencha o campo '**input**' seguindo as '**dicas**'.
3. habilite ou não a opção '**adicionar a fila de render**'.
4. clique no botão '**criar**'
5. caso tenha habilitado '**adicionar a fila de render**', selecione um preset para o render output.

<br/>

o script executará as seguintes tarefas em ordem:
1. importar os arquivos do projeto.
2. duplicar as comps necessárias.
3. preencher as informações inseridas no input.
4. renomear tudo seguindo o padrão da PROMO.
5. se habilitado, adicionar as comps criadas a fila de render com os caminhos para o output.

> 🚩\
> • confira sempre as composições criadas, seu conteúdo e o caminho do output.\
> • idealmente cada template deve possuir uma imagem '*_preview.png*' e um arquivo de configuração '*_config.json*' com as informações necessárias para o preenchimento correto do template selecionado.

---

  <br/>

## 📑 templates:
![ui](images/templates_ui.png)

- lista de templates → árvore com todos os templates disponíveis na pasta de templates do script.\

> 🚩\
> • ao selecionar um template da lista, a interface do script se ajustará para exibir um preview, o campo de input e dicas, se disponíveis.\
> • apenas os templates podem ser selecionados na lista.\
> • apenas os arquivos com extensão '*.aep*', '*.aet*' e seus diretórios são exibidos na lista.
> • ao executar um clique duplo em qualquer template da lista, o respectivo '*.aet*' ou '*.aep*' será importado para o projeto.

## 🖼️ preview:
![ui](images/preview_ui.png)

- imagem de preview → exibe uma imagem de exemplo do template selecionado.

> 🚩\
> • caso a imagem de preview não esteja disponível, um place holder será exibido em seu lugar.\
> • muitos templates conseguem exibir mais de um tipo de informação e o seu layout irá se adaptar para acomodar as mesmas.

## 📝 input:
![ui](images/input_ui.png)

- texto → campo de texto editável multifuncional, é o responsável pelo preenchimento de qualquer possível campo de texto do template selecionado.
- adicionar a fila de render → se habilitado, adiciona as comps criadas e o seus caminhos corretos no output automaticamente.
- dicas → tópicos curtos explicando o preenchimento do template selecionado.

> 📋 *exemplo de arquivo de configuração:* *"RODAPE CONVIDADO_config.json"*

```json
// "\n" representa uma quebra de linha. :)
{
	"configName": "CONVERSA COM BIAL TARJA RODAPÉ CONVIDADO", // → nome da configuração
	"exemple": "NOME CURTO\n\nNOME MAIOR\nCOM SOBRENOME\n\nNOME MAIOR\nCOM SOBRENOME\n---\nINFORMAÇÃO", // → texto preenchido de exemplo na janela de texto do input
	"tip": "digite o texto em 1, 2 ou 3 linhas para nome e informação.\n\nuse 1 linha com '---' para separar nome e informação.\n\nuse 1 linha vazia para separar mais de 1 versão do mesmo template selecionado.\n\nuse os controles nos efeitos do layer 'ctrl'.", // → texto com as dicas de preenchimento

	"compName": "RDP - CONVIDADO TEMPLATE", // → nome da comp a ser editada.
	"prefix": "RDP", // → prefixo que o nome da comp editada receberá.
	"refTime": 2, // → tempo, em segundos, do momento em que todas as infos preenchidas estão visíveis na comp.
	"separator": "---", // → texto usado para separar as informações de tipos diferentes.
	"textCase": "upperCASE", // → o tipo de caixa de texto que o template deve receber: "upperCASE", "lowerCase" ou "titleCase".
	"inputLayers": [ // → lista com os layers editáveis da comp.
		{"layerIndex": 4, "method": "textContent"}, // → índice do layer: 1, 2, 3, etc.
		{"layerIndex": 5, "method": "textContent"} // → método: "layerName" renomeia o layer ou "textContent" preenche o conteúdo de um layer de texto.
	],

	"outputPath": "//10.193.48.13/promo_ber/BACKUP/artes/ARTES PARA EDICAO/CONVERSA COM BIAL/CONVIDADOS", // → caminho padrão do output.
	"alpha": true  // → aviso que o canal alpha é necessário.
}
```
> 🚩\
> • o '**input**' é pré preenchido com dados genéricos disponíveis no arquivo de configuração do template selecionado apenas para exemplificar **ALGUMAS** possibilidades de preenchimento.\
> • sem um arquivo de configuração, não é possível preencher o template selecionado usando a janela de texto do '**input**'.\
> • você ainda poderá **IMPORTAR** e **PREENCHER MANUALMENTE** o template no After Effects!.

## botões
![ui](images/botoes_ui.png)

- botão importar → importa o arquivo '*.aet*' ou '*.aep*' para o projeto.
- botão atualizar lista → verifica e atualiza a lista de templates disponíveis.
- botão abrir pasta → abre a pasta raiz de templates.
- botão criar → inicia a execução do preenchimento automático.

![ui](images/render_ui.png)

- templates de render → caso tenha habilitado '**adicionar a fila de render**', selecione um preset para o render output.

> 🚩\
> • o export padrão é um arquivo '*.mov*' em '*QUICKTIME PRORES 422*' para artes sem alpha ou '*444 RGB+A*' (com alpha **STRAIGHT**).\
> • ao executar um clique duplo em qualquer template da lista, o respectivo '*.aet*' ou '*.aep*' será importado para o projeto.