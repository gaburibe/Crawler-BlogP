# Crawler-BlogP
 Crawler para la versión estenográfica de presidencia

# Instalación:

 1-Verificar que exista una carpeta llamada "BLOG_P", ahi residen los artículos. Los scripts necesarios son index.js y blog_p.js. una vez estos elementos presentes se corre el comando "npm init" en el directorio seguido de "npm install".

 2-Una vez hecho esto solo falta correr "index.js" que hará una búsqueda dentro de la página más reciente que es es siempre: "https://www.gob.mx/presidencia/es/archivo/articulos?idiom=es&order=DESC&page=1" y guardará los resultados.

 Si alguna entrada ya se había bajado solo se reescribe con el mismo título (el título es la variable única con la que se guardan los archivos), si se corre diario nos asegura las entradas necesarias completas.


# Bajar fechas específicas:

Para agregar fechas pasadas que pueden faltar hay que modificar el primer parametro de la función "BlogP.enlist" en el archivo index. Por default está en "1" que es la página más reciente, pero se puede buscar en la página que contiene la información faltante y el programa bajara toda la información contenida en dicha página.