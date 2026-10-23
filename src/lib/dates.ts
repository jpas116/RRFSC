export const today = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

export const fmt = (d: Date, opts: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' }) =>
  d.toLocaleDateString('en-US', { timeZone: 'UTC', ...opts });

export const fmtRange = (a: Date, b: Date) =>
  `${fmt(a)} to ${fmt(b, { month: 'long', day: 'numeric', year: 'numeric' })}`;

/** Simple markdown subset for YAML text fields: **bold** and [text](url). */
export const inline = (s: string) =>
  s
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
