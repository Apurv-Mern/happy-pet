# Localization (i18n) Implementation Guide

## Overview
This project uses a custom lightweight i18n solution for multi-language support. Translation files are stored in JSON format in the `src/locales` directory.

## Files Created

### Translation Files
- `src/locales/en.json` - English (default)
- `src/locales/de.json` - German (Deutsch)

### Context & Hook
- `src/contexts/I18nContext.tsx` - i18n context provider and hook

## How to Use

### 1. Wrap Your App with I18nProvider

Update your `src/main.tsx` or `src/App.tsx`:

```tsx
import { I18nProvider } from '@/contexts/I18nContext'

function App() {
  return (
    <I18nProvider>
      {/* Your app components */}
    </I18nProvider>
  )
}
```

### 2. Use Translations in Components

```tsx
import { useTranslation } from '@/contexts/I18nContext'

function MyComponent() {
  const { t, language, setLanguage } = useTranslation()

  return (
    <div>
      <h1>{t('homePage.title')}</h1>
      <p>{t('homePage.subtitle')}</p>
      
      {/* Change language */}
      <button onClick={() => setLanguage('de')}>
        Deutsch
      </button>
      <button onClick={() => setLanguage('en')}>
        English
      </button>
    </div>
  )
}
```

### 3. Language Selector Component Example

```tsx
import { useTranslation } from '@/contexts/I18nContext'

function LanguageSelector() {
  const { language, setLanguage, availableLanguages, t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)}>
        <MdLanguage className="h-5 w-5" />
        <span>{t('header.selectLanguage')}</span>
      </button>
      
      {isOpen && (
        <div className="absolute dropdown-menu">
          {availableLanguages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code)
                setIsOpen(false)
              }}
              className={language === lang.code ? 'active' : ''}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
```

## Translation Key Structure

### Common Keys
- `common.appName` - Application name
- `common.loading` - Loading text
- `common.error` - Error text

### Header Keys
- `header.home` - Home menu item
- `header.about` - About Us menu item
- `header.login` - Login button

### Page-Specific Keys
- `homePage.title` - Home page title
- `loginPage.email` - Login page email label
- `contactPage.sendMessage` - Contact form button

### Nested Objects
For FAQ questions or arrays:
```tsx
const questions = t('faqPage.questions')
questions.map(q => (
  <div key={q.question}>
    <h3>{q.question}</h3>
    <p>{q.answer}</p>
  </div>
))
```

## Adding New Languages

### Step 1: Create Translation File
Create a new JSON file in `src/locales/`, e.g., `ar.json` for Arabic:

```json
{
  "common": {
    "appName": "حيوان أليف سعيد",
    ...
  }
}
```

### Step 2: Import in I18nContext
Update `src/contexts/I18nContext.tsx`:

```tsx
import ar from '@/locales/ar.json'

const translations: Record<string, Translations> = {
  en,
  de,
  ar,  // Add new language
}
```

### Step 3: Add to Available Languages
Update the `availableLanguages` array in `I18nContext.tsx`.

## Translation File Structure Example (German)

```json
{
  "header": {
    "home": "STARTSEITE",
    "about": "ÜBER UNS",
    "contact": "KONTAKT"
  },
  "loginPage": {
    "title": "Willkommen zurück!",
    "email": "E-Mail",
    "password": "Passwort",
    "loginButton": "Anmelden"
  }
}
```

## Features

- ✅ Automatic localStorage persistence
- ✅ Fallback to English if translation missing
- ✅ Nested key support (dot notation)
- ✅ Type-safe with TypeScript
- ✅ Easy to add new languages
- ✅ Lightweight (no external dependencies)

## Migration Guide

To convert existing hardcoded text to use translations:

### Before:
```tsx
<h1>Welcome Back!</h1>
<button>Login</button>
```

### After:
```tsx
import { useTranslation } from '@/contexts/I18nContext'

function LoginPage() {
  const { t } = useTranslation()
  
  return (
    <>
      <h1>{t('loginPage.title')}</h1>
      <button>{t('loginPage.loginButton')}</button>
    </>
  )
}
```

## Best Practices

1. **Use descriptive keys**: `loginPage.emailPlaceholder` instead of `login.ep`
2. **Group by page/component**: Keep related translations together
3. **Consistent naming**: Use camelCase for keys
4. **Provide context**: Add comments in translation files for complex strings
5. **Test all languages**: Ensure UI doesn't break with longer translations (e.g., German)

## Current Language Support

- ✅ English (en) - Complete
- ✅ German (de) - Complete
- ⏳ Arabic (ar) - Pending
- ⏳ Malay (ms) - Pending
- ⏳ Thai (th) - Pending
- ⏳ Bahasa (id) - Pending

## Notes

- The selected language persists in localStorage
- If a translation key is missing, it falls back to English
- If the key doesn't exist in English either, the key itself is returned
- Language changes are immediate and don't require page reload
