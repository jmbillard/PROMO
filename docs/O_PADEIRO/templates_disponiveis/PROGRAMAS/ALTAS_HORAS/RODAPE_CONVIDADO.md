# 📓 ALTAS HORAS RODAPÉ CONVIDADO

> 📑 ***RODAPE_CONVIDADO.aet***

---

<br>

> 🎬 *preview:*\
> ![exemplo](RODAPE_CONVIDADO/RODAPE_CONVIDADO_exemplo.gif)

---

<br>

## 📍 funcionamento básico

1. abra a **comp** '*RDP - CONVIDADO TEMPLATE*'.
2. edite o texto do **layer** '*txt_nome*' com o nome do convidado.
3. selecione o **layer** '*ctrl*'.
4. use a *janela de controle de efeitos* para alterar o layout.
5. renomeie a **comp** '*RDP - CONVIDADO TEMPLATE*' substituindo as palavras '*CONVIDADO TEMPLATE*' pelo nome do convidado.

> 📋 *exemplo:* "*RDP - E O TCHAN*".

> 🚩 *obs:* Sempre use **CAIXA ALTA SEM ACENTUAÇÃO** e **SEM CARACTERES ESPECIAIS** para nomear **comps**.

---

<br>

## 📍 parâmetros

todos os controles estão no **layer** '*ctrl*', são eles:

### opções do time

![fx1](<BRASILEIRAO_CONFRONTO/ocoes do time.png>)

- **esquema de cores**:

  - **principal** → cores principais do preset time.
  - **alternativo** → cores alternativas do preset time.
  - **livre** → todas as cores do time poderão ser alteradas.

- **nome** → controla a cor do nome.
- **base** → controla a cor da base atrás nome.
- **noise** → controla a cor do ruído do bg.
- **nome bg** → controla a cor do nome exibido no bg.
- **bg** → controla a cor do bg.

os controles dos presets de cor estão em cada **layer** da **comp** '*ESCUDOS*', são eles:

### esquema de cores

![fx2](<BRASILEIRAO_CONFRONTO/esquema de cores.png>)

- **cores principais**:

  - **nome** → controla a cor do nome no esquema principal.
  - **base** → controla a cor da base atrás nome no esquema principal.
  - **noise** → controla a cor do ruído do bg no esquema principal.
  - **nome** bg → controla a cor do nome exibido no bg no esquema principal.
  - **bg** → controla a cor do bg no esquema principal.

- **cores alternativas**:
  - **alt. nome** → controla a cor do nome no esquema alternativo.
  - **alt. base** → controla a cor da base atrás nome no esquema alternativo.
  - **alt. noise** → controla a cor do ruído do bg no esquema alternativo.
  - **alt. nome bg** → controla a cor do nome exibido no bg no esquema alternativo.
  - **alt. bg** → controla a cor do bg no esquema alternativo.

---

<br>

## 🚨 Atenção!

para adicionar um novo escudo:

  1. abra a **comp** '*ESCUDOS*'.
  2. duplique um **layer** de escudo existente.
  3. substitua o **layer** duplicado pelo novo escudo.
  4. renomeie o **layer** duplicado com o nome do novo time seguido da sigla do estado.
  5. altere os presets de cor do novo time na *janela de controle de efeitos*.

> 📋 *exemplos de nome do **layer** de escudo:* "*cuiabá MT*", "*são paulo SP*".

> 🚩 *obs:* O nome do **layer** será sempre o nome do time exibido na **comp** '*CONFRONTO*'.

para alterar as cores de um escudo existente:

  1. abra a **comp** '*ESCUDOS*'.
  2. selecione o **layer** do escudo desejado.
  3. altere os presets de cor do time na *janela de controle de efeitos*.

> 📋 *exemplo:*\
> ![escudos](BRASILEIRAO_CONFRONTO/04-alterar-ou-adicionar-escudos.gif)

---

<br>

## ✨ dicas

não é preciso digitar o nome completo dos times na maioria das vezes, caso existam 2 times com o mesmo nome, basta digitar o nome completo incluindo a sigla do estado.

> 📋 *exemplo:* "*fla*" x "*flu*", "*fluminense de feira de santana*" x "*fluminense RJ*"

> ![busca](<BRASILEIRAO_CONFRONTO/01-renomear times.gif>)

> 🚩 *obs:* Maiúsculas e minúsculas assim como acentos e caracteres especiais são ignorados na busca dos nomes dos times, assim, "*fla*", "*FLA*" e "*fLÁ*" sempre mostrarão o nome do primeiro time que possuir "*FLA*" em seu nome.

---

para inverter a ordem dos times em um confronto basta alterar a ordem dos 2 primeiros **layers** da **com** '*CONFRONTOS*'.

> 📋 *exemplo:*\
> ![inverter](BRASILEIRAO_CONFRONTO/03-inverter.gif)

---

para agilizar a produção de múltiplos confrontos use a função de **renomear comps** na barra de **PROMO v0.3** ou superior.

> 📋 *exemplo:*\
> ![renomear](BRASILEIRAO_CONFRONTO/05-renomear-confronto.gif)
