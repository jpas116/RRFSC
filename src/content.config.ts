import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

// Every fact on the site lives in exactly one of these collections.
// Volunteers edit them through the admin UI (see .pages.yml); the pages
// under src/pages read from them, so nothing is typed twice.

const yaml = (dir: string) =>
  glob({ pattern: '**/*.yaml', base: `./src/content/${dir}` });

const sessions = defineCollection({
  loader: yaml('sessions'),
  schema: z.object({
    title: z.string(),
    registrationOpens: z.coerce.date().optional(),
    firstClass: z.coerce.date(),
    lastClass: z.coerce.date(),
    dayAndTime: z.string(),
    price: z.string(),
    priceNote: z.string().optional(),
    classes: z.array(
      z.object({
        name: z.string(),
        ages: z.string(),
        time: z.string(),
        registerUrl: z.string().url(),
      }),
    ),
  }),
});

const coaches = defineCollection({
  loader: yaml('coaches'),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string().optional(),
      photo: z.string().optional(),
      phone: z.string().optional(),
      email: z.string().email().or(z.literal("")).optional(),
      specialties: z.array(z.string()).default([]),
      skatingHistory: z.array(z.string()).default([]),
      coachingExpertise: z.array(z.string()).default([]),
      highestStudentTest: z.string().optional(),
      availableForPrivateLessons: z.boolean().default(true),
      order: z.number().default(100),
    }),
});

const events = defineCollection({
  loader: yaml('events'),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    summary: z.string().optional(),
    registerUrl: z.string().url().optional(),
    image: z.string().optional(),
  }),
});

const faqs = defineCollection({
  loader: yaml('faqs'),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    group: z.enum([
      'Getting started',
      'Coaches and lessons',
      'Skates and gear',
      'Freestyle',
      'Testing and progress',
    ]),
    order: z.number().default(100),
  }),
});

const announcements = defineCollection({
  loader: yaml('announcements'),
  schema: z.object({
    title: z.string(),
    body: z.string(),
    linkUrl: z.string().optional(),
    linkText: z.string().optional(),
    showUntil: z.coerce.date(),
  }),
});

const board = defineCollection({
  loader: yaml('board'),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    email: z.string().email().or(z.literal("")).optional(),
    order: z.number().default(100),
  }),
});

// Single-document settings: club details, freestyle schedule, rates, test info.
const settings = defineCollection({
  loader: yaml('settings'),
  schema: z.any(),
});

export const collections = { sessions, coaches, events, faqs, announcements, board, settings };
