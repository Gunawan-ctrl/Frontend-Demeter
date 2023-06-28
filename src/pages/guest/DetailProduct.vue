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
            <div class="text-subtitle2 text-dark row flex flex-center">
              <q-chip square color="positive" text-color="white">
                TOKO INTAN
              </q-chip>
            </div>
            <div class="col-5">
              <q-chip square icon="stars">Belum Ada Penilaian</q-chip>
              <q-chip square icon="sell">0 Terjual</q-chip>
            </div>
          </div>
        </q-card>

        <q-card class="q-pa-md q-ma-md row">
          <div class="col-4 rounded-borders">
            <q-carousel
              swipeable
              animated
              v-model="slide"
              thumbnails
              :autoplay="autoplay"
              transition-prev="slide-right"
              transition-next="slide-left"
              infinite
              height="350px"
            >
              <q-carousel-slide
                :name="1"
                img-src="https://cdn.quasar.dev/img/mountains.jpg"
              />
              <q-carousel-slide
                :name="2"
                img-src="https://cdn.quasar.dev/img/parallax1.jpg"
              />
              <q-carousel-slide
                :name="3"
                img-src="https://cdn.quasar.dev/img/parallax2.jpg"
              />
              <q-carousel-slide
                :name="4"
                img-src="https://cdn.quasar.dev/img/quasar.jpg"
              />
            </q-carousel>
          </div>
          <div class="q-ml-lg col">
            <div class="text-h5 text-weight-medium text-uppercase">
              Black Anthurium
            </div>
            <div
              class="q-mt-md bg-grey-3 q-pl-md q-pt-sm q-pb-sm text-h6 text-indigo-10"
              style="border-radius: 5px"
            >
              Rp. 200.000
            </div>
            <div class="q-mt-md row q-ml-sm">
              <div class="col-3">Kategori Produk</div>
              <div class="col text-grey-8">Anthurium</div>
            </div>
            <div class="q-mt-md row q-ml-sm">
              <div class="col-3">Stok</div>
              <div class="col text-grey-8">2.000 buah</div>
            </div>
            <div class="q-mt-md row q-ml-sm">
              <div class="col-3">Jenis Produk</div>
              <div class="col text-grey-8">Tanaman Hias</div>
            </div>
            <div class="q-mt-xl row q-ml-sm">
              <div class="col-5">
                <q-btn rounded color="positive">
                  <img
                    src="images/icons/whatsapp-icon.png"
                    style="width: 22px"
                    class="q-mr-md"
                  />
                  <small>Pesan Produk</small>
                </q-btn>
              </div>
            </div>
          </div>
        </q-card>

        <q-card class="q-pa-md q-ma-md">
          <div class="col q-pa-sm items-start q-gutter-sm">
            <div
              class="q-mt-md bg-grey-3 q-pl-md q-pt-sm q-pb-sm text-subtitle2 text-indigo-10"
              style="border-radius: 5px"
            >
              Spesifikasi Produk
            </div>
            <div class="q-mt-md row q-ml-md">
              <div class="col-3">Jenis Penjualan</div>
              <div class="col text-grey-8">Eceran</div>
            </div>
            <div class="q-mt-md row q-ml-md">
              <div class="col-3">Jenis Garansi</div>
              <div class="col text-grey-8">Garansi Produsen</div>
            </div>
            <div class="q-mt-md row q-ml-md">
              <div class="col-3">Masa Garansi</div>
              <div class="col text-grey-8">3 Bulan</div>
            </div>
            <div class="q-mt-md row q-ml-md">
              <div class="col-3">Berat</div>
              <div class="col text-grey-8">5 Kg</div>
            </div>
            <div class="q-mt-md row q-ml-md">
              <div class="col-3">
                Dimensi <small class="q-ml-sm text-grey-7">( P x L x T )</small>
              </div>
              <div class="col text-grey-8">5 cm x 5 cm x 10 cm</div>
            </div>
            <div class="q-mt-md row q-ml-md">
              <div class="col-3">Dikirim Dari</div>
              <div class="col text-grey-8">
                Gedong Air, Kec. Tj. Karang Bar., Kota Bandar Lampung, Lampung
                35117
              </div>
            </div>
            <div
              class="q-mt-md bg-grey-3 q-pl-md q-pt-sm q-pb-sm text-subtitle2 text-indigo-10"
              style="border-radius: 5px"
            >
              Deskripsi Produk
            </div>
            <div class="q-mt-md row q-ml-md">
              <div class="col text-grey-8">
                siapa cepat dia dapat keberuntungannya belanja di toko ini<br />
                <br />
                hadiah utamanya berupa<br />
                - HP iPhone<br />
                - laptop<br />
                - dan barang elektronik lainnya<br />
                <br />
                kita mengadakan undian di sini dijamin tidak ada zonk<br />
                barang yang kita undikan itu barang yang dipakai semua pokoknya
                buat Anda yang mau pesan di toko ini tidak ada yang namanya zonk
                dijamin dapat hadiah.,<br />
                minimal 5 kali pembelanjaan kamu yakin dengan belanja di sini
                insya Allah dapat<br />
                buruan bolong bolong belanja di toko ini<br />
                semoga puas dengan undian kami<br />
              </div>
            </div>
          </div>
        </q-card>

        <q-card class="q-pa-md q-ma-md">
          <div class="text-subtitle2 text-dark">PRODUK TERBARU</div>
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
