import { portfolio } from "@/data/portfolio";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t py-10" style={{ borderColor: "hsl(var(--border))" }}>
      <div className="container mx-auto container-px flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-[hsl(var(--text-muted))]">
          © {year} {portfolio.name}. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
