<template>
  <v-container>
    <v-dialog
      :value="image_dialog"
      @input="close"
      width="500"
    >
    <v-card>
        <v-card-title class="headline">
          {{image_url.type}}
        </v-card-title>

        <v-card-actions v-if="src">
          <v-btn
            small
            outlined
            color="success"
            @click="$refs.zoomer.zoomIn()"
          >
            <v-icon>
              mdi-magnify-plus-outline 
            </v-icon>
          </v-btn>

          <v-btn
            small
            outlined
            color="success"
            @click="$refs.zoomer.zoomOut()"
          >
            <v-icon>
              mdi-magnify-minus-outline 
            </v-icon>
          </v-btn>
          
        </v-card-actions>

        <v-card-text v-if="src">
          <v-zoomer
           style="width: 100%;"
           ref="zoomer"
           :max-scale="10"
           :min-scale="1"
           pivot='cursor'
           :mouse-wheel-to-zoom='false'
           :doubleClickToZoom='false'
          >
            <img
              :src="src"
              style="width: 100%;"
            >
          </v-zoomer>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="close()"
          >
            ปิด
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  props: ['image_dialog', 'image_url'],
  data: () => ({
    api: process.env.VUE_APP_API,
    src: ''
  }),
  watch: {
    image_dialog (n) {
      if (n) {
        this.load_img()
      }
    }
  },
  methods: {
    load_img () {
      let acces_token = localStorage.getItem('acces_token')
      let secret = localStorage.getItem('secret')
      let headers = {
          headers: {
            Authorization: "Bearer " + acces_token + "," + secret
          },
          responseType: 'blob'
        }
      this.axios.get(this.image_url.url, headers).then((response) => {
          let reader = new FileReader();
          reader.readAsDataURL(response.data); 
          reader.onload = () => {
            this.src = reader.result;
          }
      }).catch(error => {
        if (error.response.status === 401) {
          localStorage.clear() 
          this.$router.push('/login')
        }
      })
    },
    close () {
      this.src = ''
      this.$emit('close_image_dialog')
    }
  }
}
</script>
