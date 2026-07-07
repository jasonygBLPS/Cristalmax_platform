document.getElementById("year").textContent = new Date().getFullYear();

fetch("data/reports.json")
  .then((res) => {
    if (!res.ok) throw new Error("讀取報表清單失敗");
    return res.json();
  })
  .then((data) => {
    document.getElementById("companyName").textContent = data.pageTitle || data.companyName;
    document.querySelector(".footer-company").textContent = data.companyName || "";
    renderContent(data.years || []);
  })
  .catch((err) => {
    document.getElementById("content").innerHTML =
      '<p class="error">目前無法載入報表清單，請稍後再試。</p>';
    console.error(err);
  });

function renderContent(years) {
  const container = document.getElementById("content");

  if (!years.length) {
    container.innerHTML = '<p class="error">目前尚無公開報表。</p>';
    return;
  }

  // 依年度由新到舊排序
  years.sort((a, b) => b.year - a.year);

  const html = years.map((yearBlock) => {
    const reports = [...yearBlock.reports].sort((a, b) => b.month - a.month);

    const items = reports.map((r) => `
      <li class="report-item">
        <span class="report-title">${escapeHtml(r.title)}</span>
        <a class="download-btn" href="${escapeHtml(r.file)}" download>
          下載 PDF
        </a>
      </li>
    `).join("");

    return `
      <section class="year-block">
        <h2 class="year-title">${yearBlock.year} 年度</h2>
        <ul class="report-list">${items}</ul>
      </section>
    `;
  }).join("");

  container.innerHTML = html;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
