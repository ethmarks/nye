<script>
    import { onMount } from "svelte";
    import { inject } from "@vercel/analytics";

    inject();

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
    let currentMonth = $derived(now.getMonth() + 1);
    let currentDay = $derived(now.getDate());
    let isNYD = $derived(currentMonth === 1 && currentDay === 1);

    const diff = $derived(new Date(currentYear + 1, 0, 1, 0, 0, 0, 0) - now);

    let title = $derived(
        isNYD ? `It is ${currentYear}.` : `It's not ${currentYear + 1} Yet`,
    );
    let subtitle = $derived(isNYD ? "Happy New Year!" : "But it will be in...");
    let days = $derived(
        (isNYD ? 0 : Math.floor(diff / (1000 * 60 * 60 * 24)))
            .toString()
            .padStart(2, "0"),
    );
    let hours = $derived(
        (isNYD
            ? 0
            : Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        )
            .toString()
            .padStart(2, "0"),
    );
    let minutes = $derived(
        (isNYD ? 0 : Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)))
            .toString()
            .padStart(2, "0"),
    );
    let seconds = $derived(
        (isNYD ? 0 : Math.floor((diff % (1000 * 60)) / 1000))
            .toString()
            .padStart(2, "0"),
    );

    onMount(() => {
        const interval = setInterval(() => {
            now = new Date();
        }, 1000);

        return () => clearInterval(interval);
    });
</script>

<div id="stars"></div>

<div id="container">
    <header>
        <div id="date-display">{dateString}</div>
        <h1 id="title" class:new-year-arrived={isNYD}>{title}</h1>
        <div id="subtitle">{subtitle}</div>
    </header>

    <div id="countdown">
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

    <footer>
        <div id="decorative-line"></div>
        <div id="chat">
            Join my <a
                href="https://kraa.io/nye-2026-chat"
                target="_blank"
                rel="noopener noreferrer">Live 2026 Countdown Chat</a
            >
        </div>
        <div id="credits">
            Created by <a
                href="https://github.com/ethmarks"
                target="_blank"
                rel="noopener noreferrer">ethmarks</a
            >
        </div>
    </footer>
</div>

<style>
    :global(*) {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :global(:root) {
        --font-normal: "Rozha One", serif;
        --font-mono: "JetBrains Mono", monospace;

        --midnight-blue: #0a1628;
        --deep-blue: #162447;
        --royal-blue: #1f4788;
        --champagne: #f7e7ce;
        --cream: #faf8f5;
        --gold: #d4af37;
        --bright-gold: #ffd700;
        --silver: #c0c0c0;
        --charcoal: #2a2a2a;
    }

    :global(body) {
        font-family: var(--font-normal);
        background: linear-gradient(
            to bottom,
            var(--midnight-blue) 0%,
            var(--deep-blue) 50%,
            var(--royal-blue) 100%
        );
        min-height: 100vh;
        color: var(--cream);
        position: relative;
        overflow-x: hidden;
    }

    :global(#app) {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }

    #stars {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;

        &::before,
        &::after {
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            background-image:
                radial-gradient(2px 2px at 20% 30%, white, transparent),
                radial-gradient(2px 2px at 60% 70%, white, transparent),
                radial-gradient(1px 1px at 50% 50%, white, transparent),
                radial-gradient(1px 1px at 80% 10%, white, transparent),
                radial-gradient(2px 2px at 90% 60%, white, transparent),
                radial-gradient(1px 1px at 33% 80%, white, transparent),
                radial-gradient(2px 2px at 70% 25%, white, transparent);
            background-repeat: repeat;
            background-size: 200px 200px;
            animation: twinkle 3s ease-in-out infinite;
        }

        &::after {
            background-image:
                radial-gradient(
                    1px 1px at 40% 20%,
                    rgba(255, 215, 0, 0.8),
                    transparent
                ),
                radial-gradient(
                    2px 2px at 80% 80%,
                    rgba(255, 215, 0, 0.6),
                    transparent
                ),
                radial-gradient(
                    1px 1px at 15% 60%,
                    rgba(192, 192, 192, 0.7),
                    transparent
                ),
                radial-gradient(
                    2px 2px at 95% 40%,
                    rgba(255, 215, 0, 0.5),
                    transparent
                ),
                radial-gradient(
                    1px 1px at 25% 90%,
                    rgba(192, 192, 192, 0.6),
                    transparent
                ),
                radial-gradient(
                    2px 2px at 55% 15%,
                    rgba(255, 215, 0, 0.7),
                    transparent
                );
            background-size: 250px 250px;
            animation: twinkle 4s ease-in-out infinite reverse;
        }
    }

    @keyframes twinkle {
        0%,
        100% {
            opacity: 0.3;
        }
        50% {
            opacity: 1;
        }
    }

    #container {
        max-width: 900px;
        width: 90%;
        padding: 4rem 3rem;
        background: rgba(250, 248, 245, 0.98);
        backdrop-filter: blur(10px);
        border-radius: 2px;
        box-shadow:
            0 0 1px rgba(0, 0, 0, 0.1),
            0 20px 60px rgba(0, 0, 0, 0.3),
            inset 0 0 0 1px rgba(255, 255, 255, 0.5);
        position: relative;
        z-index: 10;

        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 5%;
            right: 5%;
            height: 1px;
            background: linear-gradient(
                to right,
                transparent,
                var(--gold),
                transparent
            );
        }
    }

    header {
        text-align: center;
        margin-bottom: 4rem;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        padding-bottom: 2rem;
    }

    #date-display {
        font-family: var(--font-mono);
        font-size: 0.75rem;
        letter-spacing: 2px;
        text-transform: uppercase;
        color: var(--charcoal);
        opacity: 0.5;
        margin-bottom: 1.5rem;
    }

    #title {
        font-size: 4.5rem;
        font-weight: 700;
        color: var(--midnight-blue);
        letter-spacing: -2px;
        margin-bottom: 0.5rem;
        line-height: 1;
        transition: color 1s ease;

        &.new-year-arrived {
            color: var(--gold);
        }
    }

    #subtitle {
        font-size: 1rem;
        font-weight: 400;
        color: var(--charcoal);
        opacity: 0.6;
        font-style: italic;
        letter-spacing: 1px;
    }

    #countdown {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
        margin: 3rem 0;
    }

    .time-unit {
        text-align: center;
        position: relative;
        display: flex;
        flex-direction: column;

        &::after {
            content: "";
            position: absolute;
            bottom: -1rem;
            left: 50%;
            transform: translateX(-50%);
            width: 40%;
            height: 1px;
            background: var(--gold);
            opacity: 0.3;
        }
    }

    .time-value {
        font-family: var(--font-mono);
        font-size: 5rem;
        font-weight: 700;
        color: var(--royal-blue);
        line-height: 1;
        margin-bottom: 0.5rem;
        letter-spacing: -3px;
    }

    .time-label {
        font-size: 0.875rem;
        letter-spacing: 3px;
        text-transform: uppercase;
        color: var(--charcoal);
        opacity: 0.5;
        font-family: var(--font-mono);
    }

    footer {
        margin-top: 3rem;
        text-align: center;
        position: relative;
    }

    #decorative-line {
        height: 1px;
        background: linear-gradient(
            to right,
            transparent,
            var(--gold),
            transparent
        );
        margin-bottom: 1.5rem;
    }

    #chat {
        font-family: var(--font-mono);
        font-size: 0.9rem;
        color: var(--charcoal);
        margin-bottom: 0.5rem;

        a {
            color: var(--royal-blue);
            transition: color 0.3s ease;

            &:hover {
                color: var(--gold);
            }
        }
    }

    #credits {
        font-family: var(--font-mono);
        font-size: 0.75rem;
        letter-spacing: 1px;
        color: var(--charcoal);
        opacity: 0.5;
        margin-bottom: 0.5rem;
        a {
            color: var(--royal-blue);
            text-decoration: none;
            border-bottom: 1px solid transparent;
            transition:
                border-color 0.3s ease,
                opacity 0.3s ease;

            &:hover {
                border-bottom-color: var(--royal-blue);
                opacity: 1;
            }
        }
    }

    @media (max-width: 768px) {
        #container {
            padding: 2.5rem 1.5rem;
            width: 95%;
        }

        #title {
            font-size: 2.5rem;
        }

        #countdown {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem 1.5rem;
        }

        .time-value {
            font-size: 3.5rem;
        }

        .time-label {
            font-size: 0.75rem;
            letter-spacing: 2px;
        }
    }

    @media (max-width: 480px) {
        #title {
            font-size: 2rem;
            letter-spacing: -1px;
        }

        #subtitle {
            font-size: 0.875rem;
        }

        #countdown {
            gap: 1.5rem 1rem;
        }

        .time-value {
            font-size: 2.5rem;
        }
    }
</style>
