<template>
  <div v-if="loading" class="loading-page">
    <h2 class="ld ld-tremble"><b class="text-loader">Loading</b></h2>
      <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      loading: false
    }),
    methods: {
      start() {
        this.loading = true
      },
      finish() {
        this.loading = false
      }
    }
  }
</script>

<style scoped>
  .loading-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    text-align: center;
    padding-top: 200px;
    font-size: 30px;
  }
  .text-loader {
  color: #072f4f;
}
.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ellipsis div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #072f4f;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}
@keyframes ld-tremble {
  0% { transform: translate(0px,0px)   }
  3.33333% { transform: translate(-0.18923px,1.45485px)   }
  6.66667% { transform: translate(-0.84296px,-1.32524px)   }
  10% { transform: translate(0.67971px,1.00422px)   }
  13.33333% { transform: translate(-0.5056px,0.83616px)   }
  16.66667% { transform: translate(1.31368px,-0.51401px)   }
  20% { transform: translate(-1.21184px,1.49193px)   }
  23.33333% { transform: translate(1.09065px,-0.21259px)   }
  26.66667% { transform: translate(-1.49916px,0.56159px)   }
  30% { transform: translate(1.48086px,1.21228px)   }
  33.33333% { transform: translate(-1.43889px,-1.152px)   }
  36.66667% { transform: translate(1.35914px,1.34835px)   }
  40% { transform: translate(-1.42834px,0.3091px)   }
  43.33333% { transform: translate(1.47472px,-1.49889px)   }
  46.66667% { transform: translate(-0.92402px,1.4416px)   }
  50% { transform: translate(1.0657px,-0.75306px)   }
  53.33333% { transform: translate(-1.19035px,-1.07484px)   }
  56.66667% { transform: translate(0.28828px,0.79337px)   }
  60% { transform: translate(-0.47167px,-1.42789px)   }
  63.33333% { transform: translate(0.64753px,-0.09795px)   }
  66.66667% { transform: translate(0.41006px,-0.26292px)   }
  70% { transform: translate(-0.22477px,-1.3683px)   }
  73.33333% { transform: translate(0.03588px,0.92931px)   }
  76.66667% { transform: translate(-1.01937px,-1.18398px)   }
  80% { transform: translate(0.8724px,-0.60494px)   }
  83.33333% { transform: translate(-0.71151px,1.4786px)   }
  86.66667% { transform: translate(1.40734px,-1.49607px)   }
  90% { transform: translate(-1.33062px,0.46957px)   }
  93.33333% { transform: translate(1.23264px,1.26738px)   }
  96.66667% { transform: translate(-1.48975px,-1.03867px)   }
  100% { transform: translate(0,0)   }
}
.ld.ld-tremble {
  animation: ld-tremble 5s infinite linear; ; 
}
</style>