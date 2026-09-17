# Imagens

## Por que as fotos passam por um passo de build

O site tinge todas as fotos de dourado via CSS (`.photo-gold` em
`src/styles/index.css`): a imagem vira escala de cinza e uma camada dourada em
`mix-blend-mode: color` devolve matiz preservando a luminosidade. Isso permite
misturar fotos de origens muito diferentes — uma em neon azul, outra em preto e
branco — sem quebrar a paleta.

O que esse filtro **não** consegue corrigir é exposição. Ele é único e se aplica
igual a todas as fotos, então uma foto naturalmente escura continua escura e
uma clara continua clara. Na primeira versão do hero as quatro fotos tinham
média de luminância entre 18 e 48 (numa escala de 0 a 255), e o resultado era
que metade da rotação aparecia quase preta, sem assunto reconhecível.

A correção é normalizar a luminância **na origem**, para que o filtro CSS receba
entradas equivalentes.

## Como processar uma foto nova

Requer ImageMagick (`magick`).

```bash
SRC=foto-original.jpg
OUT=src/assets/imgs/hero-nome.webp

mean=$(magick "$SRC" -colorspace gray -format "%[fx:mean]" info:)
gamma=$(awk -v m="$mean" 'BEGIN{printf "%.4f", log(m)/log(72/255)}')

magick "$SRC" \
  -gravity center -crop 4:3 +repage \
  -gamma "$gamma" \
  -sigmoidal-contrast 3,45% \
  -resize 1280x \
  -despeckle \
  -quality 68 \
  "$OUT"
```

O que cada passo faz:

| Passo | Por que |
|---|---|
| `-gamma` calculado | leva a média de luminância da foto para **72**, o alvo comum a todas |
| `-sigmoidal-contrast 3,45%` | devolve o contraste que o gamma achata, sem estourar as altas |
| `-resize 1280x` | largura suficiente para o hero em telas grandes |
| `-despeckle` | o gamma revela ruído nas sombras; sem isso o arquivo quase triplica |
| `-quality 68` | é foto de fundo tingida, não precisa mais |

Confira o resultado antes de comitar:

```bash
magick identify -format "%f %wx%h %b mean=%[fx:int(mean*255)]\n" src/assets/imgs/hero-*.webp
```

A média final deve ficar entre **55 e 75**. Fora dessa faixa a foto vai piscar
mais clara ou mais escura que as outras durante a rotação.

## Escolhendo a foto

No desktop o hero recorta a foto em diagonal e mostra só a **metade direita** —
a esquerda fica atrás da coluna de texto. Então o ponto de interesse tem que
estar no centro ou à direita do quadro.

Uma foto de faíscas de esmerilhadeira foi descartada por isso: era a mais
dramática do lote, mas as faíscas ficavam no canto superior esquerdo, ou seja,
na parte coberta.

Outros critérios: escura na origem (sobra margem para o gamma trabalhar),
assunto reconhecível num relance, e sem placa de veículo legível nem logo de
marca concorrente em destaque.

## Origem das fotos atuais

Todas do [Pexels](https://www.pexels.com), licença livre para uso comercial e
sem exigência de atribuição.

| Arquivo | Pexels ID | Assunto |
|---|---|---|
| `hero-engrenagens.webp` | 7568427 | engrenagens de câmbio em macro |
| `hero-diagnostico.webp` | 7019602 | diagnóstico sob o veículo |
| `hero-freios.webp` | 12376594 | sistema de freios |
| `hero-oficina.webp` | 4488639 | bancada da oficina |
| `cambio-cutaway.webp` | 28721763 | corte de câmbio automático |
| `mecanica-geral.webp` | 7568413 | mecânica geral |

**São provisórias.** Assim que a Erica enviar as fotos da oficina, processe-as
com o comando acima e troque os imports em `src/data/heroSlides.ts` — nenhum
componente precisa mudar. Foto real da oficina converte melhor que banco de
imagem e ajuda no perfil do Google Business.
