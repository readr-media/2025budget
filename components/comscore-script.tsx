/**
 * Component for implement comScore script.
 */
export default function ComScoreScript() {
  return (
    // use react script rather than next/Script to let the script show on the source of the html (view-source:)
    <>
      <script
        id="comScore"
        dangerouslySetInnerHTML={{
          __html: `
            var _comscore = _comscore || [];
            _comscore.push({ c1: "2", c2: "24318560" ,  options: { enableFirstPartyCookie: "true" } });
            (function() {
              var s = document.createElement("script"), el = document.getElementsByTagName("script")[0]; s.async = true;
              s.src = "https://sb.scorecardresearch.com/cs/24318560/beacon.js";
              el.parentNode.insertBefore(s, el);
            })();
          `,
        }}
      />
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<img src="https://sb.scorecardresearch.com/p?c1=2&amp;c2=24318560&amp;cv=3.9.1&amp;cj=1">`,
        }}
      />
    </>
  )
}
