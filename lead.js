// Recibe el lead de la landing y lo carga en la lista de Perfit.
// La API key NUNCA va en el HTML: vive en las variables de entorno de Vercel.
//
// Variables de entorno que tenés que cargar en Vercel (Settings → Environment Variables):
//   PERFIT_ACCOUNT   → el nombre de tu cuenta de Perfit (ej: veneciana)
//   PERFIT_API_KEY   → tu API key de Perfit
//   PERFIT_LIST_ID   → el número de la lista "acceso anticipado para cliente vips"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  body = body || {};

  const email = String(body.email || '').trim().toLowerCase();
  const nombre = String(body.nombre || '').trim().slice(0, 80);

  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ ok: false, error: 'invalid_email' });
  }

  const { PERFIT_ACCOUNT, PERFIT_API_KEY, PERFIT_LIST_ID } = process.env;
  if (!PERFIT_ACCOUNT || !PERFIT_API_KEY || !PERFIT_LIST_ID) {
    // Queda en los logs de Vercel para poder recuperar el lead a mano.
    console.error('LEAD_NO_GUARDADO (faltan variables de entorno)', JSON.stringify({ email, nombre }));
    return res.status(500).json({ ok: false, error: 'not_configured' });
  }

  const url = `https://api.myperfit.com/v2/${encodeURIComponent(PERFIT_ACCOUNT)}/lists/${encodeURIComponent(PERFIT_LIST_ID)}/contacts`;

  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PERFIT_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, firstName: nombre })
    });

    if (!r.ok) {
      const detail = await r.text().catch(() => '');
      console.error('LEAD_NO_GUARDADO (Perfit respondió ' + r.status + ')', JSON.stringify({ email, nombre }), detail.slice(0, 300));
      return res.status(502).json({ ok: false, error: 'perfit_error' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('LEAD_NO_GUARDADO (sin conexión con Perfit)', JSON.stringify({ email, nombre }), String(err));
    return res.status(502).json({ ok: false, error: 'perfit_unreachable' });
  }
}
