<script>
    import { onMount } from "svelte";

    let dateString = $derived(getDateString());
    let currentYear = $derived(getYear());
    let title = $derived("Not New Year Yet*");
    let subtitle = $derived("*99.73% Accurate");
    let days = $derived("??");
    let hours = $derived("??");
    let minutes = $derived("??");
    let seconds = $derived("??");

    function getDateString(date = new Date()) {
        return date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    }

    function getYear(date = new Date()) {
        return date.getFullYear();
    }

    function updateCountdown() {
        dateString = getDateString();
        currentYear = getYear();

        const now = new Date();
        const beforeJan2 = now < new Date(currentYear + 1, 0, 2, 0, 0, 0);
        const isNYD = !beforeJan2 && now.getDate() === 1;

        let newyear = beforeJan2
            ? new Date(currentYear, 11, 31, 0, 0, 0)
            : new Date(currentYear + 1, 11, 31, 0, 0, 0);

        const diff = newyear - now;

        if (isNYD) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(diff / (1000 * 60 * 60 * 24));
            hours = Math.floor(
                (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
            );
            minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            seconds = Math.floor((diff % (1000 * 60)) / 1000);
        }

        if (isNYD) {
            title = `It is ${currentYear}.`;
            subtitle = `Happy New Year!`;
        } else {
            title = `It's not ${currentYear + 1} Yet`;
            subtitle = "But it will be in...";
        }
    }

    onMount(() => {
        updateCountdown();
        setInterval(() => updateCountdown(), 1000);
    });
</script>

<header class="header">
    <div class="date-display">{dateString}</div>
    <h1 class="title">{title}</h1>
    <div class="subtitle">{subtitle}</div>
</header>

<div class="countdown">
    <div class="time-unit">
        <span class="time-value">{days}</span>
        <span class="time-label">Days</span>
    </div>
    <div class="time-unit">
        <span class="time-value">{hours}</span>
        <span class="time-label">Hours</span>
    </div>
    <div class="time-unit">
        <span class="time-value">{minutes}</span>
        <span class="time-label">Minutes</span>
    </div>
    <div class="time-unit">
        <span class="time-value">{seconds}</span>
        <span class="time-label">Seconds</span>
    </div>
</div>

<noscript>
    <p id="noscript">Please enable JavaScript for full functionality</p>
</noscript>

<footer class="footer">
    <div class="decorative-line"></div>
    <div class="credits">
        Created by <a
            href="https://github.com/ethmarks"
            target="_blank"
            rel="noopener noreferrer">ethmarks</a
        >
    </div>
</footer>
