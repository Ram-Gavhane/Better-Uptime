import Link from 'next/link';
import { BookOpen, Laptop, ArrowRight, Zap, Server, Bell } from 'lucide-react';

const userLinks = [
  { label: 'Add monitors', href: '/docs/user/monitoring', desc: 'Track uptime for URLs, APIs, and services' },
  { label: 'Incidents & alerts', href: '/docs/user/operations', desc: 'Manage on-call alerts and escalations' },
  { label: 'API basics', href: '/docs/developer/api', desc: 'Integrate with the REST API' },
];

const devLinks = [
  { label: 'Local setup', href: '/docs/developer/getting-started', desc: 'Run the stack locally in minutes' },
  { label: 'Architecture', href: '/docs/developer/architecture', desc: 'Understand how everything connects' },
  { label: 'Contribution guide', href: '/docs/developer', desc: 'Guidelines for contributing code' },
];

const highlights = [
  { icon: <Zap className="h-4 w-4" />, text: 'Real-time alerting' },
  { icon: <Server className="h-4 w-4" />, text: 'Multi-region monitors' },
  { icon: <Bell className="h-4 w-4" />, text: 'On-call scheduling' },
];

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col items-center px-6 py-16 gap-16">
      {/* Hero */}
      <div className="max-w-2xl text-center space-y-5">
        <div className="inline-flex items-center gap-2 rounded-full border bg-fd-muted/60 px-4 py-1.5 text-xs font-medium text-fd-muted-foreground">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Observiq Documentation
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Everything you need to
          <span className="text-emerald-500"> monitor</span> and{' '}
          <span className="text-sky-500">build</span>
        </h1>

        <p className="text-base md:text-lg text-fd-muted-foreground leading-relaxed">
          Complete documentation for operators managing uptime monitors and developers
          building on the Observiq platform.
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-2 pt-1">
          {highlights.map((h) => (
            <span
              key={h.text}
              className="inline-flex items-center gap-1.5 rounded-full border bg-fd-card px-3 py-1 text-xs text-fd-muted-foreground"
            >
              {h.icon}
              {h.text}
            </span>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 w-full max-w-4xl">
        <SectionCard
          icon={<BookOpen className="h-5 w-5" />}
          badge="For Users"
          title="User Docs"
          description="Learn how to set up monitors, configure alerts, and respond to incidents — no code required."
          href="/docs/user"
          links={userLinks}
          tone="user"
        />
        <SectionCard
          icon={<Laptop className="h-5 w-5" />}
          badge="For Developers"
          title="Developer Docs"
          description="Set up locally, explore the architecture, and contribute to the open-source codebase."
          href="/docs/developer"
          links={devLinks}
          tone="dev"
        />
      </div>

      {/* Footer hint */}
      <p className="text-sm text-fd-muted-foreground text-center">
        Looking for something specific?{' '}
        <Link href="/docs" className="underline underline-offset-4 font-medium hover:text-fd-foreground transition-colors">
          Browse all docs
        </Link>
        {' '}or use the search bar above.
      </p>
    </div>
  );
}

type SectionCardProps = {
  icon: React.ReactNode;
  badge: string;
  title: string;
  description: string;
  href: string;
  links: { label: string; href: string; desc: string }[];
  tone: 'user' | 'dev';
};

function SectionCard({ icon, badge, title, description, href, links, tone }: SectionCardProps) {
  const badgeStyle =
    tone === 'user'
      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
      : 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20';

  const arrowStyle =
    tone === 'user'
      ? 'text-emerald-500'
      : 'text-sky-500';

  return (
    <div className="rounded-xl border bg-fd-card shadow-sm p-6 flex flex-col gap-5 hover:shadow-md transition-shadow">
      {/* Badge */}
      <div className={`inline-flex items-center gap-2 self-start rounded-full border px-3 py-1 text-xs font-semibold ${badgeStyle}`}>
        {icon}
        <span>{badge}</span>
      </div>

      {/* Title + description */}
      <div className="space-y-1.5">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-fd-muted-foreground leading-relaxed">{description}</p>
      </div>

      {/* Quick links */}
      <div className="flex flex-col gap-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex items-start gap-3 rounded-lg border bg-fd-background/50 px-3 py-2.5 text-sm hover:bg-fd-muted/50 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="font-medium group-hover:underline">{link.label}</div>
              <div className="text-xs text-fd-muted-foreground mt-0.5 truncate">{link.desc}</div>
            </div>
            <ArrowRight className={`h-4 w-4 mt-0.5 shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all ${arrowStyle}`} />
          </Link>
        ))}
      </div>

      {/* CTA */}
      <Link
        href={href}
        className={`inline-flex items-center gap-1.5 text-sm font-medium mt-auto hover:gap-2.5 transition-all ${arrowStyle}`}
      >
        View all {title}
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
