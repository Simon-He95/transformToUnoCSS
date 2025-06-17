<template>
  <div class="sass-builtin-test">
    Built-in Sass module test
  </div>
</template>

<style lang="scss">
@use "sass:math";
@use "sass:color";
@use "./variables.scss" as vars;

.sass-builtin-test {
  width: math.div(100px, 2);
  color: color.adjust(vars.$primary-color, $lightness: 10%);
}
</style>
