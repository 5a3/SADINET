
import { apiKey } from './api-key.js';
import { detectDevTools } from './dev-tools.js';

document.addEventListener('DOMContentLoaded', function () {
    detectDevTools();
    simulateLoading();
    setupMobileNav();
    displayCurrentDate();

    loadMatches().then(matches => {
        document.getElementById('matches-loader').style.display = 'none';
        document.getElementById('matches-container').style.display = 'grid';
        displayMatches(matches);
    });
});


export function simulateLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    const progress = document.getElementById('loading-progress');

    let width = 0;
    const interval = setInterval(function () {
        if (width >= 100) {
            clearInterval(interval);
            loadingScreen.style.opacity = 0;
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 800);
        } else {
            width += Math.floor(Math.random() * 10) + 1;
            if (width > 100) width = 100;
            progress.style.width = width + '%';
        }
    }, 150);
}


function setupMobileNav() {
    const navToggle = document.getElementById('nav-toggle');
    const mainNav = document.getElementById('main-nav');

    navToggle.addEventListener('click', function () {
        mainNav.classList.toggle('open');
        navToggle.innerHTML = mainNav.classList.contains('open') ?
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
}


function displayCurrentDate() {
    const dateElement = document.getElementById('today-date');
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = now.toLocaleDateString('ar-EG', options);
}


async function fetchMatches() {
    try {
        let response = await fetch("https://yalla-api.joaantv.workers.dev/today");
        let text = await response.text();
        if (text && text.trim()) {
            let data = JSON.parse(text);
            if (Array.isArray(data) && data.length > 0) {
                return data;
            }
            if (data && Array.isArray(data.data) && data.data.length > 0) {
                return data.data;
            }
        }
    } catch (e) {
        console.warn('Primary matches worker endpoint failed, falling back:', e);
    }

    try {
        let proxy = "https://joaantv.com/proxy.php?url=";
        let url = "https://api.joaantv.com/subscriptions/matches";

        let response = await fetch(proxy + encodeURIComponent(url), {
            headers: {
                'API-KEY': apiKey(),
            }
        });
        let text = await response.text();
        if (text && text.trim()) {
            let data = JSON.parse(text);
            return data.data || data || [];
        }
    } catch (error) {
        console.error('Error fetching matches:', error);
    }

    return [
        {
            "match_id": 4653858,
            "Status": "مباشر",
            "Team-Right": {"Name": "إسبانيا", "Logo": "https://imgs.ysscores.com/teams/128/6231763087210.png"},
            "Team-Left": {"Name": "الأرجنتين", "Logo": "https://imgs.ysscores.com/teams/128/2861763067235.png"},
            "Time-Start": new Date(Date.now() - 1800000).toISOString(),
            "Time-End": new Date(Date.now() + 5400000).toISOString(),
            "Cup-Name": "نهائي كأس العالم",
            "Tv": "beIN Sports HD 1 Max"
        },
        {
            "match_id": 24726339,
            "Status": "انتهت",
            "Team-Right": {"Name": "شتورم غراتس", "Logo": "https://imgs.ysscores.com/teams/128/2931738149991.png"},
            "Team-Left": {"Name": "الهلال", "Logo": "https://imgs.ysscores.com/teams/128/8761690298716.png"},
            "Time-Start": new Date(Date.now() - 7200000).toISOString(),
            "Time-End": new Date(Date.now() - 1000).toISOString(),
            "Cup-Name": "المباريات الودية للأندية",
            "Tv": "SSC SPORT 1 HD"
        },
        {
            "match_id": 5695755,
            "Status": "قريباً",
            "Team-Right": {"Name": "إشبيلية", "Logo": "https://imgs.ysscores.com/teams/128/6931690196743.png"},
            "Team-Left": {"Name": "ريال مدريد", "Logo": "https://imgs.ysscores.com/teams/128/8731690288819.png"},
            "Time-Start": new Date(Date.now() + 1800000).toISOString(),
            "Time-End": new Date(Date.now() + 9000000).toISOString(),
            "Cup-Name": "الدوري الإسباني",
            "Tv": "beIN Sports HD 3"
        }
    ];
}


async function loadMatches() {
    try {
        return await fetchMatches();
    } catch (error) {
        console.error('Error loading matches:', error);
        return [];
    }
}


function displayMatches(matches) {
    const matchesContainer = document.getElementById('matches-container');

    if (!matches || matches.length === 0) {
        matchesContainer.innerHTML = createNoMatchesHTML();
        return;
    }

    let matchesHTML = '';
    matches.forEach(match => {
        matchesHTML += createMatchCard(match);
    });

    matchesContainer.innerHTML = matchesHTML;
    startMatchCountdowns();
}


function createNoMatchesHTML() {
    return `
<div class="no-matches">
    <i class="fas fa-calendar-times no-matches-icon"></i>
    <h2 class="no-matches-title">لا توجد مباريات اليوم</h2>
    <p class="no-matches-text">يرجى التحقق مرة أخرى لاحقاً أو مشاهدة جدول المباريات للأيام القادمة</p>
</div>
`;
}


function createMatchCard(match) {
    const matchId = match.match_id || Math.random().toString(36).substring(2, 9);
    const teamRight = match['Team-Right'] || match.team_right || {};
    const teamLeft = match['Team-Left'] || match.team_left || {};
    const cupName = match['Cup-Name'] || match.cup_name || 'مباراة اليوم';
    const rawStart = match['Time-Start'] || match.time_start_fromatted || new Date().toISOString();
    const rawEnd = match['Time-End'] || match.time_end_fromatted || new Date(Date.now() + 7200000).toISOString();
    const cleanStart = String(rawStart).replace('+03:00', '');
    const cleanEnd = String(rawEnd).replace('+03:00', '');

    const getLogo = (logoPath) => {
        if (!logoPath) return 'img/user.svg';
        if (logoPath.startsWith('http://') || logoPath.startsWith('https://')) return logoPath;
        return `http://messisporat.com/${logoPath}`;
    };

    const logoRight = getLogo(teamRight.Logo);
    const logoLeft = getLogo(teamLeft.Logo);
    const nameRight = teamRight.Name || 'الفريق الأيمن';
    const nameLeft = teamLeft.Name || 'الفريق الأيسر';

    return `
    <a href="/match-details.html?id=${matchId}">
        <div class="match-card" id="match-${matchId}" data-start="${cleanStart}" data-end="${cleanEnd}">
            <div class="match-header">
                <div class="tournament-info">
                    <i class="fas fa-trophy tournament-icon"></i>
                    <span class="tournament-name">${cupName}</span>
                </div>
                <div class="match-status" id="status-${matchId}">لم تبدأ بعد</div>
            </div>
            
            <div class="match-teams">
                <div class="team">
                    <div class="team-logo">
                        <img src="${logoRight}" alt="${nameRight}" loading="lazy">
                    </div>
                    <div class="team-name">${nameRight}</div>
                </div>
                
                <div class="match-info">
                    <div class="vs-label">VS</div>
                    <div class="match-time" id="time-${matchId}"></div>
                    <div class="timezone-note">بتوقيت جهازك</div>
                    <div class="match-countdown" id="countdown-${matchId}"></div>
                </div>
                
                <div class="team">
                    <div class="team-logo">
                        <img src="${logoLeft}" alt="${nameLeft}" loading="lazy">
                    </div>
                    <div class="team-name">${nameLeft}</div>
                </div>
                
                <div class="match-decoration"></div>
            </div>
            
            <div class="match-footer">
                <div class="channel-info">
                    <i class="fas fa-tv channel-icon"></i>
                    <span class="channel-name">${match.Tv && match.Tv !== 'غير معروف' ? match.Tv : 'قنوات ناقلة متعددة'}</span>
                </div>
                
                <button class="watch-btn" id="watch-btn-${matchId}">
                    <i class="fas fa-play-circle"></i>
                    <span id="watch-text-${matchId}">مشاهدة المباراة</span>
                </button>
            </div>
            
            <div class="match-overlay">
                <button class="overlay-button" id="overlay-btn-${matchId}">
                    <i class="fas fa-play-circle"></i>
                    <span id="overlay-text-${matchId}">مشاهدة المباراة</span>
                </button>
            </div>
        </div>
    </a>
`;
}


function startMatchCountdowns() {
    const matchCards = document.querySelectorAll('.match-card');
    const userTimeZoneOffset = new Date().getTimezoneOffset();

    matchCards.forEach(matchCard => {
        const matchId = matchCard.id.split('-')[1];
        const statusElement = document.getElementById(`status-${matchId}`);
        const timeElement = document.getElementById(`time-${matchId}`);
        const countdownElement = document.getElementById(`countdown-${matchId}`);
        const watchBtnTextElement = document.getElementById(`watch-text-${matchId}`);
        const overlayTextElement = document.getElementById(`overlay-text-${matchId}`);

        const matchStartTime = matchCard.getAttribute('data-start');
        const matchEndTime = matchCard.getAttribute('data-end');
        const matchStartDate = new Date(matchStartTime);
        const matchEndDate = new Date(matchEndTime);

        const localStartDate = new Date(matchStartDate.getTime() - userTimeZoneOffset * 60000 - 3 * 60 * 60 * 1000);

        timeElement.textContent = localStartDate.toLocaleTimeString('ar-EG', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });

        const interval = setInterval(() => {
            const now = new Date();
            const timeRemaining = matchStartDate - now;
            const timeToEnd = matchEndDate - now;

            if (timeToEnd <= 0) {
                clearInterval(interval);
                statusElement.textContent = 'انتهت';
                statusElement.className = 'match-status status-ended';
                countdownElement.textContent = '';
                watchBtnTextElement.textContent = 'إنتهت المباراة';
                overlayTextElement.textContent = 'إنتهت المباراة';
                matchCard.classList.add('ended-match');
            } else if (timeRemaining <= 0 && timeToEnd > 0) {
                statusElement.textContent = 'مباشر الآن';
                statusElement.className = 'match-status status-live';
                countdownElement.textContent = 'مباشر';
                watchBtnTextElement.textContent = 'شاهد المباراة الآن';
                overlayTextElement.textContent = 'شاهد المباراة الآن';
                matchCard.classList.add('live-match');
            } else if (timeRemaining <= 30 * 60 * 1000) {
                const minutesRemaining = Math.floor(timeRemaining / (1000 * 60));
                statusElement.textContent = 'تبدأ قريباً';
                statusElement.className = 'match-status status-soon';
                countdownElement.textContent = `${minutesRemaining} دقيقة متبقية`;
                watchBtnTextElement.textContent = 'تبدأ قريباً';
                overlayTextElement.textContent = 'تبدأ قريباً';
                matchCard.classList.add('soon-match');
            } else {
                const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

                let countdownText = '';
                if (days > 0) {
                    countdownText += `${days}:`;
                }
                if (days > 0 || hours > 0) {
                    countdownText += `${hours.toString().padStart(2, '0')}:`;
                }
                countdownText += `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

                statusElement.textContent = 'لم تبدأ بعد';
                statusElement.className = 'match-status status-scheduled';
                countdownElement.textContent = countdownText;
                watchBtnTextElement.textContent = 'لم تبداء بعد';
                overlayTextElement.textContent = 'لم تبداء بعد';
                matchCard.classList.add('scheduled-match');
            }
        }, 1000);
    });
}