# DShop-Frontend con Angular 17

<h4>Dshop es una aplicación de e-commerce realizada íntegramente por mi (Daniel Ayanian), con el objetivo de que los recruiters puedan comprobar mi nivel de
conocimientos de Full Stack. Esta aplicación fue realizada entre finales de 2023 y principios de 2024, con las últimas tecnologías y versiones existentes a la fecha.</h4> 

---

__Tecnologías utilizadas:__ Angular 17, HTML5, CSS3, JavaScript (TypeScript), Bootstrap 5.3.2, Sweetalert2, Java 18, SpringBoot 3.2, Spring Security 6, Spring Data JPA y MySQL 8.


---

__Descripción de la aplicación DShop:__

DShop es una tienda virtual o e-commerce para la venta de productos de vestimenta masculina. La misma cuenta con un registro de usuario y un login, para los cuales te utilizó
Spring Security 6. Los passwords se almacenan encriptados en una Base de Datos MySQL 8, y los endpoints de los controllers de SpringBoot 3.2 que necesitan solo poder accedidos por
usuarios logueados con ciertos roles (ADMIN o USER) se encuentran protegidos al acceso público. Los usuarios pueden ver listados de productos marcados como destacados, o como ofertas.
Además, pueden ver listados productos de una categoría específica, como ser remeras, pantalones, buzos, camperas o medias. Tmabién, los usuarios pueden hacer búsquedas de productos ingresando ciertas palabras en un cuadro destinado para tal fin, cuyos resultados están ordenados de más a menos relevante. Un usuario podrá hacer una compra de un producto directamente, o agregar varios productos en un carrito de compras, y pagar todo junto cuando lo desee. Además, puede seleccionar la cantidad de unidades que desea comprar de cada producto, siempre y cuando no se exceda en el stock disponible de dicho producto. El usuario podrá ver los datos de su perfil y editarlos cuando lo desee. También podrá ver un listado de todo su historial de compras realizadas en la tienda. La tienda cuenta además con una ventana modal con preguntas frecuentes y con un chatBot con IA. Por último, el usuario podrá aplicar un filtro en cualquiera de los listados de productos indicando el precio máximo de todos los productos a mostrar.

------------

__Cómo probar la aplicación DShop en tu equipo:__

Clona el repositorio del frontend o descarga el zip del mismo, descomprímelo en una carpeta y ejecuta dentro de la misma lo siguiente:
<br>
ng serve -o
<br>
Se abrirá el frontend automáticamente en tu navegador, con la dirección "localhost:4200".

[Link al Frontend](https://github.com/danielayanian/DShop-Frontend/ "Link al Frontend")

Clona el repositorio del backend o descarga el zip del mismo, descomprímelo en una carpeta e impórtalo en tu IDE favorito, como por ejemplo Spring Tool Suite 4. Una vez importado, ponlo en ejecución. El mismo quedará corriendo en "localhost:3030", aunque puedes cambiar el puerto en el archivo application.properties.

[Link al Backend](https://github.com/danielayanian/DShop-Backend/ "Link al Backend")

Debes además tener corriendo en tu equipo MySQL, y cuando el backend se ejecute por primera vez se creará la base de datos si no existe, las tablas correspondientes, y se cargarán algunos registros iniciales en las mismas. Todo esto se realizará utilizando Spring Data JPA.



------------

__Captura de pantalla de la aplicación DShop:__

<p align="center">
<image src="/captura.jpg" alt="Captura de Pantalla" width="70%">
</image>
</p>


----

__Videos de la App:__

[[Video del funcionamiento de la App]](https://www.youtube.com/watch?v=ayL5fwCMq5Y&ab_channel=DanielAyanian)
<br><br>
[[Video del funcionamiento Responsive de la App]](https://www.youtube.com/watch?v=so6rABXrgnk&ab_channel=DanielAyanian)
<br><br>
[[Video de la estructura del frontend de la App]](https://www.youtube.com/watch?v=Qu2LwlMTeTU&ab_channel=DanielAyanian)
<br><br>
[[Video de la estructura del backend de la App]](https://www.youtube.com/watch?v=4GIF9WMgzos&ab_channel=DanielAyanian)
<br><br>
[[Video del funcionamiento de Spring Security visto desde el frontend]](https://www.youtube.com/watch?v=6TjhXdmpZqU&ab_channel=DanielAyanian)
<br><br>
[[Video del funcionamiento de Spring Security visto desde el backend]](https://www.youtube.com/watch?v=d0e-gps367s&ab_channel=DanielAyanian)
<br>

----
