<template>
  <q-page>
    <q-card class="q-pa-md q-ma-md">
      <div class="text-dark row flex flex-center">
        <div class="col">
          <q-breadcrumbs>
            <q-breadcrumbs-el
              class="text-indigo"
              label="Perangkat"
              icon="settings_suggest"
            />
          </q-breadcrumbs>
        </div>
        <div class="col" align="right">
          <q-btn
            color="primary"
            outline
            size="sm"
            icon="data_saver_on"
            label="Perangkat Baru"
            @click="fullWidth = true"
          />
        </div>
      </div>
    </q-card>

    <div class="q-px-md row q-gutter-sm">
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
                  DATA PERANGKAT
                  <strong class="text-uppercase">
                    {{ this.dataUser.user.TOKO }}
                  </strong>
                </div>
                <p class="text-caption">
                  Perangkat DEMETER yang ter install di pertanian anda
                </p>
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
                <q-td key="QR" :props="props">
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
              </q-tr>
            </template>
          </q-table>
        </q-card>
      </div>

      <q-dialog v-model="fullWidth">
        <q-card style="width: 900px; max-width: 80vw">
          <q-form @submit="onSubmit()" class="q-gutter-md">
            <q-card-section>
              <div class="text-h6 text-indigo">PENDAFTARAN PERANGKAT BARU</div>
              <div class="text-caption">
                Pastikan melakukan pengecekan data sebelum mendaftarkan
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <div class="text-caption q-pa-sm text-weight-bold flex-center">
                <q-avatar
                  size="sm"
                  color="primary"
                  text-color="white"
                  class="q-mr-md"
                  icon="devices"
                />Data Perangkat
              </div>
              <div class="row items-start">
                <q-input
                  standout="bg-positive text-white"
                  v-model="form.ID"
                  class="text-white col-4 q-pa-sm"
                  label="Masukan ID Perangkat"
                  dense
                >
                  <template v-slot:prepend>
                    <q-icon name="qr_code_scanner" class="q-pr-md" />
                  </template>
                  <template v-slot:append>
                    <q-btn
                      round
                      dense
                      flat
                      icon="search"
                      @click="this.searchID(form.ID)"
                    />
                  </template>
                </q-input>
              </div>
              <div class="row items-start">
                <q-input
                  standout="bg-positive text-white"
                  v-model="form.NAMA"
                  readonly
                  class="text-white col-4 q-pa-sm"
                  label="Nama Perangkat"
                  dense
                >
                  <template v-slot:prepend>
                    <q-icon name="devices" class="q-pr-md" />
                  </template>
                </q-input>
                <q-input
                  standout="bg-positive text-white"
                  v-model="form.MAC"
                  readonly
                  class="text-white col-4 q-pa-sm"
                  label="MAC Address"
                  dense
                >
                  <template v-slot:prepend>
                    <q-icon name="pin" class="q-pr-md" />
                  </template>
                </q-input>
                <q-input
                  standout="bg-positive text-white"
                  v-model="form.JENIS"
                  readonly
                  class="text-white col-4 q-pa-sm"
                  label="Jenis Perangkat"
                  dense
                >
                  <template v-slot:prepend>
                    <q-icon name="storage" class="q-pr-md" />
                  </template>
                </q-input>
              </div>
            </q-card-section>

            <q-card-actions align="right" class="bg-grey-3 text-indigo q-py-md">
              <q-btn
                type="submit"
                label="Daftarkan Perangkat"
                v-close-popup
                flat
                dense
              />
            </q-card-actions>
          </q-form>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import VueQrious from "vue-qrious";

const model = () => {
  return {
    NAMA: null,
    MAC: null,
    JENIS: null,
    STATUS: "1",
  };
};

export default {
  name: "PageIndex",
  components: {
    VueQrious,
  },
  data() {
    return {
      form: model(),
      dataUrl: null,
      fullWidth: false,
      filterPerangkat: "",
      visiblesPerangkat: false,
      paginationPerangkat: {
        sortBy: "desc",
        descending: false,
        rowsPerPage: 5,
      },
      rowsPerangkat: [],
      columnsPerangkat: [
        {
          name: "QR",
          align: "left",
          label: "QR CODE",
          field: "QR",
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
      ],
      slide: 1,
      autoplay: true,
      ID: "",
      iduser: "",
      dataUser: this.$q.localStorage.getItem("data"),
    };
  },
  created() {
    this.getPerangkat();
  },
  methods: {
    searchID(ID) {
      this.ID = this.form.ID;
      this.iduser = this.dataUser.user.ID;
      this.$axios.get(`/perangkat/getById/${this.ID}`).then((res) => {
        if (res.data.status) {
          this.form.NAMA = res.data.data.NAMA;
          this.form.MAC = res.data.data.MAC;
          this.form.JENIS = res.data.data.JENIS;
        }
      });
    },
    getPerangkat: async function () {
      this.$q.loading.show();
      await this.$axios
        .get(`/daftar_perangkat/getById/${this.dataUser.user.ID}`)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.rowsPerangkat = response.data.data;
          }
        })
        .catch(() => this.$commonErrorNotif());
    },
    onDataUrlChange(dataUrl) {
      this.dataUrl = dataUrl;
    },
    onSubmit() {
      this.onCreate();
    },
    onCreate() {
      this.$q.loading.show();
      this.form.ID_PENGGUNA = this.dataUser.user.ID;
      this.form.ID_PERANGKAT = this.form.ID;
      this.$axios
        .post("/daftar_perangkat/create", this.form)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.getPerangkat();
          }
        })
        .catch(() => this.$commonErrorNotif());
      this.$axios
        .put(`perangkat/update/${this.form.ID_PERANGKAT}`, {
          STATUS: "1",
        })
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
          }
        })
        .catch(() => this.$commonErrorNotif());
    },
  },
};
</script>
