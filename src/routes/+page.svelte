<script>
    import { onMount } from "svelte";
    import { invalidate } from "$app/navigation";

    let { data } = $props();

    let now = $state(new Date());

    // Helper to get date in user's timezone
    function getDateInTimezone(date, timezone) {
        const formatter = new Intl.DateTimeFormat("en-US", {
            timeZone: timezone,
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: false,
        });

        const parts = formatter.formatToParts(date);
        const getValue = (type) => parts.find((p) => p.type === type)?.value;

        return {
            year: parseInt(getValue("year")),
            month: parseInt(getValue("month")),
            day: parseInt(getValue("day")),
            hour: parseInt(getValue("hour")),
            minute: parseInt(getValue("minute")),
            second: parseInt(getValue("second")),
        };
    }

    let dateString = $derived(
        now.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
            timeZone: data.timezone,
        }),
    );

    let dateParts = $derived(getDateInTimezone(now, data.timezone));
    let currentYear = $derived(dateParts.year);
    let isNYD = $derived(dateParts.month === 1 && dateParts.day === 1);

    // Calculate time until New Year in user's timezone
    const diff = $derived(() => {
        const nextYear = currentYear + 1;
        // Create New Year date in UTC
        const newYearUTC = Date.UTC(nextYear, 0, 1, 0, 0, 0);
        // Get offset: how many ms ahead/behind is the timezone from UTC at New Year
        const nyParts = getDateInTimezone(new Date(newYearUTC), data.timezone);
        const offsetMs =
            (nyParts.hour * 60 * 60 + nyParts.minute * 60 + nyParts.second) *
            1000;
        // Adjust for timezone offset
        const newYearInTimezone = newYearUTC - offsetMs;
        return newYearInTimezone - now.getTime();
    });

    let title = $derived(
        isNYD ? `It is ${currentYear}.` : `It's not ${currentYear + 1} Yet`,
    );
    let subtitle = $derived(isNYD ? "Happy New Year!" : "But it will be in...");
    let days = $derived(isNYD ? 0 : Math.floor(diff() / (1000 * 60 * 60 * 24)));
    let hours = $derived(
        isNYD
            ? 0
            : Math.floor((diff() % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    let minutes = $derived(
        isNYD ? 0 : Math.floor((diff() % (1000 * 60 * 60)) / (1000 * 60)),
    );
    let seconds = $derived(
        isNYD ? 0 : Math.floor((diff() % (1000 * 60)) / 1000),
    );

    onMount(() => {
        // Check if timezone cookie matches user's actual timezone
        const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        if (data.timezone !== userTimezone) {
            // Set the correct timezone cookie
            document.cookie = `timezone=${userTimezone}; path=/; max-age=31536000; SameSite=Lax`;
            // Invalidate to reload with correct timezone
            invalidate("app:timezone");
        }

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
