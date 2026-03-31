'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  Calculator,
  ChevronDown,
  CircleAlert,
  FileText,
  Paperclip,
  SendHorizonal,
  SlidersHorizontal,
  Upload,
  X,
} from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { RUSSIA_CITIES, type RussiaCity } from '@/content/cities';

type RequestMode = 'request' | 'send';
type BodyType = 'tent' | 'curtain' | 'isotherm' | 'reefer' | 'adr';
type UrgencyType = 'standard' | 'urgent';
type TempMode = 'normal' | 'temp';
type InsuranceType = 'basic' | 'extended';
type LoadingType = 'rear' | 'side' | 'top';

const BODY_OPTIONS: Array<{ value: BodyType; label: string }> = [
  { value: 'tent', label: 'Тент' },
  { value: 'curtain', label: 'Штора' },
  { value: 'isotherm', label: 'Изотерм' },
  { value: 'reefer', label: 'Рефрижератор' },
  { value: 'adr', label: 'ADR / спец.' },
];

const URGENCY_OPTIONS: Array<{ value: UrgencyType; label: string }> = [
  { value: 'standard', label: 'Стандарт' },
  { value: 'urgent', label: 'Срочно' },
];

const TEMP_OPTIONS: Array<{ value: TempMode; label: string }> = [
  { value: 'normal', label: 'Обычный режим' },
  { value: 'temp', label: 'Температурный режим' },
];

const LOADING_OPTIONS: Array<{ value: LoadingType; label: string }> = [
  { value: 'rear', label: 'Задняя' },
  { value: 'side', label: 'Боковая' },
  { value: 'top', label: 'Верхняя' },
];

const INSURANCE_OPTIONS: Array<{ value: InsuranceType; label: string }> = [
  { value: 'basic', label: 'Стандартное' },
  { value: 'extended', label: 'Расширенное' },
];

function cityValueByLabel(label: string) {
  const found = RUSSIA_CITIES.find(
    (city) => city.label.toLowerCase() === label.trim().toLowerCase()
  );
  return found?.value ?? '';
}

export default function RequestPageClient() {
  const searchParams =
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams();

  const initialData = {
    from: searchParams.get('from') ?? '',
    to: searchParams.get('to') ?? '',
    distance: searchParams.get('distance') ?? '',
    body: searchParams.get('body') ?? '',
    weight: searchParams.get('weight') ?? '',
    volume: searchParams.get('volume') ?? '',
    pallets: searchParams.get('pallets') ?? '',
    points: searchParams.get('points') ?? '',
    urgency: searchParams.get('urgency') ?? '',
    temp: searchParams.get('temp') ?? '',
    loading: searchParams.get('loading') ?? '',
    insurance: searchParams.get('insurance') ?? '',
    result: searchParams.get('result') ?? '',
    comment: searchParams.get('comment') ?? '',
  };

  const [mode, setMode] = useState<RequestMode>('request');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [company, setCompany] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [cargoType, setCargoType] = useState('');
  const [shortComment, setShortComment] = useState(initialData.comment);

  const [fromCity, setFromCity] = useState(cityValueByLabel(initialData.from));
  const [toCity, setToCity] = useState(cityValueByLabel(initialData.to));
  const [bodyType, setBodyType] = useState<BodyType>('tent');
  const [extraPoints, setExtraPoints] = useState<number>(
    Number(initialData.points || 0)
  );

  const [weightTons, setWeightTons] = useState<number>(
    Number(initialData.weight || 20)
  );
  const [volumeM3, setVolumeM3] = useState<number>(
    Number(initialData.volume || 82)
  );
  const [pallets, setPallets] = useState<number>(
    Number(initialData.pallets || 33)
  );
  const [urgency, setUrgency] = useState<UrgencyType>('standard');
  const [tempMode, setTempMode] = useState<TempMode>('normal');
  const [loadingType, setLoadingType] = useState<LoadingType>('rear');
  const [insurance, setInsurance] = useState<InsuranceType>('basic');
  const [details, setDetails] = useState(initialData.comment);
  const [files, setFiles] = useState<File[]>([]);

  const fromCityObj = useMemo(
    () => RUSSIA_CITIES.find((city) => city.value === fromCity),
    [fromCity]
  );
  const toCityObj = useMemo(
    () => RUSSIA_CITIES.find((city) => city.value === toCity),
    [toCity]
  );

  const routeLabel = `${fromCityObj?.label || initialData.from || '—'} → ${
    toCityObj?.label || initialData.to || '—'
  }`;

  const canAttachFiles = mode === 'send';

  function handleFileSelect(nextFiles: FileList | null) {
    if (!nextFiles) return;

    const allowedExt = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt'];
    const maxFiles = 5;

    const prepared = Array.from(nextFiles).filter((file) => {
      const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
      return allowedExt.includes(ext);
    });

    setFiles((prev) => [...prev, ...prepared].slice(0, maxFiles));
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <>
      <section className="pb-6 pt-8 md:pb-8 md:pt-10 xl:pb-8 xl:pt-12">
        <Container>
          <div className="px-[10px] md:px-[14px] xl:px-[16px]">
            <div className="flex items-center justify-between gap-6">
              <h1 className="font-heading text-[42px] leading-[0.98] tracking-[-0.04em] text-[var(--text)] xl:text-[46px]">
                Запрос / коммерческое предложение
              </h1>

              <div className="flex items-center gap-3">
                <Link
                  href="/calculator"
                  className="inline-flex h-[42px] items-center rounded-[16px] bg-[#26292e] px-[16px] text-[14px] font-semibold lowercase tracking-[-0.02em] text-white shadow-[0_8px_20px_rgba(38,41,46,0.08)]"
                  style={{ fontFamily: 'var(--font-body-text)' }}
                >
                  <ArrowLeft size={15} className="mr-2 text-white" />
                  вернуться
                </Link>

                <div className="inline-flex h-[42px] items-center rounded-[16px] bg-[var(--surface)] px-[16px] shadow-[0_8px_20px_rgba(38,41,46,0.04)]">
                  <span
                    className="text-[14px] font-semibold lowercase tracking-[-0.02em] text-[var(--text)]"
                    style={{ fontFamily: 'var(--font-body-text)' }}
                  >
                    запрос · отправка КП
                  </span>
                </div>
              </div>
            </div>

            <p
              className="mt-10 max-w-[820px] text-[19px] font-normal leading-[1.32] tracking-[-0.018em] text-[var(--muted)]"
              style={{ fontFamily: 'var(--font-body-text)' }}
            >
              Выберите нужный сценарий: запросить коммерческое предложение или
              отправить своё КП. Основные параметры можно заполнить сразу, а
              дополнительные — открыть в расширенной панели.
            </p>
          </div>
        </Container>
      </section>

      <section className="pb-8 pt-0 md:pb-10 xl:pb-10">
        <Container>
          <div className="px-[10px] md:px-[14px] xl:px-[16px]">
            <div className="rounded-[30px] bg-[var(--surface)] p-4 shadow-[var(--shadow-soft)]">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <FileText size={20} strokeWidth={2} className="text-[var(--accent-1)]" />
                  <h2 className="font-heading text-[28px] leading-[0.98] tracking-[-0.03em] text-[var(--text)]">
                    Параметры запроса
                  </h2>
                </div>

                <div className="grid max-w-[390px] grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setMode('request')}
                    className={modeButtonClass(mode === 'request')}
                  >
                    запросить КП
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('send')}
                    className={modeButtonClass(mode === 'send')}
                  >
                    отправить КП
                  </button>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-[1fr_1fr_0.9fr_0.7fr_auto] gap-3">
                <CitySegment
                  label="откуда"
                  value={fromCity}
                  onChange={setFromCity}
                  placeholder="Выберите город"
                />
                <CitySegment
                  label="куда"
                  value={toCity}
                  onChange={setToCity}
                  placeholder="Выберите город"
                />
                <SelectSegment
                  label="тип кузова"
                  value={bodyType}
                  onChange={(v) => setBodyType(v as BodyType)}
                  options={BODY_OPTIONS}
                />
                <PointsSegment
                  label="доп. точки"
                  value={extraPoints}
                  onChange={setExtraPoints}
                />
                <button
                  type="button"
                  onClick={() => setDrawerOpen(true)}
                  className="inline-flex h-[84px] items-center justify-center gap-3 rounded-[22px] bg-[var(--accent-1)] px-6 text-[15px] font-semibold lowercase tracking-[-0.016em] text-[var(--accent-1-text)] transition hover:opacity-95"
                  style={{ fontFamily: 'var(--font-body-text)' }}
                >
                  <SlidersHorizontal size={17} strokeWidth={2} />
                  все параметры
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-8 pt-0 md:pb-10 xl:pb-10">
        <Container>
          <div className="px-[10px] md:px-[14px] xl:px-[16px]">
            <div className="rounded-[32px] bg-[#26292e] px-8 py-8 text-white shadow-[0_24px_48px_rgba(0,0,0,0.12)]">
              <div className="grid grid-cols-[0.95fr_0.95fr_0.7fr] gap-6">
                <div>
                  <div className="flex items-center gap-3">
                    <SendHorizonal size={19} strokeWidth={2} className="text-[var(--accent-1)]" />
                    <h2 className="font-heading text-[30px] leading-[0.98] tracking-[-0.03em]">
                      {mode === 'request' ? 'Запрос КП' : 'Отправка КП'}
                    </h2>
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-3">
                    <FieldDark label="Компания">
                      <input
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Название компании"
                        className={darkInputClass}
                      />
                    </FieldDark>

                    <FieldDark label="Контактное лицо">
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ваше имя"
                        className={darkInputClass}
                      />
                    </FieldDark>

                    <FieldDark label="Телефон / Telegram">
                      <input
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="+7 (...) ... или @telegram"
                        className={darkInputClass}
                      />
                    </FieldDark>

                    <FieldDark label="Тип груза">
                      <input
                        value={cargoType}
                        onChange={(e) => setCargoType(e.target.value)}
                        placeholder="Например, оборудование"
                        className={darkInputClass}
                      />
                    </FieldDark>
                  </div>

                  <div className="mt-4">
                    <FieldDark label="Краткий комментарий">
                      <textarea
                        rows={4}
                        value={shortComment}
                        onChange={(e) => setShortComment(e.target.value)}
                        placeholder={
                          mode === 'request'
                            ? 'Кратко опишите задачу и ожидания по расчёту'
                            : 'Кратко опишите, что вы направляете в качестве коммерческого предложения'
                        }
                        className={`${darkInputClass} min-h-[118px] resize-none py-4`}
                      />
                    </FieldDark>
                  </div>
                </div>

                <div className="rounded-[24px] bg-white/6 px-5 py-5">
                  <div className="flex items-center gap-3">
                    <Calculator size={18} strokeWidth={2} className="text-[var(--accent-1)]" />
                    <h3 className="font-heading text-[24px] tracking-[-0.024em]">
                      Упрощённая форма
                    </h3>
                  </div>

                  <div className="mt-5 flex flex-col gap-3 text-[15px] text-white/82">
                    <InfoLine label="Режим" value={mode === 'request' ? 'Запрос КП' : 'Отправка КП'} />
                    <InfoLine label="Маршрут" value={routeLabel} />
                    <InfoLine label="Кузов" value={BODY_OPTIONS.find((i) => i.value === bodyType)?.label || '—'} />
                    <InfoLine label="Доп. точки" value={String(extraPoints)} />
                  </div>

                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() => setDrawerOpen(true)}
                      className="inline-flex h-[50px] items-center justify-center rounded-[14px] bg-white/10 px-6 text-[15px] font-semibold lowercase tracking-[-0.016em] text-white transition hover:bg-white/14"
                    >
                      открыть расширенную форму
                    </button>
                  </div>

                  {canAttachFiles ? (
                    <div className="mt-6 rounded-[18px] bg-white/6 px-5 py-5">
                      <div className="flex items-center gap-2">
                        <Paperclip size={16} strokeWidth={2} className="text-[var(--accent-1)]" />
                        <p className="text-[15px] font-semibold tracking-[-0.016em]">
                          Вложения
                        </p>
                      </div>

                      <label className="mt-4 flex min-h-[118px] cursor-pointer flex-col items-center justify-center rounded-[18px] bg-white/6 px-5 py-5 text-center transition hover:bg-white/10">
                        <Upload size={20} strokeWidth={2} className="text-[var(--accent-1)]" />
                        <span className="mt-3 text-[15px] font-semibold">
                          Загрузить файлы
                        </span>
                        <span className="mt-2 text-[13px] text-white/58">
                          PDF, DOCX, XLSX, PPTX, TXT · до 5 файлов
                        </span>
                        <input
                          type="file"
                          multiple
                          className="hidden"
                          accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                          onChange={(e) => handleFileSelect(e.target.files)}
                        />
                      </label>

                      {files.length > 0 ? (
                        <div className="mt-4 flex flex-col gap-2">
                          {files.map((file, index) => (
                            <div
                              key={`${file.name}-${index}`}
                              className="flex items-center justify-between rounded-[14px] bg-white/8 px-4 py-3"
                            >
                              <span className="truncate text-[14px] text-white/84">
                                {file.name}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="ml-3 inline-flex h-[28px] w-[28px] items-center justify-center rounded-[10px] bg-white/10 text-white"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-col justify-between rounded-[24px] bg-white/6 px-5 py-5">
                  <div>
                    <div className="flex items-center gap-2">
                      <CircleAlert size={16} strokeWidth={2} className="text-[var(--accent-1)]" />
                      <p className="text-[15px] font-semibold tracking-[-0.016em]">
                        Что дальше
                      </p>
                    </div>

                    <div className="mt-4 flex flex-col gap-3 text-[15px] text-white/78">
                      <Bullet text="Проверьте режим страницы: запрос или отправка КП" />
                      <Bullet text="Заполните короткую форму для быстрого сценария" />
                      <Bullet text="Откройте расширенную панель для дополнительных параметров" />
                      {canAttachFiles ? <Bullet text="Прикрепите файлы коммерческого предложения" /> : null}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-3">
                    <button
                      type="button"
                      className="header-utility-button inline-flex h-[54px] items-center justify-center rounded-[16px] bg-[var(--accent-1)] px-6 text-[16px] font-semibold tracking-[-0.02em] text-white"
                    >
                      {mode === 'request' ? 'отправить запрос' : 'отправить коммерческое предложение'}
                    </button>

                    <Link
                      href="/calculator"
                      className="inline-flex h-[50px] items-center justify-center rounded-[14px] bg-white/10 px-6 text-[15px] font-semibold lowercase tracking-[-0.016em] text-white transition hover:bg-white/14"
                    >
                      вернуться к калькулятору
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-12 pt-0 md:pb-14 xl:pb-16">
        <Container>
          <div className="px-[10px] md:px-[14px] xl:px-[16px]">
            <div className="rounded-[30px] bg-[var(--surface)] px-8 py-8 shadow-[var(--shadow-soft)]">
              <div className="flex items-center gap-3">
                <Calculator size={19} strokeWidth={2} className="text-[var(--accent-1)]" />
                <h2 className="font-heading text-[30px] leading-[0.98] tracking-[-0.03em] text-[var(--text)]">
                  Данные из калькулятора
                </h2>
              </div>

              <div className="mt-6 grid grid-cols-4 gap-4">
                <InfoCard label="Маршрут" value={routeLabel} />
                <InfoCard label="Расстояние" value={initialData.distance || '—'} />
                <InfoCard label="Кузов" value={initialData.body || '—'} />
                <InfoCard label="Вилка расчёта" value={initialData.result || '—'} />
                <InfoCard label="Вес / объём" value={`${initialData.weight || '—'} т / ${initialData.volume || '—'} м³`} />
                <InfoCard label="Паллеты" value={initialData.pallets || '—'} />
                <InfoCard label="Температура" value={initialData.temp || '—'} />
                <InfoCard label="Страхование" value={initialData.insurance || '—'} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <RequestDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        weightTons={weightTons}
        setWeightTons={setWeightTons}
        volumeM3={volumeM3}
        setVolumeM3={setVolumeM3}
        pallets={pallets}
        setPallets={setPallets}
        urgency={urgency}
        setUrgency={setUrgency}
        tempMode={tempMode}
        setTempMode={setTempMode}
        loadingType={loadingType}
        setLoadingType={setLoadingType}
        insurance={insurance}
        setInsurance={setInsurance}
        details={details}
        setDetails={setDetails}
      />
    </>
  );
}

function FieldDark({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="pl-[4px] text-[13px] font-semibold uppercase tracking-[0.07em] text-white/56">
        {label}
      </span>
      {children}
    </label>
  );
}

function InfoLine({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[14px] bg-white/6 px-4 py-3">
      <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-white/50">
        {label}
      </div>
      <div className="mt-2 text-[15px] font-medium text-white">{value}</div>
    </div>
  );
}

function Bullet({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-[6px] w-[6px] rounded-full bg-[var(--accent-1)]" />
      <span>{text}</span>
    </div>
  );
}

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[20px] bg-[var(--surface-soft)] px-5 py-5">
      <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--muted)]">
        {label}
      </div>
      <div className="mt-3 text-[16px] font-semibold leading-[1.28] text-[var(--text)]">
        {value}
      </div>
    </div>
  );
}

function CitySegment({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  const selected = RUSSIA_CITIES.find((city) => city.value === value);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const rootRef = useRef<HTMLDivElement | null>(null);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return RUSSIA_CITIES.slice(0, 12);
    return RUSSIA_CITIES.filter((city) => city.label.toLowerCase().includes(normalized)).slice(0, 12);
  }, [query]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setQuery('');
      }
    }
    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-[84px] w-full items-center justify-between rounded-[22px] bg-[var(--surface-soft)] px-5 text-left transition hover:opacity-95"
      >
        <div className="min-w-0">
          <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--muted)]">
            {label}
          </div>
          <div className="mt-2 truncate text-[17px] font-semibold tracking-[-0.018em] text-[var(--text)]">
            {selected?.label ?? placeholder}
          </div>
        </div>
        <ChevronDown size={18} strokeWidth={2} className={`ml-4 shrink-0 text-[var(--muted)] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open ? (
        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-[18px] bg-[var(--surface)] shadow-[0_20px_44px_rgba(38,41,46,0.12)]">
          <div className="p-3">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск города"
              className="input-shell h-[46px] rounded-[14px] px-4 py-0"
            />
          </div>
          <div className="max-h-[280px] overflow-y-auto pb-2">
            {filtered.length ? (
              filtered.map((city) => (
                <button
                  key={city.value}
                  type="button"
                  onClick={() => {
                    onChange(city.value);
                    setOpen(false);
                    setQuery('');
                  }}
                  className={`flex w-full items-center px-4 py-3 text-left text-[14px] tracking-[-0.014em] text-[var(--text)] transition hover:bg-[var(--surface-soft)] ${
                    city.value === value ? 'bg-[var(--surface-soft)] font-semibold' : ''
                  }`}
                >
                  {city.label}
                </button>
              ))
            ) : (
              <div className="px-4 py-4 text-[14px] text-[var(--muted)]">Ничего не найдено</div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function SelectSegment({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const selected = options.find((opt) => opt.value === value);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-[84px] w-full items-center justify-between rounded-[22px] bg-[var(--surface-soft)] px-5 text-left transition hover:opacity-95"
      >
        <div className="min-w-0">
          <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--muted)]">
            {label}
          </div>
          <div className="mt-2 truncate text-[17px] font-semibold tracking-[-0.018em] text-[var(--text)]">
            {selected?.label}
          </div>
        </div>
        <ChevronDown size={18} strokeWidth={2} className={`ml-4 shrink-0 text-[var(--muted)] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open ? (
        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-[18px] bg-[var(--surface)] shadow-[0_20px_44px_rgba(38,41,46,0.12)]">
          <div className="py-2">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`flex w-full items-center px-4 py-3 text-left text-[14px] tracking-[-0.014em] text-[var(--text)] transition hover:bg-[var(--surface-soft)] ${
                  option.value === value ? 'bg-[var(--surface-soft)] font-semibold' : ''
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function PointsSegment({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex h-[84px] items-center justify-between rounded-[22px] bg-[var(--surface-soft)] px-5">
      <div>
        <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--muted)]">
          {label}
        </div>
        <div className="mt-2 text-[17px] font-semibold tracking-[-0.018em] text-[var(--text)]">
          {value}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange(Math.max(0, value - 1))}
          className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-[12px] bg-[var(--surface)] text-[var(--text)]"
        >
          −
        </button>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-[12px] bg-[var(--surface)] text-[var(--text)]"
        >
          +
        </button>
      </div>
    </div>
  );
}

function RequestDrawer(props: {
  open: boolean;
  onClose: () => void;
  weightTons: number;
  setWeightTons: (v: number) => void;
  volumeM3: number;
  setVolumeM3: (v: number) => void;
  pallets: number;
  setPallets: (v: number) => void;
  urgency: UrgencyType;
  setUrgency: (v: UrgencyType) => void;
  tempMode: TempMode;
  setTempMode: (v: TempMode) => void;
  loadingType: LoadingType;
  setLoadingType: (v: LoadingType) => void;
  insurance: InsuranceType;
  setInsurance: (v: InsuranceType) => void;
  details: string;
  setDetails: (v: string) => void;
}) {
  const {
    open,
    onClose,
    weightTons,
    setWeightTons,
    volumeM3,
    setVolumeM3,
    pallets,
    setPallets,
    urgency,
    setUrgency,
    tempMode,
    setTempMode,
    loadingType,
    setLoadingType,
    insurance,
    setInsurance,
    details,
    setDetails,
  } = props;

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-[rgba(38,41,46,0.22)] backdrop-blur-[6px] transition-opacity duration-300 ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed right-0 top-0 z-50 h-screen w-[480px] bg-[var(--surface)] px-6 py-6 shadow-[-24px_0_48px_rgba(38,41,46,0.12)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-[30px] leading-[0.98] tracking-[-0.03em] text-[var(--text)]">
            Расширенная форма
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-[14px] bg-[var(--surface-soft)] text-[var(--text)]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-8 space-y-6">
          <div className="rounded-[22px] bg-[var(--surface-soft)] px-5 py-5">
            <h3 className="font-heading text-[22px] tracking-[-0.024em] text-[var(--text)]">
              Груз
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-3">
              <NumberControl label="Вес, т" value={weightTons} onChange={setWeightTons} />
              <NumberControl label="Объём, м³" value={volumeM3} onChange={setVolumeM3} />
              <NumberControl label="Паллеты" value={pallets} onChange={setPallets} />
            </div>
          </div>

          <div className="rounded-[22px] bg-[var(--surface-soft)] px-5 py-5">
            <h3 className="font-heading text-[22px] tracking-[-0.024em] text-[var(--text)]">
              Условия
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-3">
              <DrawerSelect
                label="Срочность"
                value={urgency}
                onChange={(v) => setUrgency(v as UrgencyType)}
                options={URGENCY_OPTIONS}
              />
              <DrawerSelect
                label="Температурный режим"
                value={tempMode}
                onChange={(v) => setTempMode(v as TempMode)}
                options={TEMP_OPTIONS}
              />
              <DrawerSelect
                label="Тип загрузки"
                value={loadingType}
                onChange={(v) => setLoadingType(v as LoadingType)}
                options={LOADING_OPTIONS}
              />
              <DrawerSelect
                label="Страхование"
                value={insurance}
                onChange={(v) => setInsurance(v as InsuranceType)}
                options={INSURANCE_OPTIONS}
              />
            </div>
          </div>

          <div className="rounded-[22px] bg-[var(--surface-soft)] px-5 py-5">
            <h3 className="font-heading text-[22px] tracking-[-0.024em] text-[var(--text)]">
              Детали
            </h3>
            <textarea
              rows={5}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Уточните параметры груза, требования, сроки и особенности взаимодействия"
              className="input-shell mt-4 min-h-[132px] resize-none rounded-[18px]"
            />
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <button
            type="button"
            onClick={() => {
              setWeightTons(20);
              setVolumeM3(82);
              setPallets(33);
              setUrgency('standard');
              setTempMode('normal');
              setLoadingType('rear');
              setInsurance('basic');
              setDetails('');
            }}
            className="inline-flex h-[54px] items-center justify-center rounded-[16px] bg-[var(--surface-soft)] px-6 text-[15px] font-semibold lowercase text-[var(--text)]"
          >
            сбросить
          </button>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-[54px] items-center justify-center rounded-[16px] bg-[var(--accent-1)] px-6 text-[15px] font-semibold lowercase text-[var(--accent-1-text)]"
          >
            применить
          </button>
        </div>
      </aside>
    </>
  );
}

function NumberControl({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="rounded-[18px] bg-[var(--surface)] px-4 py-4">
      <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--muted)]">
        {label}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onChange(Math.max(0, value - 1))}
          className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-[12px] bg-[var(--surface-soft)] text-[var(--text)]"
        >
          −
        </button>
        <span className="text-[18px] font-semibold text-[var(--text)]">{value}</span>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-[12px] bg-[var(--surface-soft)] text-[var(--text)]"
        >
          +
        </button>
      </div>
    </div>
  );
}

function DrawerSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <div>
      <div className="mb-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--muted)]">
        {label}
      </div>
      <SelectSegment label={label} value={value} onChange={onChange} options={options} />
    </div>
  );
}

const darkInputClass =
  'h-[56px] w-full rounded-[12px] border-0 bg-white/8 px-5 text-[15px] font-normal tracking-[-0.014em] text-white outline-none transition duration-200 placeholder:text-[13px] placeholder:font-normal placeholder:tracking-[-0.012em] placeholder:text-white/48 hover:bg-white/10 focus:bg-white/12';

function modeButtonClass(active: boolean) {
  return `inline-flex h-[48px] items-center justify-center rounded-[14px] px-5 text-[14px] font-semibold lowercase tracking-[-0.016em] transition ${
    active
      ? 'bg-[var(--accent-1)] text-white'
      : 'bg-[var(--surface-soft)] text-[var(--text)]'
  }`;
}
