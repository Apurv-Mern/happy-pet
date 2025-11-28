import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="bg-[url('/assets/images/background.png')] bg-auto bg-repeat bg-center py-20">
      <main className="container mx-auto">{children}</main>
    </div>
  )
}

