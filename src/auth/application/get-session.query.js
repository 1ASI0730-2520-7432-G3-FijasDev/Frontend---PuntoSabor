export function getSessionQuery() {
    try { return JSON.parse(localStorage.getItem('ps-user') || 'null'); }
    catch { return null; }
}
