"use client";

import { motion } from "framer-motion";
import {
  Bell,
  BookOpen,
  CirclePlay,
  Compass,
  Film,
  Flame,
  Home,
  Palette,
  Search,
  Sparkles,
  Star,
  SwatchBook,
  TrendingUp,
  Users,
  WandSparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OptimizedImage } from "@/components/ui/optimized-image";
import GradientBlinds from "@/components/ui/blocks/background/GradientBlinds/GradientBlinds";

const sectionLinks = [
  { id: "hero", label: "Hero" },
  { id: "typography", label: "Typography" },
  { id: "colors", label: "Colors & Surfaces" },
  { id: "components", label: "UI Components" },
  { id: "layout", label: "Layout & Spacing" },
  { id: "motion", label: "Motion" },
  { id: "icons", label: "Icons" },
];

const typographyRows = [
  {
    name: "Heading 1",
    spec: "80px / 88px",
    preview: (
      <h1 className="font-display font-bold text-5xl leading-tight md:text-8xl">
        <span className="text-text-primary">Critix heading level one</span>
      </h1>
    ),
  },
  {
    name: "Heading 2",
    spec: "60px / 68px",
    preview: (
      <h2 className="font-display font-bold text-4xl md:text-6xl">
        <span className="bg-gradient-to-r from-primary-crx via-yellow-500 to-primary-hover-crx bg-clip-text text-transparent">
          Heading two with gradient
        </span>
      </h2>
    ),
  },
  {
    name: "Heading 3",
    spec: "30px / 36px",
    preview: (
      <h3 className="font-display font-bold text-3xl text-text-primary">
        Heading three display style
      </h3>
    ),
  },
  {
    name: "Heading 4",
    spec: "24px / 30px",
    preview: (
      <h4 className="font-semibold text-2xl text-text-primary">
        Heading four section title
      </h4>
    ),
  },
  {
    name: "Bold L",
    spec: "20px / 30px",
    preview: (
      <p className="font-bold text-xl text-text-primary">
        Bold large body emphasis
      </p>
    ),
  },
  {
    name: "Bold M",
    spec: "18px / 28px",
    preview: (
      <p className="font-bold text-lg text-text-primary">
        Bold medium body emphasis
      </p>
    ),
  },
  {
    name: "Bold S",
    spec: "14px / 20px",
    preview: (
      <p className="font-bold text-sm text-text-primary">Bold small label</p>
    ),
  },
  {
    name: "Paragraph",
    spec: "20px / 30px",
    preview: (
      <p className="max-w-3xl text-text-secondary text-xl">
        Large paragraph used in hero and marketing sections to communicate
        product value with strong rhythm.
      </p>
    ),
  },
  {
    name: "Regular L",
    spec: "18px / 28px",
    preview: (
      <p className="text-text-secondary text-lg">
        Regular large supporting text for descriptions.
      </p>
    ),
  },
  {
    name: "Regular M",
    spec: "16px / 24px",
    preview: (
      <p className="text-base text-text-secondary">
        Regular medium text for cards and content blocks.
      </p>
    ),
  },
  {
    name: "Regular S",
    spec: "14px / 20px",
    preview: (
      <p className="text-sm text-text-secondary">
        Regular small text for labels and metadata.
      </p>
    ),
  },
];

const icons = [
  Film,
  Star,
  TrendingUp,
  Home,
  Search,
  Bell,
  Users,
  Compass,
  BookOpen,
  Flame,
  Sparkles,
  WandSparkles,
];

function SectionHeader({
  badge,
  titleLineOne,
  titleLineTwo,
  description,
}: {
  badge: string;
  titleLineOne: string;
  titleLineTwo: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mx-auto mb-14 max-w-4xl text-center"
    >
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-crx/30 bg-primary-crx/10 px-4 py-2">
        <SwatchBook className="h-4 w-4 text-primary-crx" />
        <span className="font-mono text-primary-crx text-sm">{badge}</span>
      </div>

      <h2 className="mb-4 font-display font-bold text-4xl md:text-6xl">
        <span className="text-text-primary">{titleLineOne}</span>
        <br />
        <span className="bg-gradient-to-r from-primary-crx via-yellow-500 to-primary-hover-crx bg-clip-text text-transparent">
          {titleLineTwo}
        </span>
      </h2>

      <p className="mx-auto max-w-3xl text-text-secondary text-lg">
        {description}
      </p>
    </motion.div>
  );
}

export default function DesignSystemPage() {
  return (
    <main
      className="min-h-screen bg-on-primary-crx overflow-x-hidden"
      style={{ userSelect: "none" }}
    >
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border-color bg-bg-surface/90 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center gap-2 overflow-x-auto px-6">
          <a
            href="/lending"
            className="mr-3 flex shrink-0 items-center gap-2 text-text-primary transition-colors hover:text-primary-crx"
          >
            <CirclePlay className="h-4 w-4" />
            <span className="font-semibold text-sm">Back to Landing</span>
          </a>

          {sectionLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="shrink-0 rounded-full border border-border-color bg-bg-surface-light px-4 py-1.5 text-text-secondary text-xs transition-all hover:border-primary-crx/50 hover:text-text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>

      <section
        id="hero"
        className="relative flex min-h-screen scroll-mt-24 items-center justify-center overflow-hidden bg-linear-to-b from-bg-body via-bg-surface to-bg-body"
      >
        <div className="absolute inset-0">
          <GradientBlinds
            gradientColors={["#2c2c2c", "#5227FF", "#2979ff"]}
            angle={40}
            noise={0.12}
            blindCount={14}
            blindMinWidth={50}
            spotlightRadius={0.45}
            spotlightSoftness={1}
            spotlightOpacity={1}
            mouseDampening={0.15}
            distortAmount={1}
            shineDirection="left"
            mixBlendMode="lighten"
          />
        </div>

        <div className="container mx-auto mt-12 px-6 py-12">
          <div className="flex flex-col items-center gap-12 lg:flex-row">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-border-color bg-bg-surface-light px-4 py-2"
              >
                <Palette className="h-4 w-4 text-primary-crx" />
                <span className="text-sm text-text-secondary">
                  Critix Design System Live Showcase
                </span>
              </motion.div>

              <h1 className="mb-6 font-display font-bold text-5xl leading-tight md:text-8xl">
                <span className="text-text-primary">Sistema visual,</span>
                <br />
                <span className="bg-gradient-to-r from-primary-crx via-yellow-500 to-primary-hover-crx bg-clip-text text-transparent">
                  sem aproximacoes
                </span>
              </h1>

              <p className="mb-8 max-w-2xl text-text-secondary text-xl">
                Uma pagina unica para documentar tipografia, cores, componentes,
                layout e motion do Critix usando as mesmas classes e
                comportamentos do produto.
              </p>

              <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "var(--glow-primary)" }}
                  whileTap={{ scale: 0.95 }}
                  className="z-4 flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-amber-600 to-primary-hover-crx/60 px-8 py-4 font-semibold text-lg transition-all hover:shadow-[0_0_30px_rgba(255,193,7,0.6)]"
                >
                  <Home className="h-5 w-5" />
                  Design Foundations
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="z-4 flex items-center gap-2 rounded-full border border-border-color bg-purple-900/90 px-8 py-4 font-semibold text-lg text-text-primary transition-all hover:bg-purple-700/90"
                >
                  <Star className="h-5 w-5 text-color-primary" />
                  Component Patterns
                </motion.button>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-12 flex flex-wrap justify-center gap-8 lg:justify-start"
              >
                <div className="text-center lg:text-left">
                  <div className="font-bold text-3xl text-color-primary">7</div>
                  <div className="text-sm text-text-secondary">Sections</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="font-bold text-3xl text-color-primary">
                    30+
                  </div>
                  <div className="text-sm text-text-secondary">Patterns</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="font-bold text-3xl text-color-primary">
                    100%
                  </div>
                  <div className="text-sm text-text-secondary">
                    Reusable classes
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative flex-1"
            >
              <div className="relative mx-auto w-full max-w-lg">
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotateY: [0, 10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-36 -right-4 h-96 w-64 rotate-6 transform rounded-2xl border border-border-color bg-gradient-to-br from-bg-surface to-bg-surface-light p-6 opacity-30 shadow-[var(--shadow-card)] md:opacity-100 2xl:-right-82 2xl:h-[36rem] 2xl:w-[25rem]"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-color-primary/20">
                      <BookOpen className="h-6 w-6 text-color-primary" />
                    </div>
                    <div>
                      <div className="font-bold text-2xl text-color-primary">
                        Tokens
                      </div>
                      <div className="text-text-secondary text-xs">
                        Color and typography
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="h-2 w-full rounded-full bg-primary-crx/50" />
                    <div className="h-2 w-4/5 rounded-full bg-primary-crx/40" />
                    <div className="h-2 w-3/5 rounded-full bg-primary-crx/20" />
                  </div>

                  <div className="relative mt-2 h-[70%] w-full">
                    <div className="absolute bottom-0 w-full rounded-2xl bg-black/60 p-2">
                      <p className="mb-2 font-medium text-white/80 text-xs">
                        Hierarchy, rhythm, readability
                      </p>
                      <h3 className="mb-3 line-clamp-2 font-bold text-sm text-white">
                        Typography system preview
                      </h3>
                    </div>

                    <OptimizedImage
                      alt="Typography poster"
                      src="/images/placeholder-movies.webp"
                      width={600}
                      height={600}
                      className="h-full w-full rounded-2xl object-cover"
                      fallbackSrc="/images/placeholder-movies.webp"
                    />
                  </div>
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, 10, 0],
                    rotateY: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="absolute -bottom-18 left-12 h-96 w-64 -rotate-6 transform rounded-2xl border border-border-color bg-gradient-to-br from-bg-surface-light to-bg-surface p-6 opacity-30 shadow-[var(--shadow-card)] md:-left-6 md:opacity-100 2xl:-bottom-36 2xl:h-[36rem] 2xl:w-[25rem]"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-color-like/20">
                      <Sparkles className="h-6 w-6 text-color-like" />
                    </div>
                    <div>
                      <div className="font-bold text-lg text-text-primary">
                        Motion
                      </div>
                      <div className="text-text-secondary text-xs">
                        Hover, reveal, floating
                      </div>
                    </div>
                  </div>

                  <div className="relative h-[80%] w-full">
                    <div className="absolute bottom-0 w-full rounded-2xl bg-black/60 p-2">
                      <p className="mb-2 font-medium text-white/80 text-xs">
                        Entrance and interaction states
                      </p>
                      <h3 className="mb-3 line-clamp-2 font-bold text-sm text-white">
                        Animated components
                      </h3>
                    </div>

                    <OptimizedImage
                      alt="Motion poster"
                      src="/images/placeholder-old-movies.webp"
                      width={600}
                      height={600}
                      className="h-full w-full rounded-2xl object-cover"
                      fallbackSrc="/images/placeholder-old-movies.webp"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex h-10 w-6 justify-center rounded-full border-2 border-primary-crx pt-2">
            <div className="h-2 w-1 rounded-full bg-primary-crx" />
          </div>
        </motion.div>
      </section>

      <section id="typography" className="scroll-mt-24 bg-bg-body py-24">
        <div className="container mx-auto px-6">
          <SectionHeader
            badge="<TYPE_SCALE />"
            titleLineOne="Typography scale"
            titleLineTwo="for hierarchy and rhythm"
            description="This section uses the same classes already present in the landing and product screens."
          />

          <div className="overflow-hidden rounded-2xl border border-border-color bg-bg-surface">
            {typographyRows.map((row) => (
              <div
                key={row.name}
                className="grid gap-4 border-border-color border-b px-6 py-6 last:border-b-0 md:grid-cols-[220px_1fr_120px] md:items-center"
              >
                <div className="font-semibold text-text-primary">
                  {row.name}
                </div>
                <div>{row.preview}</div>
                <div className="text-right font-mono text-text-secondary text-xs">
                  {row.spec}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="colors" className="scroll-mt-24 bg-bg-surface py-24">
        <div className="container mx-auto px-6">
          <SectionHeader
            badge="<COLOR_SURFACES />"
            titleLineOne="Colors and surfaces"
            titleLineTwo="with real token usage"
            description="Swatches below are rendered with existing token classes from globals.css."
          />

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-border-color bg-bg-body">
              <CardHeader>
                <CardTitle className="font-display text-2xl">
                  Background hierarchy
                </CardTitle>
                <CardDescription>
                  Page, section and card surfaces in descending contrast.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-xl border border-border-color bg-bg-body p-4">
                  <span className="text-sm text-text-secondary">
                    Body background
                  </span>
                  <span className="font-mono text-xs">bg-bg-body</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-border-color bg-bg-surface p-4">
                  <span className="text-sm text-text-secondary">
                    Surface background
                  </span>
                  <span className="font-mono text-xs">bg-bg-surface</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-border-color bg-bg-surface-light p-4">
                  <span className="text-sm text-text-secondary">
                    Surface light
                  </span>
                  <span className="font-mono text-xs">bg-bg-surface-light</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-border-color bg-bg-surface/70 p-4 backdrop-blur-xl">
                  <span className="text-sm text-text-secondary">
                    Glass surface
                  </span>
                  <span className="font-mono text-xs">
                    bg-bg-surface/70 + backdrop-blur-xl
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border-color bg-bg-body">
              <CardHeader>
                <CardTitle className="font-display text-2xl">
                  Brand gradients and accents
                </CardTitle>
                <CardDescription>
                  Primary blends used in CTA, hero and section titles.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-xl border border-border-color p-4">
                  <div className="mb-3 h-10 rounded-lg bg-gradient-to-r from-primary-crx via-yellow-500 to-primary-hover-crx" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">
                      Primary brand gradient
                    </span>
                    <span className="font-mono text-xs">
                      from-primary-crx via-yellow-500 to-primary-hover-crx
                    </span>
                  </div>
                </div>

                <div className="rounded-xl border border-border-color p-4">
                  <div className="mb-3 h-10 rounded-lg bg-gradient-to-r from-amber-600 to-primary-hover-crx/60" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">
                      CTA button gradient
                    </span>
                    <span className="font-mono text-xs">
                      from-amber-600 to-primary-hover-crx/60
                    </span>
                  </div>
                </div>

                <div className="rounded-xl border border-border-color p-4">
                  <div className="mb-3 h-10 rounded-lg border border-border-color bg-purple-900/90" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">
                      Secondary dark action
                    </span>
                    <span className="font-mono text-xs">bg-purple-900/90</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="components" className="scroll-mt-24 bg-bg-body py-24">
        <div className="container mx-auto px-6">
          <SectionHeader
            badge="<UI_COMPONENTS />"
            titleLineOne="Component primitives"
            titleLineTwo="and interaction states"
            description="Base UI is rendered with the current app components and utility classes."
          />

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-border-color bg-bg-surface">
              <CardHeader>
                <CardTitle className="font-display text-2xl">Buttons</CardTitle>
                <CardDescription>
                  Default, outline, ghost, disabled and custom landing actions.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center gap-3">
                <Button>Default</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button disabled>Disabled</Button>

                <button
                  type="button"
                  className="flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-600 to-primary-hover-crx/60 px-6 py-3 font-semibold text-sm transition-all"
                >
                  Landing CTA
                </button>
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-full border border-border-color bg-purple-900/90 px-6 py-3 font-semibold text-sm text-text-primary transition-all"
                >
                  Secondary Action
                </button>
              </CardContent>
            </Card>

            <Card className="border-border-color bg-bg-surface">
              <CardHeader>
                <CardTitle className="font-display text-2xl">Inputs</CardTitle>
                <CardDescription>
                  Input examples with default, focus-like and invalid states.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ds-default">Default input</Label>
                  <Input
                    id="ds-default"
                    placeholder="Search for movies or series"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ds-focus">Focus state (preview)</Label>
                  <Input
                    id="ds-focus"
                    placeholder="Typing state"
                    className="border-ring ring-[3px] ring-ring/50"
                    value="Interstellar"
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ds-error">Error state (aria-invalid)</Label>
                  <Input
                    id="ds-error"
                    placeholder="Invalid email"
                    aria-invalid
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border-color bg-bg-surface">
              <CardHeader>
                <CardTitle className="font-display text-2xl">Cards</CardTitle>
                <CardDescription>
                  Information density and spacing within card components.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <Card className="border-border-color bg-bg-surface-light">
                  <CardHeader>
                    <CardTitle>Standard Card</CardTitle>
                    <CardDescription>
                      Base card using app token colors.
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Badge>Active</Badge>
                  </CardFooter>
                </Card>

                <Card className="border-primary-crx/40 bg-bg-surface-light shadow-[0_0_20px_rgba(255,193,7,0.15)]">
                  <CardHeader>
                    <CardTitle>Highlighted Card</CardTitle>
                    <CardDescription>
                      Accent border and glow from the landing language.
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Badge variant="secondary">Featured</Badge>
                  </CardFooter>
                </Card>
              </CardContent>
            </Card>

            <Card className="border-border-color bg-bg-surface">
              <CardHeader>
                <CardTitle className="font-display text-2xl">
                  Badges and status tags
                </CardTitle>
                <CardDescription>
                  Small semantic markers with current variant system.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center gap-3">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <span className="inline-flex items-center gap-2 rounded-full border border-primary-crx/30 bg-primary-crx/10 px-3 py-1 text-primary-crx text-xs">
                  <span className="h-2 w-2 rounded-full bg-primary-crx" />
                  Custom tech badge
                </span>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="layout" className="scroll-mt-24 bg-bg-surface py-24">
        <div className="container mx-auto px-6">
          <SectionHeader
            badge="<LAYOUT_PATTERNS />"
            titleLineOne="Layout and spacing"
            titleLineTwo="using real container rules"
            description="Examples below mirror hero split, feature grid and content split patterns from the site."
          />

          <div className="space-y-6">
            <Card className="border-border-color bg-bg-body">
              <CardHeader>
                <CardTitle className="font-display text-2xl">
                  Pattern 1: Hero split
                </CardTitle>
                <CardDescription>
                  Large text area and visual area with strong vertical breathing
                  room.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid items-center gap-8 rounded-2xl border border-border-color bg-bg-surface p-6 lg:grid-cols-2">
                  <div>
                    <h3 className="mb-4 font-display font-bold text-3xl">
                      Text block
                    </h3>
                    <p className="text-text-secondary">
                      Uses the same spacing logic from landing hero: large
                      heading, medium paragraph and grouped actions.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border-color bg-bg-surface-light p-4">
                    <OptimizedImage
                      alt="Layout pattern hero"
                      src="/images/placeholder-image-carrousel.webp"
                      width={720}
                      height={420}
                      className="h-52 w-full rounded-xl object-cover"
                      fallbackSrc="/images/placeholder-image-carrousel.webp"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border-color bg-bg-body">
              <CardHeader>
                <CardTitle className="font-display text-2xl">
                  Pattern 2: Feature grid
                </CardTitle>
                <CardDescription>
                  One to three columns responsive structure used in feature
                  sections.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={`grid-${index + 1}`}
                      className="rounded-2xl border border-border-color bg-bg-surface p-6"
                    >
                      <div className="mb-4 h-10 w-10 rounded-lg bg-gradient-to-br from-primary-crx to-primary-hover-crx" />
                      <h4 className="mb-2 font-semibold text-text-primary">
                        Grid item {index + 1}
                      </h4>
                      <p className="text-sm text-text-secondary">
                        Consistent paddings and vertical rhythm across cards.
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border-color bg-bg-body">
              <CardHeader>
                <CardTitle className="font-display text-2xl">
                  Pattern 3: Content split
                </CardTitle>
                <CardDescription>
                  Asymmetric content split used for narrative + media sections.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 rounded-2xl border border-border-color bg-bg-surface p-6 md:grid-cols-[1.4fr_1fr]">
                  <div className="rounded-xl border border-border-color bg-bg-surface-light p-5">
                    <p className="mb-3 font-semibold text-text-primary">
                      Long content column
                    </p>
                    <p className="text-sm text-text-secondary">
                      This side keeps editorial copy and metadata. It uses wider
                      measure and comfortable line height.
                    </p>
                  </div>
                  <div className="rounded-xl border border-border-color bg-bg-surface-light p-5">
                    <p className="mb-3 font-semibold text-text-primary">
                      Support panel
                    </p>
                    <p className="text-sm text-text-secondary">
                      Secondary controls, context or media previews can live
                      here.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="motion" className="scroll-mt-24 bg-bg-body py-24">
        <div className="container mx-auto px-6">
          <SectionHeader
            badge="<MOTION_INTERACTION />"
            titleLineOne="Motion and interactions"
            titleLineTwo="from landing behavior"
            description="Entrance reveals, hover lift, gradient shimmer and looped floating effects."
          />

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-border-color bg-bg-surface">
              <CardHeader>
                <CardTitle className="font-display text-2xl">
                  Interaction examples
                </CardTitle>
                <CardDescription>
                  Direct examples from button and card interaction model.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="rounded-xl border border-color bg-surface-crx p-4"
                >
                  Entrance animation (fade + slide)
                </motion.div>

                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 24px rgba(255,193,7,0.4)",
                  }}
                  whileTap={{ scale: 0.96 }}
                  className="w-full rounded-full bg-gradient-to-r from-primary-crx to-primary-hover-crx px-6 py-3 font-semibold text-on-primary-crx"
                >
                  Hover and tap feedback
                </motion.button>

                <motion.div
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="rounded-xl border border-border-color bg-bg-surface-light p-4 transition-all hover:border-primary-crx/50"
                >
                  Lift on hover with accent border
                </motion.div>
              </CardContent>
            </Card>

            <Card className="border-border-color bg-bg-surface">
              <CardHeader>
                <CardTitle className="font-display text-2xl">
                  Motion gallery
                </CardTitle>
                <CardDescription>
                  Utility animation classes and looped motion in one panel.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-border-color bg-bg-surface-light p-4">
                    <div className="mb-3 h-14 rounded-lg bg-primary-crx/20 animate-pulse" />
                    <p className="font-mono text-text-secondary text-xs">
                      animate-pulse
                    </p>
                  </div>

                  <div className="rounded-xl border border-border-color bg-bg-surface-light p-4">
                    <div className="mb-3 h-14 rounded-lg bg-gradient-to-r from-primary-crx via-yellow-500 to-primary-hover-crx animate-gradient-x" />
                    <p className="font-mono text-text-secondary text-xs">
                      animate-gradient-x
                    </p>
                  </div>

                  <div className="rounded-xl border border-border-color bg-bg-surface-light p-4">
                    <div className="mb-3 h-14 rounded-full bg-info-crx animate-blob " />
                    <p className="font-mono text-text-secondary text-xs ">
                      animate-blob
                    </p>
                  </div>

                  <div className="rounded-xl border border-border-color bg-bg-surface-light p-4">
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{
                        duration: 2.2,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                      className="mb-3 h-14 rounded-lg bg-success-crx/25"
                    />
                    <p className="font-mono text-text-secondary text-xs">
                      framer-motion loop
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="icons" className="scroll-mt-24 bg-bg-surface py-24">
        <div className="container mx-auto px-6">
          <SectionHeader
            badge="<ICON_SYSTEM />"
            titleLineOne="Icon language"
            titleLineTwo="lucide with token colors"
            description="The product uses Lucide icons with inherited color and size utilities."
          />

          <Card className="border-border-color bg-bg-body">
            <CardHeader>
              <CardTitle className="font-display text-2xl">
                Icon set and size variants
              </CardTitle>
              <CardDescription>
                Each icon inherits text color from utility classes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {icons.map((Icon, index) => (
                  <div
                    key={`icon-${index + 1}`}
                    className="rounded-xl border border-border-color bg-bg-surface p-4 text-center"
                  >
                    <div className="mb-3 flex items-center justify-center gap-3">
                      <Icon className="h-4 w-4 text-text-secondary" />
                      <Icon className="h-5 w-5 text-primary-crx" />
                      <Icon className="h-6 w-6 text-color-info" />
                    </div>
                    <p className="text-text-secondary text-xs">
                      sizes: 16 / 20 / 24
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="justify-between border-border-color border-t pt-6">
              <p className="text-text-secondary text-sm">
                Icons are decorative by default and should use semantic labels
                when interactive.
              </p>
              <Badge variant="outline">Lucide React</Badge>
            </CardFooter>
          </Card>
        </div>
      </section>
    </main>
  );
}
