/* Compose window. The send is staged locally — see useMail. */

function Field({ id, label, value, placeholder, focused, onChange, onFocus, onBlur, error, t }) {
  return (
    <>
      <div className={`mail__row${focused ? " is-focused" : ""}`}>
        <label className="mail__label" htmlFor={id}>
          {label}
        </label>
        <input
          id={id}
          data-nodrag="1"
          className="mail__input"
          value={value}
          placeholder={placeholder}
          spellCheck="false"
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
      {error ? <div className="mail__err mail__err--field">!! {error}</div> : null}
    </>
  );
}

export default function MailWindow({ t, email, mail }) {
  const { fields, setField, focused, setFocused, errors, stage, progress, send, reset } = mail;

  if (stage === "sent") {
    return (
      <div className="mail">
        <div className="mail__sent">
          <div className="mail__sent-title">{t.mail.sentTitle}</div>
          <div className="mail__sent-sub">{t.mail.sentSub}</div>
          <div className="mail__sent-rule" />
          <button type="button" data-nodrag="1" className="mail__again" onClick={reset}>
            {t.mail.again}
          </button>
        </div>
      </div>
    );
  }

  const blur = () => setFocused(null);

  return (
    <div className="mail">
      <div style={{ flex: "0 0 auto", padding: "6px 0 0" }}>
        <div className="mail__row">
          <span className="mail__label mail__label--locked">{t.mail.to}</span>
          <span className="mail__to">{email}</span>
          <span className="mail__lockhint">{t.mail.locked}</span>
        </div>

        <Field
          id="m-from"
          t={t}
          label={t.mail.from}
          value={fields.from}
          placeholder={t.mail.phFrom}
          focused={focused === "from"}
          onChange={(v) => setField("from", v)}
          onFocus={() => setFocused("from")}
          onBlur={blur}
          error={errors.from}
        />

        <Field
          id="m-name"
          t={t}
          label={t.mail.name}
          value={fields.name}
          placeholder={t.mail.phName}
          focused={focused === "name"}
          onChange={(v) => setField("name", v)}
          onFocus={() => setFocused("name")}
          onBlur={blur}
        />

        <Field
          id="m-subj"
          t={t}
          label={t.mail.subject}
          value={fields.subj}
          placeholder={t.mail.phSubj}
          focused={focused === "subj"}
          onChange={(v) => setField("subj", v)}
          onFocus={() => setFocused("subj")}
          onBlur={blur}
          error={errors.subj}
        />

        <div
          className={`mail__row mail__row--body-label${focused === "body" ? " is-focused" : ""}`}
        >
          <span className="mail__label">{t.mail.body}</span>
          <span className="mail__plainhint">{t.mail.plain}</span>
        </div>
      </div>

      <div className="mail__bodywrap">
        <textarea
          data-nodrag="1"
          className="mail__textarea"
          value={fields.body}
          placeholder={t.mail.phBody}
          spellCheck="false"
          onChange={(e) => setField("body", e.target.value)}
          onFocus={() => setFocused("body")}
          onBlur={blur}
        />
        {errors.body ? <div className="mail__err mail__err--body">!! {errors.body}</div> : null}
      </div>

      <footer className="mail__footer">
        <span className="mail__count">{t.mail.chars(fields.body.length)}</span>
        <span style={{ flex: 1 }} />
        {stage === "form" ? (
          <button type="button" data-nodrag="1" className="mail__send" onClick={send}>
            {t.mail.send}
          </button>
        ) : (
          <div className="mail__progress">
            <div className="mail__progress-track">
              <div className="mail__progress-fill" style={{ width: `${progress}%` }} />
              <span className="mail__progress-text">
                {t.mail.sending} {progress}%
              </span>
            </div>
          </div>
        )}
      </footer>
    </div>
  );
}
