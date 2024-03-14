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
    <v-container fluid>
      <div>
        <v-row>
          <v-col
            cols="12"
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;">
            <h3 style="font-weight: 700" class="font_style">Customer Manage</h3>
            <v-spacer></v-spacer>
          </v-col>

        <template>
            <!-- <v-col cols="6">
              <v-card color="primary" dark style="padding: 10px">
                <v-card-title style="display: block">
                  Count User :
                  
                  <label style="font-size: 1.5vw">{{ count_user }}</label>
                </v-card-title>
              </v-card>
            </v-col> -->

            <v-col cols="6">
            <v-card style="padding: 1px;">
              <v-card-title style="display: block">
                <div class="d-flex" style="align-items: center;justify-content: space-between;"> 
                <v-icon style="font-size: 28px;padding:5px;color:white;background-color:#3BB8C6">mdi-account</v-icon>
                <label style="font-size: 1.2vw;text-align:right">Count Customer</label>
                </div>
                <v-spacer></v-spacer>
                <div style="font-size: 1.2vw;text-align: right;font-weight:700">{{ count }}</div>
              </v-card-title>
            </v-card>
          </v-col>
          <!-- <v-col cols="6">
            <v-card dark color="teal" style="padding: 10px">
              <v-card-title style="display: block">
                Total User :
                
                <label style="font-size: 1.5vw">{{ total_user }}</label>
              </v-card-title>
            </v-card>
          </v-col> -->

          <v-col cols="6">
            <v-card style="padding: 1px;">
              <v-card-title style="display: block">
                <div class="d-flex" style="align-items: center;justify-content: space-between;"> 
                <v-icon style="font-size: 28px;padding:5px;color:white;background-color:#3BB8C6">mdi-account-supervisor</v-icon>
                <label style="font-size: 1.2vw;text-align:right">Total Customer</label>
                </div>
                <v-spacer></v-spacer>
                <div style="font-size: 1.2vw;text-align: right;font-weight:700">{{ convert_digit(total_page)}}</div>
              </v-card-title>
            </v-card>
          </v-col>

        </template>

          <v-col cols="12">
            <v-card>
              <v-card-title>
                <!-- <div>
                  <button
                    class="btn refresh-btn font_style"
                    color="primary"
                    @click="refreshData()"
                  >
                    Refresh:
                    <v-icon black>mdi-refresh</v-icon>
                  </button>
                </div> -->
              <div class="d-flex" style="justify-content: space-between;align-items: center;width: 100%;">
                <div >
                  <a
                    class="btn refresh-btn font_style"
                    color="primary"
                    @click="refreshData()"
                    style="font-size:13px"
                  >
                    Refresh:
                    <v-icon black style="font-size:14px">mdi-refresh</v-icon>
                  </a>                
                </div>
                <v-spacer></v-spacer>
                
                <div style="display: flex; justify-content: space-between;margin-right:5px;color:gray">
                  <div>
                      <v-form
                      style="display: flex; align-items: center"
                      class="search-area font_style"
                      @submit.prevent="searchWord()" >
                      <v-text-field
                        v-model="search"
                        label="Cus No, Cus Name"
                        single-line
                        hide-details
                        autocomplete="off"
                        style="width: 480px"
                      ></v-text-field>
                        <v-btn color="primary" type="submit" style="font-size: 12px">
                          Search
                          <v-icon right dark> mdi-magnify </v-icon>
                        </v-btn>
                        <div style="width: 10px"></div>
                      </v-form>
                  </div>               
                </div>
              </div>
              <v-spacer></v-spacer>           
            </v-card-title>

            <v-card-text id="customer-manage" >
                <v-btn
                  color="teal"
                  dark
                  style="width: 150px; font-size: 12px; font-weight: 600"
                  @click="Export_AllFile()"
                  text>
                  Export All File
                </v-btn>
                
                <label style="font-size: 12px; float: right;padding-top:15px">page : {{ page}}</label>
                
                <!-- --------------------------------------table--------------------------------------------- -->
                <div class="table-sum-cus">
                  <v-simple-table
                    class="table_in_sum_customer"
                    fixed-header
                    height="600px"
                    style="border-top: 1px solid gray">
                    <thead>
                      <tr>
                        <th
                          v-for="header in pivotHeaders"
                          :key="header.value"
                          style="text-align: center; padding: 0;height:80px;font-weight:700;z-index:1"
                          :style="{ 'background-color': header.color , 
                            'border-right': header.value == 'วางบิล' || header.value == 'รับเงิน' ? '0px' : '1px solid' }"
                        >
                          <div style="height:40px;align-items: center;
                          display: flex;font-size:14px;padding:0px"
                          v-bind:style="{ 'border-right':header.value == 'วางบิล' || header.value == 'รับเงิน' ? '1px solid' : '0px' ,
                          'width':header.value == 'วางบิล' ? '950px' : '300px',
                          'width':header.value == 'รับเงิน' ? '751px' : '',
                          'justify-content':header.value == 'Cus No.'? 'left' : 'center' }"
                          > 
                          <!-- <v-checkbox
                          v-model="selected"
                          style="width:35px"
                          v-if="header.value == 'Cus No.'"
                          @change="allcheck()"
                        ></v-checkbox> -->
                        {{ header.value }}</div>
                        <td v-for="value in header.sub"
                        :colspan="value.colspan"
                        style="text-align: center;width:360px"
                        :key="value.value"
                        >            
                          <div 
                          style="width:auto;height:40px;text-align: center;margin:auto;  
                            align-items: center;
                            display: flex;
                            justify-content: center;
                            border-right:1px solid;
                            border-top:1px solid;
                            border-bottom:1px solid;
                            "
                            :style="{ 'background-color': value.color,
                            'width': value.value == 'เอกสารประกอบวางบิล' || value.value == 'ติดต่อการวางบิล'
                            || value.value == 'ติดต่อการชำระ'? '350px' : '200px'}" >
                          {{value.value}}
                          </div>      
                        </td>
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <!--------------------------------- filter --------------------------------------->
                    <!-- <tr>
                    <td class="fixed-detail" style="padding:10px;vertical-align: middle; text-align:left;">
                        <input
                          class="form-control"
                          v-model="customer_no"
                          @change="filter(customer_no, String('customer_no'))"
                          placeholder="Cus no."
                          :disabled="customer_no_blank == true"
                        />
                    </td>
                    <td class="filter-manage">
                      <v-autocomplete
                        multiple
                        clearable
                        dense
                        :search-input.sync="search_customer_name"
                        v-model="customer_name"
                        type="text"
                        label="Cus Name"
                        :items="customer_name_list"
                        @change="
                          filter(customer_name, String('customer_name'))
                        "
                      ></v-autocomplete>
                    </td>
                    <td class="filter-manage">
                      <v-autocomplete
                          auto-select-first
                          clearable
                          dense
                          v-model="finance_name"
                          type="text"
                          multiple
                          label="ชื่อเจ้าหน้าที่การเงิน"
                          :items="emptyFinance"
                          @change="
                            filter(finance_name, String('finance_name'))
                          "
                      ></v-autocomplete>
                    </td>
                    <td class="filter-manage">
                      <v-autocomplete
                          auto-select-first
                          clearable
                          dense
                          multiple
                          v-model="online_payment"
                          type="text"
                          label="Online Payment"
                          :items="online_payment_list"
                          @change="filter(online_payment, String('online_payment'))"
                          item-text="name"
                      ></v-autocomplete>
                    </td>
                    <td class="filter-manage">
                      <v-autocomplete
                          auto-select-first
                          clearable
                          dense
                          multiple
                          v-model="credit_name"
                          type="text"
                          label="Credit Term"
                          :items="credit_term_list"
                          @change="filter(credit_name, String('credit_name'))"
                          item-text="name"
                      ></v-autocomplete>
                    </td>
                    <td class="filter-manage">
                      <v-autocomplete
                          auto-select-first
                          clearable
                          dense
                          multiple
                          v-model="status_customer"
                          type="text"
                          label="Status Customer"
                          :items="status_customer_list"
                          @change="filter(status_customer, String('status_customer'))"
                          item-text="name"
                      ></v-autocomplete>
                    </td>
                    <td class="filter-manage">
                        <v-autocomplete
                          auto-select-first
                          clearable
                          dense
                          multiple
                          v-model="active"
                          type="text"
                          label="Active"
                          :items="active_list"
                          @change="filter(active, String('active'))"
                          item-text="name"
                        ></v-autocomplete>
                    </td>
                    <td class="filter-manage">
                      <input
                          v-model="customer_email"
                          class="form-control"
                          @change="filter(customer_email, String('customer_email'))"
                          placeholder="Customer Email"
                          :disabled="customer_email_blank == true"
                      />
                    </td>
                    <td class="td_sub_value" style="padding: 0;">
                      <div class="d-flex" style="align-items: center;">
                        <div style="width:200px; margin:auto; color:blue;">
                          <input
                          v-model="billing_due"
                          class="form-control"
                          @change="filter(billing_due, String('billing_due'))"
                          placeholder="Due วางบิล"
                          :disabled="customer_email_blank == true"
                      />
                        </div>
                        <div style="width:350px; margin:auto; color:blue;">
                          <input
                              class="form-control"
                              v-model="billing_contact"
                              type="text"
                              placeholder="ติดต่อการวางบิล"
                              @change="filter(billing_contact, String('billing_contact'))"
                              :disabled="customer_email_blank == true"
                            />
                        </div>
                        <div style="width:200px; margin:auto; color:blue;">
                          <v-autocomplete
                              auto-select-first
                              clearable
                              dense
                              multiple
                              v-model="billing_type"
                              type="text"
                              label="วิธีวางบิล"
                              :items="billing_type_list"
                              @change="filter(billing_type, String('billing_type'))"
                              item-text="name"
                          ></v-autocomplete>
                        </div>
                        <div style="width:200px; margin:auto; color:blue;">
                          <v-autocomplete
                              auto-select-first
                              clearable
                              dense
                              multiple
                              v-model="billing_after_checking"
                              type="text"
                              label="วางบิลหลังการใช้งาน"
                              :items="billing_after_checking_list"
                              @change="filter(billing_after_checking, String('billing_after_checking'))"
                              item-text="name"
                          ></v-autocomplete>
                        </div>
                        <div style="width:200px; margin:auto; color:blue;">
                            <v-autocomplete
                              auto-select-first
                              clearable
                              dense
                              multiple
                              v-model="billing_checking"
                              type="text"
                              label="วางบิลพร้อมใบเสร็จ"
                              :items="billing_checking_list"
                              @change="filter(billing_checking, String('billing_checking'))"
                              item-text="name"
                          ></v-autocomplete>
                        </div>
                        <div style="width:320px; margin:auto; color:blue;">
                          <v-autocomplete
                              auto-select-first
                              clearable
                              dense
                              multiple
                              v-model="billing_document"
                              type="text"
                              label="เอกสารประกอบวางบิล"
                              :items="billing_document_list"
                              @change="filter(billing_document, String('billing_document'))"
                              item-text="name"
                          ></v-autocomplete>
                        </div>
                      </div>
                    </td>
                    <td class="td_sub_value" style="padding: 0;">
                      <div class="d-flex" style="align-items: center;">
                        <div style="width:199px; color:blue;">
                          <input
                              class="form-control"
                              v-model="payment_due"
                              type="text"
                              placeholder="Due ชำระ"
                              @change="filter(payment_due, String('payment_due'))"
                              :disabled="customer_email_blank == true"
                            />
                        </div>
                        <div style="width:350px; color:blue;">
                          <input
                              class="form-control"
                              v-model="payment_contact"
                              type="text"
                              placeholder="ติดต่อการชำระ"
                              @change="filter(payment_contact, String('payment_contact'))"
                              :disabled="customer_email_blank == true"
                            />
                        </div>
                        <div style="width:200px; color:blue;">
                          <v-autocomplete
                              auto-select-first
                              clearable
                              dense
                              multiple
                              v-model="payment_type"
                              type="text"
                              label="ช่องทางชำระ"
                              :items="payment_type_list"
                              @change="filter(payment_type, String('payment_type'))"
                              item-text="name"
                          ></v-autocomplete>
                        </div>
                      </div>
                    </td>
                    </tr> -->
                    <!------------------------- end filter -------------------------------->
                    <tr v-for="item_row in datalist" :key="item_row.id" class="hover-td">
                      <td style="pagging-left:10px;padding:0;vertical-align: middle;">
                        <div class="d-flex"  style="align-items: center;width:200px;padding-left:20px;text-align:left">
                          {{item_row.customer_no}}
                        </div>                     
                      </td>
                      <td style="padding:0;border-right:1px solid gray;vertical-align: middle;">
                        <div style="width:200px;padding-left:10px;text-align:left">{{item_row.customer_name}}</div>                     
                      </td>
                      <td style="padding:0;border-right:1px solid gray;vertical-align: middle;">
                        <div style="width:200px;padding-left:10px;text-align:left">{{item_row.financial_name}}</div>              
                      </td>
                      <td style="padding:0;border-right:1px solid gray;vertical-align: middle;">
                        <div style="width:260px; text-align:left;">
                          <select
                              style="font-size:13px; width: 220px; margin: auto;"
                              class="style-chooser  form-control"
                              v-model="item_row.online_payment"
                              :disabled=" role_status == 'viewer' "
                              @change="updateCustomer(item_row)">
                              <!-- <option value="true">YES</option>
                              <option value="false">NO</option>
                              <option value="Pending">Pending</option> -->
                              <option value=""></option> 
                              <option value="Online Billing - Online Payment">Online Billing - Online Payment</option>
                              <option value="Online Billing - Offline Payment">Online Billing - Offline Payment</option>
                              <option value="Offline Billing - Online Payment">Offline Billing - Online Payment</option>
                              <option value="Offline Billing - Offline Payment">Offline Billing - Offline Payment</option>
                          </select>
                        </div>                    
                      </td>
                      <td style="padding:0;border-right:1px solid gray;vertical-align: middle;">
                        <div style="width:200px;text-align:center">{{item_row.credit_name}}</div>
                      </td>
                      <td style="padding:0;border-right:1px solid gray;vertical-align: middle;">
                        <div style="width:180px;text-align:left">
                          <select
                            class="style-chooser form-control"
                            v-model="item_row.status_customer"
                            :disabled =" role_status == 'viewer' "
                            style="font-size:13px;width:140px;margin:auto"
                              @change="updateCustomer(item_row)"
                          >
                            <option value=""></option>
                            <option value="Blacklist/หนี้สูญ">Blacklist/หนี้สูญ</option>
                            <option value="ดำเนินคดี">ดำเนินคดี</option>
                            <option value="ปิดระบบ">ปิดระบบ</option>
                            <option value="แผนชำระ">แผนชำระ</option>
                            <option value="ทวงหนี้ครั้งที่ 1">ทวงหนี้ครั้งที่ 1</option>
                            <option value="ทวงหนี้ครั้งที่ 2">ทวงหนี้ครั้งที่ 2</option>
                        </select>
                        </div>
                      </td>
                      <td style="padding:0;border-right:1px solid gray;vertical-align: middle;">
                        <div style="width:180px;text-align:left">
                          <select
                            class="style-chooser form-control"
                            v-model="item_row.customer_criteria"
                            :disabled=" role_status == 'viewer' "
                            style="font-size:13px;width:140px;margin:auto"
                            @change="updateCustomer(item_row)"
                          >
                            <option value=""></option>
                            <option value="01 - Normal">01 - Normal</option>
                            <option value="02 - Critical">02 - Critical</option>
                          </select>
                        </div>
                      </td>
                      <td style="padding:0;border-right:1px solid gray;vertical-align: middle;">
                        <div style="width:150px;">
                          <v-chip style="width:100px;height:45px" color="success" label outlined v-if="item_row.active=='1'">
                              Active
                          </v-chip>
                          <v-chip style="width:100px;height:45px" color="orange" label outlined v-if="item_row.active=='0'">
                              Non Active
                          </v-chip></div>
                      </td>
                      <td  style="padding:0;border-right:1px solid gray;vertical-align: middle;">
                        <div  style="width:270px;text-align:left">
                            <b-textarea
                              placeholder="Email"
                              :disabled=" role_status == 'viewer' "
                              v-model="item_row.email"
                              rows="2"
                              max-rows="100" 
                              style="font-size:13px;"
                              @change="updateCustomer(item_row)"
                            ></b-textarea>
                        </div>
                      </td>
                      <td class="td_sub_value" style="padding: 0;" >
                        <div class="d-flex" style="align-items: center;">
                        <div style="width:200px">
                        <!-- {{item_row.billing_due}} -->
                          <!-- @click="set_default(item_row, 'billing_due')" -->
                          <input
                              type="text"
                              class="style-chooser form-control"
                              :disabled=" role_status == 'viewer' "
                              v-model="item_row.billing_due"
                              placeholder="Due วางบิล"
                              @change="updateCustomer(item_row)"
                              style="font-size:13px;width:95%;margin:auto"/>
                        </div>
                        <div style="width:350px">
                            <b-textarea
                              placeholder="ติดต่อการวางบิล"
                              :disabled=" role_status == 'viewer' "
                              v-model="item_row.billing_contact"
                              rows="2"
                              max-rows="100" 
                              style="font-size:13px;"
                              @change="updateCustomer(item_row)"
                            ></b-textarea>                               
                        </div>
                        <!-- <div style="width:200px">
                          <input
                            class="style-chooser form-control"
                            v-model="item_row.billing_type"
                            style="font-size:13px;width:180px;margin:auto;"
                            @change="updateCustomer(item_row)"  
                            autocomplete="off"
                            list="browsers_billing"
                            id="myBrowser_billing"
                            name="myBrowser_billing"/>
                            <datalist id="browsers_billing">
                              <option value=""></option>
                              <option value="Mail"></option>
                              <option value="ปณ."></option>
                              <option value="Mail+ปณ."></option>
                              <option value="Messenger"></option>
                              <option value="Sale"></option>
                              <option value="online payment"></option>
                            </datalist>
                            </div>  -->
                          <div style="width:200px; text-align:left;">
                          <select
                              style="font-size:13px; width: 180px; margin: auto;"
                              class="style-chooser  form-control"
                              :disabled=" role_status == 'viewer' "
                              v-model="item_row.billing_type"
                              @change="updateCustomer(item_row)">
                              <option value=""></option>
                              <option value="Mail">Mail</option>
                              <option value="ปณ.">ปณ.</option>
                              <option value="Mail+ปณ.">Mail+ปณ.</option>
                              <option value="Messenger">Messenger</option>
                              <option value="Sale">Sale</option>
                              <option value="online payment">online payment</option>
                          </select>
                        </div>        

                        <div style="width:200px;padding-left:10px;text-align:left">
                          <select
                            style="font-size:13px;width: 150px;text-align: center;margin: auto;padding: 0;"
                            class="style-chooser  form-control"
                            :disabled=" role_status == 'viewer' "
                            v-model="item_row.billing_after_checking"
                            @change="updateCustomer(item_row)">
                              <option value=""></option>
                              <option value="true">YES</option>
                              <option value="false">NO</option>
                          </select>
                        </div>
                        <div style="width:200px;padding-left:10px;text-align:left">
                          <select
                            style="font-size:13px;width: 150px;text-align: center;margin: auto;padding: 0;"
                            class="style-chooser  form-control"
                            :disabled=" role_status == 'viewer' "
                            v-model="item_row.billing_checking"
                            @change="updateCustomer(item_row)">
                              <option value=""></option>
                              <option value="true">YES</option>
                              <option value="false">NO</option>
                          </select>
                        </div>                    
                        <div style="width:320px;margin:auto;margin-block: 10px;"> 
                          <v-autocomplete
                            :items="archive_list"
                            v-model="item_row.billing_document"
                            :disabled=" role_status == 'viewer' "
                            chips
                            multiple
                            rounded
                            label="เอกสารประกอบวางบิล"
                            deletable-chips
                            @change="updateCustomer_document(item_row)"
                          ></v-autocomplete>                    
                        <!-- <v-text-field
                        style="padding-top:0px;margin-top:0px;margin:auto;width:95%"
                        v-if="item_row.other == false"
                      
                        label="อื่นๆ โปรดระบุ"
                        ></v-text-field> -->
                        <b-textarea
                            rows="2"
                            max-rows="100" 
                            v-bind:style="{ display: item_row.other == 'close'? 'none' : '' }"                                    
                            v-model="item_row.remark"
                            placeholder="โปรดระบุข้อมูล อื่นๆ"
                            style="padding-top:0px;margin-top:0px;margin:auto;width:95%"
                            @change="remark_text(item_row);"                            
                          ></b-textarea>            
                      </div>
                      </div>
                    </td>
                    <td class="td_sub_value" style="padding: 0;" >
                        <div class="d-flex">
                            <div style="width:199px">
                            <!-- {{item_row.payment_due}} -->
                            <!-- @click="set_default(item_row, 'payment_due')" -->
                                <input                       
                                  type="text"
                                  class=" style-chooser form-control"
                                  v-model="item_row.payment_due"
                                  :disabled=" role_status == 'viewer' "
                                  placeholder="Due ชำระ"
                                  @change="updateCustomer(item_row)"
                                  style="font-size:13px;width:95%;margin:auto"
                                />
                            </div>
                        <div style="width:350px">
                          <!-- <input
                                        type="text"
                                        class="style-chooser form-control"
                                        v-model="item_row.payment_contact"
                                        placeholder="ติดต่อการชำระ"
                            @change="updateCustomer(item_row)"
                            style="font-size:14px"
                                      /> -->
                            <b-textarea
                              placeholder="ติดต่อการชำระ"
                              v-model="item_row.payment_contact"
                              rows="2"
                              max-rows="100" 
                              style="font-size:13px;"
                              :disabled=" role_status == 'viewer' "
                              @change="updateCustomer(item_row)"
                            ></b-textarea>                     
                        </div>
                        <div style="width:200px"> 
                          <select
                              class="style-chooser form-control"
                              v-model="item_row.payment_type"
                              :disabled=" role_status == 'viewer' "
                              style="font-size:12px;width:180px;margin:auto"
                              @change="updateCustomer(item_row)"
                            >
                                <option value=""></option>
                                <option value="KBANK579">KBANK579</option>
                                <option value="KBANK861">KBANK861</option>
                                <option value="KBANK035">KBANK035</option>
                                <option value="KBANK199">KBANK199</option>
                                <option value="KTB856">KTB856</option>
                                <option value="BBL205">BBL205</option>
                                <option value="BBL785">BBL785</option>
                                <option value="QR_CODE">QR CODE</option>
                                <option value="SCB376">SCB376</option>
                                <option value="SCB009">SCB009</option>
                                <option value="KTB395">KTB395</option>
                                <option value="KTB184">KTB184</option>
                                <option value="TMB958">TMB958</option>
                                <option value="BAY778">BAY778</option>
                                <option value="GSB491">GSB491</option>
                                <option value="CHQ">CHQ</option>
                                <option value="FACTORING">FACTORING</option>
                                <option value="TBANK064">TBANK064</option>
                                <option value="Bill Payment - SCB">
                                  Bill Payment - SCB
                                </option>
                                <option value="Bill Payment - KBANK">
                                  Bill Payment - KBANK
                                </option>
                                <option value="Bill Payment - BBL">
                                  Bill Payment - BBL
                                </option>
                            </select>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </v-simple-table>               
                  <div class="d-flex" style=" justify-content:end;margin-top: 20px">
                      <div
                        style="
                          display: flex;
                          align-items: center;
                          margin-right: 10px;
                        "
                      >
                        Items per page:
                      </div>
                      <select
                        style="width: 80px; margin-right: 20px"
                        class="style-chooser"
                        v-model="item_per_page_count"
                        @change="item_per_page()"                      
                      >
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="300">300</option>
                        <option value="500">500</option>
                      </select>
                    <v-pagination                 
                      v-model="page"
                      :length="count_page"
                      :total-visible="7"
                      @input="pageChange()"
                    ></v-pagination>
                    </div>
                </div>
                <!-- ------------------------------------End tabel --------------------------------------------- -->
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>
    
  </div>
</template>

<script>
// import moment from "moment";
import Vue from "vue";
import TextareaAutosize from "vue-textarea-autosize";
Vue.use(TextareaAutosize);
import "carbon-components/css/carbon-components.min.css";
import "carbon-components/css/carbon-components.css";
// import { BModal, VBModal } from "bootstrap-vue";
import Swal from "sweetalert2";

export default {
  // components: { BModal },
  // directives: { "b-modal": VBModal },
  data: () => ({
    page: 1,
    count: 50,
    count_page: 1,
    total_page: 100,
    datalist: [],
    archive_list: ["PO", "สัญญา", "QT", "Report", "อื่นๆ"],
    search: "",
    customer_name: "",
    active: "",
    status_customer:"",
    customer_criteria:"",
    credit_name: "",
    customer_no: "",
    customer_email: "",
    billing_due: "",
    billing_contact: "",
    finance_name: "",
    billing_type:"",
    billing_after_checking: "",
    billing_checking: "",
    billing_document: "",
    payment_due: "",
    payment_contact: "",
    payment_type: "",
    emptyFinance:[],
    search_customer_name: null,
    pivotHeaders: [
      { value: "Cus No.", colspan: 1, color: "#E9EBEF !important" },
      { value: "Cus Name.", colspan: 1, color: "#E9EBEF !important" },
      {
        value: "ชื่อเจ้าหน้าที่ (การเงิน)",
        colspan: 1,
        color: "#E9EBEF !important",
      },
      { value: "Online Payment", colspan: 1, color: "#E9EBEF !important" },
      { value: "Credit Term", colspan: 1, color: "#E9EBEF !important" },
      { value: "Status Customer", colspan: 1, color: "#E9EBEF !important" },
      { value: "Customer Criteria", colspan: 1, color: "#E9EBEF !important" },
      { value: "Active", colspan: 1, color: "#E9EBEF !important" },
      { value: "Email ", colspan: 1, color: "#E9EBEF !important" },
      {
        value: "วางบิล",
        colspan: 2,
        color: "#A2B7E1 !important",
        sub: [
          {
            value: "Due วางบิล",
            colspan: 1,
            color: "#A2B7E1",
            id: 1,
          },
          {
            value: "ติดต่อการวางบิล",
            color: "#A2B7E1",
            colspan: 1,
            id: 2,
          },
          {
            value: "วิธีวางบิล",
            color: "#A2B7E1",
            colspan: 1,
            id: 2,
          },
          {
            value: "วางบิลหลังการใช้งาน",
            color: "#A2B7E1",
            colspan: 1,
            id: 2,
          },
          {
            value: "วางบิลพร้อมใบเสร็จ",
            color: "#A2B7E1",
            colspan: 1,
            id: 2,
          },
          {
            value: "เอกสารประกอบวางบิล",
            color: "#A2B7E1",
            colspan: 1,
            id: 2,
          },
        ],
      },
      {
        value: "รับเงิน",
        colspan: 2,
        color: "#F7CAAC !important",
        sub: [
          {
            value: "Due ชำระ",
            colspan: 1,
            color: "#F7CAAC",
            id: 3,
          },
          {
            value: "ติดต่อการชำระ",
            color: "#F7CAAC",
            colspan: 1,
            id: 4,
          },
          {
            value: "ช่องทางชำระ",
            color: "#F7CAAC",
            colspan: 1,
            id: 4,
          },
        ],
      },
    ],
    // filter
    online_payment_list: [
      {
        name: "Yes",
        value: "true",
      },
      {
        name: "No",
        value: "false",
      },
      {
        name: "Pending",
        value: "Pending",
      },
    ],
    credit_term_list: [
      "[blank]",
      "CR60",
      "CR30",
      "CR0"
    ],
    status_customer_list: [
      "[blank]",
      "Blacklist/หนี้สูญ",
      "ดำเนินคดี",
      "ปิดระบบ",
      "แผนชำระ",
      "ทวงหนี้ครั้งที่ 1",
      "ทวงหนี้ครั้งที่ 2",
    ],
    active_list: [
      {
        name: "Active",
        value: "1",
      },
      {
        name: "Non Active",
        value: "0",
      }
    ],
    billing_type_list: [
      "[blank]",
      "Mail",
      "ปณ.",
      "Mail+ปณ.",
      "Messenger",
      "Sale",
      "online payment",
    ],
    billing_after_checking_list: [
      {
        name: "Yes",
        value: "true",
      },
      {
        name: "No",
        value: "false",
      }
    ],
    billing_checking_list: [
      {
        name: "Yes",
        value: "true",
      },
      {
        name: "No",
        value: "false",
      }
    ],
    billing_document_list: [
      "[blank]",
      "PO", 
      "สัญญา",
      "QT",
      "Report",
      "อื่นๆ"
    ],
    payment_type_list:[
      "[blank]",
      "KBANK579",
      "KBANK861",
      "BBL205",
      "BBL785",
      "QR CODE",
      "SCB376",
      "SCB009",
      "KTB395",
      "KTB184",
      "TMB958",
      "BAY778",
      "GSB491",
      "CHQ",
      "FACTORING",
      "TBANK064",
      "Bill Payment - SCB",
      "Bill Payment - KBANK",
      "Bill Payment - BBL",
    ],
    // end filter
    finish: false,
    Alldata: [],
    customer_no_blank: false,
    customer_email_blank: false,
    customer_name_list: [],
    customer_no_list: [],
    item_per_page_count: 50,
    selected: false,
    enabled: false,
    filterlist: [],
    finance_name_list: [],
  }),
  created() {
    this.role_status = localStorage.getItem("role");
    this.Init();
    this.getFinance();
  },
  watch: {},
  computed: {},
  methods: {
    
    filter(filter, key) {
      this.AllFile = "";
      this.blank = [];

      var check_key = false;

      if (filter !== undefined) {
        for (let index = 0; index < this.filterlist.length; index++) {
          if (key == this.filterlist[index].key) {
            check_key = true;
          }
        }
        if (check_key) {
          if (typeof filter == "object") {
            for (let index = 0; index < this.filterlist.length; index++) {
              if (key == this.filterlist[index].key) {
                this.filterlist[index].value = filter;
              }
            }
          } else {
            for (let index = 0; index < this.filterlist.length; index++) {
              if (key == this.filterlist[index].key) {
                this.filterlist[index].value = [filter];
              }
            }
          }
        } else {
          if (typeof filter == "object") {
            this.filterlist.push({
              key: key,
              value: filter,
            });
          } else {
            this.filterlist.push({
              key: key,
              value: [filter],
            });
          }
        }
      } else {
        for (let index = 0; index < this.filterlist.length; index++) {
          if (key == this.filterlist[index].key) {
            this.filterlist.splice(index, 1);
          }
        }
      }

      for (let index = 0; index < this.filterlist.length; index++) {
        if (this.filterlist[index].value.length == 0) {
          this.filterlist.splice(index, 1);
        }
      }

      if (this.filterlist.length == 1) {
        if (
          this.filterlist[0].value == "" ||
          this.filterlist[0].value == undefined ||
          this.filterlist[0].value == null ||
          this.filterlist[0].value == 0
        )
          this.filterlist.splice(0, 1);
      }
      var headers_filter = {
        headers: {
          Authorization:
            "Bearer " +
            localStorage.getItem("acces_token") +
            "," +
            localStorage.getItem("secret"),
        },
      };
      let body = {
        page: Number(this.page),
        size: Number(this.count),
        search_text: this.filterlist,
      };
      this.axios
        .post(process.env.VUE_APP_API + "/invoice/filter", body, headers_filter)
        .then((response) => {
          if (response) {
            this.finish = true;
            if (
              response &&
              (response.data.data !== null || response.data.data !== undefined)
            ) {
              this.datalist = response.data;
              // this.Alldata = response.data.data;
              this.total_datalist = response.data.total.toLocaleString();
              this.amount_list = response.data.sum_amount.toLocaleString();
              this.count_list = response.data.count.toLocaleString();
              this.page_total = response.data.count_page;
              this.datalist.forEach(() => {
                // element.due_date = moment(element.due_date).format(
                //   "YYYY-MM-DD"
                // );
                // element.start_date = moment(element.start_date).format(
                //   "YYYY-MM-DD"
                // );
                // element.end_date = moment(element.end_date).format(
                //   "YYYY-MM-DD"
                // );
                // element.date_bill = moment(element.date_bill).format(
                //   "YYYY-MM-DD"
                // );

                // element.confirm_date = moment(element.confirm_date).format(
                //   "YYYY-MM-DD"
                // );

                this.customer_name_list = [];
                this.customer_no_list = [];
                this.finance_name_list = [];
                this.listfilter_data("", "customer_name");
                this.listfilter_data("", "finance_name");
              });
            } else {
              this.datalist = [];
              this.Alldata = [];
              this.total_datalist = 0;
              this.amount_list = 0;
              this.count_list = 0;
              this.page_total = 1;
              // this.datalist.forEach((element) => {
              //   element.due_date = moment(element.due_date).format("YYYY-MM-DD");

              //   element.confirm_date = moment(element.confirm_date).format(
              //     "YYYY-MM-DD"
              //   );

              this.customer_name_list = [];
              this.customer_no_list = [];
              this.listfilter_data("", "customer_name");
              this.listfilter_data("", "finance_name");
              //  });
            }
          }
        });
      if (this.filterlist.length == 0) {
        // this.getInvoice();
        this.Init();
      }
    },
    blank_checkbox(name) {
      if (name == "customer_no") {
        if (this.customer_no_blank == true) {
          this.customer_no = "[blank]";
          this.filter("blank_string", "customer_no");
        } else {
          this.customer_no = "";
          this.filter("", "customer_no");
        }
      }
    },
    listfilter_data(data, name) {
      if (this.Alldata !== null) {
        if (name == "customer_name") {
          var customer_name = [];
          if (customer_name.includes(["blank"]) == false) {
            customer_name.push("[blank]");
          }
          this.Alldata.forEach((element) => {
            if (
              element.customer_name !== "" ||
              element.customer_name !== undefined
            ) {
              customer_name.push(element.customer_name);
            }
          });
          this.customer_name_list = customer_name;
          return customer_name;
        }
        if (name == "customer_no") {
          var customer_no = [];
          if (customer_no.includes(["blank"]) == false) {
            customer_no.push("[blank]");
          }
          this.Alldata.forEach((element) => {
            if (
              element.customer_no !== "" ||
              element.customer_no !== undefined
            ) {
              customer_no.push(element.customer_no);
            }
          });
          this.customer_no_list = customer_no;
          return customer_no;
        }
         if (name == "finance_name") {
          var finance_name = [];
          for (let index = 0; index < this.Alldata.length; index++) {
            if (
              this.Alldata[index].finance_name !== "" &&
              this.Alldata[index].finance_name !== undefined &&
              finance_name.includes(this.Alldata[index].finance_name) == false
            ) {
              finance_name.push(this.Alldata[index].finance_name);
            } else if (
              this.Alldata[index].finance_name == "" &&
              finance_name.includes(this.Alldata[index].finance_name) == false
            ) {
              finance_name.push("[blank]");
            }
          }
          // this.finance_name_list = finance_name.sort();
          return finance_name.sort();
        }
      }
    },
    Export_AllFile() {
    this.finish = true;
    //  let headers = {
    //     headers: {
    //       "X-Requested-With": "XMLHttpRequest",
    //       Authorization:
    //         "Bearer " +
    //         localStorage.getItem("acces_token") +
    //         "," +
    //         localStorage.getItem("secret"),
    //     },
    //     responseType: "blob",
    //   };
      
    //   this.axios
    //     .get(process.env.VUE_APP_API + "/getinvoicestatus/exportcustomer?secret="+
    //     encodeURIComponent(localStorage.getItem("resource_key")), headers)
    //     .then((response) => {
    //       // console.log(response)
    //       if (response.data) {
    //         const fileURL = window.URL.createObjectURL(response.data);
    //         const fileLink = document.createElement("a");
    //         fileLink.href = fileURL;
    //         fileLink.setAttribute("download", "export_customer_all.csv");
    //         document.body.appendChild(fileLink);
    //         fileLink.click();
    //       }
    //   })
    let headers = {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Authorization:
            "Bearer " +
            localStorage.getItem("acces_token") +
            "," +
            localStorage.getItem("secret"),
        },
        responseType: "blob",
      };
      
      this.axios
        .get(process.env.VUE_APP_API + "/getinvoicestatus/exportcustomer", headers)
        .then((response) => {
          if (response.data) {
            const fileURL = window.URL.createObjectURL(response.data);
            const fileLink = document.createElement("a");
            fileLink.href = fileURL;
            fileLink.setAttribute("download", "export_customer_all.csv");
            document.body.appendChild(fileLink);
            fileLink.click();
          }
      })
    },

    // ยังไม่ได้ใช้
    allcheck() {
      if (this.selected == true) {
        for (let index = 0; index < this.datalist.length; index++) {
          this.datalist[index].check = true;
        }
      } else {
        for (let index = 0; index < this.datalist.length; index++) {
          this.datalist[index].check = false;
        }
      }
    },
    item_per_page() {
      this.finish = false;
      this.count = this.item_per_page_count;
      this.page = 1;
      this.Init();
    },
    pageChange() {
      this.finish = false;
      if (
        this.page == this.count_page &&
        this.total_page < this.item_per_page_count
      ) {
        this.page = 1;
        this.Init();
      } else {
        if (this.page != this.count_page) {
          this.count = this.item_per_page_count;
        }
        this.Init();
      }
    },
    searchWord() {
      this.finish = false;
      // if (this.count_page <= 1) {
      //   this.item_per_page_count = 50;
      // } else {
      // this.count = this.item_per_page_count;
      // }
      this.count = this.item_per_page_count;
      this.Init();
    },
    refreshData_0() {
      this.page = 1;
      if (this.total_page < 50) {
        this.count = 50;
        this.item_per_page_count = 50;
      } else {
        this.count = this.item_per_page_count;
      }
      var headers = {
        headers: {
          Authorization:
            "Bearer " +
            localStorage.getItem("acces_token") +
            "," +
            localStorage.getItem("secret"),
        },
      };

      this.axios
        .get(
          process.env.VUE_APP_API +
            "/getinvoicestatus/getcustomerinfo?size=" +
            this.count +
            "&page=" +
            this.page +
            "&search=" +
            String(this.search),
          headers
        )
        .then((response) => {
          this.finish = true;
          this.datalist = response.data.data;
          this.count = response.data.count;
          this.item_per_page_count = response.data.count;
          this.count_page = response.data.count_page;
          this.total_page = response.data.total;
          // for (let t = 0; t < this.datalist.length; t++) {
          //   this.datalist[t].billing_due = moment(
          //     this.datalist[t].billing_due
          //   ).format("YYYY-MM-DD");
          //   this.datalist[t].payment_due = moment(
          //     this.datalist[t].payment_due
          //   ).format("YYYY-MM-DD");
          // }
          for (let index = 0; index < this.datalist.length; index++) {
            this.datalist[index]["check"] = false;
            this.datalist[index]["other"] = true;
            this.datalist[index]["remark"] = "";
          }

          if (this.page == response.data.count_page) {
            if (this.datalist.length > 0 && this.datalist.length < 50) {
              this.item_per_page_count = 50;
            } else if (
              this.datalist.length > 50 &&
              this.datalist.length < 100
            ) {
              this.item_per_page_count = 100;
            } else if (
              this.datalist.length > 100 &&
              this.datalist.length < 300
            ) {
              this.item_per_page_count = 300;
            } else if (
              this.datalist.length > 300 &&
              this.datalist.length < 500
            ) {
              this.item_per_page_count = 500;
            }
          }
          if (this.total_page == 0) {
            this.item_per_page_count = 50;
          }
        });
    },

    Init() {
      var headers = {
        headers: {
          Authorization:
            "Bearer " +
            localStorage.getItem("acces_token") +
            "," +
            localStorage.getItem("secret"),
        },
      };

      this.axios
        .get(
          process.env.VUE_APP_API +
            "/getinvoicestatus/getcustomerinfo?size=" +
            this.count +
            "&page=" +
            this.page +
            "&search=" +
            String(this.search),
          headers
        )
        .then((response) => {
          this.finish = true;
          this.datalist = response.data.data;
          this.count = response.data.count;
          // this.item_per_page_count = response.data.count;
          this.count_page = response.data.count_page;
          this.total_page = response.data.total;
          
          // for (let t = 0; t < this.datalist.length; t++) {
          //   this.datalist[t].billing_due = moment(
          //     this.datalist[t].billing_due
          //   ).format("YYYY-MM-DD");
          //   this.datalist[t].payment_due = moment(
          //     this.datalist[t].payment_due
          //   ).format("YYYY-MM-DD");
          // }
          this.datalist.forEach((element) => {
            element["other"] = "close";
            element["remark"] = "";
            this.customer_name_list.push(element.customer_name)

          });
          for (let index = 0; index < this.datalist.length; index++) {
            for (
              let h = 0;
              h < this.datalist[index].billing_document.length;
              h++
            ) {
              var add_remark = this.datalist[index].billing_document[h];
              if (
                add_remark != "PO" &&
                add_remark != "สัญญา" &&
                add_remark != "QT" &&
                add_remark != "Report" &&
                add_remark != "อื่นๆ"
              ) {
                this.datalist[index].other = "open";

                this.datalist[index].remark = add_remark;
              }

              // var other_init =
              //   this.datalist[index].billing_document.includes("อื่นๆ");
              // if (other_init == true &&  this.datalist[index].remark == "") {
              //   var find_remark_8 =
              //     this.datalist[index].billing_document.indexOf("อื่นๆ");
              //   this.datalist[index].billing_document.splice(find_remark_8, 1);
              // }
            }
          }
          // if (
          //   this.page != response.data.count_page &&
          //   response.data.count_page <= 1
          // ) {
          //   this.item_per_page_count = 50;
          // }
          // if (this.page == response.data.count_page) {
          //   if (this.datalist.length > 0 && this.datalist.length < 50) {
          //     this.item_per_page_count = 50;
          //   } else if (
          //     this.datalist.length > 50 &&
          //     this.datalist.length < 100
          //   ) {
          //     this.item_per_page_count = 100;
          //   } else if (
          //     this.datalist.length > 100 &&
          //     this.datalist.length < 300
          //   ) {
          //     this.item_per_page_count = 300;
          //   } else if (
          //     this.datalist.length > 300 &&
          //     this.datalist.length < 500
          //   ) {
          //     this.item_per_page_count = 500;
          //   }
          // }
          if (response.data.count == 0) {
            this.refreshData_0();
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            localStorage.clear();
            this.$router.push("/login");
          }
        });
    },

    // filter finance
    getFinance(){
     
      let headers = {
        headers: {
          Authorization:
            "Bearer " +
            localStorage.getItem("acces_token") +
            "," +
            localStorage.getItem("secret"),
        },
      };
      this.axios
        .get(
          process.env.VUE_APP_API +"/getinvoicestatus/customer",headers
        )
        .then((response) => {
          for (let index = 0; index < response.data.length; index++) {
              this.emptyFinance.push(response.data[index].financial_name);
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            localStorage.clear();
            this.$router.push("/login");
          }
        });
    },
    // end filter finance

    refreshData() {
      this.finish = false;
      this.Init();
    },
    // set_default(item, name) {
    //   if (name == "billing_due") {
    //     item.billing_due = moment(new Date()).format("YYYY-MM-DD");
    //     this.updateCustomer(item);
    //     return item.billing_due;
    //   } else if (name == "payment_due") {
    //     item.payment_due = moment(new Date()).format("YYYY-MM-DD");
    //     this.updateCustomer(item);
    //     return item.payment_due;
    //   }
    // },
    convert_digit(data) {
      var number = Number(data).toLocaleString();
      return number;
    },
    online_payment(payment) {
      if (payment == true) {
        return "Yes";
      } else {
        return "No";
      }
    },
    updateCustomer_document(item) {
      // var disabled = false
      var sortt = this.archive_list;
      item.billing_document.sort(function (a, b) {
        return sortt.indexOf(a) - sortt.indexOf(b);
      });
      //  item.billing_document = []
      var find_other = false;

      if (item.billing_document == null) {
        item.billing_document = [];
      }
      find_other = item.billing_document.includes("อื่นๆ");

      if (find_other == false) {
        item.other = "close";
        item.remark = "";
        this.updateCustomer(item);
      } else if (find_other == true && item.remark == "") {
        alert("กรุณาระบุข้อมูล อื่นๆ");
        item.other = "open";
        // this.updateCustomer(item);
        // if(item.billing_document.length !=1){
        //      var index_other = item.billing_document.indexOf('อื่นๆ')
        // item.billing_document.splice(index_other,1)
        // }
      } else {
        this.updateCustomer(item);
      }
    },
    remark_text(item) {
      if (item.other == "close") {
        // item.other = false;
        item.remark = "";
        // archive_list: ["PO", "สัญญา", "QT", "Report", "อื่นๆ"],
        // var find_index = item.billing_document.indexOf("อื่นๆ");
        for (let index = 0; index < item.billing_document.length; index++) {
          var check_item = item.billing_document[index];
          if (
            check_item != "PO" &&
            check_item != "สัญญา" &&
            check_item != "QT" &&
            check_item != "Report"
          ) {
            item.billing_document.splice(index, 1);
          }
        }
        this.updateCustomer(item);
      } else {
        // var find_index =  item.billing_document.indexOf("อื่นๆ"
        if (item.remark != "") {
          item.billing_document.push(item.remark);
          this.updateCustomer(item);
        } else {
          var find_remark = item.billing_document.indexOf("");
          item.billing_document.splice(find_remark, 1);
          this.updateCustomer(item);
        }
      }
    },
    updateCustomer(item) {
      this.finish = false;
      var find_other = false;
      if (item.billing_document == null) {
        item.billing_document = [];
      }
      find_other = item.billing_document.includes("อื่นๆ");

      if (item.billing_document.length > 0 && find_other == false) {
        item.other = "close";
        item.remark = "";
        for (let index = 0; index < item.billing_document.length; index++) {
          var check_item = item.billing_document[index];
          if (
            check_item != "PO" &&
            check_item != "สัญญา" &&
            check_item != "QT" &&
            check_item != "Report"
          ) {
            item.billing_document.splice(index, 1);
          }
        }
      } else if (find_other == true && item.remark == "") {
        var find_index = item.billing_document.indexOf("อื่นๆ");
        item.billing_document.splice(find_index, 1);
        item.other = "close";
        for (let index = 0; index < item.billing_document.length; index++) {
          var check_item_1 = item.billing_document[index];
          if (
            check_item_1 != "PO" &&
            check_item_1 != "สัญญา" &&
            check_item_1 != "QT" &&
            check_item_1 != "Report"
          ) {
            item.billing_document.splice(index, 1);
          }
        }
      }

      var count = {};
      item.billing_document.forEach(function (i) {
        count[i] = (count[i] || 0) + 1;
      });
      if (count["อื่นๆ"] > 1) {
        var find_index_2 = item.billing_document.indexOf("อื่นๆ");
        item.billing_document.splice(find_index_2, 1);

        if (item.remark == "") {
          item.other = "close";
          for (let index = 0; index < item.billing_document.length; index++) {
            var check_remark_2 = item.billing_document[index];
            if (
              check_remark_2 != "PO" &&
              check_remark_2 != "สัญญา" &&
              check_remark_2 != "QT" &&
              check_remark_2 != "Report" &&
              check_remark_2 != "อื่นๆ"
            ) {
              item.billing_document.splice(index, 1);
            }
          }
        }
      }
      var update = {
        active: item.active,
        billing_contact: item.billing_contact,
        billing_document: item.billing_document,
        billing_due: item.billing_due,
        billing_type: item.billing_type,
        billing_checking: item.billing_checking,
        billing_after_checking: item.billing_after_checking,
        credit_name: item.credit_name,
        customer_name: item.customer_name,
        customer_no: item.customer_no,
        email: item.email,
        financial_name: item.financial_name,
        // online_payment: String(item.online_payment),
        online_payment: item.online_payment,
        payment_contact: item.payment_contact,
        payment_due: item.payment_due,
        payment_type: item.payment_type,
        status_customer: item.status_customer,
        customer_criteria: item.customer_criteria,
        uid: item.uid,
      };
      // this.finish = true;
      var headers = {
        headers: {
          Authorization:
            "Bearer " +
            localStorage.getItem("acces_token") +
            "," +
            localStorage.getItem("secret"),
        },
      };

      this.axios
        .put(
          process.env.VUE_APP_API + "/getinvoicestatus/editcustomer",
          update,
          headers
        )
        .then((response) => {
          if (response) {
            this.finish = true;
          }
        })
        .catch((error) => {
          if (error) {
            Swal.fire({
              icon: "error",
              title: "ข้อมูลไม่ตรงเงื่อนไขในการเปลี่ยนแปลง",
              showConfirmButton: false,
              timer: 3000,
            }).then(() => {
              this.Init();
            });
            // this.finish = true;
          }
        });
    },
  },
};
</script>
<style lang="scss" >
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
.container {
  // width: 100% !important;
  font-family: "Bai_Jamjuree" !important;
  background-color: rgb(250, 250, 250);
}
.v-card-title {
  font-family: "Bai_Jamjuree" !important;
}

@media (min-width: 960px) {
  .container {
    max-width: 100%;
    background-color: rgb(250, 250, 250);
  }
}
.v-autocomplete input {
  font-size: 12px !important;
}
.v-select__selection {
  font-size: 12px !important;
}
.v-list-item__title {
  align-self: center;
  font-size: 12px;
}

.font_style {
  font-family: "Bai_Jamjuree" !important;
}
#customer-manage {
  .v-application--is-ltr .v-text-field .v-label {
    transform-origin: top left;
    font-size: 12px !important;
  }
  .v-input--selection-controls .v-input__slot > .v-label,
  .v-input--selection-controls .v-radio > .v-label {
    font-size: 14px;
  }
  .v-chip .v-chip__content {
    align-items: center;
    display: inline-flex;
    height: 100%;
    max-width: 100%;
    margin: auto;
  }
  .table-sum-cus {
    width: 100% !important;
    overflow: auto !important;
    table {
      border-spacing: 0;
      position: relative;
      border-collapse: collapse;
    }
    thead th:first-child {
      left: 0;
      padding-left: 20px !important;
      z-index: 100 !important;
      border-right: none !important;
      background: linear-gradient(
        90deg,
        #e9ebef 99.3%,
        rgb(121, 121, 121) 100%
      ) !important;
    }
    tbody td:first-child {
      left: 0;
      // border-right: none;
      z-index: 99 !important;
      background: linear-gradient(
        90deg,
        rgba(253, 253, 253, 1) 99.3%,
        rgb(121, 121, 121) 100%
      ) !important;
      position: -webkit-sticky; /* for Safari */
      position: sticky;
      left: 0;
      background: #fff;
    }
    tbody th {
      position: -webkit-sticky; /* for Safari */
      position: sticky;
      left: 0;
    }
    b-textarea {
      resize: none;
      overflow: hidden !important;
      font-size: 13px;
      height: auto;
      border-radius: 0px;
      width: 98%;
    }
    textarea {
      overflow: hidden !important;
      width: 98%;
      margin: auto;
      border-radius: 0px;
    }
  }

  .table_in_sum_customer {
    background-position: center !important;
    background-repeat: no-repeat !important;
    font-family: "Bai_Jamjuree" !important;
    z-index: 10 !important;
    overflow: auto !important;
    text-align: center;

    .v-data-table--fixed-header
      > .v-data-table__wrapper
      > table
      > thead
      > tr
      > th {
      border-bottom: 1px solid !important;
    }

    td.td_sub_value {
      padding: 0;
      border-right: 1px solid gray;
      width: 340px;
      vertical-align: middle;
    }
    td {
      font-size: 12px !important;
      background-color: white !important;
    }
  }

  .v-select__slot {
    position: relative;
    align-items: center;
    display: flex;
    max-width: 100%;
    min-width: 0;
    width: 100%;
    min-height: 48px !important;
    height: 100% !important;
    border-radius: 0px !important;
    margin-top: 10px;
    border: none;
  }
}

.v-autocomplete__content .v-list__tile {
  height: auto;
}
.border-frame {
  border: 1px solid gray;
}
.border-frame-header {
  justify-items: center;
  align-items: center;
  border: 1px solid gray;
}

.font-text-alert {
  font-family: "Bai_Jamjuree" !important;
}
.v-pagination {
  justify-content: right !important;
}
.swal2-title {
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
.text-h5 {
  font-family: "Bai_Jamjuree" !important;
}
.font-text {
  font-family: "Bai_Jamjuree" !important;
}
.style-chooser {
  border: 1px solid rgb(224, 224, 224);
  border-radius: 1px;
  width: 100%;
  height: 45px;
  padding-left: 7px;
  cursor: pointer;
}
td.filter-manage {
  padding:0;border-right:1px solid gray;
  vertical-align: middle;
  text-align:left;
  padding-left:10px;
  color: blue;
}
.fixed-detail {
  width: 400px;
  position: sticky !important;
  top: auto !important;
  z-index: 1 !important;
  background-color: white;
  // border-right: 1px solid #cccccc;
  background: linear-gradient(
    90deg,
    rgba(253, 253, 253, 1) 99%,
    rgba(101, 101, 101, 1) 100%
  ) !important;
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
  z-index: 101;
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
  animation-delay: 0.1s;
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
