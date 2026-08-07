import { useCallback, useEffect, useRef, useState } from "react";

const EMPTY = { from: "", name: "", subj: "", body: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_BODY = 10;

/* Compose window. The send is a staged animation, not a network call —
   there is no backend behind this form. See README.md → Contact form. */
export function useMail(t) {
  const [fields, setFields] = useState(EMPTY);
  const [focused, setFocused] = useState(null);
  const [errors, setErrors] = useState({});
  const [stage, setStage] = useState("form"); // form | sending | sent
  const [progress, setProgress] = useState(0);

  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const setField = useCallback((key, value) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: null }));
  }, []);

  const send = useCallback(() => {
    const next = {};
    if (!fields.from.trim()) next.from = t.mail.err.from;
    else if (!EMAIL_RE.test(fields.from.trim())) next.from = t.mail.err.fromBad;
    if (!fields.subj.trim()) next.subj = t.mail.err.subj;
    if (fields.body.trim().length < MIN_BODY) next.body = t.mail.err.body;

    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }

    setErrors({});
    setStage("sending");
    setProgress(0);

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        const nextP = p + 14;
        if (nextP >= 100) {
          clearInterval(intervalRef.current);
          timeoutRef.current = setTimeout(() => setStage("sent"), 320);
          return 100;
        }
        return nextP;
      });
    }, 130);
  }, [fields, t]);

  const reset = useCallback(() => {
    setFields(EMPTY);
    setErrors({});
    setStage("form");
    setProgress(0);
  }, []);

  useEffect(
    () => () => {
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
    },
    []
  );

  return { fields, setField, focused, setFocused, errors, stage, progress, send, reset };
}
