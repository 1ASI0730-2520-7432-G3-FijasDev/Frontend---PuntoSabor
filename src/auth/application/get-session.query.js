// src/auth/application/get-session.query.js

const KEY = 'ps-session';
const LEGACY_KEY = 'ps-user';

/** Lee la sesión desde localStorage. Devuelve {role:string,...} o null */
export function getSession() {
    try {
        // prioridad a la clave nueva; si no existe, intenta con la antigua
        const raw = localStorage.getItem(KEY) ?? localStorage.getItem(LEGACY_KEY);
        if (!raw) return null;

        const data = JSON.parse(raw);
        if (data?.role) data.role = String(data.role).toLowerCase(); // normaliza
        return data;
    } catch {
        return null;
    }
}

/** Guarda/actualiza la sesión (usa la clave nueva) */
export function setSession(partial) {
    const prev = getSession() || {};
    const next = { ...prev, ...partial };
    localStorage.setItem(KEY, JSON.stringify(next));
    return next;
}

/** Borra la sesión (nueva y legacy) */
export function clearSession() {
    localStorage.removeItem(KEY);
    localStorage.removeItem(LEGACY_KEY);
}

// default opcional por si en algún sitio importas por defecto
export default { getSession, setSession, clearSession };
