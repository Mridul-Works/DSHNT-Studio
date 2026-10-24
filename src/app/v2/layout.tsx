// Shared by every /v2 route: the v2 stylesheet lives here so /v2 and /v2/work
// style the same without importing it twice.
import "./v2.css";

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
