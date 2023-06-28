<template>
  <q-page>
    <div class="row">
      <div class="col-2">
        <q-card class="q-ml-md q-mt-md">
          <div class="text-caption text-dark">
            <div class="text-subtitle2 text-dark q-pa-md">SEMUA KATEGORI</div>
            <q-separator />
            <div>
              <q-list dense class="q-py-md">
                <q-item clickable v-ripple>
                  <q-item-section>Tanaman Bunga</q-item-section>
                </q-item>

                <q-item clickable v-ripple>
                  <q-item-section>Tanaman Buah</q-item-section>
                </q-item>

                <q-item clickable v-ripple>
                  <q-item-section>Tanaman Sayur</q-item-section>
                </q-item>

                <q-item clickable v-ripple>
                  <q-item-section>Alat Pertanian</q-item-section>
                </q-item>

                <q-item clickable v-ripple>
                  <q-item-section>Komponen Greenhouse</q-item-section>
                </q-item>

                <q-item clickable v-ripple>
                  <q-item-section>Teknologi Pertanian</q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </q-card>
      </div>
      <div class="col">
        <q-card class="q-pa-md q-ma-md">
          <div class="text-caption text-dark row q-gutter-lg">
            <div class="text-subtitle2 text-dark">URUTKAN</div>
            <div class="col-5">
              <q-btn
                color="white"
                text-color="black"
                label="Terbaru"
                outline
                size="sm"
              />

              <q-btn
                color="white"
                text-color="black"
                label="Harga Terendah"
                outline
                class="q-ml-sm"
                size="sm"
              />

              <q-btn
                color="white"
                text-color="black"
                label="Harga Tertinggi"
                outline
                class="q-ml-sm"
                size="sm"
              />
            </div>
          </div>
        </q-card>

        <q-card class="q-pa-md q-ma-md">
          <div class="text-subtitle2 text-dark row flex flex-center">
            <div class="col">SEMUA TERBARU</div>
            <div class="col" align="right">
              <q-input
                standout="bg-positive text-white"
                v-model="search"
                class="text-white"
                label="Cari produk"
                dense
              >
                <template v-slot:prepend>
                  <q-icon name="search" class="q-pr-md" />
                </template>
              </q-input>
            </div>
          </div>
          <div class="q-mt-md q-col-gutter-md row items-start">
            <div class="col-2" v-for="n in 1" :key="`${n}`">
              <q-card class="my-card" flat>
                <q-img src="https://cdn.quasar.dev/img/mountains.jpg" />

                <q-card-section>
                  <q-btn
                    unelevated
                    rounded
                    disable
                    color="orange"
                    class="absolute"
                    style="top: 0; right: 12px; transform: translateY(-50%)"
                    >NEW</q-btn
                  >

                  <div class="row no-wrap items-center">
                    <div class="col text-h6 ellipsis">Sample Product</div>
                  </div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <div class="text-subtitle1">
                    <strong>250K</strong>・<small>Sample</small>
                  </div>
                  <div class="text-caption text-grey">
                    Small plates, salads & sandwiches in an intimate setting.
                  </div>
                </q-card-section>

                <q-separator />

                <q-card-actions>
                  <q-btn flat color="primary" :to="{ name: 'detail' }">
                    LIHAT
                  </q-btn>
                  <q-space />
                  <div class="text-caption text-grey-6">23 Januari 2023</div>
                </q-card-actions>
              </q-card>
            </div>
            <div class="col-2" v-for="n in 2" :key="`${n}`">
              <q-card class="my-card" flat>
                <q-img src="https://cdn.quasar.dev/img/mountains.jpg" />

                <q-card-section>
                  <q-btn
                    unelevated
                    rounded
                    disable
                    color="orange"
                    class="absolute"
                    style="top: 0; right: 12px; transform: translateY(-50%)"
                    >NEW</q-btn
                  >

                  <div class="row no-wrap items-center">
                    <div class="col text-h6 ellipsis">Sample Product</div>
                  </div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <div class="text-subtitle1">
                    <strong>8M</strong>・<small>Sample</small>
                  </div>
                  <div class="text-caption text-grey">
                    Small plates, salads & sandwiches in an intimate setting.
                  </div>
                </q-card-section>

                <q-separator />

                <q-card-actions>
                  <q-btn flat color="primary" :to="{ name: 'detail' }">
                    LIHAT
                  </q-btn>
                  <q-space />
                  <div class="text-caption text-grey-6">23 Januari 2023</div>
                </q-card-actions>
              </q-card>
            </div>
            <div class="col-2" v-for="n in 1" :key="`${n}`">
              <q-card class="my-card" flat>
                <q-img src="https://cdn.quasar.dev/img/mountains.jpg" />

                <q-card-section>
                  <q-btn
                    unelevated
                    rounded
                    disable
                    color="orange"
                    class="absolute"
                    style="top: 0; right: 12px; transform: translateY(-50%)"
                    >NEW</q-btn
                  >

                  <div class="row no-wrap items-center">
                    <div class="col text-h6 ellipsis">Sample Product</div>
                  </div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <div class="text-subtitle1">
                    <strong>250K</strong>・<small>Sample</small>
                  </div>
                  <div class="text-caption text-grey">
                    Small plates, salads & sandwiches in an intimate setting.
                  </div>
                </q-card-section>

                <q-separator />

                <q-card-actions>
                  <q-btn flat color="primary" :to="{ name: 'detail' }">
                    LIHAT
                  </q-btn>
                  <q-space />
                  <div class="text-caption text-grey-6">23 Januari 2023</div>
                </q-card-actions>
              </q-card>
            </div>
            <div class="col-2" v-for="n in 2" :key="`${n}`">
              <q-card class="my-card" flat>
                <q-img src="https://cdn.quasar.dev/img/mountains.jpg" />

                <q-card-section>
                  <q-btn
                    unelevated
                    rounded
                    disable
                    color="orange"
                    class="absolute"
                    style="top: 0; right: 12px; transform: translateY(-50%)"
                    >NEW</q-btn
                  >

                  <div class="row no-wrap items-center">
                    <div class="col text-h6 ellipsis">Sample Product</div>
                  </div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <div class="text-subtitle1">
                    <strong>250K</strong>・<small>Sample</small>
                  </div>
                  <div class="text-caption text-grey">
                    Small plates, salads & sandwiches in an intimate setting.
                  </div>
                </q-card-section>

                <q-separator />

                <q-card-actions>
                  <q-btn flat color="primary" :to="{ name: 'detail' }">
                    LIHAT
                  </q-btn>
                  <q-space />
                  <div class="text-caption text-grey-6">23 Januari 2023</div>
                </q-card-actions>
              </q-card>
            </div>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "MainLayout",
  components: {},
  data() {
    return {
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      search: "",
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
