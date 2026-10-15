<template>
    <div class="loading-wrapper">
        <svg class="container" viewBox="0 0 50 50" height="50" width="50">
            <circle class="track" cx="25" cy="25" r="22" pathLength="100" stroke-width="6px" fill="none"></circle>
            <circle class="car" cx="25" cy="25" r="22" pathLength="100" stroke-width="6px" fill="none"></circle>
        </svg>
    </div>
</template>

<script setup>
defineOptions({
    name: 'Loading'
})

</script>

<style lang='scss' scoped>
.loading-wrapper {
    --uib-size: 30px;
    --uib-speed: 2s;
    --uib-bg-opacity: 0;
    height: 100%;
    width: 100%;
    min-height: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    background: rgba(255, 255, 255, .5);

    .container {
        height: var(--uib-size);
        width: var(--uib-size);
        transform-origin: center;
        animation: rotate var(--uib-speed) linear infinite;
        will-change: transform;
        overflow: visible;

        .car {
            fill: none;
            stroke: var(--dd-primary);
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
            stroke-linecap: round;
            animation: stretch calc(var(--uib-speed) * 0.75) ease-in-out infinite;
            will-change: stroke-dasharray, stroke-dashoffset;
            transition: stroke 0.5s ease;
        }

        .track {
            fill: none;
            stroke: var(--dd-primary);
            opacity: var(--uib-bg-opacity);
            transition: stroke 0.5s ease;
        }
    }
}

@keyframes rotate {
    100% {
        transform: rotate(360deg);
    }
}

@keyframes stretch {
    0% {
        stroke-dasharray: 0, 150;
        stroke-dashoffset: 0;
    }

    50% {
        stroke-dasharray: 75, 150;
        stroke-dashoffset: -25;
    }

    100% {
        stroke-dasharray: 0, 150;
        stroke-dashoffset: -100;
    }
}
</style>