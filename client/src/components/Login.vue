<template>
    <div class="login-modal-view">
        <div class="login-modal-title">
            Welcome
        </div>
        
        <div class="group">      
            <input id="email"
                name="email"
                type="email"
                v-model="values.email_input"
                class="form-input"
                @blur="validate('email_input')"
                @keypress="validate('email_input')"
                placeholder="Email">
            <span class="highlight"></span>
            <span class="bar"></span>
            <!-- <label>Email</label> -->
            <div class="input-error" v-if="!!errors.email_input">{{errors.email_input}}</div>
        </div>

        <div class="group">      
            <input id="password_input"
                name="password_input"
                type="password"
                placeholder="Password"
                v-model="values.password_input"
                class="form-input"
                @blur="validate('password_input')"
                @keypress="validate('password_input')">
            <span class="highlight"></span>
            <span class="bar"></span>
            <!-- <label>Password</label> -->
            <div class="input-error" v-if="!!errors.password_input">{{errors.password_input}}</div>
        </div>

        <button class="login_button" @click="handleLogin">Login</button>
        <div>
            Don't have any account? <router-link to='/register'>Register</router-link>
        </div>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/auth'

import { object, string } from 'yup';
import { usePageStore } from '../stores/pageState';

let loginSchema = object().shape({
  email_input: string().email().required(),
  password_input: string().required()
});

export default {
    data(){
        return {
            values : {
                email_input: "",
                password_input: "",
            },
            errors: {
                email_input_error: "",
                password_input_error: "" 
            }
        }
    },
    beforeRouteEnter(to, from){
        const authStore = useAuthStore()
        if(authStore.getUserId){
            return '/factorylist'
        }
    },
    methods:{
        validate(field) {
        loginSchema
            .validateAt(field, this.values)
            .then(() => {
                this.errors[field] = "";
            })
            .catch(err => {
                this.errors[field] = err.message;
            });
        },
        handleLogin(){
            const pageStore = usePageStore()
            pageStore.setLoading(true)
            loginSchema
                .validate(this.values, { abortEarly: false })
                .then(()=>{
                    
                    const authStore = useAuthStore()
                    console.log(`${this.values.email_input} - ${this.values.password_input}`);
                    authStore.login(this.values.email_input, this.values.password_input)
                    .then(()=>{
                        this.errors = {
                            email_input: "",
                            password_input: ""
                        }
                        this.$router.push('/factorylist')
                        pageStore.setLoading(false)
                    })
                })
                .catch(err => {
                    pageStore.setLoading(false)
                    err.inner.forEach(error=> {
                        this.errors[error.path] = error.message
                    })
                    console.log(this.errors);
                    //console.log(err);
                /*
                    {
                    errors: ["email is a required field"],
                    inner: [],
                    message: "email is a required field",
                    name: "ValidationError",
                    params: {path: "email", value: "", originalValue: "", label: undefined},
                    path: "email",
                    type: "required",
                    value: "",
                    // ..
                    }
                */
                });
        }
    },
}
</script>

<style scoped>
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
    margin-top: 30px;
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

.group 			  { 
  position:relative; 
  margin-bottom:10px;
  margin-top: 25px
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

/** XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
.input-error {
    color:rgb(178, 0, 0);
    margin-top:5px;
}

</style>