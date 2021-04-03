import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

export interface NextApiMiddleware {
  (
    req: NextApiRequest,
    res: NextApiResponse,
    next: () => Promise<void>
  ): Promise<void>
}

export function useNextMiddleware(...middleware: NextApiMiddleware[]) {
  return (apiRouteHandler: NextApiHandler): NextApiHandler => {
    return async (req, res) => {
      const execute = ([
        current,
        ...other
      ]: NextApiMiddleware[]): void | Promise<void> => {
        return current(req, res, async (err?: any) => {
          if (err) {
            throw new Error(err)
          }

          return other.length === 0 ? apiRouteHandler(req, res) : execute(other)
        })
      }

      return execute(middleware)
    }
  }
}
