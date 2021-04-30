<template>
  <div class="menu">
    <NavList :user="user"/>
  </div>
</template>

<script>
import NavList from "@/components/NavList";

export default {
  name: "Menu",
  props: ["user"],
  components: { NavList },
};
</script>

<style scoped>
.menu {
  margin: 15px 0 15px 15px;
  padding: 8px 15px;
  border-radius: 15px;
  background-color: white;
}
</style>
