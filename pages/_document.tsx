import React from 'react';
import Document, { Html, Main, Head, NextScript, DocumentContext } from 'next/document';
import NextHead from 'next/head';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
            rel="stylesheet"
          />
        </Head>
        <NextHead>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta property="og:title" content="rentools.pl - wyszukiwarka wypożyczalni sprzętu budowlanego" />
          <meta property="og:url" content="https://www.imdb.com/title/tt0117500/" />
          <meta property="og:image" content="https://ia.media-imdb.com/images/rock.jpg" />
        </NextHead>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
