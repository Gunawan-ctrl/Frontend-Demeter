<template>
  <q-layout
    view="lHh Lpr lFf"
    style="
      background: linear-gradient(
          200deg,
          rgba(178, 222, 39, 0.3),
          rgba(0, 0, 0, 0.3)
        ),
        url('images/banner/bg_authentic.jpg');
      background-size: cover;
      background-repeat: no-repeat;
    "
  >
    <q-header
      reveal
      class="q-pa-sm"
      style="background: rgba(0, 0, 0, 0.0)"
    >
      <q-toolbar class="flex text-white">
        <q-btn flat class="text-capitalize" label="Home" />
        <q-btn flat class="text-capitalize" label="About" />
        <q-btn flat class="text-capitalize" label="Product" />
        <q-btn flat class="text-capitalize" label="Help" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
  components: {},
  data() {
    return {
      drawerRight: false,
    };
  },
};
</script>
