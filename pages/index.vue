<template>
  <section class="container">
    <p v-if="!isSmall">I am only for big screen</p>
    <p>
      We use v-if because in our case, in an other node, we add the same information, but displayed differently.
      <br>
      For SEO and performance reasons, we do not want to use a v-show (duplicate DOM)
      <br>
      Use case: Mobile menu => Navigation tab on desktop
    </p>
    <p>With npm run dev, everythings works fine, if I refresh the page on a small or a big screen</p>
    <p>With npm generate + npm start, if I refresh the page on a big screen => Error. Because DOM is different from server version</p>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
import {
  MEDIA_QUERIES_IS_EQUAL_OR_SMALLER_THAN,
} from '~/store/mediaQueries'

export default {
  components: {
    AppLogo
  },
  computed: {
    isSmall() {
      return this.$store.getters[MEDIA_QUERIES_IS_EQUAL_OR_SMALLER_THAN]('s')
    },
  }
}
</script>

