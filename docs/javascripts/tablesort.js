// Makes every Markdown table on the site sortable by clicking its header cells.
// Re-runs on each page load so it survives navigation.instant (SPA) transitions.
document$.subscribe(function () {
  document.querySelectorAll("article table:not([class])").forEach(function (table) {
    new Tablesort(table);
  });
});
