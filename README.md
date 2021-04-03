# Middleware for Next.js API Routes

Next.js released version 9, which added API Routes. This enabled us to write APIs. Currently, Next.js release version 10, but, I think... still, something was missing: **Middleware**. Because the official Next.js docs recommend writing functions inside your [API route handler](https://nextjs.org/docs/api-routes/api-middlewares), there is no easy way to implement it.

So, I write `use-next-middleware`. It's very clean, minimal and composable middleware patterns.

## Installation

Use the package manager **yarn** or **npm** to install `use-next-middleware`.

```bash
yarn install use-next-middleware
```

## Quick Start

```js
import { useNextMiddleware } from 'next-api-middleware'
import { NextApiRequest } from 'next'

const handler = async (req, res) => {
  const { name } = req.user
  const { role } = req.permissions

  res.status(200)
  res.send(`Hello, ${name}, Role is ${role}`)
}

export default useNextMiddleware(
  async (req: NextApiRequest & { user: { name: string } }, res, next) => {
    console.log('Add user.name in request')
    req.user = {
      name: 'Snoop',
    }

    next()
  },

  async (
    req: NextApiRequest & { permissions: { role: string } },
    res,
    next
  ) => {
    console.log('Add permissions.role in request')

    req.permissions = {
      role: 'admin',
    }

    await next()
  }
)(handler)
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

MIT
