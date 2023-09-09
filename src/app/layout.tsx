import "../styles/bootstrap.min.css";
import "../styles/style.css";
import "bootstrap/dist/css/bootstrap.css";
import { NextAuthProvider } from "./sessionProvider";

// type Props = {
//   children: ReactNode;
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAuthProvider>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:300,400&display=swap"
            rel="stylesheet"
          />

          {/* <title>Loasdginsd</title> */}
        </head>
        <body>{children}</body>
      </html>
    </NextAuthProvider>
  );
}
