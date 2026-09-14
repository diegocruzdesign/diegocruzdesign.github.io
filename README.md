# Portafolio local · Diego Cruz

## Abrir

Necesitas Node.js 18 o posterior. Desde esta carpeta:

```sh
npm start
```

Visita http://localhost:4173. El servidor escucha exclusivamente en `127.0.0.1`. No hay dependencias npm ni analítica. Para detenerlo, pulsa Ctrl+C en la terminal.

## GitHub Pages

El flujo `.github/workflows/pages.yml` publica automáticamente cada push a `main`. En el repositorio, selecciona **Settings → Pages → Source → GitHub Actions**. También se puede ejecutar desde la pestaña Actions.

`npm run build` genera `dist/` con el HTML, módulos y recursos públicos. La variable `BASE_PATH` permite servirlo en una subcarpeta (por ejemplo, `/portafolio/`); el flujo obtiene esta ruta de GitHub Pages. No modifica las rutas del servidor local.

`Llaves/` contiene originales y está excluida de Git y del sitio. `dist/` se genera en cada publicación y no se versiona. Las notas Markdown dentro de los recursos tampoco se publican.

## Navegación

La única forma de cambiar de exposición es arrastrar una llave y soltarla en la cerradura. Los clics sobre las llaves y el hueco no navegan. Para volver al perfil, arrastra su llave al hueco. Al cargar o recargar se abre el perfil; no hay rutas por hash ni enlaces entre exposiciones.

La Cornetería incluye un selector de versiones del logotipo y ampliación de aplicaciones. Escape cierra las imágenes. Se respetan las preferencias de movimiento reducido.

## Estructura

- `src/app.js`: navegación, arrastre con ratón/táctil y visor compartido.
- `src/registry.js`: registro de llaves con identificador, color, icono y carga del módulo.
- `src/styles.css` y `src/ui.css`: base y barra compartida.
- `src/pages/profile/`: presentación profesional, estilos y contenido del CV.
- `src/pages/dentalmas/`: exposición de contenido para redes de Dental Más; ocho publicaciones filtrables y dos historias, con visor compartido. Recursos seleccionados de `Llaves/DentalMas/Renders`, sin modificar originales. Su llave y su tarjeta rotativa usan el rojo #D61017 extraído del isotipo y la versión blanca de la marca.
- `src/pages/corneteria/`: exposición y estilos de La Cornetería, independientes del perfil.
- `src/pages/calmeh/`: exposición independiente de Cal.Meh, con sus tipografías, nombre, símbolos, patrón y aplicaciones. Los recursos seleccionados están en `public/assets/calmeh/`; los dos patrones y sus variantes de contraste proceden de `Llaves/Cal.Meh/Renders/Patron_*.png`.
- `public/assets/`: CV y copias WebP optimizadas de una selección de recursos.
- `Llaves/`: materiales originales, conservados sin modificaciones y no servidos por el servidor local.

## Agregar una llave

La quinta tarjeta del perfil alterna automáticamente cada cuatro segundos entre las llaves de proyectos. En cada entrada del registro, `preview: { background: '#color', logo: '/assets/marca/logo.webp' }` define su fondo y la versión del logotipo. Si se omite, se utiliza el color y el icono de la llave. El perfil se excluye de la rotación.

1. Crea `src/pages/nombre/index.js` con `export function render()` que devuelva HTML. Opcionalmente exporta `mount(root)` para interacciones; devuelve una función de limpieza si usas listeners o temporizadores.
2. Crea `src/pages/nombre/style.css`. Limita los selectores al contenedor de esa exposición y define las variables globales bajo `body[data-theme=nombre]`.
3. Añade su CSS a `index.html`.
4. Añade a `src/registry.js` una entrada con `id`, `label`, `number`, `color`, `icon` y `load: () => import('./pages/nombre/index.js')`. La barra reserva el lado izquierdo para el perfil y reúne las llaves de proyectos a la derecha. Al crecer la colección, ajusta el ancho o incorpora desplazamiento a `.key-rack` en `src/ui.css`.
5. Guarda los recursos seleccionados en `public/assets/nombre/`.

## Fuentes y decisiones

El perfil se basa en el CV proporcionado; se han resumido los cargos y eliminado la mención duplicada de Illustrator. Los monogramas de Adobe y los pictogramas vectoriales de herramientas se presentan en monocromo para mantener la paleta del perfil. El segundo módulo de presentación utiliza el retrato suministrado en `Llaves/DiegoCruz/FDP_1_BN.png`.

La Cornetería toma el isologo y los colores `#531A13`, `#FDA10D`, `#1A0D16` y `#E5E6F1` del manual original. Usa únicamente el producto, el carrito, la tote bag y variantes de marca seleccionadas. La tipografía web utiliza fuentes del sistema: no se suministraron archivos de las tipografías indicadas en el manual (Forager y Owners).


## Inicio y llaves (actualización)

El inicio activo es `src/pages/home/`, con los fondos alineados de `Llaves/Inicio` y la fuente Nultien. El color se revela dentro de un círculo que sigue el puntero; la frase se escribe tras un segundo y no se repite al volver durante la sesión. Al bajar aparecen solo los contactos del CV.

El registro contiene únicamente las tres llaves de proyectos. El botón real se mueve a la cerradura al insertarse; su hueco de origen queda señalado. Devolverlo a ese hueco abre el inicio. Insertar otra llave devuelve automáticamente la anterior a su lugar. Un arrastre cancelado o soltado fuera de destino no cambia de página. No hay llave de perfil. Los archivos antiguos de perfil quedan sin enlazar.
