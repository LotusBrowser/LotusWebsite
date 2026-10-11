export const metadata = { title: "Privacy Policy - Lotus" };

export default function Page() {
  return (
    <section className="doc mx-auto w-full max-w-3xl px-4 py-10 sm:py-14">
      <div className="page-card">
    <h1>Privacy Policy</h1>
    <p className="effective">Last updated: October 11, 2026</p>

    <p>This Privacy Policy explains how information is collected, used, and shared in connection with Lotus Browser and SysInfo by Lotus (each a &quot;Product&quot;, together the &quot;Software&quot;), the Lotus share service at share.browselotus.net (the &quot;Share Service&quot;), and this website (the &quot;Site&quot;). Lotus is built around the idea that your data is your own business, so we&apos;ve tried to keep collection to the minimum needed to make each Product work.</p>

    <nav className="toc" aria-label="Table of contents">
      <p className="toc-title">On this page</p>
      <ol>
        <li><a href="#overview">1. Overview</a></li>
        <li><a href="#site-data">2. Information collected by this website</a></li>
        <li><a href="#browser-data">3. Information collected by Lotus Browser</a></li>
        <li><a href="#local-data">4. Lotus Browser data that stays on your device</a></li>
        <li><a href="#sysinfo-data">5. SysInfo: what it collects</a></li>
        <li><a href="#sysinfo-share">6. SysInfo online sharing</a></li>
        <li><a href="#third-party">7. Third-party services</a></li>
        <li><a href="#sharing">8. How we share information</a></li>
        <li><a href="#security">9. Data security</a></li>
        <li><a href="#retention">10. Data retention</a></li>
        <li><a href="#children">11. Children&apos;s privacy</a></li>
        <li><a href="#rights">12. Your choices and rights</a></li>
        <li><a href="#changes">13. Changes to this policy</a></li>
        <li><a href="#contact">14. Contact</a></li>
      </ol>
    </nav>

    <h2 id="overview">1. Overview</h2>
    <p>Both Products are locally-run programs. Lotus Browser renders pages and stores your tabs, bookmarks, history, and downloads on your own device. SysInfo reads your system specifications and writes a report to your own device. Neither Product sends that information to us unless you choose to, and the one place that can happen, SysInfo&apos;s optional online sharing, is described in Section 6.</p>

    <h2 id="site-data">2. Information collected by this website</h2>
    <p>When you visit this Site, our web host may automatically log standard technical information, such as your IP address, browser type, operating system, referring page, and the pages you view, for the purpose of operating the Site and understanding aggregate traffic. This Site does not use advertising trackers or sell any data collected here.</p>

    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr><th>Data</th><th>Purpose</th></tr>
        </thead>
        <tbody>
          <tr><td>IP address, browser/OS info</td><td>Basic server logs and security (e.g. detecting abuse)</td></tr>
          <tr><td>Pages visited on this Site</td><td>Understanding which pages get used, in aggregate</td></tr>
          <tr><td>Download event (file requested)</td><td>Measuring how many times each Product has been downloaded</td></tr>
        </tbody>
      </table>
    </div>

    <p>If you sign in to the Site with Discord to use support tickets, we receive the basic profile details Discord provides (such as your display name and avatar) and store the tickets and messages you submit so we can respond to them.</p>

    <h2 id="browser-data">3. Information collected by Lotus Browser</h2>
    <p>The Lotus Browser application itself does not phone home with your browsing activity. We do not operate analytics or telemetry inside the browser that reports which sites you visit, what you search for, or what you download. If a future version introduces optional crash reporting or update checks, that data will be limited to technical diagnostic information (such as app version and crash details) and will be described in an update to this policy before it is enabled.</p>

    <h2 id="local-data">4. Lotus Browser data that stays on your device</h2>
    <p>Lotus Browser stores the following information locally, on your own computer, in the same way most browsers do:</p>
    <ul>
      <li>Bookmarks and the bookmarks bar</li>
      <li>Browsing history</li>
      <li>Downloads shelf history</li>
      <li>Settings, such as tracker blocking, HTTPS-only mode, and pop-up blocking preferences</li>
      <li>Cookies and site data set by the websites you visit</li>
    </ul>
    <p>This local data is not transmitted to us. You can clear it at any time from within the browser&apos;s settings.</p>

    <h2 id="sysinfo-data">5. SysInfo: what it collects</h2>
    <p>SysInfo is a console utility that reads details about the computer it runs on and turns them into a Markdown report. This can include your processor, memory modules, storage, graphics and displays, motherboard and BIOS/UEFI, operating system, network adapters, battery, audio and USB devices, and platform security status such as Secure Boot and TPM.</p>
    <p>Before the report is written, SysInfo applies a privacy filter that removes your computer name, username, user domain, user profile path, and MAC addresses. The report is saved on your device next to the SysInfo executable. By default, nothing is uploaded and nothing is sent to us.</p>
    <p>The filter is limited to the identifiers listed above. A report still describes your hardware and software in detail, so review it before you share it with anyone.</p>

    <h2 id="sysinfo-share">6. SysInfo online sharing</h2>
    <p>If you run SysInfo with its share option, the filtered report is uploaded to the Share Service, which returns a link that SysInfo copies to your clipboard and opens in your browser. Sharing only happens when you ask for it.</p>
    <ul>
      <li><strong>What is uploaded:</strong> the privacy-filtered report. Shared reports are not intended to include serial numbers, personal names, or network information.</li>
      <li><strong>How it is stored:</strong> under a random identifier, generated by SysInfo on your device and used in the link, rather than under your name. If you set the optional SYSINFO_TOKEN environment variable, it is sent with the upload as an authorization token.</li>
      <li><strong>Who can see it:</strong> the link is unlisted, but anyone who has it can view the report. Treat the link like a public one and only pass it to people you want to see your specs.</li>
      <li><strong>How long it is kept:</strong> reports are stored for 30 days and then removed.</li>
    </ul>
    <p>Like most web services, the Share Service&apos;s host may log standard technical information, such as IP address, when a report is uploaded or viewed, for operating and securing the service.</p>

    <h2 id="third-party">7. Third-party services</h2>
    <p>The address bar and new tab search in Lotus Browser are powered by DuckDuckGo. Searches you run are sent to DuckDuckGo in order to return results, subject to DuckDuckGo&apos;s own privacy policy, which we encourage you to review. Any website you navigate to in Lotus Browser is operated independently of us and has its own privacy practices and cookies; we have no access to your activity on those sites.</p>
    <p>Our source code and some downloads may be hosted on GitHub, and sign-in to this Site uses Discord. Those services have their own privacy practices.</p>

    <h2 id="sharing">8. How we share information</h2>
    <p>We do not sell personal information. We may share the limited server-log data described in this policy with service providers who host this Site or the Share Service (for example, our hosting or CDN provider), solely to operate and secure them, or if required to comply with a legal obligation such as a valid subpoena.</p>

    <h2 id="security">9. Data security</h2>
    <p>We take reasonable measures to protect the limited data described in this policy, including serving downloads and the Share Service over HTTPS. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.</p>

    <h2 id="retention">10. Data retention</h2>
    <p>Server logs described in Section 2 are retained only as long as necessary for the purposes described above and are periodically deleted or aggregated. Reports uploaded through SysInfo&apos;s share option are kept for 30 days (Section 6). Data stored locally by either Product on your device, including Lotus Browser&apos;s browsing data (Section 4) and SysInfo&apos;s saved reports, is retained until you delete it or uninstall or remove the Software.</p>

    <h2 id="children">11. Children&apos;s privacy</h2>
    <p>This Site and the Software are not directed to children under 13, and we do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us so we can remove it.</p>

    <h2 id="rights">12. Your choices and rights</h2>
    <p>Depending on where you live, you may have rights to access, correct, or delete personal information we hold about you, or to object to certain processing. Because we collect very little identifiable information in the first place, most of your data is already entirely in your control on your own device: Lotus Browser&apos;s history, bookmarks, and cookies can be cleared in its settings, and SysInfo&apos;s reports are ordinary files you can delete. If you shared a SysInfo report and want it removed before the 30 days are up, contact us with the link. For anything else, you can reach us using the contact details below.</p>

    <h2 id="changes">13. Changes to this policy</h2>
    <p>We may update this Privacy Policy from time to time to reflect changes in the Software, the Site, or applicable law. We will update the &quot;Last updated&quot; date above when we do, and material changes will be noted on this page.</p>

    <h2 id="contact">14. Contact</h2>
    <p>Questions about this Privacy Policy, or requests relating to your data, can be sent to <a href="mailto:staydrifting@voltaccept.com">staydrifting@voltaccept.com</a>.</p>
  </div>
    </section>
  );
}
