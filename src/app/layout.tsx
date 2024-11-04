import "styles/app.scss";

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <title>Virtual 3d Printers</title>
    <body>{children}</body>
  </html>
);

export default RootLayout;
