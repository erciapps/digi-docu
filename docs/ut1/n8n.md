---
sidebar_position: 3
---
# Ejemplo Formularios con n8n

## Enunciado
### En el IES Alonso de Ercilla, las incidencias de las aulas se registran en formularios en papel. Con el fin de agilizar su gestión, se plantea la digitalización de estos documentos mediante OCR, permitiendo que la información llegue de forma automática a un sistema digital de control de incidencias.

## Ejemplo de formularios
<figure>
  <img src="/img/n8n/i0.png" alt="img0" width="200" />
</figure>
<figure>
  <img src="/img/n8n/i2.png" alt="img0" width="200" />
</figure>
<figure>
  <img src="/img/n8n/i3.png" alt="img0" width="200" />
</figure>
<figure>
  <img src="/img/n8n/i4.png" alt="img0" width="200" />
</figure>
<figure>
  <img src="/img/n8n/i5.png" alt="img0" width="200" />
</figure>


## SECUENCIA DE DATOS
<figure>
  <img src="/img/n8n/formulario.png" alt="formulario" width="800" />
</figure>


## CÓDIGO BASE PARA EL PROGRAMA
1. Crea un nuevo proyecto llamado `Incidencias` desde el IDE IntelliJ IDEA en Maven.
2. Añade las siguientes dependencias en el archivo `pom.xml`: 
      
**OkHttp (para las peticiones HTTP)**
```xml
<dependency>
    <groupId>com.squareup.okhttp3</groupId>
    <artifactId>okhttp</artifactId>
    <version>4.12.0</version>
</dependency>
```

**org.json (para parsear y construir JSON)**

```xml
<dependency>
  <groupId>org.json</groupId>
  <artifactId>json</artifactId>
  <version>20231013</version>
</dependency>

```
:::warning ATENCIÓN
1. Al poner las dependencias deben ir en el nodo `<dependencies></dependencies>` (añádelo si no está).
2. Despues de poner las dependencias en necesario sincronizar `maven` (icono 🔄️)
:::

1. Crea la clase `Formulario.java` y pega el siguiente método `main`:

```java
public static void main(String[] args) throws Exception {
        OkHttpClient client = new OkHttpClient();

        // 1. Ruta de la imagen en disco
        Path imagen = Path.of("ruta a la imagen");

        // 2. Convertir la imagen a Base64 y prepararla para OCR.space
        String base64 = Base64.getEncoder()
                .encodeToString(Files.readAllBytes(imagen))
                .replaceAll("\\r|\\n", ""); // limpiar saltos de línea
        String base64Image = "data:image/png;base64," + base64;
        String encodedImage = URLEncoder.encode(base64Image, StandardCharsets.UTF_8);

        // 3. Construir el cuerpo del POST para OCR.space
        String body = "apikey=APIKEY"
                + "&language=spa"
                + "&OCREngine=2"
                + "&isOverlayRequired=true"
                + "&scale=true"
                + "&base64Image=" + encodedImage;

        // 4. Crear la petición HTTP a OCR.space
        Request request = new Request.Builder()
                .url("https://api.ocr.space/parse/image")
                .post(RequestBody.create(body, MediaType.parse("application/x-www-form-urlencoded")))
                .build();

        // 5. Ejecutar la petición y obtener la respuesta
        try (Response response = client.newCall(request).execute()) {
            String responseBody = response.body().string();
            System.out.println("Respuesta OCR: " + responseBody);

            // 6. Parsear JSON con el texto reconocido
            JSONObject json = new JSONObject(responseBody);
            JSONArray results = json.getJSONArray("ParsedResults");

        }
    }
```
4. Entra en [https://api.ocr.space](https://api.ocr.space) y obtén un código de **APIKEY**
5. Sustituye la ruta de la imagen por la tuya (descarga las del ejemplo), y la APIKEY
   
:::warning ATENCIÓN
El tamaño máximo de la imagen debe ser de 1mb y en formano `.png`
:::