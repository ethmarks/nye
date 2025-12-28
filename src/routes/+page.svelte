<script>
    let dateString = $state("");
    let title = $state("Not New Year Yet*");
    let subtitle = $state("*99.73% Accurate");
    let days = $state("??");
    let hours = $state("??");
    let minutes = $state("??");
    let seconds = $state("??");
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
