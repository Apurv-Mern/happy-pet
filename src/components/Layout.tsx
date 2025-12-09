import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="bg-[url('/assets/images/background.png')] bg-auto bg-repeat bg-center">
      <main className="container mx-auto py-5 py-5 sm:py-5 md:py-5 lg:py-5 xl:py-20">{children}</main>
    </div>
  )
}

