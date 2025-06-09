# Nimbus Mobile App

Nossa solução para a Global Solution consiste em uma aplicação voltada para a previsão de possíveis desastres naturais, levando em consideração a localização do usuário.

A aplicação coleta dados atualizados da previsão do tempo e a posição geográfica do usuário, utilizando essas informações junto a um modelo de inteligência artificial para prever a chance de ocorrência de desastres naturais em sua região.

Com base nessa previsão, o sistema envia alertas classificados em três níveis: baixo, médio e grave — permitindo avisar cada pessoa com precisão e antecedência.

Além disso, o usuário poderá adicionar grupos de localização, como a casa de familiares, o local de trabalho ou outros pontos de interesse. Dessa forma, ele receberá alertas personalizados para essas regiões também, ajudando na prevenção e no planejamento diante de possíveis enchentes ou outros eventos climáticos extremos.

## Integrantes

- FELIPE RIBEIRO TARDOCHI DA SILVA - RM555100 - 2TDSPH
- GUSTAVO DIAS DA SILVA CRUZ - RM556448 - 2TDSPH
- JULIA MEDEIROS ANGELOZI – RM556364 - 2TDSPH

## Vídeo

https://youtu.be/ZOWYomjN8i4

## Sobre o Projeto

Este é um aplicativo móvel desenvolvido com React Native e Expo, focado em fornecer informações meteorológicas, alertas e funcionalidades relacionadas à localização do usuário.

## Tecnologias Utilizadas

- **React Native**: Framework para desenvolvimento de aplicativos móveis multiplataforma.
- **Expo**: Plataforma e conjunto de ferramentas para facilitar o desenvolvimento com React Native.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **React Navigation**: Para gerenciamento de navegação entre telas.
- **Axios**: Cliente HTTP para realizar requisições à API.
- **Expo Location**: Para acesso à localização do dispositivo.
- **AsyncStorage**: Para armazenamento de dados localmente no dispositivo.

## Estrutura do Projeto

A estrutura de pastas do projeto é organizada da seguinte forma:

-   `assets/`: Contém imagens e outros recursos estáticos.
-   `components/`: Componentes reutilizáveis da interface do usuário.
-   `pages/`: Telas principais da aplicação, cada uma com seus subcomponentes.
-   `Service/`: Lógica de serviços, como chamadas de API, gerenciamento de contexto e localização.
-   `styles/`: Estilos globais ou temas.
-   `util/`: Utilitários, como interfaces e tipos.

## Pré-requisitos

-   Node.js (versão LTS recomendada)
-   npm ou Yarn
-   Expo CLI: `npm install -g expo-cli`

## Instalação

1.  Clone o repositório:

2.  Navegue até o diretório do projeto:
    ```bash
    cd mobile
    ```
3.  Instale as dependências:
    ```bash
    npm install
    # ou
    yarn install
    ```

## Executando o Projeto

Para iniciar o ambiente de desenvolvimento Expo, execute um dos seguintes comandos:

-   **Iniciar o Metro Bundler e exibir opções:**
    ```bash
    npm run start
    # ou
    yarn start
    ```
    Isso abrirá o Expo Dev Tools no seu navegador, onde você pode escolher rodar o app em um emulador Android, simulador iOS ou no seu próprio dispositivo usando o app Expo Go.

-   **Rodar diretamente no Android (requer emulador ou dispositivo conectado):**
    ```bash
    npm run android
    # ou
    yarn android
    ```

-   **Rodar diretamente no iOS (requer macOS e simulador ou dispositivo conectado):**
    ```bash
    npm run ios
    # ou
    yarn ios
    ```

-   **Rodar a versão web (experimental):**
    ```bash
    npm run web
    # ou
    yarn web
    ```

## Scripts Disponíveis

No arquivo `package.json`, você encontrará os seguintes scripts:

-   `"start"`: Inicia o servidor de desenvolvimento Expo.
-   `"android"`: Inicia o aplicativo no Android.
-   `"ios"`: Inicia o aplicativo no iOS.
-   `"web"`: Inicia o aplicativo em um navegador web.
