import Link from "next/link";
export default function NotFound() {
  return (
    <div
      className="container"
      style={{ paddingBlock: "100px", minHeight: "65vh" }}
    >
      <span className="eyebrow">404 / Signal not found</span>
      <h1 style={{ margin: "24px 0" }}>
        This path leads
        <br />
        somewhere else<span className="accent">.</span>
      </h1>
      <p className="prose">
        The page you’re looking for isn’t here. Explore the work or start a
        conversation.
      </p>
      <div className="actions" style={{ marginTop: 28 }}>
        <Link prefetch={false} href="/" className="button primary">
          Home ↗
        </Link>
        <Link prefetch={false} href="/work/" className="button">
          Selected work ↗
        </Link>
        <Link prefetch={false} href="/contact/" className="button">
          Contact ↗
        </Link>
      </div>
    </div>
  );
}
