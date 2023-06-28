<template>
  <q-page>
    <div class="row">
      <div class="col-2"></div>
      <div class="col">
        <q-card class="q-pa-sm q-ma-md">
          <div class="text-caption text-dark row">
            <div class="col-3">
              <q-item clickable v-ripple>
                <q-item-section side>
                  <q-avatar rounded size="48px">
                    <img src="images/icons/happy-customers.png" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label caption>Pengunjung</q-item-label>
                  <q-item-label class="text-h6 text-positive text-weight-bold"
                    >1000</q-item-label
                  >
                </q-item-section>
              </q-item>
            </div>

            <div class="col-3">
              <q-item clickable v-ripple>
                <q-item-section side>
                  <q-avatar rounded size="48px">
                    <img src="images/icons/brand-loyalty.png" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label caption>Produk</q-item-label>
                  <q-item-label class="text-h6 text-positive text-weight-bold"
                    >1000</q-item-label
                  >
                </q-item-section>
              </q-item>
            </div>

            <div class="col-3">
              <q-item clickable v-ripple>
                <q-item-section side>
                  <q-avatar rounded size="48px">
                    <img src="images/icons/best-employee.png" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label caption>Pengguna Teknologi</q-item-label>
                  <q-item-label class="text-h6 text-positive text-weight-bold"
                    >1000</q-item-label
                  >
                </q-item-section>
              </q-item>
            </div>

            <div class="col-3">
              <q-item clickable v-ripple>
                <q-item-section side>
                  <q-avatar rounded size="48px">
                    <img src="images/icons/paid-search.png" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label caption>Penjualan</q-item-label>
                  <q-item-label class="text-h6 text-positive text-weight-bold"
                    >1000</q-item-label
                  >
                </q-item-section>
              </q-item>
            </div>
          </div>
        </q-card>
      </div>
      <div class="col-2"></div>
    </div>

    <q-card class="q-ma-md">
      <div class="row">
        <div class="col-7 q-pa-lg q-mr-lg">
          <p class="text-h5 text-weight-bold text-positive">TENTANG DEMETER</p>
          <q-separator size="8px" color="positive" />
          <p class="q-mt-md">{{ lorem }}</p>
          <p>{{ lorem }}</p>
        </div>
        <div class="col">
          <q-carousel
            animated
            v-model="slide"
            infinite
            :autoplay="autoplay"
            transition-prev="slide-right"
            transition-next="slide-left"
            @mouseenter="autoplay = false"
            @mouseleave="autoplay = true"
          >
            <q-carousel-slide :name="1" img-src="images/banner/banner_1.jpg" />
            <q-carousel-slide :name="2" img-src="images/banner/banner_2.jpg" />
            <q-carousel-slide :name="3" img-src="images/banner/banner_3.jpg" />
            <q-carousel-slide :name="4" img-src="images/banner/banner_4.jpg" />
          </q-carousel>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: "MainLayout",
  components: {},
  data() {
    return {
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      slide: 1,
      autoplay: true,
    };
  },
};
</script>
<style scoped>
.nunito-font {
  font-family: "nunito";
}
.my-card {
  width: 100%;
  max-width: 350px;
}
.example-item {
  height: 290px;
  width: 290px;
}
.left {
  animation: bounceInLeft;
  animation-duration: 2s;
}
.right {
  animation: bounceInRight;
  animation-duration: 2s;
}
.down {
  animation: bounceInDown;
  animation-duration: 2s;
}
.up {
  animation: bounceInUp;
  animation-duration: 2s;
}
</style>
