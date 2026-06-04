const DEFAULT_CONTACT_EMAIL_BASE64 = 'aW5mb0BoYXBweXBldC5iaXo='

const decodeBase64 = (value: string) => {
  try {
    return atob(value)
  } catch {
    return value
  }
}

const reverseText = (value: string) => value.split('').reverse().join('')

export const DEFAULT_CONTACT_EMAIL = decodeBase64(DEFAULT_CONTACT_EMAIL_BASE64)

type ObfuscatedEmailLinkProps = {
  email?: string
  className?: string
}

export function ObfuscatedEmailLink({
  email = DEFAULT_CONTACT_EMAIL,
  className = '',
}: ObfuscatedEmailLinkProps) {
  const handleClick = () => {
    window.location.href = `mailto:${email}`
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      //   aria-label={`Email ${email}`}
      className={`inline-flex cursor-pointer border-0 bg-transparent p-0 text-left ${className}`}
    >
      <span style={{ direction: 'rtl', unicodeBidi: 'bidi-override' }}>
        {reverseText(email)}
      </span>
    </button>
  )
}
