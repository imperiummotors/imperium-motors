import '../style.css';
import { playfair, inter, cormorant } from '../lib/fonts';

export default function App({ Component, pageProps }) {
  return (
    <div className={`${playfair.variable} ${inter.variable} ${cormorant.variable}`}>
      <Component {...pageProps} />
    </div>
  );
}
