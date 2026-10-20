# Landing Acceso VIP · Veneciana

Qué hay en la carpeta:

- `index.html`: la landing.
- `gracias.html`: la página de gracias, que queda en /gracias.
- `api/lead.js`: recibe cada lead y lo carga en tu lista de Perfit.
- `vercel.json` y `package.json`: configuración para Vercel. No los toques.

## 1. Datos de Perfit que necesitás

- **Nombre de cuenta**: es el que aparece en la dirección cuando entrás a Perfit.
- **API key**: se saca desde la configuración de tu cuenta de Perfit. Si no la encontrás, en la ayuda de Perfit está el artículo "Cómo obtener mi API key".
- **ID de la lista** "acceso anticipado para cliente vips": abrí la lista en Perfit. El número que aparece en la dirección es el ID.

## 2. Subirlo a Vercel

1. Creá una cuenta gratis en github.com y otra en vercel.com. Para Vercel podés entrar con la misma cuenta de GitHub.
2. En GitHub, creá un repositorio nuevo, por ejemplo `veneciana-acceso-vip`. Después tocá **"uploading an existing file"** y arrastrá todo el contenido de esta carpeta, incluida la carpeta `api`.
3. En Vercel, tocá **Add New → Project** y elegí ese repositorio.
4. Antes de tocar **Deploy**, abrí **Environment Variables** y cargá estas tres:
   - `PERFIT_ACCOUNT` = tu nombre de cuenta
   - `PERFIT_API_KEY` = tu API key
   - `PERFIT_LIST_ID` = el número de la lista
5. Tocá **Deploy**. Te da un link del estilo `veneciana-acceso-vip.vercel.app`.

## 3. Probalo antes de pautar

Anotate con tu propio mail y fijate si apareciste en la lista de Perfit.

Si un lead no se pudo guardar, la clienta llega igual a /gracias. Ese lead queda registrado en Vercel, en **Logs**, con la marca `LEAD_NO_GUARDADO`. Revisalos seguido, porque en el plan gratis se borran rápido.

## Para cambiar después

- **Hora de apertura**: buscá `OPEN_AT` en `index.html` y en `gracias.html`.
- **Links de WhatsApp**: buscá `[LINK-WHATSAPP]` en `index.html` y `[LINK-CANAL-WHATSAPP]` en `gracias.html`.
- **Fotos**: buscá `IMAGEN NUEVO INGRESO` en `index.html`.
- **Política de privacidad**: el link del pie va a `/politica-de-privacidad`. Cambialo por la página de política de tu tienda.

Para editar un archivo en GitHub, abrilo y tocá el lápiz. Vercel publica los cambios solo.
