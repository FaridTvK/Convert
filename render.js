const fs = require("fs");

const generatedHTML = `
<div class="directory">
<a href="build/umfrage.feature/index.html" target="iframe_a">Feature</a>
</div>
<ul class="features">
<li class="file">
  <a href="build/test2.feature/index.html" target="iframe_a">Arthemic</a>
</li>
<li class="file">
  <a href="build/umfrage.feature/index.html" target="iframe_a">Umfrage</a>
</li>
<li>
  <div class="directory">
    <a href="build/auslastung.feature/index.html" target="iframe_a">Funktionalität</a>
  </div>
  <ul class="features">
    <li class="file">
      <a href="build/auslastung.feature/index.html" target="iframe_a">Sytnax</a>
    </li>
  </ul>
</li>

</ul>
`;

const template = fs.readFileSync("index.html").toString();

const finishedContent = template.replace(
  "___NAVIGATION_PLACEHOLDER___",
  generatedHTML
);

fs.writeFileSync("index_finished.html", finishedContent);