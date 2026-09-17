// Config yang aman dipakai di client-side (tidak import googleapis)

export const BOOKING_CONFIG = {
  START_HOUR: 8,
  END_HOUR: 20,
  SLOT_DURATION: 1,
  MAX_DAYS_AHEAD: 30,
  CLOSED_DAYS: [0], // 0 = Minggu
};

export const SERVICES = [
  'Fotografi Wisuda',
  'Fotografi Event',
  'Videografi Sinematik',
  'Editing Video & Foto',
  'Web Development',
  'Konsultasi',
];
