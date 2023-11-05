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





// const post = g.model('Post', {
//   title: g.string(),
//   slug: g.string().unique(),
//   content: g.string().optional(),
//   publishedAt: g.datetime().optional(),
//   comments: g.relation(() => comment).optional().list().optional(),
//   likes: g.int().default(0),
//   tags: g.string().optional().list().length({ max: 5 }),
//   author: g.relation(() => user).optional()
// }).search()

// const comment = g.model('Comment', {
//   post: g.relation(post),
//   body: g.string(),
//   likes: g.int().default(0),
//   author: g.relation(() => user).optional()
// })

// Define the Comment model using mongo.model
const commentModel = mongo.model('Comment', {
  //post: g.relation('Post').optional() as any,
  body: g.string(),
  likes: g.int().default(0),
  //author: g.relation('User').optional() as any,

  post: g.relation(() => postModel).optional() as any,
  author: g.relation(() => userModel).optional() as any,
});


// Define the Post model using mongo.model
const postModel = mongo.model('Post', {
  title: g.string(),
  slug: g.string().unique(),
  content: g.string().optional(),
  publishedAt: g.datetime().optional(),
  //comments: g.relation(commentModel).optional().list() as any,
  likes: g.int().default(0),
  tags: g.string().optional().list().length({ max: 5 }),
  //author: g.relation(userModel).optional() as any,
  comments: g.relation(() => commentModel).optional().list() as any,
  author: g.relation(() => userModel).optional() as any,
});




// Define the User model using mongo.model
const userModel = mongo.model('User', { 
  name: g.string(),
  email: g.email().optional(),
  //posts: g.relation(postModel).optional().list() as any,
  //comments: g.relation(commentModel).optional().list() as any,

  posts: g.relation(() => postModel).optional().list() as any,
  comments: g.relation(() => commentModel).optional().list() as any,
});







// const user = g.model('User', {
//   name: g.string(),
//   email: g.email().optional(),
//   posts: g.relation(post).optional().list(),
//   comments: g.relation(comment).optional().list()

//   // Extend models with resolvers
//   // https://grafbase.com/docs/edge-gateway/resolvers
//   // gravatar: g.url().resolver('user/gravatar')
// })




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
