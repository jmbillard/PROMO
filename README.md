
# PROMO *script*

**pt-BR** ⚡ algumas ferramentas para melhorar o workflow da equipe de PROMO

## 📟 layout e interface

![menu](/images/gifs//layout.gif)
a barra pode alternar entre os layouts *`horizontal`* e *`vertical`* ao ser redimensionada.
a tela inicial é dividida por temas e possui as seguintes [ **seções** ] e **ferramentas**...

```markdown
    - [controles]         →   hierarquias, nulls e afins...
    - [animação]
    - adjustment layer
    - [texto]             →   manipulação de layers de texto...
    - [marca]             →   logos, cores e elementos do on-air atual...
    - [projeto]           →   organiza tudo em pastinhas...
    - [atalhos]
    - busca
    - preview
    - [preferencias]      →   preferencias do script...
```

> a *'cor'* da tela inicial e suas seções podem ser alteradas nas *'preferências do script'*...
---

<br /><br />

# ![ctrl icon](/images/icons/0%20-%20menu/ctrlIcon%20dark.png) [ seção *controles* ]

![info](/images/icons/general/infoIcon%20dark.png) → abre a documentação | ajuda da seção.

---
<br />

## ![null btn](/images/icons/1%20-%20controls/nullIcon%20dark.png) botão **`null`**

cria um 'null' pai na mesma posição de cada layer selecionado.

> caso não tenha nenhum layer selecionado, o *'null'* é criado no centro da tela.\
> o tipo de layer usado como *'null'* pode ser configurado nas *'preferências'* como *'solid'* ou *'shape layer'*...

1. ### ![copy animation tg](/images/icons/general/toggles/aniToggleIcon%20dark.png) modificador **`copiar animação`**

    habilita a transferência dos 'key frames' de transformação dos layers selecionados para o 'null'.

    ```markdown
        'anchor point'
        'posição'
        'escala'
        'rotação'
    ```

    > os *'key frames'* de *'opacidade'* não serão transferidos...

    ![copy animation ex](/images/gifs/copy-animation.gif)

2. ### ![expression](/images/icons/general/toggles/expToggleIcon%20dark.png) modificador **`copiar expressões`**

    habilita a transferência das 'expressões' de transformação dos layers selecionados para o 'null'.

    ```markdown
        'anchor point'
        'posição'
        'escala'
        'rotação'
    ```

    > as *'expressões'* de *'opacidade'* não serão transferidas...
<!-- [ ] ex: copiar expressões -->
---
<br />

### ![central null btn](/images/icons/1%20-%20controls/nullCenter%20dark.png) botão **`null central`**

cria um único 'null' pai no 'centro geométrico' de 2 ou mais layers selecionados.

---
<br />

### ![down btn](/images/icons/general/downIcon%20dark.png)![up btn](/images/icons/general/upIcon%20dark.png) botões de **`seleção de hierarquia`**

avança pela `hierarquia` dos layers selecionados... seleciona o pai ou todos os filhos.

<!-- [ ] ex: seleção de hierarquia -->
---

<br /><br />

