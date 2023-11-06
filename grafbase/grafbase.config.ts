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

const address = g.type('Address', {
  street: g.string().mapped('street_name')
})


// @ts-ignore
// const Project = mongo.model('Project', {
//   title: g.string(),
//   description: g.string(), 
//   image: g.url(),
//   liveSiteUrl: g.url(), 
//   githubUrl: g.url(), 
//   //category: g.string().search(),
//   //createdBy: g.relation(() => User),
// }).collection('projects');


// const project2 = g.type('project2', {
//   title: g.string(),
//   description: g.string(), 
//   image: g.url(),
//   liveSiteUrl: g.url(), 
//   githubUrl: g.url(), 
//   //createdBy: g.relation(() => User).list().optional(),
// })

const User = mongo
  .model('User', {
    name: g.string(),
    email: g.string().optional(),
    //address: g.ref(address),
    avatarUrl: g.url(),
    description: g.string().length({ min: 2, max: 1000 }).optional(),
    githubUrl: g.url().optional(),
    linkedinUrl: g.url().optional(), 
    //projects: g.ref(project2),
  })
  .collection('users').auth((rules) => {
    rules.public().read()
  });





// @ts-ignore
// const User = mongo.model('User', {
//   name: g.string().length({ min: 2, max: 100 }),
//   email: g.string().unique(),
//   avatarUrl: g.url(),
//   description: g.string().length({ min: 2, max: 1000 }).optional(),
//   githubUrl: g.url().optional(),
//   linkedinUrl: g.url().optional(), 
//   projects: g.relation(() => Project).list().optional() as any,
// }).collection('users')


g.datasource(mongo)

const jwt = auth.JWT({
  issuer: 'grafbase',
  secret:  g.env('NEXTAUTH_SECRET')
})

export default config({
  schema: g,
  auth: {
    providers: [jwt],
    rules: (rules) => rules.private()
  },
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
