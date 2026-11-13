import { LangProvider } from "./i18n";
import Hero from "./components/Hero";
import WhyNow from "./components/WhyNow";
import ReadTalk from "./components/ReadTalk";
import KeyThemes from "./components/KeyThemes";
import Rules from "./components/Rules";
import IsNot from "./components/IsNot";
import Papers from "./components/Papers";
import Facil from "./components/Facil";
import Join from "./components/Join";
import Footer from "./components/Footer";

export default function App() {
  return (
    <LangProvider>
      <main>
        <Hero />
        <WhyNow />
        <ReadTalk />
        <KeyThemes />
        <Rules />
        <IsNot />
        <Papers />
        <Facil />
        <Join />
      </main>
      <Footer />
    </LangProvider>
  );
}
