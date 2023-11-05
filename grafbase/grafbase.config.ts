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


// Define the Post model using mongo.model
// const postModel = mongo.model('Post', {
//   title: g.string(),
//   slug: g.string().unique(),
//   content: g.string().optional(),
//   publishedAt: g.datetime().optional(),
//   //comments: g.relation(commentModel).optional().list() as any,
//   likes: g.int().default(0),
//   tags: g.string().optional().list().length({ max: 5 }),
//   author: g.relation(() => userModel).optional() as any,
// });


// @ts-ignore
const User = mongo.model('User', {
  name: g.string().length({ min: 2, max: 100 }),
  email: g.string().unique(),
  avatarUrl: g.url(),
  description: g.string().length({ min: 2, max: 1000 }).optional(),
  githubUrl: g.url().optional(),
  linkedinUrl: g.url().optional(), 
  projects: g.relation(() => Project).list().optional() as any,
})

// @ts-ignore
const Project = mongo.model('Project', {
  title: g.string().length({ min: 3 }),
  description: g.string(), 
  image: g.url(),
  liveSiteUrl: g.url(), 
  githubUrl: g.url(), 
  //category: g.string().search(),
  createdBy: g.relation(() => User) as any,
})

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
