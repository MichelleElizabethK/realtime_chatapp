window.onload = function () {
  var host = window.location.host;
  
  // Build a system
  SwaggerUIBundle({
    url: "http://" + host + "/api-docs.json",
    validatorUrl : '',
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  });
};
