<template>
    <div class="container-flex">
        <div class="">
            <Products />
        </div>
    </div>
</template>

<script>
import Products from '../../components/Products/Products.vue';

export default {
  components: {
    Products,
  },
  name: 'Product',
  data() {
    return {}  
  },
  methods: {}
};
</script>

<style scoped>
  .menu-body {
    position: relative;
    z-index: 2;
  }
</style>
