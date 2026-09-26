document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('ip-container');

  const getLocalIP = () => {
    return new Promise((resolve) => {
      const ips = new Set();
      const RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
      
      if (!RTCPeerConnection) {
        resolve(["WebRTC no soportado"]);
        return;
      }

      const pc = new RTCPeerConnection({ iceServers: [] });
      pc.createDataChannel("");

      pc.createOffer().then((offer) => pc.setLocalDescription(offer)).catch(() => {});

      pc.onicecandidate = (event) => {
        if (!event || !event.candidate) return;
        const parts = event.candidate.candidate.split(' ');
        const ip = parts[4];
        if (ip && (ip.match(/^(192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[0-1]))/) || ip.includes(':'))) {
          ips.add(ip);
        }
      };

      setTimeout(() => {
        const result = Array.from(ips);
        resolve(result.length > 0 ? result : ["No se detectó IP local activa"]);
      }, 500);
    });
  };

  getLocalIP().then((ips) => {
    container.innerHTML = ips.map(ip => `<div>📍 ${ip}</div>`).join('');
  });
});