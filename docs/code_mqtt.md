# Tutorial: Comunicação MQTT com ESP8266

Este tutorial guiará você na implementação de um código para comunicação MQTT utilizando um módulo ESP8266. O código irá se conectar a uma rede Wi-Fi, estabelecer uma conexão MQTT, e enviar mensagens periódicas para um tópico MQTT.

## Pré-requisitos

- Módulo ESP8266
- Ambiente de desenvolvimento Arduino IDE
- Conhecimento básico de MQTT

## Passo 1: Configuração do Ambiente

Certifique-se de ter o ambiente de desenvolvimento Arduino IDE configurado corretamente. Se ainda não tiver, siga as instruções na [documentação oficial do Arduino](https://www.arduino.cc/en/Guide/HomePage).

## Passo 2: Instalação de Bibliotecas

O código utiliza as bibliotecas `ESP8266WiFi` e `PubSubClient`. Certifique-se de que elas estão instaladas. Se não estiverem, você pode instalá-las através do Arduino IDE, indo para **Sketch > Incluir Biblioteca > Gerenciar Bibliotecas...** e procurando pelos nomes das bibliotecas.

## Passo 3: Configuração das Credenciais e Parâmetros MQTT

No código, substitua as seguintes variáveis com suas próprias configurações:

- `ssid`: Nome da sua rede Wi-Fi.
- `password`: Senha da sua rede Wi-Fi.
- `mqtt_server`: Endereço IP do seu servidor MQTT.
- `mqtt_topic`: Tópico MQTT para enviar mensagens.

## Passo 4: Upload do Código para o ESP8266

Conecte o módulo ESP8266 ao seu computador e selecione o tipo de placa correta no Arduino IDE. Em seguida, faça o upload do código para o módulo:

     LOLIN(WebMos) D1 R1

## Passo 5: Observação das Mensagens

Abra a porta serial no Arduino IDE para observar as mensagens de depuração. Certifique-se de que o módulo ESP8266 está se conectando à rede Wi-Fi e ao servidor MQTT.

## Link do repositório no GitHub:

[Projeto ESP-32](https://github.com/Atarian-ByVoid/ESP-32-Brlliant-).

## Conclusão

Se tudo foi configurado corretamente, o ESP8266 deve se conectar à rede Wi-Fi, ao servidor MQTT, e enviar mensagens periódicas para o tópico especificado.

Lembre-se de ajustar o código conforme necessário para atender às suas necessidades específicas. Para obter mais informações sobre a biblioteca PubSubClient, consulte a [documentação oficial](https://pubsubclient.knolleary.net/).

Parabéns! Você concluiu o tutorial de comunicação MQTT com ESP8266.
