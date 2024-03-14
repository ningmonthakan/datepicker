<template>
  <div>
    <!-- =================================Loading ======================================================= -->
    <div
      style="margin: 0"
      class="loading-waiting"
      v-bind:style="{ display: finish == false ? 'none' : '' }"
    >
      <div>
        <div class="load-4">
          <div class="ring-1"></div>
        </div>
        <div class="load-wrapp">
          <div class="load-6">
            <div class="letter-holder">
              <div class="l-1 letter">l</div>
              <div class="l-2 letter">o</div>
              <div class="l-3 letter">a</div>
              <div class="l-4 letter">d</div>
              <div class="l-5 letter">i</div>
              <div class="l-6 letter">n</div>
              <div class="l-7 letter">g</div>
              <div class="l-8 letter">.</div>
              <div class="l-9 letter">.</div>
              <div class="l-10 letter">.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- =================================Loading ======================================================= -->
    <div class="bg-image">
      <img :src="logo" alt="logo" class="logo_cover" />

      <v-form @submit.prevent="login()" ref="auth_form">
        <div class="wrapper">
          <div class="login">
            <img
              :src="inet_logo"
              alt="inet_logo"
              width="85"
              height="40"
              class="logo_inet"
            />

            <div class="login-decoration">
              <div class="cover_decoration"></div>
            </div>
            <div class="login-form">
              <label class="login-title">Tracking Finance
                (AR Tracking)</label>
              <div class="form-wrapper">
                <div class="input-wrapper">
                  <label class="label" for="email">One ID</label>
                  <v-text-field
                    class="text"
                    v-model="username"
                    placeholder="*example@one.th"
                    prepend-inner-icon="mdi-account"
                    :rules="username_rule"
                    outlined
                  />
                </div>
                <div class="input-wrapper">
                  <label class="label" for="password">Password</label>
                  <v-text-field
                    class="text"
                    v-model="password"
                    placeholder="Password"
                    prepend-inner-icon="mdi-lock"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    @click:append="show1 = !show1"
                    :rules="password_rule"
                    outlined
                  />
                </div>

                <div class="actions mt-2">
                  <button class="action" type="submit">เข้าสู่ระบบ</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script>
import home_inet from "../assets/home_inet.png";
import inet_logo from "../assets/inetlogo.png";

export default {
  data() {
    return {
      logo: home_inet,
      inet_logo: inet_logo,
      show1: false,
      username: "",
      password: "",
      username_rule: [(v) => !!v || "One ID is required"],
      password_rule: [(v) => !!v || "Password is required"],
      finish: false,
    };
  },
  created() {
    localStorage.clear();
  },
  methods: {
    login() {
      this.finish = true;
      let auth_data = {
        username: this.username,
        password: this.password,
      };
      if (this.$refs.auth_form.validate()) {
        this.axios
          .post(process.env.VUE_APP_API + "/auth/login", auth_data)
          .then((response) => {
            // console.log("login", response);
            let data = response.data.data;
            
            //console.log("login", response.data.data);
            localStorage.setItem("acces_token", data.acces_token);
            localStorage.setItem("account_id", data.account_id);
            // localStorage.setItem(
            //   "employee_id",
            //   data.profile.employee_detail[0].employee_id
            // );
            localStorage.setItem("employee_id", data.emp.employee_id);
            // localStorage.setItem("first_name_th", data.profile.first_name_th);
            // localStorage.setItem("last_name_th", data.profile.last_name_th);
            localStorage.setItem("first_name_th", data.empdepartment.first_name_th);
            localStorage.setItem("last_name_th", data.empdepartment.last_name_th);
            localStorage.setItem("secret", data.secret);
            localStorage.setItem("resource_key", data.resource_key);
            // var endcode_1 = btoa(data.role).split("").reverse().join("");
            // var endcode_2 = btoa(endcode_1);
            // console.log(endcode_2)
            //  var endcode_2 =atob(endcode_1).split('').reverse().join('')
            // localStorage.setItem("role", endcode_2);
            localStorage.setItem("role", data.role);
            //  localStorage.setItem('detail',data.profile.employee_detail[0].tax_id)
            if (response.status === 200) {
              this.$router.push("/invoice");
              //this.finish = false;
              // this.$router.push("/installment");
            } else {
              this.$swal.fire({
                title: "<h4>กรุณาลองใหม่อีกครั้ง</h4>",
                icon: "error",
                showConfirmButton: false,
                timer: 1500,
              });
              this.finish = false;
              this.$router.push("/login");
            }
          })
          .catch((error) => {
            if (error)
              this.$swal.fire({
                //title: "<h4>กรุณาลองใหม่อีกครั้ง</h4>",
                title: error.response.data.errorMessage,
                text: error.response.data.msg,
                icon: "error",
                showConfirmButton: false,
                timer: 3500,
              });
              this.finish = false;
          });
      }
    },
  },
};
</script>

<style lang="scss" >
.logo_cover {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.logo_inet {
  position: absolute;
  margin-left: 12px;
  margin-top: 12px;
}
.bg-image {
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden !important;
}

@font-face {
  font-family: "Bai_Jamjuree";
  src: url("~@/assets/Bai_Jamjuree/BaiJamjuree-Regular.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: "Bai_Jamjuree";
  src: url("~@/assets/Bai_Jamjuree/BaiJamjuree-Medium.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
}
h2.swal2-title {
  position: relative;
  font-family: "Bai_Jamjuree" !important;
  max-width: 100%;
  margin: 0 0 0.4em;
  padding: 0;
  color: #595959;
  font-size: 1.875em;
  font-weight: 600;
  text-align: center;
  text-transform: none;
  word-wrap: break-word;
}
.text {
  font-family: "Bai_Jamjuree" !important;
}
// --------------------------------------------------------------------//
/*instagram : halaabubaker */

.wrapper {
  width: 100%;
  height: 100vh;

  padding: 30px 15px;
  background-image: url(../assets/home_inet.png);

  display: flex;
  align-items: center;
  justify-content: center;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.login {
  font-family: "Bai_Jamjuree" !important;
  width: 100%;
  max-width: 800px;
  background-color: #fff;
  display: flex;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.4);
}
.login .login-form {
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: auto;
  max-width: 50%;
  background-color: #fff;
  padding: 60px 45px;
}
@media only screen and (max-width: 767.98px) {
  .login .login-form {
    max-width: 100%;
  }
}
@media only screen and (max-width: 575.98px) {
  .login .login-form {
    padding: 65px 20px 40px 20px;
  }
  .login .login-form .login-title{
    margin-bottom: 0px !important;
    font-size: 18px;
  }
  .form-wrapper {
    margin-top: 10px;
}
}
.login .login-form .login-title {
  font-family: "Bai_Jamjuree" !important;
  font-size: 1.2rem;
  font-weight: 700;
  color: #393939;
  margin-bottom: 25px;
}
.login .login-form .form-wrapper .input-wrapper .label,
.login .login-form .form-wrapper .input-wrapper .input {
  font-family: "Bai_Jamjuree" !important;
  display: block;
  width: 100%;
}
.login .login-form .form-wrapper .input-wrapper .label {
  font-family: "Bai_Jamjuree" !important;
  padding-bottom: 3px;
  font-size: 0.9rem;
  color: #393939;
}
.login .login-form .form-wrapper .input-wrapper .input {
  padding: 10px;
  border-radius: 5px;
  border: 1.5px solid #cae9c4;
  font-family: "Bai_Jamjuree" !important;
}
.login .login-form .form-wrapper .action-help {
  padding: 20px 0;
}
/* designed By hala Abu Baker  */

.login .login-form .form-wrapper .action-help .help-link {
  color: #583177;
  text-decoration: none;
  transition: color 0.3s ease-in-out;
  font-size: 0.9rem;
}
.login .login-form .form-wrapper .action-help .help-link:hover {
  color: #fe7092;
}
.login .login-form .form-wrapper .actions {
  font-family: "Bai_Jamjuree" !important;
  display: flex;
  flex-flow: column;
}
.login .login-form .form-wrapper .actions .action {
  font-family: "Bai_Jamjuree" !important;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px 30px;
  margin-bottom: 15px;
  border-radius: 25px;
  color: #fff;
  background-color: #033f81;
  text-decoration: none;
  border: 1px solid #033f81;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}
.login .login-form .form-wrapper .actions .action:hover {
  transform: scale(1.1);
  box-shadow: 0 5px 25px -15px rgba(0, 0, 0, 0.5);
}

.login .login-decoration {
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: auto;
  // background-image: url(../assets/12.png);
  background-position: center;
  background-size: cover;
  // background-color: azure;
  padding: 10px;
  justify-content: center;
  display: flex;
  align-items: center;
}
.cover_decoration {
  background-image: url(../assets/erp_2.png);
  padding: 10px;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

@media only screen and (max-width: 767.98px) {
  .login .login-decoration {
    display: none;
  }
}

// ======================================loading..==============================================//
.loading-waiting {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: fixed;
  top: 0px;
  left: 0px;
  background-color: #ecf5ff62;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
}

.load-4 .ring-1 {
  animation: loadingD 1.5s 0.3s cubic-bezier(0.17, 0.37, 0.43, 0.67) infinite;
}

@keyframes loadingD {
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.ring-1 {
  width: 70px;
  height: 70px;
  margin: 0 auto;
  padding: 7px;
  border: 8px dashed #4b9cdb;
  border-radius: 100%;
}

.load-6 .letter {
  animation-name: loadingF;
  animation-duration: 1.6s;
  animation-iteration-count: infinite;
  animation-direction: linear;
}

.letter-holder {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4b9cdb;
  font-size: 20px;
}

.l-1 {
  animation-delay: 0.48s;
}

.l-2 {
  animation-delay: 0.6s;
}

.l-3 {
  animation-delay: 0.72s;
}

.l-4 {
  animation-delay: 0.84s;
}

.l-5 {
  animation-delay: 0.96s;
}

.l-6 {
  animation-delay: 1.08s;
}

.l-7 {
  animation-delay: 1.2s;
}

.l-8 {
  animation-delay: 1.32s;
}

.l-9 {
  animation-delay: 1.44s;
}

.l-10 {
  animation-delay: 1.56s;
}

@keyframes loadingF {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
// ======================================End loading..==========================================//
</style>
