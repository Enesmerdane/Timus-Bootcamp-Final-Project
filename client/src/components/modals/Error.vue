<template>
  <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#ErrorView">
    Launch demo modal
    </button>

    <!-- Modal -->
    <div class="modal fade" id="ErrorView" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content bg-danger error-modal">
                <div class="modal-header modal-header-custom">
                    <h5 class="modal-title" id="exampleModalLabel">Error</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    {{ errorCode }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['errorCode']
}
</script>

<style scoped>
    .error-modal {
        background-color: rgb(214, 73, 73) !important;
    }

    .modal-header-custom {
        border-bottom-color: rgb(163, 42, 42) !important;
    }
</style>