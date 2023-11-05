import { g, auth, config, connector } from '@grafbase/sdk'

// Welcome to Grafbase!
// Define your data models, integrate auth, permission rules, custom resolvers, search, and more with Grafbase.
// Integrate Auth
// https://grafbase.com/docs/auth
//
// const authProvider = auth.OpenIDConnect({
//   issuer: process.env.ISSUER_URL ?? ''
// })
//
// Define Data Models
// https://grafbase.com/docs/database




const mongo = connector.MongoDB('MongoDB', {
url: g.env('MONGODB_API_URL'),
apiKey: g.env('MONGODB_API_KEY'),
dataSource: g.env('MONGODB_DATASOURCE'),
database: g.env('MONGODB_DATABASE')
})


// @ts-ignore
const User = mongo.model('User', {
  name: g.string().length({ min: 2, max: 100 }),
  email: g.string().unique(),
  avatarUrl: g.url(),
  description: g.string().length({ min: 2, max: 1000 }).optional(),
  githubUrl: g.url().optional(),
  linkedinUrl: g.url().optional(), 
  projects: g.relation(() => Project).list().optional() as any,
}).collection('users')

// @ts-ignore
const Project = mongo.model('Project', {
  title: g.string().length({ min: 3 }),
  description: g.string(), 
  image: g.url(),
  liveSiteUrl: g.url(), 
  githubUrl: g.url(), 
  //category: g.string().search(),
  createdBy: g.relation(() => User) as any,
}).collection('projects')

g.datasource(mongo)

export default config({
  schema: g
})

// export default config({
//   schema: g
//   // Integrate Auth
//   // https://grafbase.com/docs/auth
//   // auth: {
//   //   providers: [authProvider],
//   //   rules: (rules) => {
//   //     rules.private()
//   //   }
//   // }
// })
