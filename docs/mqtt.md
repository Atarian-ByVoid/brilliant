<h1 style="font-family: 'Título';">Introdução ao MQTT, apresentando a fila de mensageria, Brilliant!</h1>
<div style="text-align: center;">
  <img src="https://mqtt.org/assets/img/mqtt-logo-ver.jpg" alt="Logo do projeto" style="margin: 0 auto;border-radius:10px; width:540px">
</div>

# MQTT

O MQTT (Message Queuing Telemetry Transport) é um protocolo de mensagens leve e eficiente projetado para comunicação entre dispositivos em redes com largura de banda limitada ou conexões instáveis. Ele opera no modelo de publicação/assinatura, onde os dispositivos podem publicar mensagens em tópicos específicos e se inscrever para receber mensagens de tópicos de seu interesse. O MQTT é amplamente utilizado em aplicações de IoT (Internet das Coisas) devido à sua simplicidade, baixo consumo de recursos e suporte a comunicação assíncrona.

## Como instalar o MQTT - LINUX

Você precisará instalar o Mosquitto, um software open source capaz de emular a conexão com o MQTT.

    sudo apt-get install mosquitto
    sudo apt-get install mosquitto-clients

Após a instalação, é necessário acessar os arquivos de configuração do Mosquitto e fazer a seguinte modificação em "computer/etc/mosquitto". Altere o arquivo "mosquitto.conf" para as seguintes configurações:

    allow_anonymous true
    listener 1883 0.0.0.0

### ATENÇÃO

Em alguns casos, o sistema operacional pode bloquear a porta do MQTT. Será necessário liberar a porta caso isso atrapalhe o processo de conexão.

    sudo iptables -F
    sudo iptables -X

Com o processo anterior finalizado, agora podemos abrir nossa fila de mensagens. Veja como é simples:

    mosquitto_sub -t "hello"

#### O comando acima serve para definir o tópico da mensagem ao qual desejamos nos inscrever.

Em outro terminal aberto, faremos um processo semelhante para definir a mensagem à qual nos inscreveremos e apontar o tópico a ela pertence:

    mosquitto_pub -m "Mensagem" -t "test"

## Extra

Você pode definir usuários privados para realizar as conexões através de uma senha. Para mais informações, consulte o link de um artigo do Medium usado como base neste tutorial:

###### Instalar MQTT-Broker no Linux (Debian /Ubuntu) [aqui](https://medium.com/tht-things-hackers-team/instalar-mqtt-broker-no-linux-debian-ubuntu-f8861da70ef6#:~:text=Instalando%20MQTT%20%E2%80%94%20Broker%2C%20%28Mosquitto%29%20O%20primeiro%20passo,sudo%20apt-get%20install%20mosquitto%20sudo%20apt-get%20install%20mosquitto-clients)
