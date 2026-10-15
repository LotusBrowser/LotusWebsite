import VersionList from "./VersionList";

export const metadata = {
  title: "Previous Versions - Lotus Browser",
  description: "Download current and previous versions of Lotus Browser for Windows.",
};

export default function PreviousVersionsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:py-16">
      <header className="page-card mb-8 text-center">
        <h1 className="display-title">Previous Versions</h1>
        <p className="lead mt-3">
          Need an older build of Lotus Browser? Every release is listed here, newest first.
        </p>
        <div className="links">
          <a href="/products/lotus">&larr; Back to Lotus Browser</a>
        </div>
      </header>

      <section className="page-card">
        <VersionList />
        <p className="fine-print">
          Older versions may be missing fixes and security updates. By downloading, you agree to the{" "}
          <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.
        </p>
      </section>
    </div>
  );
}
