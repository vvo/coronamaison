import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const maybeLang = ctx.pathname.split("/")[1];
    return { ...initialProps, lang: maybeLang === "en" ? "en" : "fr" };
  }

  // just in case, you can't use render({lang}) here, it's a class component
  render() {
    return (
      <Html className="scrollJumpFix" lang={this.props.lang}>
        <Head>
          <meta charSet="utf-8" />
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link
            href="https://fonts.googleapis.com/css2?family=Gochi+Hand&family=Roboto&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="rice bg-yellow-500">
          <Main />
          <NextScript />
        </body>
        <script
          async
          defer
          src="https://cdn.simpleanalytics.io/hello.js"
        ></script>
        <noscript>
          <img src="https://api.simpleanalytics.io/hello.gif" alt="" />
        </noscript>
      </Html>
    );
  }
}

export default MyDocument;
