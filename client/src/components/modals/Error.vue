<template>
    <div>
        <div>
            <div class="modal">
                <div class="modal-content">
                <span class="close" @click="closeModal">&times;</span>
                <p>This is a modal view. It will disappear after 3 minutes.</p>
                </div>
            </div>
        </div>

        <button @click="openModal">Trigger Error</button>
    </div>
</template>

<script>
import { usePageStore } from '../../stores/pageState'



export default {
    data(){
        return {
            showErrorView: true
        }
    },
    props: ['errorCode'],
    beforeCreate(){
        const pageStore = usePageStore()

        //this.showErrorView = pageStore.getErrorView

    },
    methods: {
        toogleErrorView(){
            this.showErrorView = !this.showErrorView
        },
        openModal() {
            document.getElementById('error-modal-view').style.display = 'block';
        },

        closeModal() {
            document.getElementById('error-modal-view').style.display = 'none';
        }
    }
}
</script>

<style scoped>
    .modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fefefe;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    cursor: pointer;
}
</style>