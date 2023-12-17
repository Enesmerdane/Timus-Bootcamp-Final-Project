<template>
    <div class="modal" id="errorModal" v-if="showModal">
        <div class="modal-content">
            <strong>Error: </strong>{{errorMessage}}
            <span class="close" :onclick="closeModal">
                <img alt="Vue logo" class="logo" src="@/assets/close-icon.png" width="20" height="20" />
            </span>
        </div>
    </div>
</template>

<script>
import { usePageStore } from '../../stores/pageState'
    export default {
        props: {
            errorMessage: String,
            showModal: Boolean
        },
        methods: {
            closeModal(){
                const pageState = usePageStore()
                pageState.setShowError(false)
            }
        }
    }
</script>

<style scoped>

.modal {
  position: fixed;
  top: 60px;
  left: 200px;
  width: 300px;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 10px 20px;
  z-index: 2; /* Place the modal above the overlay */
  border-width: 1px;
  background-color: #ffcccc; /* Reddish background */
  border: 2px solid #ff0000; /* Red border */
  border-radius: 5px;
  /* display: none; */
}

.modal-content {
    color: #ac0000;
    margin-right: 10px;
}

.close {
  position: absolute;
  top: 0px;
  right: 5px;
  font-size: 30px;
  cursor: pointer;
}
</style>