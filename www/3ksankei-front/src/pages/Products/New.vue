<template>
    <div class="container-flex">
        <div class="">
            <New />
        </div>
    </div>
</template>

<script>
import New from '../../components/Products/New.vue';

export default {
  components: {
    New,
  },
  name: 'NewProduct',
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
