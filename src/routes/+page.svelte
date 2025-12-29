<script>
    import { onMount } from "svelte";

    let now = $state(new Date());

    let dateString = $derived(
        now.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
        }),
    );
    let currentYear = $derived(now.getFullYear());
    let isNYD = $derived(now.getMonth() === 0 && now.getDate() === 1);
    let newyear = $derived(new Date(currentYear + 1, 0, 1, 0, 0, 0));
    const diff = $derived(newyear - now);

    let title = $derived(
        isNYD ? `It is ${currentYear}.` : `It's not ${currentYear + 1} Yet`,
    );
    let subtitle = $derived(isNYD ? "Happy New Year!" : "But it will be in...");
    let days = $derived(isNYD ? 0 : Math.floor(diff / (1000 * 60 * 60 * 24)));
    let hours = $derived(
        isNYD
            ? 0
            : Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    let minutes = $derived(
        isNYD ? 0 : Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    );
    let seconds = $derived(isNYD ? 0 : Math.floor((diff % (1000 * 60)) / 1000));

    onMount(() => {
        const interval = setInterval(() => {
            now = new Date();
        }, 1000);

        return () => clearInterval(interval);
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
