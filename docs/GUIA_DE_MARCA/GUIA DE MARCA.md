# 📓 TEMPLATES DO GUIA DE MARCA

📑 **guia de marca - template vb2.aet**

---

<br><br>

> 🎬 _preview:_\
> ![preview](templateGuiaDeMarca/OVERVIEW_PREVIEW.png)

## 📍 funcionamento básico

na **comp** '_OVERVIEW_':

1. edite o nome e a data do projeto.
2. adicione as logos e assinaturas nas respectivas comps.
3. altere as cores da paleta.

e em suas respectivas telas:

4. ajuste o arejamento mínimo.
5. ajuste a redução mínima.
6. edite os exemplos de uso incorreto.
7. ajuste o brilho das cores secundárias.
8. selecione as tipografias do logo e auxiliares.
9. adicione os assets de apoio.
10. adicione os kvs.
11. edite a lista de links.

### controles
>
> ![fx](templateGuiaDeMarca/controles/PROJETO_DATA.png)

- **mes**:
  - janeiro
  - fevereiro
  - março
  - abril
  - maio
  - junho
  - julho
  - agosto
  - setembro
  - outubro
  - novembro
  - dezembro
- **ano**:
  - 2022
  - 2023
  - 2024
  - 2025
  - 2026

> ![fx](templateGuiaDeMarca/controles/PROJETO_CORES.png)

- cor 1 - 7 → controlam as cores da paleta principal.
- percentagem de brilho 1 → controla o brilho do primeiro grupo de cores secundárias.
- percentagem de brilho 2 → controla o brilho do segundo grupo de cores secundárias.

> 🚩 _obs:_\
> • habilite / desabilite e reordene as telas para organizar o guia da marca.\
> • habilite / desabilite e reordene os controles de cor para montar a paleta.\
> • o template irá suportar até 10 cores.\
> • a primeira cor é sempre a cor principal e será usada nos BGs.\
> • o preview das telas é dinâmico, a ordem da paginação e índice serão atualizados automaticamente.

---

<br><br>

## 🚨 Atenção!

- a cor principal será sempre a primeira cor da paleta.
- algumas telas só serão exibidas no preview caso tenham algum conteúdo.
- para adicionar uma nova tela:
  1. duplique o layer de uma tela existente.
  2. substitua a tela duplicada pela nova.
  3. reordene o layer da tela para a posição desejada.

---

<br><br>

## 📑 Templates de tela disponíveis

- Capa (frente e verso)
- Informações
- Conteúdo
- Assinatura
- Variação Assinatura (1 e 2 variações)
- Vetor Logo
- Arejamento Mínimo
- Redução Mínima em Tela
- Usos Incorretos (até 8 exemplos)
- Cores (até 10 cores principais)
- Tipografia Logo
- Tipografia Auxiliar (1 e 2 fontes)
- Assets de Apoio
- Key Visuals (intro e exemplos)
- Links

> 🚩 _obs:_\
> • algumas telas irão variar de layout dependendo do conteúdo a ser exibido.

---

<br><br>

### 📍 Capa

> 🎬 _preview:_\
> _capa frente_\
> ![exemplo](templateGuiaDeMarca/0_CAPA_PREVIEW.png)

> _capa verso_\
> ![exemplo](templateGuiaDeMarca/0_6_CAPA_VERSO_PREVIEW.png)

### modo de uso

a cor do fundo é controlada pela primeira cor da paleta na **comp** '_OVERVIEW_'.

_capa frente_\
o nome do projeto e a data devem ser editados na **comp** '_OVERVIEW_'.\

_capa verso_\
edite o texto do **layer** '_txt_info_', se necessário.

> não existem controles nestas telas.

---

<br><br>

### 📍 Informações

> 🎬 _preview:_\
> ![exemplo](templateGuiaDeMarca/0_1_INFORMACOES_PREVIEW.png)

### modo de uso

edite o texto do **layer** '_txt_info_', se necessário.

> não existem controles nesta tela.

---

<br><br>

### 📍 Conteúdo

> 🎬 _preview:_\
> ![exemplo](templateGuiaDeMarca/0_2_CONTEUDO_PREVIEW.png)

### modo de uso

a lista do índice é controlada pela ordem e visibilidade das telas na **comp** '_OVERVIEW_'.

> não existem controles nesta tela.

---

<br><br>

### 📍 Assinatura

> 🎬 _preview:_\
> ![exemplo](templateGuiaDeMarca/1_ASSINATURA_PREVIEW.png)

### modo de uso

abra a **comp** '_ASSINATURA_'.\
adicione a imagem da assinatura principal.

retorne para a tela '_Assinatura_'.
edite o texto do **layer** '_txt_info_', se necessário.

> não existem controles nesta tela.

> 🚩 _obs:_\
> • o preview desta tela na **comp** '_OVERVIEW_' é desabilitado caso não exista uma imagem na **comp** '_ASSINATURA_'.

---

<br><br>

### 📍 Variação Assinatura

> 🎬 _preview:_\
> _1 variação_\
> ![exemplo](templateGuiaDeMarca/1_2_VARIACAO_ASSINATURA_1_PREVIEW.png)

> _2 variações_\
> ![exemplo](templateGuiaDeMarca/1_2_VARIACAO_ASSINATURA_2_PREVIEW.png)

### modo de uso

abra as **comps** '_ASSINATURA ALT 1_' e '_ASSINATURA ALT 2_'.\
adicione as imagens das assinaturas alternativas nas respectivas comps.

retorne para a tela '_Variação Assinatura_'.

> não existem controles nestas telas.

> 🚩 _obs:_\
> • o layout também se adaptara ao habilitar / desabilitar os **layers** '_ASSINATURA ALT 1_' e '_ASSINATURA ALT 2_'.\
> • o preview desta tela na **comp** '_OVERVIEW_' é desabilitado caso não exista uma imagem nas **comps** '_ASSINATURA ALT 1_' e '_ASSINATURA ALT 2_'.

---

<br><br>

### 📍 Vetor Logo

> 🎬 _preview:_\
> ![exemplo](templateGuiaDeMarca/2_VETOR_LOGO_PREVIEW.png)

### modo de uso

abra a **comp** '_LOGO_'.\
adicione a imagem do logo principal.\
ajuste o seu crop movendo os **layers** '_shp_target S_', '_shp_target E_', '_shp_target D_', '_shp_target I_'.\

retorne para a tela '_Vetor Logo_'.\
edite o texto do **layer** '_txt_info_', se necessário.

> não existem controles nesta tela.

> 🚩 _obs:_\
> • as versões positiva e negativa são geradas automaticamente quando uma imagem é adicionada na **comp** '_LOGO_',\
> para sobrescrever as versões automáticas adicione uma imagem nas **comps** '_LOGO VETOR POSITIVO_' e '_LOGO VETOR NEGATIVO_'.\
> • o preview desta tela na **comp** '_OVERVIEW_' é desabilitado caso não exista uma imagem na **comp** '_LOGO_'.
---

<br><br>

### 📍 Arejamento Mínimo

> 🎬 _preview:_\
> ![exemplo](templateGuiaDeMarca/2_1_AREJAMENTO_MINIMO_PREVIEW.png)\
> *alterado na versão b2*

### modo de uso

abra a **comp** '_LOGO_'.\
adicione a imagem do logo principal.\
ajuste o seu crop movendo os **layers** '_shp_target S_', '_shp_target E_', '_shp_target D_', '_shp_target I_'.

retorne para a tela '_Arejamento Mínimo_'.\
mova os **layers** '_shp_target 1_', '_shp_target 2_' para ajustar a medida X.\
use o controle nos efeitos do **layer** '_shp_target 1_' para alterar a orientação e cor.

edite o texto do **layer** '_txt_info_', se necessário.

### controles

> ![fx](templateGuiaDeMarca/controles/ORIENTACAO_X_2.png)\
*alterado na versão b2*

- **orientacao medida x**:
  - vertical → torna a medida X vertical.
  - horizontal → torna a medida X horizontal.
- **cor de destaque** → controla da medida X.

> 🚩 _obs:_\
> • o preview desta tela na **comp** '_OVERVIEW_' é desabilitado caso não exista uma imagem na **comp** '_LOGO_'.

---

<br><br>

### 📍 Redução Mínima em Tela

> 🎬 _preview:_\
> ![exemplo](templateGuiaDeMarca/2_2_REDUCAO_MINIMA_EM_TELA__PREVIEW.png)\
> *alterado na versão b2*

### modo de uso

abra a **comp** '_LOGO_'.\
adicione a imagem do logo principal.\
ajuste o seu crop movendo os **layers** '_shp_target S_', '_shp_target E_', '_shp_target D_', '_shp_target I_'.

retorne para a tela '_Redução Mínima em Tela_'.\
mova o **layer** '_shp_target zoom_' para deslocar a área do zoom.\
use o controle nos efeitos do **layer** '_shp_target zoom_' para alterar o zoom.

mova os **layers** '_shp_target 1_', '_shp_target 2_' para ajustar a medida 1px.\
use o controle nos efeitos do **layer** '_shp_target 1_' para alterar a orientação e cor.

edite o texto do **layer** '_txt_info_', se necessário.

### controles

> ![fx](templateGuiaDeMarca/controles/ZOOM.png)

- **zoom** → aumenta e reduz a ampliação da área selecionada.

> ![fx](templateGuiaDeMarca/controles/ORIENTACAO_1PX_2.png)\
> *alterado na versão b2*

- **orientacao medida 1px**:

  - **vertical** → torna a medida X vertical.
  - **horizontal** → torna a medida X horizontal.

- cor de destaque → controla da medida 1px e a seta indicativa.

> 🚩 _obs:_\
> • o preview desta tela na **comp** '_OVERVIEW_' é desabilitado caso não exista uma imagem na **comp** '_LOGO_'.
---

<br><br>

### 📍 Usos Incorretos

> 🎬 _preview:_\
> ![exemplo](templateGuiaDeMarca/2_3_USOS_INCORRETOS_PREVIEW.png)

### modo de uso

desabilite / reordene os layers dos exemplos.\
renomeie os mesmos para editar as respectivas legendas.

para adicionar um novo exemplo:

  1. duplique a **comp** '_LOGO_' no projeto.
  2. nomeie a copia com a descrição do exemplo.
  3. substitua qualquer exemplo pela copia.
  4. reordene o layer da copia para a posição desejada.
  5. abra a **comp** da copia e edite o seu conteúdo.

> não existem controles nesta tela.

> 🚩 _obs:_\
> • digite '_' no nome do exemplo para adicionar uma quebra de linha.\
> • o preview desta tela na **comp** '_OVERVIEW_' é desabilitado caso não exista uma imagem na **comp** '_LOGO_'.

---

<br><br>

### 📍 Cores

> 🎬 _preview:_\
> ![exemplo](templateGuiaDeMarca/3_CORES_PREVIEW.png)

### modo de uso

edite o texto do **layer** '_txt_info_', se necessário.

todas as cores são controladas nos efeitos do **layer** '_shp_paleta principal_' na **comp** '_OVERVIEW_'.

> não existem controles nesta tela.

> 🚩 _obs:_\
> • a primeira cor é sempre a cor principal e será usada nos BGs.
---

<br><br>

### 📍 Tipografia Logo

> 🎬 _preview:_\
> ![exemplo](templateGuiaDeMarca/4_TIPOGRAFIA_LOGO_PREVIEW.png)

### modo de uso

altere a fonte do **layer** '_txt_fonte_'.\
use o controle nos efeitos para habilitar a edição do nome da fonte.\
use os controles nos efeitos do **layer** '_txt_peso_' para habilitar a edição do nome do peso\
e os elementos do texto de amostra.

edite o texto do **layer** '_txt_info_', se necessário.

### controles

> ![fx](templateGuiaDeMarca/controles/NOME_FONTE.png)

- **nome automatico** → habilita a edição do nome da fonte.

> ![fx](templateGuiaDeMarca/controles/PESO_FONTE.png)

- **peso automatico** → habilita a edição do nome do peso da fonte.
- **minusculas** → habilita a exibição da letras minúsculas no texto de amostra.
- **maiusculas** → habilita a exibição da letras maiúsculas no texto de amostra.
- **numeros** → habilita a exibição dos números no texto de amostra.

---

<br><br>

### 📍 Tipografia Auxiliar

> 🎬 _preview:_\
> _1 fonte_\
> ![exemplo](templateGuiaDeMarca/4_1_TIPOGRAFIA_AUXILIAR_1_PREVIEW.png)

> _2 fontes_\
> ![exemplo](templateGuiaDeMarca/4_1_TIPOGRAFIA_AUXILIAR_2_PREVIEW.png)

### modo de uso

alterne o layout habilitando o **layer** '_txt_fonte 2_'.

altere as fontes dos **layer** '_txt_fonte 1_' e '_txt_fonte 2_', se habilitado.\
use o controle nos efeitos para habilitar a edição dos nomes das fontes.

altere as fontes dos **layer** '_txt_peso 2_' e '_txt_peso 3_', se habilitados.\
use o controle nos efeitos para habilitar a edição dos nomes dos pesos\
e os elementos do texto de amostra.

edite o texto do **layer** '_txt_info_', se necessário.

### controles

> ![fx](templateGuiaDeMarca/controles/NOME_FONTE_AUX_1.png)\
> ![fx](templateGuiaDeMarca/controles/NOME_FONTE_AUX_2.png)

- **nome automatico** → habilita a edição do nome da fonte.

> ![fx](templateGuiaDeMarca/controles/PESO_FONTE_AUX_1.png)\
> ![fx](templateGuiaDeMarca/controles/PESO_FONTE_AUX_2.png)\
> ![fx](templateGuiaDeMarca/controles/PESO_FONTE_AUX_3.png)\

- **peso automatico** → habilita a edição do nome do peso da fonte.
- **minusculas** → habilita a exibição da letras minúsculas no texto de amostra.
- **maiusculas** → habilita a exibição da letras maiúsculas no texto de amostra.
- **numeros** → habilita a exibição dos números no texto de amostra.

---

<br><br>

### 📍 Assets de Apoio

> 🎬 _preview:_\
> ![exemplo](templateGuiaDeMarca/5_ASSETS_DE_APOIO_PREVIEW.png)

### modo de uso

abra a **comp** '_ASSETS APOIO EX_'.\
adicione as imagens.\
renomeie as mesmas para editar as respectivas legendas.

retorne para a tela '_Assets de Apoio_'.\
edite o texto do **layer** '_txt_info_', se necessário.

> não existem controles nesta tela.

> 🚩 _obs:_\
> • digite '_' no nome das imagens para adicionar uma quebra de linha.\
> • o preview desta tela na **comp** '_OVERVIEW_' é desabilitado caso não existam imagens na **comp** '_ASSETS APOIO EX_'.

---

<br><br>

### 📍 Key Visuals

> 🎬 _preview:_\
> _kv intro_\
> ![exemplo](templateGuiaDeMarca/6_KEY_VISUALS_PREVIEW.png)

> _kv exemplos_\
> ![exemplo](templateGuiaDeMarca/6_1_KEY_VISUALS_PREVIEW.png)

### modo de uso

_kv intro_\
edite o texto do **layer** '_txt_info_', se necessário.

_kv exemplos_\
abra a **comp** '_KEY VISUALS EX_'.\
adicione as imagens.\
renomeie as mesmas para editar as respectivas legendas.

retorne para a tela '_KEY VISUALS_'.

> não existem controles nesta tela.

> 🚩 _obs:_\
> • digite '_' no nome das imagens para adicionar uma quebra de linha.\
> • o preview destas telas na **comp** '_OVERVIEW_' é desabilitado caso não existam imagens na **comp** '_KEY VISUALS EX_'.

---

<br><br>

### 📍 Links

> 🎬 _preview:_\
> ![exemplo](templateGuiaDeMarca/7_LINKS_PREVIEW.png)

### modo de uso

edite o texto do **layer** '_txt_link assets_'.\
edite o texto do **layer** '_txt_info_', se necessário.

> não existem controles nesta tela.
