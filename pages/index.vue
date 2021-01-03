<template>
  <div class="container" v-if='!isloading'>
    <div class="row bg-white">
      <div class="col-12 mt-4 h4 text-center">
        <div class="lds-circle"><div></div></div> <b>Currency Code:</b> {{country}}
      </div>
      <div class="col-12">
        <div class="container">
          <div class="row">
            <div class="offset-0 offset-sm-1 offset-md-2 offset-lg-3 col-12 col-sm-10 col-md-8 col-lg-6 mt-2">
              <input class="form-control form-control-lg" v-model='total' type="number" :min="input.number.min" :max="input.number.max" :step="input.number.step" :placeholder="input.number.placeholder">
            </div>
          </div>
        </div>
      </div>
      <div class="offset-0 col-12 offset-sm-1 col-sm-10 offset-md-2 col-md-8 offset-lg-3 col-lg-6" v-if='data.length'>
        <hr>
        <div class="container">
          <div class="row">
            <div class="col-12 text-center" v-if='unit>0'>
              <p><strong>Remainder:</strong> {{unit}}</p>
            </div>
            <div class="col-sm-6 mt-4" v-for="(item, index) in data" :key="index">
              <div class="card">
                <div class="card-body text-center">
                  <p class="h6 card-subtitle">{{item.unit}} <small>({{item.value}} {{item.currency_unit}})</small></p>
                  <hr>
                  <strong class="h5 card-title">〔 {{item.num}} 〕</strong><br>
                  <small>{{item.total}} {{item.currency_unit}}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="offset-0 col-12 offset-sm-1 col-sm-10 offset-md-2 col-md-8 offset-lg-3 col-lg-6 mt-2 text-center">
        <hr>
        <b class="h6">Currency Exchange</b>
        <div class="container mt-2">
          <div class="row">
            <div class="col-sm-6 border" v-for="(item, index) in currency" :key="index">
              <p class="h6 mt-2 mb-2">{{item.unit}} <small> ({{item.value}} {{item.currency_unit}})</small></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer :company='company'></Footer>
  </div>
</template>
<script>
import Footer from '~/components/Footer.vue'
export default {
  components: {
    Footer
  },
  watch:{
    total: 'validateNumber'
  },
  data() {
    return {
      company: 'PN',
      isloading: true,
      input: {
        number: {
          placeholder: 'Value of money',
          max: 1000000,
          min: 0,
          step: 0.01
        }
      },
      decimal: 2,
      total: null,
      unit: 0,
      country: 'US',
      currency: [{"value":100,"unit":"100 Dollar","currency_unit":"USD"},{"value":50,"unit":"50 Dollar","currency_unit":"USD"},{"value":20,"unit":"20 Dollar","currency_unit":"USD"},{"value":5,"unit":"5 Dollar","currency_unit":"USD"},{"value":1,"unit":"1 Dollar","currency_unit":"USD"},{"value":0.25,"unit":"25 Cent","currency_unit":"USD"},{"value":0.1,"unit":"10 Cent","currency_unit":"USD"},{"value":0.05,"unit":"5 Cent","currency_unit":"USD"},{"value":0.01,"unit":"1 Cent","currency_unit":"USD"}],
      data: []
    }
  },
  mounted () {
    this.$nextTick(async () => {
      this.isloading = true
      this.$nuxt.$loading.start()
      await this.setupCurrencies()
      setTimeout(() => {
        this.$nuxt.$loading.finish()
        this.isloading = false
      }, 1000)
    })
  },
  methods: {
    async setupCurrencies(){
     const isApi = process.env.isApi
     if(isApi){
      const data = await this.callServiceCurrencies()
      if(data){
        this.currency = data
      }
    }
  },
  checkMoney(power){
    let money = null
    let num = null
    let value = null
    let total = this.total
    let data = []
    const currency = this.currency
    for(money of currency){
      num = parseInt(total / money.value)
      if(num > 0){
        value = (num * money.value)
        total = Math.round((total - value)*power)/power
        data.push({unit:money.unit,value:money.value,num:num,currency_unit:money.currency_unit,total:value})
        if(total===0){
          break;
        }
      }
    }
    this.unit = total
    this.data = data
  },
  validateNumber(val, oldVal){
    const power = (10 ** this.decimal)
    const num = Math.round(val*power)/power
    if(num && (num>this.input.number.max)){
      this.total = this.input.number.max
    }else if(num.toString()!==val){
      this.total = num
    }
    this.checkMoney(power)
  },
  async callServiceCurrencies() {
    try {
      const body = (await this.$axios({
        method: 'GET',
        url: '/api/v1/country/'+this.country+'/currencies'
      })).data
      return body.data
    } catch (error) {
      const resError = error.response
      if (resError) {
        const data = resError.data
        if (data) {
          if (data.message) {
           this.$toast.error(data.message)
         } else {
           this.$toast.error('Unable Connect to Service')
         }
       } else {
         this.$toast.error('Unable Connect to Service')
       }
     } else {
       this.$toast.error('Service Error')
     }
     return null
   }    
 }
}
}
</script>

<style scoped>
.lds-circle {
  display: inline-block;
  transform: translateZ(1px);
}
.lds-circle > div {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin: 2px;
  border-radius: 50%;
  background-color: #072f4f;
  animation: lds-circle 7.5s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
@keyframes lds-circle {
  0%, 100% {
    animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
  }
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(1800deg);
    animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
  }
  100% {
    transform: rotateY(3600deg);
  }
}

</style>
