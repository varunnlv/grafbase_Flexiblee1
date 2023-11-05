import { g, config, auth } from '@grafbase/sdk';

// @ts-ignore
// @deprecated The Grafbase database is deprecated and will be sunset soon. Use connectors like Postgres or MongoDB instead.
const User = g.model('User', {
  name: g.string().length({ min: 2, max: 100 }),
  email: g.string().unique(),
  avatarUrl: g.url(),
  description: g.string().length({ min: 2, max: 1000 }).optional(),
  githubUrl: g.url().optional(),
  linkedinUrl: g.url().optional(), 
  projects: g.relation(() => Project).list().optional(),
})

// @ts-ignore
// @ts-ignore
// @deprecated The Grafbase database is deprecated and will be sunset soon. Use connectors like Postgres or MongoDB instead.
const Project = g.model('Project', {
  title: g.string().length({ min: 3 }),
  description: g.string(), 
  image: g.url(),
  liveSiteUrl: g.url(), 
  githubUrl: g.url(), 
  category: g.string().search(),
  createdBy: g.relation(() => User),
})

// @ts-ignore
// @deprecated The Grafbase database is deprecated and will be sunset soon. Use connectors like Postgres or MongoDB instead.
export default config({
  schema: g
})

