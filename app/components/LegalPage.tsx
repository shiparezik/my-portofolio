'use client';

import { useSyncExternalStore } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, Mail, ShieldCheck } from 'lucide-react';

type Language = 'en' | 'pl' | 'uk' | 'ru';
type DocumentType = 'privacy' | 'terms';

const subscribeToNothing = () => () => {};
const getPreferredLanguage = (): Language => {
  const saved = window.localStorage.getItem('preferredLang');
  return saved === 'en' || saved === 'pl' || saved === 'uk' || saved === 'ru' ? saved : 'en';
};

const copy = {
  en: {
    back: 'Back to portfolio',
    updated: 'Last updated: August 2026',
    contact: 'Questions? Write to',
    privacy: {
      label: 'Privacy',
      title: 'Privacy Policy',
      intro: 'This portfolio is a simple presentation website. I keep data collection to an absolute minimum.',
      sections: [
        ['What this website collects', 'The website does not use a contact form, advertising trackers or profiling tools. If you write using the email link, your email client sends the message directly to me.'],
        ['Technical data', 'The hosting provider may process standard technical information such as IP address, browser type and request logs to keep the website secure and available.'],
        ['Your choices', 'You can request information about, correction of or deletion of personal data you have shared by email.'],
      ],
    },
    terms: {
      label: 'Legal',
      title: 'Terms of Use',
      intro: 'This portfolio presents my work and professional profile. By using it, you agree to the following simple terms.',
      sections: [
        ['Content and ownership', 'The site design, copy and project materials are protected by applicable intellectual-property law. Do not republish them as your own without written permission.'],
        ['External links', 'Links to GitHub, LinkedIn, TaskFlow and email services lead to independent services. Their own terms and privacy policies apply.'],
        ['Contact', 'For permissions, collaborations or a correction request, please get in touch by email.'],
      ],
    },
  },
  pl: {
    back: 'Wróć do portfolio', updated: 'Ostatnia aktualizacja: sierpień 2026', contact: 'Pytania? Napisz na',
    privacy: {
      label: 'Prywatność', title: 'Polityka prywatności', intro: 'To portfolio jest prostą stroną prezentującą moją pracę. Ograniczam zbieranie danych do niezbędnego minimum.',
      sections: [
        ['Jakie dane zbiera strona', 'Strona nie używa formularza kontaktowego, reklamowych trackerów ani narzędzi do profilowania. Jeśli napiszesz przez link e-mail, wiadomość wysyła bezpośrednio Twój klient poczty.'],
        ['Dane techniczne', 'Dostawca hostingu może przetwarzać standardowe dane techniczne, takie jak adres IP, typ przeglądarki i logi żądań, aby utrzymać bezpieczeństwo oraz dostępność strony.'],
        ['Twoje prawa', 'Możesz poprosić o informację, poprawienie lub usunięcie danych osobowych przekazanych w wiadomości e-mail.'],
      ],
    },
    terms: {
      label: 'Informacje prawne', title: 'Warunki korzystania', intro: 'To portfolio prezentuje moją pracę i profil zawodowy. Korzystając z niego, akceptujesz poniższe proste zasady.',
      sections: [
        ['Treść i własność', 'Projekt strony, teksty i materiały projektowe są chronione przez właściwe przepisy o własności intelektualnej. Nie publikuj ich jako własnych bez pisemnej zgody.'],
        ['Linki zewnętrzne', 'Linki do GitHub, LinkedIn, TaskFlow i usług e-mail prowadzą do niezależnych serwisów. Obowiązują tam ich własne regulaminy i polityki prywatności.'],
        ['Kontakt', 'W sprawie zgody, współpracy lub korekty informacji skontaktuj się ze mną przez e-mail.'],
      ],
    },
  },
  uk: {
    back: 'Повернутися до портфоліо', updated: 'Останнє оновлення: серпень 2026', contact: 'Є питання? Напиши на',
    privacy: {
      label: 'Приватність', title: 'Політика конфіденційності', intro: 'Це портфоліо — проста презентаційна сторінка. Я збираю лише мінімум даних, необхідний для її роботи.',
      sections: [
        ['Які дані збирає сайт', 'Сайт не використовує форму зворотного зв’язку, рекламні трекери чи інструменти профілювання. Якщо написати через посилання e-mail, повідомлення надсилає ваш поштовий клієнт напряму мені.'],
        ['Технічні дані', 'Хостинг-провайдер може обробляти стандартні технічні дані — IP-адресу, тип браузера та журнали запитів — щоб сайт залишався безпечним і доступним.'],
        ['Ваші права', 'Можна попросити надати інформацію про, виправити або видалити персональні дані, якими ви поділилися у листі.'],
      ],
    },
    terms: {
      label: 'Правова інформація', title: 'Умови використання', intro: 'Це портфоліо представляє мої роботи та професійний профіль. Користуючись ним, ви погоджуєтеся з цими простими умовами.',
      sections: [
        ['Вміст і власність', 'Дизайн сайту, тексти та матеріали проєктів захищені законодавством про інтелектуальну власність. Не публікуйте їх як власні без письмового дозволу.'],
        ['Зовнішні посилання', 'Посилання на GitHub, LinkedIn, TaskFlow та e-mail ведуть до незалежних сервісів. До них застосовуються їхні власні умови та політики конфіденційності.'],
        ['Контакт', 'Щоб отримати дозвіл, обговорити співпрацю або виправити інформацію, напишіть мені на e-mail.'],
      ],
    },
  },
  ru: {
    back: 'Вернуться к портфолио', updated: 'Последнее обновление: август 2026', contact: 'Есть вопрос? Напиши на',
    privacy: {
      label: 'Конфиденциальность', title: 'Политика конфиденциальности', intro: 'Это портфолио — простая презентационная страница. Я собираю только минимум данных, необходимый для её работы.',
      sections: [
        ['Какие данные собирает сайт', 'Сайт не использует форму обратной связи, рекламные трекеры или инструменты профилирования. Если написать по ссылке e-mail, письмо отправит ваш почтовый клиент напрямую мне.'],
        ['Технические данные', 'Хостинг-провайдер может обрабатывать стандартные технические данные: IP-адрес, тип браузера и журналы запросов — чтобы сайт оставался безопасным и доступным.'],
        ['Ваши права', 'Можно запросить информацию о, исправление или удаление персональных данных, которыми вы поделились в письме.'],
      ],
    },
    terms: {
      label: 'Правовая информация', title: 'Условия использования', intro: 'Это портфолио представляет мои работы и профессиональный профиль. Пользуясь им, вы соглашаетесь с этими простыми условиями.',
      sections: [
        ['Контент и права', 'Дизайн сайта, тексты и материалы о проектах защищены законодательством об интеллектуальной собственности. Не публикуйте их как свои без письменного разрешения.'],
        ['Внешние ссылки', 'Ссылки на GitHub, LinkedIn, TaskFlow и e-mail ведут на независимые сервисы. К ним применяются их собственные условия и политики конфиденциальности.'],
        ['Связь', 'Чтобы получить разрешение, обсудить сотрудничество или исправить информацию, напишите мне на e-mail.'],
      ],
    },
  },
} as const;

export default function LegalPage({ type }: { type: DocumentType }) {
  const language = useSyncExternalStore<Language>(subscribeToNothing, getPreferredLanguage, () => 'en');
  const text = copy[language];
  const document = text[type];
  const Icon = type === 'privacy' ? ShieldCheck : FileText;

  return (
    <main className="page-surface min-h-screen bg-[#08060d] px-5 py-6 text-white sm:px-8 sm:py-10">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="mb-12 inline-flex items-center gap-2 text-sm text-white/55 transition hover:text-violet-200">
          <ArrowLeft className="h-4 w-4" />
          {text.back}
        </Link>

        <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d0b17]/90 shadow-[0_30px_90px_-45px_rgba(139,92,246,0.7)]">
          <div className="border-b border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.2),transparent_45%)] p-7 sm:p-10">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-300/25 bg-violet-300/10 text-violet-200">
              <Icon className="h-6 w-6" />
            </div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-violet-200/70">{document.label}</p>
            <h1 className="text-4xl font-bold tracking-[-0.05em] sm:text-5xl">{document.title}</h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/60">{document.intro}</p>
            <p className="mt-5 text-xs text-white/35">{text.updated}</p>
          </div>

          <div className="space-y-8 p-7 sm:p-10">
            {document.sections.map(([title, body], index) => (
              <section key={title}>
                <p className="mb-2 text-[11px] font-semibold tracking-[0.16em] text-cyan-200/60">0{index + 1}</p>
                <h2 className="mb-3 text-xl font-semibold text-white">{title}</h2>
                <p className="leading-relaxed text-white/55">{body}</p>
              </section>
            ))}
            <div className="flex flex-wrap items-center gap-2 border-t border-white/10 pt-7 text-sm text-white/45">
              <Mail className="h-4 w-4 text-violet-200" />
              <span>{text.contact}</span>
              <a href="mailto:shipareziki@gmail.com" className="text-cyan-200 transition hover:text-white">shipareziki@gmail.com</a>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
