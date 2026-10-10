export const metadata = { title: "Privacy Policy - Lotus" };

export default function Page() {
  return (
    <section className="doc mx-auto w-full max-w-3xl px-4 py-10 sm:py-14">
      <div className="page-card">
    <h1>Privacy Policy</h1>
    <p className="effective">Last updated: September 7, 2026</p>

    <p>This Privacy Policy explains how information is collected, used, and shared in connection with Lotus (the &quot;Software&quot;) and this download website (the &quot;Site&quot;). Lotus is built around the idea that your browsing is your own business, so we&apos;ve tried to keep our data collection to the minimum needed to make the Software work.</p>

    <nav className="toc" aria-label="Table of contents">
      <p className="toc-title">On this page</p>
      <ol>
        <li><a href="#overview">1. Overview</a></li>
        <li><a href="#site-data">2. Information collected by this website</a></li>
        <li><a href="#browser-data">3. Information collected by Lotus</a></li>
        <li><a href="#local-data">4. Data that stays on your device</a></li>
        <li><a href="#third-party">5. Third-party services (DuckDuckGo &amp; websites you visit)</a></li>
        <li><a href="#sharing">6. How we share information</a></li>
        <li><a href="#security">7. Data security</a></li>
        <li><a href="#retention">8. Data retention</a></li>
        <li><a href="#children">9. Children&apos;s privacy</a></li>
        <li><a href="#rights">10. Your choices and rights</a></li>
        <li><a href="#changes">11. Changes to this policy</a></li>
        <li><a href="#contact">12. Contact</a></li>
      </ol>
    </nav>

    <h2 id="overview">1. Overview</h2>
    <p>Lotus is a locally-installed desktop browser. Most of what it does — rendering pages, storing your tabs, bookmarks, history, and downloads — happens entirely on your own device and is never sent to us. The sections below break down the limited exceptions to that.</p>

    <h2 id="site-data">2. Information collected by this website</h2>
    <p>When you visit this Site to download Lotus, our web host may automatically log standard technical information, such as your IP address, browser type, operating system, referring page, and the pages you view, for the purpose of operating the Site and understanding aggregate traffic. This Site does not use advertising trackers or sell any data collected here.</p>

    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr><th>Data</th><th>Purpose</th></tr>
        </thead>
        <tbody>
          <tr><td>IP address, browser/OS info</td><td>Basic server logs and security (e.g. detecting abuse)</td></tr>
          <tr><td>Pages visited on this Site</td><td>Understanding which pages get used, in aggregate</td></tr>
          <tr><td>Download event (file requested)</td><td>Measuring how many times Lotus has been downloaded</td></tr>
        </tbody>
      </table>
    </div>

    <h2 id="browser-data">3. Information collected by Lotus</h2>
    <p>The Lotus application itself does not phone home with your browsing activity. We do not operate analytics or telemetry inside the Software that reports which sites you visit, what you search for, or what you download through the browser. If a future version of Lotus introduces optional crash reporting or update checks, that data will be limited to technical diagnostic information (such as app version and crash details) and will be described in an update to this policy before it is enabled.</p>

    <h2 id="local-data">4. Data that stays on your device</h2>
    <p>Lotus stores the following information locally, on your own computer, in the same way most browsers do:</p>
    <ul>
      <li>Bookmarks and the bookmarks bar</li>
      <li>Browsing history</li>
      <li>Downloads shelf history</li>
      <li>Settings, such as tracker blocking, HTTPS-only mode, and pop-up blocking preferences</li>
      <li>Cookies and site data set by the websites you visit</li>
    </ul>
    <p>This local data is not transmitted to us. You can clear it at any time from within Lotus&apos;s settings.</p>

    <h2 id="third-party">5. Third-party services (DuckDuckGo &amp; websites you visit)</h2>
    <p>The address bar and new tab search in Lotus are powered by DuckDuckGo. Searches you run are sent to DuckDuckGo in order to return results, subject to DuckDuckGo&apos;s own privacy policy, which we encourage you to review. Any website you navigate to in Lotus is operated independently of us and has its own privacy practices and cookies; we have no access to your activity on those sites.</p>

    <h2 id="sharing">6. How we share information</h2>
    <p>We do not sell personal information. We may share the limited server-log data described in Section 2 with service providers who host this Site (for example, our hosting or CDN provider), solely to operate and secure the Site, or if required to comply with a legal obligation such as a valid subpoena.</p>

    <h2 id="security">7. Data security</h2>
    <p>We take reasonable measures to protect the limited data described in this policy, including serving downloads over HTTPS. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.</p>

    <h2 id="retention">8. Data retention</h2>
    <p>Server logs described in Section 2 are retained only as long as necessary for the purposes described above and are periodically deleted or aggregated. Data stored locally by Lotus on your device (Section 4) is retained until you delete it or uninstall the Software.</p>

    <h2 id="children">9. Children&apos;s privacy</h2>
    <p>This Site and the Software are not directed to children under 13, and we do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us so we can remove it.</p>

    <h2 id="rights">10. Your choices and rights</h2>
    <p>Depending on where you live, you may have rights to access, correct, or delete personal information we hold about you, or to object to certain processing. Because we collect very little identifiable information in the first place, most of your browsing data (history, bookmarks, cookies) is already entirely in your control locally within Lotus&apos;s settings. For anything else, you can reach us using the contact details below.</p>

    <h2 id="changes">11. Changes to this policy</h2>
    <p>We may update this Privacy Policy from time to time to reflect changes in the Software, the Site, or applicable law. We will update the &quot;Last updated&quot; date above when we do, and material changes will be noted on this page.</p>

    <h2 id="contact">12. Contact</h2>
    <p>Questions about this Privacy Policy, or requests relating to your data, can be sent to <a href="mailto:staydrifting@voltaccept.com">staydrifting@voltaccept.com</a>.</p>
  </div>
    </section>
  );
}
