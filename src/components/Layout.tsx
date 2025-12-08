import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="bg-[url('/assets/images/background.png')] bg-auto bg-repeat bg-center">
      <main className="container mx-auto py-20">{children}</main>
    </div>
  )
}

