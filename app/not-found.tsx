export default function NotFound() {
  return (
    <div className="px-4 py-16">
      <section className="page-card text-center">
        <h1 className="display-title">Page not found</h1>
        <p className="lead mt-4">This page does not exist or has moved.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a className="btn-primary" href="/">Go back home</a>
        </div>
      </section>
    </div>
  );
}
