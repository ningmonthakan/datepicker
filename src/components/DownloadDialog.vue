<template>
  <v-container>
    <v-dialog
      :value="download_dialog"
      @input="close"
      width="500"
    >
    <v-card>
        <v-card-title class="headline">
          ดาวน์โหลด
        </v-card-title>

        <v-card-text>
          <div v-for="(item, index) in item_download" :key="index">
            <v-btn 
              color="primary"
              @click="download(item)"
            >
              ไฟล์ที่ {{index + 1}}
              <v-icon
                right
                dark
              >
                mdi-cloud-download
              </v-icon>
            </v-btn>
          </div>
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
  props: ['download_dialog', 'item_download'],
  data: () => ({
    
  }),
  methods: {
    close () {
      this.$emit('close_download_dialog')
    },
     download (url) {
        var fileLink = document.createElement('a')
        fileLink.href = url
        // fileLink.click()
        window.open(fileLink.href, '_blank');
      //   this.axios.get(url,{responseType: 'blob'}).then((response) => {
      //     console.log(response)
      //       //  var fileURL = window.URL.createObjectURL(new Blob([response.data]));
      //       //  var fileLink = document.createElement('a');

      //       //  fileLink.href = fileURL;
      //       //  fileLink.setAttribute('download', 'file.pdf');
      //       //  document.body.appendChild(fileLink);

      //       //  fileLink.click();
      //   })
      }
    
  }
}
</script>