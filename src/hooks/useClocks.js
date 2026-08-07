import { useEffect, useState } from "react";

const format = (timeZone) => {
  try {
    return new Intl.DateTimeFormat("pl-PL", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone,
    }).format(new Date());
  } catch {
    return "--:--";
  }
};

/* Wrocław / Seoul — the two clocks in the menu bar. */
export function useClocks() {
  const [clocks, setClocks] = useState(() => ({
    wro: format("Europe/Warsaw"),
    sel: format("Asia/Seoul"),
  }));

  useEffect(() => {
    const tick = () => setClocks({ wro: format("Europe/Warsaw"), sel: format("Asia/Seoul") });
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);

  return clocks;
}
