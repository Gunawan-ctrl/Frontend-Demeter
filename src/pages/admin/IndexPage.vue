<template>
  <q-page>
    <div class="q-pa-md row q-gutter-md">
      <div class="col">
        <div class="q-gutter-sm row items-start">
          <div class="col">
            <q-card class="my-card">
              <q-item clickable v-ripple>
                <q-item-section side>
                  <q-avatar rounded size="48px">
                    <img src="images/icons/calendar.png" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label caption class="text-weight-medium text-grey-6"
                    >Pengunjung</q-item-label
                  >
                  <q-item-label class="text-weight-bold text-h6 text-positive"
                    >1000</q-item-label
                  >
                  <q-item-label caption style="font-size: 10px"
                    >Total pengunjung layanan</q-item-label
                  >
                </q-item-section>
              </q-item>
            </q-card>
          </div>
          <div class="col">
            <q-card class="my-card">
              <q-item clickable v-ripple>
                <q-item-section side>
                  <q-avatar rounded size="48px">
                    <img src="images/icons/add-user.png" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label caption class="text-weight-medium text-grey-6"
                    >Pengguna</q-item-label
                  >
                  <q-item-label class="text-weight-bold text-h6 text-positive"
                    >1000</q-item-label
                  >
                  <q-item-label caption style="font-size: 10px"
                    >Total pengguna terdaftar</q-item-label
                  >
                </q-item-section>
              </q-item>
            </q-card>
          </div>
          <div class="col">
            <q-card class="my-card">
              <q-item clickable v-ripple>
                <q-item-section side>
                  <q-avatar rounded size="48px">
                    <img src="images/icons/chip.png" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label caption class="text-weight-medium text-grey-6"
                    >Perangkat</q-item-label
                  >
                  <q-item-label class="text-weight-bold text-h6 text-positive"
                    >1000</q-item-label
                  >
                  <q-item-label caption style="font-size: 10px"
                    >Total perangkat terdaftar</q-item-label
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
                    >Total item toko pengguna</q-item-label
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
          <q-table
            :rows="rowsPengguna"
            :columns="columnsPengguna"
            class="text-indigo"
            row-key="name"
            :filter="filterPengguna"
            :pagination="paginationPengguna"
          >
            <template v-slot:top>
              <div class="col">
                <div class="col q-table__title">
                  DATA PENGGUNA <strong>DEMETER.</strong>
                </div>
              </div>

              <q-space />

              <q-btn
                flat
                color="indigo"
                icon="search"
                @click="visiblesPengguna = !visiblesPengguna"
                size="md"
                round
                class="q-mr-sm"
              />
              <q-slide-transition>
                <div v-show="visiblesPengguna">
                  <q-input
                    outlined
                    debounce="300"
                    placeholder="Pencarian"
                    style="width: 180px"
                    color="indigo"
                    v-model="filterPengguna"
                    dense
                  />
                </div>
              </q-slide-transition>
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="ID" :props="props">
                  <q-badge color="positive">{{ props.row.ID }}</q-badge>
                </q-td>
                <q-td key="NAMA" :props="props">
                  {{ props.row.NAMA }}
                </q-td>
                <q-td key="TOKO" :props="props">
                  <q-badge color="positive"> {{ props.row.TOKO }} </q-badge>
                </q-td>
                <q-td key="TELEPON" :props="props">
                  {{ props.row.TELEPON }}
                </q-td>
                <q-td key="CREATED_AT" :props="props">
                  {{ this.$parseDate(props.row.CREATED_AT).timeStap }}
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card>
      </div>
      <div class="col">
        <q-card>
          <q-table
            :rows="rowsPerangkat"
            :columns="columnsPerangkat"
            class="text-indigo"
            row-key="name"
            :filter="filterPerangkat"
            :pagination="paginationPerangkat"
          >
            <template v-slot:top>
              <div class="col">
                <div class="col q-table__title">
                  DATA PERANGKAT <strong>DEMETER.</strong>
                </div>
              </div>

              <q-space />

              <q-btn
                flat
                color="indigo"
                icon="search"
                @click="visiblesPerangkat = !visiblesPerangkat"
                size="md"
                round
                class="q-mr-sm"
              />
              <q-slide-transition>
                <div v-show="visiblesPerangkat">
                  <q-input
                    outlined
                    debounce="300"
                    placeholder="Pencarian"
                    style="width: 180px"
                    color="indigo"
                    v-model="filterPerangkat"
                    dense
                  />
                </div>
              </q-slide-transition>
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="ID" :props="props">
                  <vue-qrious
                    size="60"
                    foreground="#21ba45"
                    :value="`http://localhost:8080/#/perangkat/${props.row.ID}`"
                    @change="onDataUrlChange"
                    mime="image/png"
                  />
                </q-td>
                <q-td key="NAMA" :props="props">
                  {{ props.row.NAMA }}
                </q-td>
                <q-td key="MAC" :props="props">
                  {{ props.row.MAC }}
                </q-td>
                <q-td key="STATUS" :props="props">
                  <q-badge
                    :color="props.row.STATUS === '0' ? 'orange' : 'positive'"
                    :label="props.row.STATUS === '0' ? 'Belum Aktif' : 'Aktif'"
                  />
                </q-td>
                <q-td key="CREATED_AT" :props="props">
                  {{ this.$parseDate(props.row.CREATED_AT).timeStap }}
                </q-td>
              </q-tr>
            </template>
          </q-table>
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
          name: "ID",
          align: "left",
          label: "ID CODE",
          field: "ID",
        },
        {
          name: "NAMA",
          align: "left",
          label: "PERANGKAT",
          field: "NAMA",
        },
        {
          name: "MAC",
          align: "left",
          label: "MAC ADDRESS",
          field: "MAC",
        },
        {
          name: "STATUS",
          align: "left",
          label: "STATUS",
          field: "STATUS",
        },
        {
          name: "CREATED_AT",
          align: "left",
          label: "TGL. DAFTAR",
          field: "CREATED_AT",
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
          name: "NAMA",
          align: "left",
          label: "PENGGUNA",
          field: "NAMA",
        },
        {
          name: "TOKO",
          align: "left",
          label: "NAMA TOKO",
          field: "TOKO",
        },
        {
          name: "TELEPON",
          align: "left",
          label: "TELEPON",
          field: "TELEPON",
        },
        {
          name: "CREATED_AT",
          align: "left",
          label: "TGL. DAFTAR",
          field: "CREATED_AT",
        },
      ],
      slide: 1,
      autoplay: true,
    };
  },
  created() {
    this.getPengguna();
    this.getPerangkat();
  },
  methods: {
    getPengguna: async function () {
      this.$q.loading.show();
      await this.$axios
        .get("/users")
        .finally(() => {
          this.$q.loading.hide();
        })
        .then((res) => {
          console.log(res);
          if (!this.$parseResponse(res.data)) {
            this.rowsPengguna = res.data.data;
          }
        })
        .catch();
    },
    getPerangkat: async function () {
      this.$q.loading.show();
      await this.$axios
        .get("/perangkat")
        .finally(() => {
          this.$q.loading.hide();
        })
        .then((res) => {
          console.log(res);
          if (!this.$parseResponse(res.data)) {
            this.rowsPerangkat = res.data.data;
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
