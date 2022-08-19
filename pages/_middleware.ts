import { NextMiddleware, NextResponse } from 'next/server'

import Settings from 'settings';

export const middleware: NextMiddleware = async (req) => {
  const { pathname, hostname } = req.nextUrl

  console.log('hostname', hostname, pathname);

  if (hostname.startsWith('www')) {
    return NextResponse.redirect(`${Settings.BASE_URL}${pathname.slice(1, pathname.length)}`)
  }

  return NextResponse.next()
}
