<template>
  <div>
    <!-- =================================Loading ======================================================= -->
    <div
      style="margin: 0"
      class="loading-waiting"
      v-bind:style="{ display: finish == true ? 'none' : '' }"
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
  </div>
</template>

<script>
export default {
    props: [
      "shared_token"
    ],
    data() {
        return {
            finish: false,
        };
    },
    created() {
      localStorage.clear();
      if(this.shared_token) this.getToken()
    },
    methods: {
      async getToken() {
        //localStorage.clear();
        this.finish = false;
        let shared_token = {
          shared_token: this.shared_token
        }

          this.axios
            .post(process.env.VUE_APP_API + "/auth/share_token/login", shared_token)
            .then((response) => {
              let data = response.data.data;
              localStorage.setItem("acces_token", data.acces_token);
              localStorage.setItem("account_id", data.account_id);
              localStorage.setItem("employee_id", data.emp.employee_id);
              localStorage.setItem("first_name_th", data.empdepartment.first_name_th);
              localStorage.setItem("last_name_th", data.empdepartment.last_name_th);
              localStorage.setItem("secret", data.secret);
              localStorage.setItem("resource_key", data.resource_key);
              localStorage.setItem("role", data.role);
              if (response.status === 200) {
                this.$router.push("/invoice");
              } else {
                this.$swal.fire({
                  title: "<h4>กรุณาลองใหม่อีกครั้ง</h4>",
                  icon: "error",
                  showConfirmButton: false,
                  timer: 1500,
                });
                this.finish = true;
                this.$router.push("/login");
              }
            })
            .catch((error) => {
              if (error)
                this.$swal.fire({
                  title: error.response.data.errorMessage,
                  text: error.response.data.msg,
                  icon: "error",
                  showConfirmButton: false,
                  timer: 3500,
                });
                this.finish = true;
                this.$router.push("/login");
            });

      }
    }
}
</script>

<style lang="scss">
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
