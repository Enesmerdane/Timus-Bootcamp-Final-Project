<template>
  <div class="login-modal-view">
        <div class="login-modal-title">
            Add new column
        </div>
        
        <div class="group">      
            <input id="column_name"
                name="column_name"
                type="text"
                v-model="values.column_name"
                class="form-input"
                placeholder="Column name">
            <span class="highlight"></span>
            <span class="bar"></span>
            <!-- <label>Email</label> -->
        </div>
        <div class="box">
          <select v-model="values.column_type">
            <option value="text">Text</option>
            <option value="integer">Integer</option>
            <option value="decimal">Decimal</option>
            <option value="boolean">Boolean</option>
            <option value="date">Date</option>
          </select>
        </div>
        
        <div class="button-group">
          <button class="login_button" @click="handleSave">Save</button>
          <button class="login_button" @click="handleCancel">Cancel</button>
        </div>
    </div>
</template>

<script>
import { useFactoryStore } from '../../stores/factory'
import { usePageStore } from '../../stores/pageState'
export default {
  beforeRouteEnter(to, from){
      const authStore = useAuthStore()
      if(!authStore.getUserId){
          return '/login'
      }

      const pageStore = usePageStore()
      pageStore.setShowError(false)
  },
  data(){
    return {
      values: {
        column_name: "",
        column_type: "text"
      }
    }
  },
  methods: {
    handleCancel(){
      this.$router.push({name: 'factorylisttableview'})
    },
    handleSave(){
      const factoryStore = useFactoryStore()
      const pageStore = usePageStore()
      pageStore.setLoading(true)
      factoryStore.addColumnFactoryTable(this.values.column_name, this.values.column_type)
      .then((val)=> {
        pageStore.setLoading(false)
        this.$router.push({name: "factorylisttableview"})
      }).catch((err)=>{
        console.log(err);
        pageStore.setLoading(false)
      })
    }
  }
}
</script>

<style scoped>
.button-group {
  bottom: 10px;
  display: flex;
  flex-direction: row;
}

.login-modal-view {
    background-color: aliceblue;
    width: 700px;
    height: 450px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 21px;
}

.login-modal-title {
    margin-top: 0px;
    margin-bottom: 10px;
    font-size: 4rem;
}

.login_email {
    margin-bottom: 20px;
    width: 400px;
    display: block;
    align-items: center;
}

.login_password {
    margin-bottom: 20px;
    width: 400px;
    display: block;
    align-items: center;
}

.login_email_input {
    width:100%;
    margin-top:2px;
}

.login_password_input{
    width:100%;
    margin-top:2px;
}

.login_button {
    margin-bottom: 10px;
    margin-left: 25px;
    margin-right: 25px;
}

.login_button{
  appearance: none;
  background-color: #2ea44f;
  border: 1px solid rgba(27, 31, 35, .15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  padding: 6px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
  width: 100px;
}

.login_button:focus:not(:focus-visible):not(.focus-visible) {
  box-shadow: none;
  outline: none;
}

.login_button:hover {
  background-color: #2c974b;
}

.login_button:focus {
  box-shadow: rgba(46, 164, 79, .4) 0 0 0 3px;
  outline: none;
}

.login_button:disabled {
  background-color: #94d3a2;
  border-color: rgba(27, 31, 35, .1);
  color: rgba(255, 255, 255, .8);
  cursor: default;
}

.login_button:active {
  background-color: #298e46;
  box-shadow: rgba(20, 70, 32, .2) 0 1px 0 inset;
}

.input-error {
    color:rgb(178, 0, 0);
    margin-top:0px;
    margin-bottom: 5px
}
.group 			  { 
  position:relative; 
  margin-bottom:10px;
  margin-top: 5px
}
input 				{
  font-size:18px;
  padding:10px 10px 10px 5px;
  display:block;
  width:300px;
  border:none;
  border-bottom:1px solid #757575;
}
input:focus 		{ outline:none; }

/* LABEL ======================================= */
label {
  color:#999; 
  font-size:18px;
  font-weight:normal;
  position:absolute;
  pointer-events:none;
  left:5px;
  top:15px;
  transition:0.2s ease all; 
  -moz-transition:0.2s ease all; 
  -webkit-transition:0.2s ease all;
}

/* active state */
input:focus ~ label, input:valid ~ label 		{
  top:-20px;
  font-size:14px;
  color:#5264AE;
}

/* BOTTOM BARS ================================= */
.bar 	{ position:relative; display:block; width:300px; }
.bar:before, .bar:after 	{
  content:'';
  height:2px; 
  width:0;
  bottom:1px; 
  position:absolute;
  background:#5264AE; 
  transition:0.2s ease all; 
  -moz-transition:0.2s ease all; 
  -webkit-transition:0.2s ease all;
}
.bar:before {
  left:50%;
}
.bar:after {
  right:50%; 
}

/* active state */
input:focus ~ .bar:before, input:focus ~ .bar:after {
  width:50%;
}

/* HIGHLIGHTER ================================== */
.highlight {
  position:absolute;
  height:60%; 
  width:100px; 
  top:25%; 
  left:0;
  pointer-events:none;
  opacity:0.5;
}

/* active state */
input:focus ~ .highlight {
  -webkit-animation:inputHighlighter 0.3s ease;
  -moz-animation:inputHighlighter 0.3s ease;
  animation:inputHighlighter 0.3s ease;
}

/* ANIMATIONS ================ */
@-webkit-keyframes inputHighlighter {
	from { background:#5264AE; }
  to 	{ width:0; background:transparent; }
}
@-moz-keyframes inputHighlighter {
	from { background:#5264AE; }
  to 	{ width:0; background:transparent; }
}
@keyframes inputHighlighter {
	from { background:#5264AE; }
  to 	{ width:0; background:transparent; }
}

.box {
  margin-bottom: 10px;
  border-radius: 15px
}

.box select {
  background-color: #1a8e1c;
  color: white;
  padding: 12px;
  width: 200px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  font-size: 20px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
  -webkit-appearance: button;
  appearance: button;
  outline: none;
}

.box::before {
  content: "\f13a";
  font-family: FontAwesome;
  position: absolute;
  top: 0;
  right: 0;
  width: 20%;
  height: 100%;
  text-align: center;
  font-size: 24px;
  line-height: 45px;
  color: rgba(255, 255, 255, 0.5);
  background-color: rgba(255, 255, 255, 0.1);
  pointer-events: none;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}

.box:hover::before {
  color: rgba(255, 255, 255, 0.6);
  background-color: rgba(255, 255, 255, 0.2);
}

.box select option {
  padding: 30px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
/** XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */

</style>