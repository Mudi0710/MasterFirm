<template>
  <div class='fullscreen bg-dark text-secondary text-center q-py-lg flex flex-center'>
    <div>
      <div style='font-size: 50vw; z-index: -100; opacity:.1;' class='fixed-center'>
        404
      </div>
      <div style='font-size: 10vw;' class="flex flex-center">
        Oops<br>&nbsp;你迷路了嗎？
      </div>

      <div style='font-size: 3.5vw; opacity:.65' class='text-h3'>
        別擔心，讓我們帶你找回人生的方向
      </div>

      <q-btn style='border-radius: 0;' class='q-mt-xl bg-secondary text-dark' to='/' label='回到&nbsp;&nbsp;&nbsp;&nbsp;法師事務所' ripple flat unelevated />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ErrorNotFound'
})
</script>
