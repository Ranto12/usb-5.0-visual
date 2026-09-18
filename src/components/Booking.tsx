'use client';

import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { SERVICES } from '@/lib/bookingConfig';

interface TimeSlot {
  time: string;
  endTime: string;
  available: boolean;
}

type Step = 'calendar' | 'time' | 'form' | 'success';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDateID(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

function formatDateEN(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

// ─── Calendar ─────────────────────────────────────────────────────────────────

function Calendar({
  selectedDate,
  onSelect,
  language,
  bookingSettings,
}: {
  selectedDate: string;
  onSelect: (date: string) => void;
  language: string;
  bookingSettings: any;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + bookingSettings.max_days_ahead);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const monthNames_id = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  const monthNames_en = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const dayNames_id = ['Min','Sen','Sel','Rab','Kam','Jum','Sab'];
  const dayNames_en = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  const monthNames = language === 'id' ? monthNames_id : monthNames_en;
  const dayNames = language === 'id' ? dayNames_id : dayNames_en;

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const isDisabled = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    d.setHours(0, 0, 0, 0);
    if (d < today || d > maxDate) return true;
    return bookingSettings.closed_days.map(Number).includes(d.getDay());
  };

  const toDateStr = (day: number) =>
    `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
      {/* Month nav */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-slate-900 font-semibold text-sm">
          {monthNames[viewMonth]} {viewYear}
        </span>
        <button
          onClick={nextMonth}
          className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {dayNames.map((d) => (
          <div key={d} className="text-center text-slate-500 text-[0.6875rem] font-semibold py-1">{d}</div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dateStr = toDateStr(day);
          const disabled = isDisabled(day);
          const selected = dateStr === selectedDate;
          const isSunday = bookingSettings.closed_days.map(Number).includes(new Date(viewYear, viewMonth, day).getDay());

          return (
            <button
              key={day}
              disabled={disabled}
              onClick={() => onSelect(dateStr)}
              className={`
                h-9 rounded-lg text-sm font-medium transition-all duration-150
                ${selected ? 'bg-brand-accent text-white shadow-md shadow-blue-900/20 font-bold' : ''}
                ${!selected && !disabled ? 'text-slate-800 hover:bg-slate-100' : ''}
                ${disabled && !isSunday ? 'text-slate-400 cursor-not-allowed' : ''}
                ${isSunday ? 'text-brand-accent/40 cursor-not-allowed text-xs' : ''}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex items-center gap-3 text-xs text-stone-500">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-brand-accent inline-block" />
          {language === 'id' ? 'Dipilih' : 'Selected'}
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-slate-300 inline-block" />
          {language === 'id' ? 'Tidak tersedia' : 'Unavailable'}
        </span>
      </div>
    </div>
  );
}

// ─── Main Booking Component ───────────────────────────────────────────────────

export default function Booking({ bookingSettings }: { bookingSettings: any }) {
  const { language } = useLanguage();

  const [step, setStep] = useState<Step>('calendar');
  const [selectedDate, setSelectedDate] = useState('');
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [isClosed, setIsClosed] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successBooking, setSuccessBooking] = useState<{ id: string; waNumber?: string } | null>(null);

  const [form, setForm] = useState({
    name: '',
    whatsapp: '',
    email: '',
    service: '',
    notes: '',
  });

  const fetchSlots = useCallback(async (date: string) => {
    setLoadingSlots(true);
    setError('');
    setIsClosed(false);
    try {
      const res = await fetch(`/api/bookings/slots?date=${date}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setIsClosed(data.closed === true);
      setSlots(data.slots);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Gagal memuat slot');
      setSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  }, []);

  useEffect(() => {
    if (selectedDate) fetchSlots(selectedDate);
  }, [selectedDate, fetchSlots]);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedSlot('');
    setStep('time');
  };

  const handleSlotSelect = (time: string) => {
    setSelectedSlot(time);
    setStep('form');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: selectedDate,
          startTime: selectedSlot,
          ...form,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // Generate WA message
      const slot = slots.find((s) => s.time === selectedSlot);
      const waMsg = encodeURIComponent(
        `Halo USB-5.0 VISUALS! 👋\n\nSaya baru saja melakukan booking:\n\n` +
        `📋 ID: ${data.booking.id}\n` +
        `📅 Tanggal: ${language === 'id' ? formatDateID(selectedDate) : formatDateEN(selectedDate)}\n` +
        `⏰ Jam: ${selectedSlot}–${slot?.endTime}\n` +
        `🎯 Layanan: ${form.service}\n` +
        `👤 Nama: ${form.name}\n\n` +
        `Mohon konfirmasinya. Terima kasih! 🙏`
      );

      setSuccessBooking({ id: data.booking.id, waNumber: `6285840385667?text=${waMsg}` });
      setStep('success');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Gagal membuat booking');
      if ((e instanceof Error) && e.message.includes('sudah dibooking')) {
        fetchSlots(selectedDate);
        setStep('time');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setStep('calendar');
    setSelectedDate('');
    setSelectedSlot('');
    setSlots([]);
    setForm({ name: '', whatsapp: '', email: '', service: '', notes: '' });
    setError('');
    setSuccessBooking(null);
  };

  const t = {
    id: {
      title: 'Booking Jadwal',
      subtitle: 'Pilih tanggal dan waktu yang tersedia',
      step1: 'Pilih Tanggal',
      step2: 'Pilih Jam',
      step3: 'Isi Data',
      backToCalendar: '← Ganti Tanggal',
      backToSlots: '← Ganti Jam',
      available: 'tersedia',
      booked: 'penuh',
      closed: 'tutup',
      selectSlot: 'Pilih slot waktu untuk',
      noSlots: 'Tidak ada slot tersedia untuk hari ini (tutup)',
      formTitle: 'Detail Booking',
      name: 'Nama Lengkap *',
      whatsapp: 'Nomor WhatsApp *',
      email: 'Email (opsional)',
      service: 'Layanan *',
      notes: 'Catatan (opsional)',
      submit: 'Konfirmasi Booking',
      submitting: 'Memproses...',
      successTitle: 'Booking Berhasil! 🎉',
      successDesc: 'Booking kamu sudah kami terima. Klik tombol di bawah untuk konfirmasi via WhatsApp.',
      confirmWA: 'Konfirmasi via WhatsApp',
      bookingAnother: 'Booking Lagi',
      bookingId: 'ID Booking',
      selectServicePlaceholder: 'Pilih layanan',
    },
    en: {
      title: 'Book a Schedule',
      subtitle: 'Choose an available date and time',
      step1: 'Select Date',
      step2: 'Select Time',
      step3: 'Your Details',
      backToCalendar: '← Change Date',
      backToSlots: '← Change Time',
      available: 'available',
      booked: 'booked',
      closed: 'closed',
      selectSlot: 'Select a time slot for',
      noSlots: 'No slots available (closed)',
      formTitle: 'Booking Details',
      name: 'Full Name *',
      whatsapp: 'WhatsApp Number *',
      email: 'Email (optional)',
      service: 'Service *',
      notes: 'Notes (optional)',
      submit: 'Confirm Booking',
      submitting: 'Processing...',
      successTitle: 'Booking Confirmed! 🎉',
      successDesc: 'Your booking has been received. Click below to confirm via WhatsApp.',
      confirmWA: 'Confirm via WhatsApp',
      bookingAnother: 'Book Again',
      bookingId: 'Booking ID',
      selectServicePlaceholder: 'Select service',
    },
  };

  const txt = t[language as 'id' | 'en'] || t.id;

  // Step indicator
  const steps = [txt.step1, txt.step2, txt.step3];
  const currentStepIdx = step === 'calendar' ? 0 : step === 'time' ? 1 : step === 'form' ? 2 : 3;

  return (
    <section id="booking" className="section-padding bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3">
            — {language === 'id' ? 'Jadwalkan Sesi' : 'Schedule a Session'} —
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-3">{txt.title}</h2>
          <p className="text-slate-600">{txt.subtitle}</p>
        </div>

        {/* Step indicator */}
        {step !== 'success' && (
          <div className="flex items-center justify-center gap-2 mb-8">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  i === currentStepIdx
                    ? 'bg-brand-accent text-white shadow-sm'
                    : i < currentStepIdx
                    ? 'bg-brand-accent/15 text-brand-accent'
                    : 'bg-slate-100 text-slate-500 border border-slate-200'
                }`}>
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-xs ${
                    i < currentStepIdx ? 'bg-brand-accent text-white' : ''
                  }`}>
                    {i < currentStepIdx ? '✓' : i + 1}
                  </span>
                  {s}
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-6 h-px ${i < currentStepIdx ? 'bg-brand-accent' : 'bg-stone-200'}`} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-brand-accent-hover text-sm text-center">
            {error}
          </div>
        )}

        {/* ── STEP 1: Calendar ── */}
        {step === 'calendar' && (
          <Calendar selectedDate={selectedDate} onSelect={handleDateSelect} language={language} bookingSettings={bookingSettings} />
        )}

        {/* ── STEP 2: Time slots ── */}
        {step === 'time' && (
          <div>
            <button
              onClick={() => setStep('calendar')}
              className="text-brand-accent text-sm font-medium mb-4 hover:underline"
            >
              {txt.backToCalendar}
            </button>
            <div className="bg-brand-bone/50 rounded-2xl p-6 border border-slate-200 shadow-sm">
              <p className="text-slate-900 font-semibold mb-1 text-sm">
                {txt.selectSlot}
              </p>
              <p className="text-brand-accent font-bold text-lg mb-5">
                {language === 'id' ? formatDateID(selectedDate) : formatDateEN(selectedDate)}
              </p>

              {loadingSlots ? (
                <div className="flex items-center justify-center py-12">
                  <svg className="animate-spin w-8 h-8 text-brand-accent" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                </div>
              ) : isClosed ? (
                <div className="text-center py-8">
                  <p className="text-stone-600 text-sm">
                    {language === 'id' ? '🚫 Hari ini tutup (Minggu)' : '🚫 Closed (Sunday)'}
                  </p>
                  <button onClick={() => setStep('calendar')} className="mt-3 text-brand-accent text-sm hover:underline">
                    {txt.backToCalendar}
                  </button>
                </div>
              ) : slots.length === 0 ? (
                <p className="text-stone-500 text-center py-8">{txt.noSlots}</p>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {slots.map((slot) => (
                    <button
                      key={slot.time}
                      disabled={!slot.available}
                      onClick={() => slot.available && handleSlotSelect(slot.time)}
                      className={`
                        py-3 px-2 rounded-xl text-sm font-semibold text-center transition-all border
                        ${slot.available
                          ? 'bg-white border-slate-200 text-slate-800 hover:border-brand-accent hover:bg-brand-accent/5 hover:text-brand-accent cursor-pointer shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-500 cursor-not-allowed line-through'
                        }
                      `}
                    >
                      <div>{slot.time}</div>
                      <div className="text-xs mt-0.5 opacity-60">
                        {slot.available ? txt.available : txt.booked}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── STEP 3: Form ── */}
        {step === 'form' && (
          <div>
            <button
              onClick={() => setStep('time')}
              className="text-brand-accent text-sm font-medium mb-4 hover:underline"
            >
              {txt.backToSlots}
            </button>

            {/* Summary */}
            <div className="bg-brand-accent/10 border border-brand-accent/20 rounded-xl p-4 mb-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-accent/20 flex items-center justify-center text-brand-accent flex-shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-stone-900 font-bold text-sm">
                  {language === 'id' ? formatDateID(selectedDate) : formatDateEN(selectedDate)}
                </p>
                <p className="text-brand-accent text-sm font-semibold">
                  {selectedSlot} – {slots.find(s => s.time === selectedSlot)?.endTime}
                </p>
              </div>
            </div>

            <div className="bg-brand-bone/50 rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-slate-900 font-semibold mb-5">{txt.formTitle}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-600 text-overline uppercase tracking-wider mb-1.5">
                      {txt.name}
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder={language === 'id' ? 'Nama lengkap Anda' : 'Your full name'}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 text-overline uppercase tracking-wider mb-1.5">
                      {txt.whatsapp}
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.whatsapp}
                      onChange={(e) => setForm(f => ({ ...f, whatsapp: e.target.value }))}
                      placeholder="08xxxxxxxxxx"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-600 text-overline uppercase tracking-wider mb-1.5">
                      {txt.service}
                    </label>
                    <select
                      required
                      value={form.service}
                      onChange={(e) => setForm(f => ({ ...f, service: e.target.value }))}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors appearance-none"
                    >
                      <option value="">{txt.selectServicePlaceholder}</option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-600 text-overline uppercase tracking-wider mb-1.5">
                      {txt.email}
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="email@domain.com"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 text-overline uppercase tracking-wider mb-1.5">
                    {txt.notes}
                  </label>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={(e) => setForm(f => ({ ...f, notes: e.target.value }))}
                    placeholder={language === 'id' ? 'Ceritakan kebutuhan Anda...' : 'Tell us about your needs...'}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 bg-brand-accent hover:bg-brand-accent-hover disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl text-sm transition-all duration-200 shadow-md shadow-blue-900/20"
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      {txt.submitting}
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {txt.submit}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ── SUCCESS ── */}
        {step === 'success' && successBooking && (
          <div className="bg-white rounded-2xl p-8 border border-green-500/30 text-center shadow-lg">
            <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-slate-900 font-extrabold text-2xl tracking-tight mb-2">{txt.successTitle}</h3>
            <p className="text-slate-600 text-caption mb-2">{txt.successDesc}</p>
            <p className="text-slate-500 text-[0.6875rem] mb-6">
              {txt.bookingId}: <span className="text-brand-accent font-mono font-bold">{successBooking.id}</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`https://wa.me/${successBooking.waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-full text-sm transition-colors shadow-sm"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                {txt.confirmWA}
              </a>
              <button
                onClick={reset}
                className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 font-semibold px-6 py-3 rounded-full text-sm transition-colors"
              >
                {txt.bookingAnother}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
