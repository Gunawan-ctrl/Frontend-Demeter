<template>
  <q-page>
    <q-card class="q-pa-md q-ma-md">
      <div class="text-subtitle2 text-dark">KATEGORI</div>
      <div class="text-caption text-dark q-mt-md row">
        <div class="col-2">
          <q-item clickable v-ripple>
            <q-item-section side>
              <q-avatar rounded size="48px">
                <img src="images/icons/bouquet.png" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label caption>kategori</q-item-label>
              <q-item-label>Tanaman Bunga</q-item-label>
            </q-item-section>
          </q-item>
        </div>

        <div class="col-2">
          <q-item clickable v-ripple>
            <q-item-section side>
              <q-avatar rounded size="48px">
                <img src="images/icons/apple.png" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label caption>kategori</q-item-label>
              <q-item-label>Tanaman Buah</q-item-label>
            </q-item-section>
          </q-item>
        </div>

        <div class="col-2">
          <q-item clickable v-ripple>
            <q-item-section side>
              <q-avatar rounded size="48px">
                <img src="images/icons/broccoli.png" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label caption>kategori</q-item-label>
              <q-item-label>Tanaman Sayur</q-item-label>
            </q-item-section>
          </q-item>
        </div>

        <div class="col-2">
          <q-item clickable v-ripple>
            <q-item-section side>
              <q-avatar rounded size="48px">
                <img src="images/icons/scythe.png" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label caption>kategori</q-item-label>
              <q-item-label>Alat Pertanian</q-item-label>
            </q-item-section>
          </q-item>
        </div>

        <div class="col-2">
          <q-item clickable v-ripple>
            <q-item-section side>
              <q-avatar rounded size="48px">
                <img src="images/icons/watering-can.png" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label caption>kategori</q-item-label>
              <q-item-label>Komponen Greenhouse</q-item-label>
            </q-item-section>
          </q-item>
        </div>

        <div class="col-2">
          <q-item clickable v-ripple>
            <q-item-section side>
              <q-avatar rounded size="48px">
                <img src="images/icons/tractor.png" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label caption>kategori</q-item-label>
              <q-item-label>Teknologi Pertanian</q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </div>
    </q-card>

    <q-card class="q-pa-md q-ma-md">
      <div class="text-subtitle2 text-dark row flex flex-center">
        <div class="col">PRODUK TERBARU</div>
        <div class="col" align="right">
          <q-btn
            color="primary"
            outline
            size="sm"
            label="Lihat Semua"
            :to="{ name: 'product' }"
          />
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
    };
  },
  async created() {
    await this.getVisitor();
  },
  methods: {
    async getVisitor() {
      if (localStorage.getItem("visitorCount") !== null) {
        var visitorCount = parseInt(localStorage.getItem("visitorCount")) + 1;
      } else {
        var visitorCount = 1;
      }

      localStorage.setItem("visitorCount", visitorCount);
      console.log(visitorCount);
    },
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
