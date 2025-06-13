/*
  Shopify Plugin: Cutoff Shipping Timer
  Purpose: Show a dynamic shipping message based on current time vs cutoff time (13:00 UK = 14:00 UTC)
  Author: Michal
*/

(function () {
  function updateCutoffMessage() {
    const container = document.querySelector(".cut-off-time-wr");
    if (!container) return;

    const now = new Date();
    const cutoffUTC = new Date();
    cutoffUTC.setUTCHours(14, 0, 0, 0); // 14:00 UTC = 13:00 UK

    let message = "";

    if (now < cutoffUTC) {
      const diffMs = cutoffUTC - now;
      const diffMins = Math.floor(diffMs / 60000);
      const hours = Math.floor(diffMins / 60);
      const minutes = diffMins % 60;
      message = `Order within ${hours}h ${minutes}m for same day shipping`;
    } else {
      // Calculate time left until 23:59 UK (22:59 UTC)
      const endOfDayUTC = new Date();
      endOfDayUTC.setUTCHours(22, 59, 0, 0); // 23:59 UK = 22:59 UTC

      const diffMs = endOfDayUTC - now;
      const diffMins = Math.floor(diffMs / 60000);
      const hours = Math.floor(diffMins / 60);
      const minutes = diffMins % 60;

      if (diffMs > 0) {
        message = `Order now for next day shipping – ${hours}h ${minutes}m left to order today`;
      } else {
        message = `Order now for next day shipping`;
      }
    }

    container.innerText = message;
  }

  document.addEventListener("DOMContentLoaded", function () {
    updateCutoffMessage();
    setInterval(updateCutoffMessage, 60000); // update every minute
  });
})();
