// Moving between reports: the kind switch and the recent-issue chips above the paper on every width
// (ReportLayout). The old wide-desktop archive column is gone: it took a fixed 280px of reading width.
import { IntentLink } from "../../components/ui/IntentLink";
import { REPORT_NAMES, type ReportNavigationEntry, type ReportKind } from "@aihot/contracts/site";
import { PillTabs } from "../../components/ui/Tabs";
import { KINDS, KIND_PATH, chipLabel, reportPath } from "./format";

/**
 * 日报 / 周报 / 月报 as the site's pill switch: compact, above the paper.
 * Every place keeps its own layoutId: all of them stay mounted, hidden by width.
 */
export function KindSwitch({ kind, phone = false, layoutId = phone ? "report-kind-phone" : "report-kind" }: { kind: ReportKind; phone?: boolean; layoutId?: string }) {
  return (
    <PillTabs
      fill={!phone}
      size={phone ? "sm" : "md"}
      layoutId={layoutId}
      label="切换日报、周报、月报"
      active={kind}
      items={KINDS.map((k) => ({ key: k, label: REPORT_NAMES[k], to: KIND_PATH[k], resetScroll: phone, prefetchOnPress: true }))}
    />
  );
}

/** Phones under the bar, desktops above the paper: the three latest issues and a way further back. */
export function ReportPhoneNav({ kind, index, current, today }: { kind: ReportKind; index: ReportNavigationEntry[]; current: string | null; today: string }) {
  const recent = index.slice(0, 3);
  const earlier = kind === "daily" ? "/daily/archive" : "#report-history";
  const chip = "inline-flex h-11 shrink-0 items-center rounded-full border px-4 text-[13px] transition-colors";
  if (recent.length === 0) return null;
  return (
    <nav aria-label={`最近的${REPORT_NAMES[kind]}`} className="scrollbar-none bleed flex gap-2 overflow-x-auto pb-1 pt-1.5 lg:mx-0 lg:w-full lg:max-w-[1160px] lg:px-0 lg:pb-4 lg:pt-3">
      {recent.map((e) => {
        const on = e.key === current;
        return (
          <IntentLink key={e.key} to={reportPath(kind, e.key)} aria-current={on ? "page" : undefined} className={`${chip} ${on ? "border-ink bg-ink font-semibold text-bg" : "border-line-strong bg-surface text-ink-2 active:bg-bg-sunk"}`}>
            {chipLabel(kind, e.key, index, today)}
          </IntentLink>
        );
      })}
      {index.length > 3 && (
        <IntentLink to={earlier} viewTransition={kind === "daily"} className={`${chip} border-line-strong bg-surface text-ink-2 active:bg-bg-sunk`}>
          更早
        </IntentLink>
      )}
    </nav>
  );
}
