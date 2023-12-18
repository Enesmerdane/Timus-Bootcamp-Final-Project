<template>
    <div class="loading-overlay" id="loadingOverlay">
        <div class="loading-spinner"></div>
        <p>Loading...</p>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.loading-overlay {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9); /* Semi-transparent white background */
    z-index: 1000;
}

.loading-spinner {
    border: 8px solid #f3f3f3; /* Light gray border */
    border-top: 8px solid #3498db; /* Blue border for spinner */
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>