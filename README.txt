--------------------------------Clonacion del repositorio---------------------------------------------------------------------------------
git clone https://github.com/AaronSanchezArguedas/implementacion-y-consumo-de-api-rest-con-next.js.git
cd implementacion-y-consumo-de-api-rest-con-next.js




--------------------------------Indicaciones que se siguieron para la creación del proyecto-----------------------------------------------

Creación del proyecto: npx create-next-app .

    √ Would you like to use TypeScript? ...Yes
    √ Would you like to use ESLint? ... Yes
    √ Would you like to use Tailwind CSS? ... No
    √ Would you like your code inside a `src/` directory? ... Yes
    √ Would you like to use App Router? (recommended) ... Yes
    √ Would you like to use Turbopack for `next dev`? ... Yes
    √ Would you like to customize the import alias (`@/*` by default)? ... No

Instalar Bootstrap en la carpeta raíz (en la carpeta my-app): npm install bootstrap react-bootstrap
Instalar íconos: npm install react-icons



--------------------------------Comandos disponibles----------------------------------------------------------------------------------------
Una vez clonado el repositorio, se deben:

Instalar dependencias: npm install
ejecutar el proyecto: npm run dev



--------------------------------Decisiones técnicas--------------------------------------------------------------------------------------

Para este caso se generaron tres archivos principales: 
    -api.ts: En este archivo se utiliza el fetch para realizar la conexión a la api de JsonPlaceholder
    con los métodos: Get(Obtener datos), Post(Crar elemento), Patch(Actualizar parcialmente un elemento)

    -_app: Se configura la personalizacion general de todas las páginas, integrando un global.css con un tema
    prediseñado de bootstrap.

    -index.tsx: En este archivo se realizan los métodos y objetos necesarios para conectar a su vez con los servicios de api.ts,
    además, se renderizan los componentes gráficos que permiten utilizar la página de manera intuitiva. Dado que solamente
    se preteden usar los datos específicos de JsonPlaceholder, se carga todo en una sola página. Además, si se agregan nuevos elementos
    se muestran al inicio de la página para facilitar la visualización de la funcionalidad.  

En cuanto a las tecnologías utilizadas, se optó por diseñar el proyecto con Next.js (como se solicitaba).
integrando TypeScript para codificar con el uso de fetch para realizar la conexión con la api
y Bootstrap para la gestión de estilos y la configuración responsive de la página web.




--------------------------------Mejoras propuestas----------------------------------------------------------------------------------------


En general, para evaluar las habilidades para trabajar con apis, la propuesta está, muy bien, sin embargo;
en un entorno de producción con grandes volúmenes de datos, la aplicación no es eficiente, debido a que se
están extrayendo todos los datos disponibles y se muestran en una sola página.
Ahora, en un escenario real, se deberían implementar herramientas que permitan el filtrado, búsqueda y orden
de los elementos, según sea necesario. También se podría implementar una manera de extraer cierta cantidad de datos (lazy loading)
que se muestren en cada página para facilitar la visualización y optimizar los recursos utilizados.



--------------------------------Instrucciones para ejecutar la aplicación Docker-----------------------------------------------------------
Construir imagen: docker-compose build
Iniciar contenedor: docker-compose up -d
Acceder a la aplicación: http://localhost:3000



¡Cualquier situación, no dude en contactarme!
¡Gracias!

