export default function SocialLinks({ className = '' }: { className?: string }) {
  return (
    <div className={`text-center text-secondary flex justify-center gap-4 ${className}`}>
      <a
        href="https://github.com/pzuraq"
        aria-label="My Github profile"
        className="hover:text-primary"
      >
        <i className="icon-github" />
      </a>
      <a href="/rss" aria-label="My RSS feed" className="hover:text-primary">
        <i className="icon-rss" />
      </a>
      <a
        href="https://matrix.to/#/@pzura:matrix.org"
        aria-label="My Matrix profile"
        className="hover:text-primary"
      >
        <i className="icon-matrix" />
      </a>
    </div>
  );
}
