module("Stomp Message");

test("Send and receive a message", function() {
  var body = Math.random();
  
  var client = Stomp.client(TEST.url);
  client.debug = TEST.debug;
  client.connect(TEST.login, TEST.password,
    function() {
      client.subscribe(TEST.destination, function(message)
      {
        start();
        equals(message.body, body);
        client.disconnect();
      });
      
      client.send(TEST.destination, {}, body);
    });
    stop(TEST.timeout);
});

test("Send and receive a message with a JSON body", function() {
  
  var client = Stomp.client(TEST.url);
  var payload = {text: "hello", bool: true, value: Math.random()};
  
  client.connect(TEST.login, TEST.password,
    function() {
      client.subscribe(TEST.destination, function(message)
      {
        start();
        var res = JSON.parse(message.body);
        equals(res.text, payload.text);
        equals(res.bool, payload.bool);
        equals(res.value, payload.value);
        client.disconnect();
      });
      
      client.send(TEST.destination, {}, JSON.stringify(payload));
    });
    stop(TEST.timeout);
});

test("Send and receive a message with a UTF-8 JSON body", function() {

    var client = Stomp.client(TEST.url);
    var payload = {text: "\u0050 \u00E4 \u0496 \u09a8 \u1C4F \uD7A3 \uD800\uDD28", bool: true, value: Math.random()};

    client.connect(TEST.login, TEST.password,
        function() {
            client.subscribe(TEST.destination, function(message)
            {
                start();
                var res = JSON.parse(message.body);
                equals(res.text, payload.text);
                equals(res.bool, payload.bool);
                equals(res.value, payload.value);
                client.disconnect();
            });

            client.send(TEST.destination, {}, JSON.stringify(payload));
        });
    stop(TEST.timeout);
});