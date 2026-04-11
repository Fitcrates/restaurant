import type { Metadata } from 'next';
import Link from 'next/link';

export async function generateMetadata(
  { params }: { params: Promise<{ lang: string }> }
): Promise<Metadata> {
  const { lang } = await params;
  const isPl = lang === 'pl';

  return {
    title: isPl
      ? 'Polityka Prywatności — HWA / 火'
      : 'Privacy Policy — HWA / 火',
    description: isPl
      ? 'Polityka prywatności restauracji HWA. Dowiedz się, jak przetwarzamy Twoje dane.'
      : 'HWA restaurant privacy policy. Learn how we handle your data.',
  };
}

const contentEn = {
  title: 'Privacy Policy',
  lastUpdated: 'Last updated: January 2026',
  backLabel: '← Back to Home',
  sections: [
    {
      heading: '1. Introduction',
      body: `Welcome to HWA / 火 ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a reservation at our restaurant located at ul. Mokotowska 1, Warsaw, Poland.`,
    },
    {
      heading: '2. Information We Collect',
      body: `We may collect the following types of personal information:

• **Contact Information:** Name, email address, phone number
• **Reservation Details:** Preferred date, time, number of guests, special requests or dietary requirements
• **Usage Data:** Pages visited, time spent on our website, browser type, device information, IP address
• **Cookies:** Small data files stored on your device to improve your browsing experience

We do not collect or store payment information through our website.`,
    },
    {
      heading: '3. How We Use Your Information',
      body: `We use the information collected for the following purposes:

• To process and manage your table reservations
• To communicate with you regarding your reservation or inquiries
• To improve our website and user experience
• To comply with applicable legal obligations
• To send you promotional communications (only with your explicit consent)

We will never sell your personal data to third parties.`,
    },
    {
      heading: '4. Legal Basis for Processing (GDPR)',
      body: `Under the General Data Protection Regulation (GDPR), we process your personal data based on:

• **Contractual necessity:** Processing required to fulfill your reservation
• **Legitimate interest:** Improving our services and website experience
• **Consent:** Where you have given explicit consent for marketing communications
• **Legal obligation:** Where processing is required by law`,
    },
    {
      heading: '5. Data Retention',
      body: `We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy. Reservation data is stored for up to 12 months after your visit. You may request deletion of your data at any time by contacting us directly.`,
    },
    {
      heading: '6. Cookies',
      body: `Our website uses cookies to enhance your browsing experience. These include:

• **Essential Cookies:** Necessary for the website to function properly
• **Analytics Cookies:** Help us understand how visitors interact with our website

You can manage your cookie preferences through your browser settings. Declining non-essential cookies will not affect the core functionality of our website.`,
    },
    {
      heading: '7. Your Rights',
      body: `Under the GDPR, you have the following rights:

• **Right of Access:** Request a copy of your personal data
• **Right to Rectification:** Request correction of inaccurate data
• **Right to Erasure:** Request deletion of your personal data
• **Right to Restrict Processing:** Request restriction of data processing
• **Right to Data Portability:** Receive your data in a structured, machine-readable format
• **Right to Object:** Object to certain types of processing
• **Right to Withdraw Consent:** Withdraw consent at any time where processing is based on consent

To exercise any of these rights, please contact us at the address below.`,
    },
    {
      heading: '8. Third-Party Services',
      body: `We may use third-party services for analytics. These providers have their own privacy policies governing the use of your data. We do not share your personal reservation data with any third-party marketing services.`,
    },
    {
      heading: '9. Data Security',
      body: `We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.`,
    },
    {
      heading: '10. Contact Information',
      body: `If you have questions about this Privacy Policy or wish to exercise your data rights, you can reach us at:

**HWA / 火**
ul. Mokotowska 1
00-640 Warsaw, Poland
Email: privacy@hwa-restaurant.pl
Phone: +48 22 000 0000`,
    },
    {
      heading: '11. Changes to This Policy',
      body: `We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.`,
    },
  ],
};

const contentPl = {
  title: 'Polityka Prywatności',
  lastUpdated: 'Ostatnia aktualizacja: styczeń 2026',
  backLabel: '← Strona główna',
  sections: [
    {
      heading: '1. Wprowadzenie',
      body: `Witamy w HWA / 火 („my", „nasz" lub „nas"). Zobowiązujemy się do ochrony Twoich danych osobowych i prawa do prywatności. Niniejsza Polityka Prywatności wyjaśnia, w jaki sposób zbieramy, wykorzystujemy, ujawniamy i chronimy Twoje dane, gdy odwiedzasz naszą stronę internetową lub dokonujesz rezerwacji w naszej restauracji przy ul. Mokotowskiej 1, Warszawa, Polska.`,
    },
    {
      heading: '2. Zbierane informacje',
      body: `Możemy zbierać następujące rodzaje danych osobowych:

• **Dane kontaktowe:** Imię i nazwisko, adres email, numer telefonu
• **Szczegóły rezerwacji:** Preferowana data, godzina, liczba gości, specjalne życzenia lub wymagania dietetyczne
• **Dane o użytkowaniu:** Odwiedzone strony, czas spędzony na stronie, typ przeglądarki, informacje o urządzeniu, adres IP
• **Pliki cookies:** Małe pliki danych przechowywane na Twoim urządzeniu w celu poprawy komfortu przeglądania

Nie zbieramy ani nie przechowujemy danych płatniczych za pośrednictwem naszej strony.`,
    },
    {
      heading: '3. Jak wykorzystujemy Twoje dane',
      body: `Wykorzystujemy zebrane informacje w następujących celach:

• Przetwarzanie i zarządzanie rezerwacjami stolików
• Komunikacja z Tobą w sprawie rezerwacji lub zapytań
• Ulepszanie naszej strony internetowej i doświadczenia użytkownika
• Spełnianie obowiązujących wymogów prawnych
• Wysyłanie komunikatów promocyjnych (wyłącznie za Twoją wyraźną zgodą)

Nigdy nie sprzedajemy Twoich danych osobowych stronom trzecim.`,
    },
    {
      heading: '4. Podstawa prawna przetwarzania (RODO)',
      body: `Zgodnie z Ogólnym Rozporządzeniem o Ochronie Danych (RODO), przetwarzamy Twoje dane osobowe na podstawie:

• **Konieczność umowna:** Przetwarzanie wymagane do realizacji rezerwacji
• **Uzasadniony interes:** Ulepszanie naszych usług i doświadczenia na stronie
• **Zgoda:** Gdy wyraziłeś wyraźną zgodę na komunikację marketingową
• **Obowiązek prawny:** Gdy przetwarzanie jest wymagane przez prawo`,
    },
    {
      heading: '5. Okres przechowywania danych',
      body: `Przechowujemy Twoje dane osobowe tylko tak długo, jak jest to konieczne do realizacji celów określonych w niniejszej polityce. Dane rezerwacyjne są przechowywane do 12 miesięcy od Twojej wizyty. Możesz w dowolnym momencie zażądać usunięcia swoich danych, kontaktując się z nami bezpośrednio.`,
    },
    {
      heading: '6. Pliki cookies',
      body: `Nasza strona internetowa wykorzystuje pliki cookies w celu poprawy komfortu przeglądania. Obejmują one:

• **Niezbędne cookies:** Konieczne do prawidłowego funkcjonowania strony
• **Analityczne cookies:** Pomagają nam zrozumieć, jak odwiedzający korzystają z naszej strony

Możesz zarządzać preferencjami dotyczącymi cookies za pomocą ustawień przeglądarki. Odrzucenie nieistotnych plików cookies nie wpłynie na podstawową funkcjonalność strony.`,
    },
    {
      heading: '7. Twoje prawa',
      body: `Na mocy RODO przysługują Ci następujące prawa:

• **Prawo dostępu:** Żądanie kopii swoich danych osobowych
• **Prawo do sprostowania:** Żądanie korekty nieprawidłowych danych
• **Prawo do usunięcia:** Żądanie usunięcia danych osobowych
• **Prawo do ograniczenia przetwarzania:** Żądanie ograniczenia przetwarzania danych
• **Prawo do przenoszenia danych:** Otrzymanie danych w ustrukturyzowanym, czytelnym maszynowo formacie
• **Prawo do sprzeciwu:** Sprzeciw wobec niektórych rodzajów przetwarzania
• **Prawo do wycofania zgody:** Wycofanie zgody w dowolnym momencie, gdy przetwarzanie opiera się na zgodzie

Aby skorzystać z któregokolwiek z tych praw, prosimy o kontakt pod adresem podanym poniżej.`,
    },
    {
      heading: '8. Usługi stron trzecich',
      body: `Możemy korzystać z usług stron trzecich do celów analitycznych. Dostawcy ci posiadają własne polityki prywatności regulujące korzystanie z Twoich danych. Nie udostępniamy Twoich osobistych danych rezerwacyjnych żadnym zewnętrznym usługom marketingowym.`,
    },
    {
      heading: '9. Bezpieczeństwo danych',
      body: `Wdrażamy odpowiednie środki techniczne i organizacyjne w celu ochrony Twoich danych osobowych przed nieuprawnionym dostępem, zmianą, ujawnieniem lub zniszczeniem. Jednak żadna metoda transmisji przez Internet nie jest w 100% bezpieczna i nie możemy zagwarantować absolutnego bezpieczeństwa.`,
    },
    {
      heading: '10. Dane kontaktowe',
      body: `Jeśli masz pytania dotyczące niniejszej Polityki Prywatności lub chcesz skorzystać ze swoich praw, możesz skontaktować się z nami:

**HWA / 火**
ul. Mokotowska 1
00-640 Warszawa, Polska
Email: privacy@hwa-restaurant.pl
Telefon: +48 22 000 0000`,
    },
    {
      heading: '11. Zmiany w Polityce',
      body: `Możemy od czasu do czasu aktualizować niniejszą Politykę Prywatności. Wszelkie zmiany zostaną opublikowane na tej stronie z aktualną datą rewizji. Zachęcamy do okresowego zapoznawania się z tą polityką.`,
    },
  ],
};

/** Convert basic markdown bold **text** to <strong> tags */
function renderBody(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const content = lang === 'pl' ? contentPl : contentEn;

  return (
    <main className="privacy-policy">
      <div className="privacy-policy__container">
        <Link href={`/${lang}`} className="privacy-policy__back">
          {content.backLabel}
        </Link>

        <h1 className="privacy-policy__title">{content.title}</h1>
        <p className="privacy-policy__updated">{content.lastUpdated}</p>

        {content.sections.map((section, i) => (
          <div key={i} className="privacy-policy__section">
            <h2 className="privacy-policy__heading">{section.heading}</h2>
            <div className="privacy-policy__body">
              {section.body.split('\n\n').map((paragraph, j) => (
                <p key={j}>{renderBody(paragraph)}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
