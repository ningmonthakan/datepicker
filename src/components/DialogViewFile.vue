<template>
  <v-container>
    <v-dialog 
    :value="file_dialog" 
    @input="close"
    width="550">
        <v-card>
            <v-card-title style="background-color: #035891">
                <span class="white--text" style="font-size:16px; font-family: 'Bai_Jamjuree'">รายการเอกสารแนบ</span>
                <v-spacer></v-spacer>
                <v-btn icon dark @click="close()">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            
            <v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary"
                        v-if="file_url.length > 0"
                        @click="downloadAll(file_url)"
                        >
                        ดาวน์โหลดเอกสารทั้งหมด
                    </v-btn>
                </v-card-actions>
                <v-list>
                    <v-list-item v-for="(item, index) in file_url" :key="item.name">
                        <v-list-item-content>
                            <v-list-item-title>
                                {{ index + 1 }}.
                                {{ item.name }}
                            </v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-icon>
                            <v-btn 
                            icon 
                            color="primary"
                            @click=" previewFile({ 
                                url: item.url,
                                types: item.type,
                                check_local_file: item.check_local_file
                                }) "
                            >
                                <v-icon>mdi-eye</v-icon>
                            </v-btn>
                            <v-btn 
                            icon 
                            color="green"
                            @click=" downloadFile({ 
                                url: item.url, 
                                label: item.name,
                                types: item.type,
                                check_local_file: item.check_local_file }) "
                            >
                                <v-icon>mdi-download</v-icon>
                            </v-btn>
                            <v-btn 
                            icon 
                            color="red"
                            @click="deleteFile(item)">
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                        </v-list-item-icon>
                    </v-list-item>
                </v-list>
                <v-card-actions v-if="file_url.length  == 0" style="text-align: center;">
                    <v-layout row>
                        <v-flex justify-center>
                            <!--<p style="font-size: 10px font-family: 'Bai_Jamjuree'">ไม่มีรายการเอกสารแนบ</p>-->
                            <span style="font-size: 25px font-family: 'Bai_Jamjuree'">ไม่มีรายการเอกสารแนบ</span>
                        </v-flex>
                    </v-layout>
                </v-card-actions>
                <v-card-actions v-else class="mb-n9">
                    <v-icon size="15px">mdi-information-outline</v-icon>
                    &nbsp;
                    <span style="font-size: 10px">ในกรณีที่ไฟล์เอกสารเป็นประเภท Excel (นามสกุลไฟล์ .xlsx , .xls , .csv) จะไม่สามารถ Preview ได้</span>
                </v-card-actions>
            </v-card-text>

            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    class="mt-n4"
                    color="#035891"
                    width="150"
                    outlined
                    text @click="close()"
                >
                    ยกเลิก
                </v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- ------------------------------Delete-------------------------------------- -->
    <v-dialog
      v-model="dialogDelete"
      max-width="500px"
      style="z-index: 1002 !important">
        <v-card class="pa-5">
            <v-card-title
            class="text-h5"
            style="
                justify-content: center;
                font-family: 'Bai_Jamjuree' !important;
            "
            >คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้ ?
            </v-card-title>
            <div style="text-align: center">
                
            </div>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" @click="dialogDelete = false">Cancel</v-btn>
                <v-btn
                    color="blue darken-1"
                    dark
                    @click="confirmDelete(delete_data)"
                >OK</v-btn
          >
            </v-card-actions>
        </v-card>
    </v-dialog>
    <!-- ----------------------------end Delete------------------------------------ -->
  </v-container>
</template>

<script>
import eventBus from "../event-bus";
import axios from 'axios'
import Swal from "sweetalert2";

export default {
    props: ["file_dialog"],
    data: () => ({
        dialogDelete: false,
        data_test: "",
        file_url: [],
        file_name: [],
        delete_data: "",
        delete_file: {
            queue_no_file: "",
            name: ""
        },
        delete_filewht: {
            queue_no_filewht: "",
            name: ""
        },
    }),
    mounted() {
        eventBus.$on("openFileDialog", this.open );
    },
    beforeDestroy() {
        eventBus.$off("openFileDialog");
    },
    methods: {
        close() {
            this.file_url=[]
            this.$emit("close_file_dialog");
        },
        open(item , status) {
            this.file_url=[]
            this.data_test = item;
            if(status == 'file'){
                if(this.data_test.file){
                    this.data_test.file.forEach(element => {
                        this.file_url.push({
                            url: element.data_base64,
                            name: element.name,
                            type: element.type,
                            queue_no_file: element.queue_no_file,
                            file_id: element.file_id,
                            check_local_file: element.check_local_file,
                            status: 'file',
                        })
                        //console.log(this.file_url)
                    });
                }
            }else {
                if(this.data_test.file_wht){
                    this.data_test.file_wht.forEach(element => {
                        this.file_url.push({
                            url: element.data_base64,
                            name: element.name,
                            type: element.type,
                            queue_no_filewht: element.queue_no_filewht,
                            file_id: element.file_id,
                            check_local_file: element.check_local_file,
                            status: 'wht'
                        }) 
                        //console.log(this.file_url)
                    });
                }  
            }
            
        },

        // download ทั้งหมด
        downloadAll(items){ 
           for(const item of items){
            let urls = "";
            if(item.check_local_file == true){
                urls = "data:"+item.type+";base64,"+item.url
            }else{
                urls = item.url
            }
            
            axios.get(urls, { responseType: 'blob' }) 
                .then(response => { 
                    const blob = new Blob([response.data], { type: response.data.type })
                    //console.log(blob)
                    const link = document.createElement('a') 
                    link.href = window.URL.createObjectURL(blob)
                    link.download = item.name
                    link.click() 
                    URL.revokeObjectURL(link.href) 
                }).catch(console.error)
           }
            
        },

        // preview
        previewFile({url , types , check_local_file}){ 
           let urls = "";
           if(check_local_file == true){
                urls = "data:"+types+";base64,"+url;
            }else{
                urls = url;
            }
           axios.get(urls, { responseType: 'blob' })
                .then(response => { 
                    const blob = new Blob([response.data], { type: response.data.type })
                    //console.log(blob)
                    const link = document.createElement('a') 
                    link.href = window.URL.createObjectURL(blob) 
                    window.open(link.href, '_blank');
            }).catch(console.error)
        },

        // download
        downloadFile({ url , label , types , check_local_file}){
            let urls = "";
           if(check_local_file == true){
                urls = "data:"+types+";base64,"+url;
            }else{
                urls = url;
            }
            axios.get(urls, { responseType: 'blob' })
                .then(response => { 
                    //console.log(response.data)
                    const blob = new Blob([response.data], { type: response.data.type }) 
                    //console.log(blob)
                    const link = document.createElement('a') 
                    link.href = window.URL.createObjectURL(blob) 
                    link.download = label
                    link.click() 
                    URL.revokeObjectURL(link.href) 
            }).catch(console.error)
        
        },

        // ลบไฟล์ใน modal เอกสารแนบไฟล์
        deleteFile(item){
            this.delete_data = item;
            //console.log(this.delete_data)
            this.dialogDelete = true;
        },

        confirmDelete(item){
            console.log(item)
            let headers = {
                headers: {
                Authorization:
                    "Bearer " +
                    localStorage.getItem("acces_token") +
                    "," +
                    localStorage.getItem("secret"),
                },
            };
            if(item.status == 'file'){
                this.axios.post(process.env.VUE_APP_API + "/statement/delete/file",
                        {
                            file:[
                                {
                                    queue_no_file: item.queue_no_file,
                                    name: item.name
                                }
                            ]
                            
                        },
                        headers
                )
                .then(() => {
                    Swal.fire({
                        icon: "success",
                        title: "ลบข้อมูลเรียบร้อยแล้ว",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    this.dialogDelete = false;
                    this.$emit("close_file_dialog");
                    this.$emit("edit_dialog");
                    },
                    (error) => {
                    if (error) {
                        Swal.fire({
                        icon: "error",
                        title: "ไม่สามารถลบข้อมูลได้",
                        showConfirmButton: false,
                        timer: 1500,
                        });
                    }
                    }
                );
            }else{
                this.axios.post(process.env.VUE_APP_API + "/statement/delete/filewht",
                        {
                            filewht:[
                                {
                                    queue_no_filewht: item.queue_no_filewht,
                                    name: item.name
                                }
                            ]
                        },
                        headers
                )
                .then(() => {
                    Swal.fire({
                        icon: "success",
                        title: "ลบข้อมูลเรียบร้อยแล้ว",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    this.dialogDelete = false;
                    this.$emit("close_file_dialog");
                    this.$emit("edit_dialog");
                    },
                    (error) => {
                    if (error) {
                        Swal.fire({
                        icon: "error",
                        title: "ไม่สามารถลบข้อมูลได้",
                        showConfirmButton: false,
                        timer: 1500,
                        });
                    }
                    }
                );
            }
            
        },
    }

}
</script>

<style>

</style>
