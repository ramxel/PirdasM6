document.addEventListener('DOMContentLoaded', function () {
    fetchStatus(); // Fetch status when the page loads
    setInterval(fetchStatus, 1000); // Fetch status every second
});

function fetchStatus() {
    fetch('http://192.168.0.102:8080/Pirdas/status_info.php?led=0&buzzer=1&tilt=1')
        .then(response => response.json())
        .then(data => updateStatus(data))
        .catch(error => console.error('Error:', error));
}

function updateStatus(data) {
    document.getElementById('led-status').innerText = 'LED Status: ' + data.status_led;
    document.getElementById('buzzer-status').innerText = 'Buzzer Status: ' + data.status_buzzer;
    document.getElementById('tilt-status').innerText = 'Tilt Status: ' + data.status_kemiringan;
}

// Menampilkan data terakhir saat menutup tab atau keluar dari halaman
window.addEventListener('beforeunload', function (event) {
    fetch('http://192.168.0.102:8080/Pirdas/status_info.php?led=0&buzzer=1&tilt=1')
        .then(response => response.json())
        .then(data => updateStatus(data))
        .catch(error => console.error('Error:', error));
});
