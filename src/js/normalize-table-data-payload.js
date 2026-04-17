const isPlainObject = (value) =>
  value != null && typeof value === 'object' && !Array.isArray(value);

const buildEmptyTablePayload = () => ({
  id: '',
  th: [],
  rows: [],
  avatars: {},
});

/**
 * Shapes persisted or API-mapped table payloads for the app shell and AvoTable.
 * Call once after fetch/localStorage or mapper output.
 *
 * @param {unknown} raw
 * @returns {{ id: string, th: unknown[], rows: unknown[], avatars: Record<string, unknown>, percent?: number, legend?: unknown[] }}
 */
const normalizeTableDataPayload = (raw) => {
  if (raw == null || typeof raw !== 'object' || Array.isArray(raw)) {
    return buildEmptyTablePayload();
  }

  const id = typeof raw.id === 'string' ? raw.id : '';
  const th = Array.isArray(raw.th) ? raw.th : [];
  const rows = Array.isArray(raw.rows) ? raw.rows : [];
  const avatars = isPlainObject(raw.avatars) ? raw.avatars : {};

  const payload = { id, th, rows, avatars };

  if (typeof raw.percent === 'number' && !Number.isNaN(raw.percent)) {
    payload.percent = raw.percent;
  }

  if (Array.isArray(raw.legend) && raw.legend.length > 0) {
    payload.legend = [...raw.legend];
  }

  return payload;
};

export default normalizeTableDataPayload;
