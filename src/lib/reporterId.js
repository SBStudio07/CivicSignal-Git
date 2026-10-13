const KEY = 'civicsignal.reporter';

/**
 * Anonymous, stable per-browser id sent with each report so the backend can
 * count independent reporters. It is a spam-friction signal, not identity.
 */
export function getReporterId() {
  try {
    let id = localStorage.getItem(KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(KEY, id);
    }
    return id;
  } catch {
    return crypto.randomUUID();
  }
}
