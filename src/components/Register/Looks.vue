<template>
  <div class="row">
    <div class="col-sm" v-for="look in looks">
      <img class="looks" v-bind:src="'https://www.habbo.com/habbo-imaging/avatarimage?figure=' + look + '&headonly=1'" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['looks'],

  created: function() {
  }
}
</script>