import { useLang } from "../i18n";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="footer">
      <p className="footer-left">
        {t.footer.left} <span className="footer-underline"><a href="https://duhhh.school" target="_blank" rel="noopener noreferrer">{t.footer.duhhh}</a></span>
      </p>
      <div className="footer-links">
        <a href="https://duhhh.co"  target="_blank" rel="noopener noreferrer">{t.footer.about}</a>
        <a href="https://www.duhhh.school/en/privacy-poilcy" target="_blank" rel="noopener noreferrer">{t.footer.privacy}</a>
        <a href={`mailto:${t.footer.email}`}>{t.footer.email}</a>
      </div>
    </footer>
  );
}
