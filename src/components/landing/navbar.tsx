import { Logo } from "@/components/logo";
import { ButtonLink } from "@/components/ui";

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-4 flex w-full max-w-6xl items-center justify-between rounded-full px-5 py-3 glass-strong mx-4 sm:mx-auto sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-7 text-sm font-medium text-mist-300 md:flex" aria-label="Principal">
          <a href="#catalogo" className="transition-colors hover:text-mist-100">
            Catálogo
          </a>
          <a href="#como-funciona" className="transition-colors hover:text-mist-100">
            Como funciona
          </a>
          <a href="#demo" className="transition-colors hover:text-mist-100">
            Demo
          </a>
        </nav>
        <ButtonLink href="/login" size="sm">
          Entrar
        </ButtonLink>
      </div>
    </header>
  );
}
