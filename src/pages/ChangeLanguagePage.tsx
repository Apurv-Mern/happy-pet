import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const LANGUAGES = ['English', 'Arabic', 'Bahasa', 'Malay', 'Thai', 'German']

export function ChangeLanguagePage() {
  const navigate = useNavigate()

  const handleSelect = (lang: string) => {
    try {
      localStorage.setItem('preferredLanguage', lang)
    } catch {}
    navigate(-1)
  }

  return (
    <div className="flex min-h-screen items-start pt-6 justify-center bg-white">
      {/* <button
        aria-label="Go back"
        onClick={() => navigate(-1)}
        className="fixed left-4 top-4 h-10 w-10 rounded-lg bg-[#003863] text-white grid place-items-center shadow-md"
      >
        <span className="text-xl">‹</span>
      </button> */}

      <div className="w-full max-w-[440px] px-4 pb-8">
        <div className="h-[24px]" />
        <Card className="bg-[#003863] rounded-[20px] shadow-[0px_6px_8px_0px_rgba(0,0,0,0.55)]">
          <CardContent className="px-6 py-8">
            <h1 className="text-white text-center text-[40px] font-serif italic mb-6">
              Select Language
            </h1>

            <div className="space-y-5">
              {LANGUAGES.map(lang => (
                <Button
                  key={lang}
                  onClick={() => handleSelect(lang)}
                  className="w-full bg-white text-[#003863] hover:bg-slate-100 h-[58px] rounded-[30px] text-[18px] font-semibold"
                >
                  {lang}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ChangeLanguagePage
