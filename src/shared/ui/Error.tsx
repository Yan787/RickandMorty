export default function Error({ children }: { children: string }) {
  return <div className="status-bar status-bar--error">{children}</div>;
}
