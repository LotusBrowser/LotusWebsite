import { SITE, PRODUCT_LIST, PRODUCTS } from "./config/site";

export const metadata = {
  title: SITE.title,
  description: SITE.tagline,
};

const STATS = [
  { value: String(PRODUCT_LIST.length), label: "Products", note: "tools we build and maintain" },
  { value: "Windows", label: "Platform", note: "Windows 10 & 11, plus Linux for SysInfo" },
  { value: "Free", label: "To Use", note: "no accounts, no ads, no tracking" },
];

export default function Home() {
  return (
    <div>
      <header className="hero">
        <p className="eyebrow">Welcome to</p>
        <h1 className="hero-title">Lotus</h1>
        <p className="hero-tagline">{SITE.tagline}</p>
        <div className="hero-divider" />
        <div className="hero-actions">
          <a className="btn-lotus btn-green" href={SITE.discordUrl} target="_blank" rel="noopener noreferrer">
            Join our Discord
          </a>
          <a className="btn-lotus btn-teal" href="#products">
            Explore Products
          </a>
        </div>
      </header>

      <section className="stat-row" aria-label="Lotus at a glance">
        {STATS.map((stat) => (
          <div className="stat-card" key={stat.label}>
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
            <span className="stat-note">{stat.note}</span>
          </div>
        ))}
      </section>

      <section className="product-section" id="products" aria-labelledby="products-title">
        <h2 className="section-title center" id="products-title">Our Products</h2>
        <p className="lead center">Small, focused tools, each one built to do its job quietly.</p>

        <div className="product-grid">
          {PRODUCT_LIST.map((product) => (
            <a className="product-card" href={product.href} key={product.slug}>
              <img src="/logo.png" alt="" className="product-mark" />
              <h3>{product.name}</h3>
              <p>{product.blurb}</p>
              <ul className="tag-row">
                {product.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <span className="product-link">Learn more &rarr;</span>
            </a>
          ))}
        </div>
      </section>

      <section className="page-card promo" aria-label="Featured product">
        <p className="eyebrow">Featured</p>
        <h2 className="section-title">Meet {PRODUCTS.lotus.name}.</h2>
        <p className="lead mt-2">{PRODUCTS.lotus.blurb}</p>
        <div className="links">
          <a className="btn-primary" href={PRODUCTS.lotus.href}>Get Started</a>
        </div>
      </section>
    </div>
  );
}
