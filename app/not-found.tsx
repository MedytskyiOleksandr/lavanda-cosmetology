import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <p className="text-caption text-secondary mb-4">404</p>
      <h1 className="text-h1 font-heading mb-4 text-foreground">Сторінку не знайдено</h1>
      <p className="text-body text-muted mb-8 max-w-md">
        На жаль, ця сторінка не існує або була переміщена.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center h-14 px-10 text-lg rounded-lg font-medium bg-primary text-white hover:bg-secondary shadow-soft hover:shadow-hover transition-all"
      >
        Повернутися на головну
      </Link>
    </div>
  );
}
