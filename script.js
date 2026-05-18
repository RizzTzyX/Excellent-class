// DATA REPOSITORY (Silakan edit bagian ini jika ingin mengubah biodata murid atau data jadwal)
const dataSiswa = [
    { nama: "Asep Lintang Maulana", panggilan: "Asep", tglLahir: "12 Januari 2012", asal: "Sukabumi" },
    { nama: "Cikal Naufal Jilbran", panggilan: "cikal", tglLahir: "05 Maret 2012", asal: "Sukabumi" },
    { nama: "Diska Maelani Putri", panggilan: "Diska", tglLahir: "18 Juli 2012", asal: "Sukabumi" },
    { nama: "asep", panggilan: "asep", tglLahir: "22 September 2010", asal: "Sukabumi" },
    { nama: "asep", panggilan: "asep", tglLahir: "14 Desember 2009", asal: "Sukabumi" },
    { nama: "Daftar", panggilan: "Daftar", tglLahir: "01 Februari 2010", asal: "Sukabumi" },
    { nama: "asep", panggilan: "asep", tglLahir: "30 Agustus 2010", asal: "Sukabumi" },
    { nama: "Asep", panggilan: "Asep", tglLahir: "11 November 2009", asal: "Bogor" }
];

const dataJadwal = {
    Pelajaran: {
        Senin: [
            { jam: "07:00 - 08:20", mapel: "B.Inggris", guru: "Ms. Nina" },
            { jam: "08:20 - 09:40", mapel: "B.Indo", guru: "Pak Joko" },
            { jam: "10:00 - 11:20", mapel: "Matematika", guru: "Bu Sri" }
        ],
        Selasa: [
            { jam: "07:00 - 08:20", mapel: "IPA", guru: "Pak Heri" },
            { jam: "08:20 - 09:40", mapel: "Olahraga", guru: "Pak Dani" }
        ],
        Rabu: [
            { jam: "07:00 - 08:20", mapel: "Agama", guru: "Pak Abdul" },
            { jam: "08:20 - 09:40", mapel: "PPKN", guru: "Bu Mega" }
        ],
        Kamis: [
            { jam: "07:00 - 08:20", mapel: "Seni Budaya", guru: "Bu Ambar" },
            { jam: "08:20 - 09:40", mapel: "Sejarah", guru: "Pak Ali" }
        ],
        Jumat: [
            { jam: "07:00 - 08:20", mapel: "TIK", guru: "Pak Rizz" },
            { jam: "08:20 - 09:40", mapel: "BK", guru: "Bu Sisca" }
        ]
    },
    Piket: {
        Senin: ["Putry", "Paulista", "Firdaus", "Attala", "Ardian"],
        Selasa: ["Jeriko", "Daftar", "Damar", "Asep", "Adit"],
        Rabu: ["Pratiwi", "Davina", "Angin", "Raka", "Eki"],
        Kamis: ["Hendri", "Putry", "Jeriko", "Asep", "Daftar"],
        Jumat: ["Paulista", "Pratiwi", "Davina", "Raka", "Eki"]
    }
};

// 1. GENERATE DAFTAR MURID WIDGET (FLUID FLOAT ANIMATION)
const studentGrid = document.getElementById('student-grid');
dataSiswa.forEach((siswa, index) => {
    const card = document.createElement('div');
    card.className = 'student-card';
    card.style.animationDelay = `${index * 0.2}s`; // Staggered float effect
    card.innerHTML = `
        <div class="student-avatar"><i class="fas fa-user-astronaut"></i></div>
        <h3>${siswa.panggilan}</h3>
    `;
    card.onclick = () => openModalSiswa(siswa);
    studentGrid.appendChild(card);
});

// 2. GLOWING TAB SWITCH ENGINE (JADWAL vs PIKET)
function switchTab(type) {
    const btnPelajaran = document.getElementById('btn-pelajaran');
    const btnPiket = document.getElementById('btn-piket');
    const tabPelajaran = document.getElementById('tab-pelajaran');
    const tabPiket = document.getElementById('tab-piket');

    if (type === 'pelajaran') {
        btnPelajaran.classList.add('active');
        btnPiket.classList.remove('active');
        tabPelajaran.classList.add('active');
        tabPiket.classList.remove('active');
    } else {
        btnPiket.classList.add('active');
        btnPelajaran.classList.remove('active');
        tabPiket.classList.add('active');
        tabPelajaran.classList.remove('active');
    }
}

// 3. POP-UP MODAL ENGINE
const modal = document.getElementById('global-modal');
const modalContent = document.getElementById('modal-dynamic-content');

function openModalSiswa(siswa) {
    modalContent.innerHTML = `
        <div class="modal-avatar"><i class="fas fa-id-badge"></i></div>
        <div class="modal-details">
            <h3>Profile Murid</h3>
            <p><strong>Nama Lengkap:</strong> ${siswa.nama}</p>
            <p><strong>Tanggal Lahir:</strong> ${siswa.tglLahir}</p>
            <p><strong>Asal Daerah:</strong> ${siswa.asal}</p>
        </div>
    `;
    modal.classList.add('active');
}

function openModalJadwal(hari, tipe) {
    let contentHtml = `<h3>Detail ${tipe} - ${hari}</h3>`;
    
    if (tipe === 'Pelajaran') {
        const listMapel = dataJadwal.Pelajaran[hari];
        listMapel.forEach(item => {
            contentHtml += `
                <div style="margin-bottom: 15px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 5px;">
                    <p><strong>Jam:</strong> ${item.jam}</p>
                    <p><strong>Mata Pelajaran:</strong> ${item.mapel}</p>
                    <p><strong>Guru:</strong> ${item.guru}</p>
                </div>
            `;
        });
    } else {
        const listPiket = dataJadwal.Piket[hari];
        contentHtml += `<p style="text-align:center; margin-top:15px;"><strong>Petugas Piket Hari Ini:</strong></p>`;
        contentHtml += `<p style="text-align:center; color:#00f3ff; font-weight:bold; font-size:1.1rem;">${listPiket.join(', ')}</p>`;
    }
    
    modalContent.innerHTML = `<div class="modal-details">${contentHtml}</div>`;
    modal.classList.add('active');
}

function closeModal(event) {
    if (event.target === modal) {
        modal.classList.remove('active');
    }
}

// 4. INTERSECTION OBSERVER (REVEAL STRUKTUR ON SCROLL)
const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => observer.observe(el));

// 5. MEMORIES ROTATE & FADE AWAY ON SCROLL ENGINE
const memoryCards = document.querySelectorAll('.memory-card-stack');
window.addEventListener('scroll', () => {
    memoryCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const viewHeight = window.innerHeight;
        
        // Mulai menghitung ketika card naik ke atas layar
        if (rect.top < viewHeight && rect.bottom > 0) {
            const progress = (viewHeight - rect.top) / (viewHeight + rect.height);
            
            if (progress > 0.5) {
                // Skala kalkulasi hilangnya
                const fadeFactor = 1 - ((progress - 0.5) * 2);
                const rotateFactor = (progress - 0.5) * -30; // Muter sedikit pas mau ngilang
                const scaleFactor = 1 - ((progress - 0.5) * 0.3);

                card.style.opacity = Math.max(fadeFactor, 0);
                card.style.transform = `scale(${Math.max(scaleFactor, 0.7)}) rotate(${rotateFactor}deg)`;
            } else {
                // Keadaan normal pas masuk viewport bawah
                card.style.opacity = 1;
                card.style.transform = `scale(1) rotate(0deg)`;
            }
        }
    });
});
