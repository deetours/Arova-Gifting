"use client";

import { useState } from "react";
import type { Enquiry } from "@/lib/enquiries";

export function StatusControl({ reference, status }: { reference: string; status: Enquiry["status"] }) {
  const [current, setCurrent] = useState(status);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function changeStatus(next: Enquiry["status"]) {
    if (next === current) return;
    setSaving(true);
    setMessage("");
    try {
      const response = await fetch(`/api/admin/enquiries/${encodeURIComponent(reference)}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: next }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "The status could not be saved.");
      setCurrent(result.status as Enquiry["status"]);
      setMessage("Saved for this local development record.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "The status could not be saved.");
    } finally {
      setSaving(false);
    }
  }

  return <div className="status-control"><p className="current-status"><i className={`status-dot status-dot--${current}`} />{current}</p><label className="field"><span>Move enquiry to</span><select value={current} disabled={saving} onChange={(event) => void changeStatus(event.target.value as Enquiry["status"])}><option value="received">Received</option><option value="qualifying">Qualifying</option><option value="closed">Closed</option></select></label>{message && <p className="inline-feedback" role="status">{message}</p>}</div>;
}
