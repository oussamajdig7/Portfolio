import { useEffect, useMemo, useState } from "react";

export function useActiveSection(options) {
  const ids = useMemo(() => options.ids, [JSON.stringify(options.ids)]);
  const [activeId, setActiveId] = useState(() => {
    const fromHash = window.location.hash.replace("#", "");
    return ids.includes(fromHash) ? fromHash : ids[0] ?? "";
  });

  useEffect(() => {
    if (ids.length === 0) return;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el) => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: options.rootMargin ?? "-20% 0px -70% 0px",
        threshold: [0, 0.5, 1],
      },
    );

    for (const el of elements) observer.observe(el);

    const onHash = () => {
      const fromHash = window.location.hash.replace("#", "");
      if (ids.includes(fromHash)) setActiveId(fromHash);
    };

    window.addEventListener("hashchange", onHash);

    return () => {
      window.removeEventListener("hashchange", onHash);
      observer.disconnect();
    };
  }, [ids, options.rootMargin]);

  return activeId;
}
