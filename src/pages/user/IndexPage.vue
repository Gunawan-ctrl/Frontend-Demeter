<template>
  <q-page>
    <div class="q-pa-md row q-gutter-md">
      <div class="col">
        <div class="q-gutter-sm row items-start">
          <div class="col" v-for="(d, i) in perangkat" :key="i">
            <q-card class="my-card">
              <q-item clickable v-ripple>
                <q-item-section side>
                  <q-avatar rounded size="48px">
                    <vue-qrious
                      size="60"
                      foreground="#21ba45"
                      :value="`http://localhost:8080/#/perangkat/${d.ID}`"
                      @change="onDataUrlChange"
                      mime="image/png"
                    />
                    <!-- <img src="images/icons/calendar.png" /> -->
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label
                    caption
                    class="text-weight-medium text-grey-6"
                    >{{ d.NAMA }}</q-item-label
                  >
                  <q-item-label class="text-weight-bold text-h6 text-positive"
                    >1000</q-item-label
                  >
                  <q-item-label caption style="font-size: 10px"
                    >MAC : {{ d.MAC }}</q-item-label
                  >
                </q-item-section>
              </q-item>
            </q-card>
          </div>
        </div>
        <div class="q-gutter-sm row items-start q-mt-xs">
          <div class="col">
            <q-card class="my-card">
              <q-item clickable v-ripple>
                <q-item-section side>
                  <q-avatar rounded size="48px">
                    <img src="images/icons/arrows.png" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label caption class="text-weight-medium text-grey-6"
                    >Item Toko</q-item-label
                  >
                  <q-item-label class="text-weight-bold text-h6 text-positive"
                    >1000</q-item-label
                  >
                  <q-item-label caption style="font-size: 10px"
                    >Total item toko anda</q-item-label
                  >
                </q-item-section>
                <q-item-section side>
                  <q-item-label caption class="text-weight-medium text-grey-6"
                    >Akumulasi Pemasukan</q-item-label
                  >
                  <q-item-label class="text-weight-bold text-h6 text-positive"
                    >Rp. 1.000.000</q-item-label
                  >
                  <q-item-label caption style="font-size: 10px"
                    >Total keseluruhan pendapatan</q-item-label
                  >
                </q-item-section>
              </q-item>
            </q-card>
          </div>
        </div>
      </div>
      <div class="col-3">
        <q-card class="my-card">
          <q-carousel
            animated
            v-model="slide"
            infinite
            :autoplay="autoplay"
            transition-prev="slide-right"
            transition-next="slide-left"
            height="164px"
            @mouseenter="autoplay = false"
            @mouseleave="autoplay = true"
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
        </q-card>
      </div>
    </div>
    <div class="q-px-md row q-gutter-sm">
      <div class="col">
        <q-card>
          <q-card-section>
            <div class="text-h6 text-indigo">
              PRODUK
              <strong class="text-uppercase"
                >{{ this.dataPengguna.user.TOKO }}.</strong
              >
            </div>
            <div class="text-caption text-positive">
              Seluruh data produk yang di miliki toko anda
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import VueQrious from "vue-qrious";
export default {
  name: "PageIndex",
  components: {
    VueQrious,
  },
  data() {
    return {
      dataUrl: null,
      filterPengguna: "",
      filterPerangkat: "",
      visiblesPengguna: false,
      visiblesPerangkat: false,
      paginationPengguna: {
        sortBy: "desc",
        descending: false,
        rowsPerPage: 5,
      },
      paginationPerangkat: {
        sortBy: "desc",
        descending: false,
        rowsPerPage: 5,
      },
      rowsPengguna: [],
      rowsPerangkat: [],
      columnsPerangkat: [
        {
          name: "QR",
          align: "left",
          label: "QR Code",
          field: "QR",
        },
        {
          name: "NAME",
          align: "left",
          label: "Nama Perangkat",
          field: "NAME",
        },
        {
          name: "MAC",
          align: "left",
          label: "MAC Address",
          field: "MAC",
        },
        {
          name: "STATUS",
          align: "left",
          label: "Status",
          field: "STATUS",
        },
      ],
      columnsPengguna: [
        {
          name: "ID",
          required: true,
          label: "ID",
          align: "left",
        },
        {
          name: "FULLNAME",
          align: "left",
          label: "Nama Lengkap",
          field: "FULLNAME",
        },
        {
          name: "STORE",
          align: "left",
          label: "Nama Toko",
          field: "STORE",
        },
        {
          name: "PHONE",
          align: "left",
          label: "No. Telpon",
          field: "PHONE",
        },
      ],
      dataPengguna: this.$q.localStorage.getItem("data"),
      perangkat: [],
      slide: 1,
      autoplay: true,
    };
  },
  created() {
    // this.getPengguna();
    // this.getPerangkat();
  },
  methods: {
    getPengguna: async function () {
      await this.$axios
        .get("pengguna/")
        .finally()
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.rowsPengguna = response.data.data;
          }
        })
        .catch();
    },
    getPerangkat: async function () {
      await this.$axios
        .get(`/daftar_perangkat/getById/${this.dataPengguna.user.ID}`)
        .finally()
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.rowsPerangkat = response.data.data;
            this.perangkat = response.data.data;
          }
        })
        .catch();
    },
    onDataUrlChange(dataUrl) {
      this.dataUrl = dataUrl;
    },
  },
};
</script>

<style lang="sass" scoped>
.example-item
  height: 290px
  width: 290px
</style>
