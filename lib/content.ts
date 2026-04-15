// lib/content.ts
// All landing page copy lives here. Edit text without touching JSX.

export const content = {
  meta: {
    tagline: 'Prompt In. Silicon Out.',
  },

  hero: {
    eyebrow: 'A new kind of semiconductor company',
    headline: {
      before: "We're rethinking",
      emphasis: 'how chips',
      after: 'get built.',
    },
    sub: 'We build production tools for chip designers today — and the design intelligence for tomorrow. Two efforts. One belief: silicon should be as easy to create as software.',
    primaryCta: 'Join the Waitlist',
    secondaryCta: 'See what we\'re building',
    scrollTo: '#problem',
    tagline: 'Prompt In. Silicon Out.',
  },

  premise: {
    marker: '01',
    label: 'The Premise',
    paragraphs: [
      'Every breakthrough now depends on custom silicon. The phone in your pocket, the model you just trained, the car that drove itself here — all of it, ultimately, lives on a chip no larger than your thumbnail.',
      'The tools to design that chip haven\'t fundamentally changed in decades. They\'re expensive, fragmented, and built for a world where only the largest companies could afford to try.',
      'We saw two ways to fix this. We\'re doing both.',
    ],
  },

  twoPaths: {
    marker: '02',
    label: 'Two Halves, One Vision',
    left: {
      number: '01',
      title: 'Build with us today',
      description: 'Production tools that solve real, painful problems for chip design teams — shipping now.',
      items: ['FlowBit — visual workflow orchestration', 'VisUPF — power-aware design, made visual', 'More shipping every quarter'],
    },
    right: {
      number: '02',
      title: 'Imagine with us tomorrow',
      description: 'A new way to design silicon. Start from intent, not implementation.',
      items: ['Natural language to verified RTL', 'Automated formal verification', 'Intent-driven physical design'],
    },
  },

  buildToday: {
    marker: '03',
    label: 'What We Ship',
    tools: [
      {
        name: 'FlowBit',
        badge: 'Proprietary' as const,
        tagline: 'Visual workflow orchestration for chip design.',
        description: 'Replace fragile Makefile-based flows with a visual canvas. Drag, connect, run — and never debug a shell script at 2 AM again.',
        cta: 'Request a Demo',
        href: '/tools/flowbit',
      },
      {
        name: 'VisUPF',
        badge: 'Open Source' as const,
        tagline: 'Power-aware design, made visual.',
        description: 'Author and validate UPF specifications through an intuitive visual interface. No more hand-editing hundreds of lines of power intent.',
        cta: 'Download',
        href: '/tools/visupf',
      },
      {
        name: 'More tools',
        badge: 'Coming Q3' as const,
        tagline: 'The toolkit grows every quarter.',
        description: 'We\'re building the tools we wish existed. Get early access to shape what ships next.',
        cta: 'Request Access',
        href: '',
      },
    ],
  },

  imagineTomorrow: {
    marker: '04',
    label: 'Where This Is Going',
    description: 'Describe what you need. Get verified silicon.',
    prompt: 'Design a 4-bit ALU with carry lookahead, registered outputs, and async reset.',
    stages: [
      {
        label: 'Understanding intent',
        lines: [
          'Parsing natural-language specification…',
          'Identified: 4-bit ALU · carry lookahead · registered outputs · async reset',
          'Mapping to micro-architecture template → alu_cla_registered',
        ],
      },
      {
        label: 'Generating RTL',
        lines: [
          'module alu_4bit (',
          '  input  wire [3:0] a, b,',
          '  input  wire [2:0] op,',
          '  input  wire       clk, rst_n,',
          '  output reg  [3:0] result,',
          '  output reg        carry_out,',
          '  output reg        zero_flag',
          ');',
        ],
      },
      {
        label: 'Running verification',
        lines: [
          'Generating testbench → tb_alu_4bit.sv',
          'Running formal checks… 17 / 17 properties',
          'Coverage: statement 98.2% · branch 94.7% · toggle 91.3%',
        ],
      },
      {
        label: 'Synthesis complete',
        lines: [
          'Synthesising → Yosys (target: sky130)',
          'Area: 412 cells · Max freq: 285 MHz',
          'Output: alu_4bit.v · tb_alu_4bit.sv · alu_4bit_synth.json · alu_4bit.sdc',
        ],
      },
    ],
    statusLine: 'All 17 properties verified. 4 files generated. 0 violations.',
    note: 'Early access — 2026.',
  },

  whyMatters: {
    marker: '05',
    label: 'Why This Matters',
    reasons: [
      {
        quote: 'Silicon is now the bottleneck.',
        body: 'Every frontier industry — AI, autonomy, biotech, space — is constrained by one thing: custom silicon, and the ability to get it built fast enough. Demand for chips has outrun the supply of people who know how to design them.',
      },
      {
        quote: 'The tooling layer is finally open enough to reimagine.',
        body: 'For decades, chip design tools were closed systems. That era is ending. Open standards, open PDKs, and open-source EDA have cracked the door — and we\'re walking through it.',
      },
      {
        quote: 'A new generation won\'t accept the status quo.',
        body: 'Engineers are entering this field and asking: why does chip design feel like 1995? They\'re right to ask. The tools should meet designers where they are.',
      },
    ],
  },

  founders: {
    marker: '06',
    label: 'The Team',
    headline: 'Built by people who understand the problem.',
    subtitle: 'We\'re VLSI and electronic engineers. We got tired of the status quo. So we\'re building what we wish existed.',
    people: [
      {
        initials: 'RM',
        name: 'Rakshit Mishra',
        role: 'Co-founder & CEO',
        bio: 'Final-year student at BITS Pilani Goa. Background spanning embedded systems, edge AI, industrial automation, and chip design. Focused on go-to-market, fundraising, and product strategy.',
        phone: '+91 8928263049',
        email: 'f20220056@goa.bits-pilani.ac.in',
        linkedin: 'https://www.linkedin.com/in/rakshitmishra9695/',
      },
      {
        initials: 'PP',
        name: 'Parth Parekh',
        role: 'Co-founder & CTO',
        bio: 'BITS Pilani. Leading EasyChip\'s core AI and RTL generation engine. Focused on model architecture, training infrastructure, and verification pipeline.',
        phone: '+91 9920657980',
        email: 'f20220687@goa.bits-pilani.ac.in',
        linkedin: 'https://www.linkedin.com/in/parth-parekh-131820357/',
      },
    ],
  },

  horizon: {
    line: 'This is where it starts.',
  },

  finalCta: {
    headline: 'Ready to build?',
    sub: 'Join the waitlist for early access, or book a call with the founding team.',
    primaryCta: 'Join the Waitlist',
    secondaryCta: 'Book a Meeting',
    secondaryHref: '/book',
  },
}
