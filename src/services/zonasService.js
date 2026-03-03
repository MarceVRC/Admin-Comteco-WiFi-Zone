
export const verificarImagen = (url) =>
  new Promise((resolve) => {
    if (!url) return resolve(null);
    const img = new Image();
    img.onload = () => resolve(url);
    img.onerror = () => resolve(null);
    img.src = url;
  });

export const normalizarZona = (z) => ({
  ...z,
  position: z.position || (z.lat != null && z.lng != null ? [z.lat, z.lng] : null),
});

export const obtenerZonas = async (apiUrl) => {
  const res = await fetch(apiUrl);
  if (!res.ok) throw new Error(res.statusText || res.status);
  const data = await res.json();
  if (data.ok && Array.isArray(data.zonas)) {
    const checked = await Promise.all(
      data.zonas.map(async (z) => {
        const validFoto = await verificarImagen(z.foto);
        return normalizarZona({ ...z, foto: validFoto });
      })
    );
    return checked;
  }
  return [];
};

export const crearZona = async (apiUrl, payload) => {
  const res = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(res.statusText || res.status);
  return res.json();
};

export const actualizarZona = async (apiUrl, id, payload) => {
  const res = await fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(res.statusText || res.status);
  return res.json();
};

export const eliminarZona = async (apiUrl, id) => {
  const res = await fetch(`${apiUrl}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(res.statusText || res.status);
  return res.json();
};
