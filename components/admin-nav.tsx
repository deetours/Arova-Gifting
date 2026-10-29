import Link from "next/link";

export function AdminNav() {
  return <nav className="admin-nav" aria-label="Operations navigation"><Link href="/admin">Overview</Link><Link href="/admin/enquiries">Enquiries</Link><Link href="/admin/catalogue">Catalogue</Link><Link href="/admin/customers">Customers</Link><Link href="/admin/reports">Reports</Link></nav>;
}
