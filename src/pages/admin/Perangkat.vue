<template>
  <q-page class="q-pa-md">
    <div class="col">
      <q-item-label
        style="font-size: 16px"
        class="text-weight-medium text-blue-10"
        >Main Perangkat</q-item-label
      >
      <q-item-label
        style="font-size: 12px"
        class="text-caption text-grey-6 q-mb-md"
        >Data laporan ditampilkan berdasarkan data laporan terbaru</q-item-label
      >

      <q-card class="q-pa-md">
        <div class="col q-gutter-sm">
          <q-btn
            color="blue-10"
            size="sm"
            icon="print"
            label="Cetak Data"
            @click="cetak = true"
          >
            <q-menu
              transition-show="jump-down"
              transition-hide="jump-up"
              :offset="[0, 10]"
              class="q-mt-md"
            >
              <q-list style="min-width: 100%; width: 400px">
                <q-item>
                  <q-item-section>
                    <q-item-label caption>Dari Tanggal</q-item-label>
                    <q-item-label>
                      <q-input
                        outlined
                        v-model="USERNAME"
                        placeholder="type"
                        type="date"
                        dense
                      />
                    </q-item-label>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>Sampai Tanggal</q-item-label>
                    <q-item-label>
                      <q-input
                        outlined
                        v-model="USERNAME"
                        placeholder="type"
                        type="date"
                        dense
                      />
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section class="text-uppercase text-weight-bold"
                    >Cetak Data</q-item-section
                  >
                </q-item>
              </q-list>
            </q-menu></q-btn
          >
          <q-btn
            color="blue-10"
            size="sm"
            icon="devices"
            label="Perangkat Baru"
            @click="openDialog(false, null)"
          />
        </div>
      </q-card>

      <q-card class="my-card q-pa-md q-mt-md">
        <div class="row q-gutter-sm">
          <div class="col">
            <q-card class="my-card bg-grey-3" flat>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label caption class="text-weight-medium q-mb-xs"
                    >Total Perangkat</q-item-label
                  >
                  <q-item-label class="text-h6 text-weight-bold text-indigo-10"
                    >1,000</q-item-label
                  >
                </q-item-section>
              </q-item>
            </q-card>
          </div>
          <div class="col">
            <q-card class="my-card bg-grey-3" flat>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label caption class="text-weight-medium q-mb-xs"
                    >Total Perangkat Aktif</q-item-label
                  >
                  <q-item-label class="text-h6 text-weight-bold text-indigo-10"
                    >1,000</q-item-label
                  >
                </q-item-section>
              </q-item>
            </q-card>
          </div>
          <div class="col">
            <q-card class="my-card bg-grey-3" flat>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label caption class="text-weight-medium q-mb-xs"
                    >Total Peragkat Non-Aktif</q-item-label
                  >
                  <q-item-label class="text-h6 text-weight-bold text-indigo-10"
                    >1,000</q-item-label
                  >
                </q-item-section>
              </q-item>
            </q-card>
          </div>
        </div>
        <div class="col q-mt-md text-weight-medium text-indigo-10">
          Data Perangkat
        </div>
        <div class="col text-caption text-grey-6">
          Seluruh data perangkat yang telah di daftarkan akan di tampilkan dalam
          table data
        </div>
        <div class="col q-mt-sm">
          <q-table
            :rows="rows"
            :columns="columns"
            class="text-grey-7"
            flat
            row-key="name"
            :filter="filter"
            :pagination="pagination"
          >
            <template v-slot:top>
              <q-space />

              <q-btn
                flat
                color="blue-10"
                icon="search"
                @click="visibles = !visibles"
                size="md"
                round
                class="q-mr-sm"
              />
              <q-slide-transition>
                <div v-show="visibles">
                  <q-input
                    outlined
                    debounce="300"
                    placeholder="Pencarian"
                    style="width: 400px"
                    color="blue-10"
                    v-model="filter"
                    dense
                  />
                </div>
              </q-slide-transition>
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="ID_PERANGKAT" :props="props">
                  <q-badge rounded class="bg-positive">{{
                    props.row.ID_PERANGKAT
                  }}</q-badge>
                </q-td>
                <q-td
                  class="text-capitalize text-weight-medium"
                  key="NAMA"
                  :props="props"
                >
                  {{ props.row.NAMA }}
                </q-td>
                <q-td key="MAC" :props="props">
                  {{ props.row.MAC }}
                </q-td>
                <q-td key="JENIS" :props="props">
                  {{ props.row.JENIS }}
                </q-td>
                <q-td class="text-capitalize" key="JABATAN" :props="props">
                  <q-badge rounded class="bg-blue-10">{{
                    props.row.JABATAN
                  }}</q-badge>
                </q-td>
                <q-td class="text-capitalize" key="STATUS" :props="props">
                  <q-badge
                    rounded
                    :color="props.row.STATUS === '0' ? 'orange' : 'positive'"
                    :label="props.row.STATUS === '0' ? 'Non Aktif' : 'Aktif'"
                /></q-td>
                <q-td key="action" :props="props">
                  <q-btn
                    round
                    flat
                    color="blue-10"
                    @click="this.detail(props.row)"
                    size="sm"
                    icon="visibility"
                    ><q-tooltip>detail perangkat</q-tooltip></q-btn
                  >
                  <q-btn
                    round
                    flat
                    color="blue-10"
                    @click="openDialog(true, props.row)"
                    size="sm"
                    icon="edit"
                    ><q-tooltip>perbaharui perangkat</q-tooltip></q-btn
                  >
                  <q-btn
                    round
                    flat
                    @click="deleteGUID(props.row.GUID)"
                    color="blue-10"
                    size="sm"
                    icon="delete"
                    ><q-tooltip>hapus perangkat</q-tooltip></q-btn
                  >
                  <q-btn
                    round
                    flat
                    @click="
                      props.row.STATUS === '0'
                        ? this.onAktif(props.row)
                        : this.onDeaktif(props.row)
                    "
                    color="blue-10"
                    size="sm"
                    :icon="props.row.STATUS === '0' ? 'person' : 'person_off'"
                    ><q-tooltip v-if="props.row.STATUS === '0'"
                      >aktifkan perangkat</q-tooltip
                    ><q-tooltip v-else>non aktifkan perangkat</q-tooltip>
                  </q-btn>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </q-card>
    </div>

    <!-- <q-card class="q-pa-md q-mt-md">
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

    <q-card class="q-pa-md q-mt-md">
      <q-table
        :rows="rows"
        :columns="columns"
        class="text-indigo"
        row-key="name"
        :filter="filter"
        :pagination="pagination"
      >
        <template v-slot:top>
          <div class="col">
            <div class="col q-table__title">
              DATA PERANGKAT <strong>DEMETER.</strong>
            </div>
            <p class="text-caption">
              Konfigurasi data perangkat pada layanan teknologi pertanian
            </p>
          </div>

          <q-space />

          <q-btn
            flat
            color="indigo"
            icon="search"
            @click="visibles = !visibles"
            size="md"
            round
            class="q-mr-sm"
          />
          <q-slide-transition>
            <div v-show="visibles">
              <q-input
                outlined
                debounce="300"
                placeholder="Pencarian"
                style="width: 400px"
                color="indigo"
                v-model="filter"
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
            <q-td key="MAC" :props="props">
              {{ props.row.MAC }}
            </q-td>
            <q-td key="QR" :props="props">
              <vue-qrious
                size="100"
                foreground="#21ba45"
                :value="`http://localhost:8080/#/perangkat/${props.row.ID}`"
                @change="onDataUrlChange"
                mime="image/png"
              />
            </q-td>
            <q-td key="JENIS" :props="props">
              {{ props.row.JENIS }}
            </q-td>
            <q-td key="STATUS" :props="props">
              <q-badge
                :color="props.row.STATUS === '0' ? 'orange' : 'positive'"
                :label="props.row.STATUS === '0' ? 'Belum Aktif' : 'Aktif'"
              />
            </q-td>
            <q-td key="action" :props="props">
              <div v-if="props.row.STATUS == 0">
                <q-btn
                  round
                  flat
                  color="indigo"
                  @click="this.detail(props.row)"
                  size="sm"
                  icon="visibility"
                />
                <q-btn
                  round
                  flat
                  color="indigo"
                  @click="this.editData(props.row)"
                  size="sm"
                  icon="edit"
                />
                <q-btn
                  round
                  flat
                  @click="this.delete(props.row)"
                  color="indigo"
                  size="sm"
                  icon="delete"
                />
              </div>
              <div v-else>
                <q-btn
                  round
                  flat
                  color="indigo"
                  @click="this.detail(props.row)"
                  size="sm"
                  icon="visibility"
                />
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card> -->

    <q-dialog v-model="detailDialog" position="bottom">
      <q-card style="width: 500px; max-width: 80vw">
        <q-linear-progress :value="0.5" color="green" />

        <q-card-section class="items-center no-wrap">
          <div>
            <div class="text-weight-bold">DETAIL DATA PERANGKAT</div>
            <div class="text-grey">{{ this.NAMA }}</div>
          </div>

          <div class="row q-mt-sm q-gutter-md">
            <div class="col-3">
              <q-card class="my-card">
                <vue-qrious
                  size="150"
                  foreground="#21ba45"
                  :value="`http://localhost:8080/#/perangkat/${this.ID}`"
                  @change="onDataUrlChange"
                  mime="image/png"
                />
              </q-card>
            </div>
            <div class="col q-ml-xl">
              <div class="row">
                <div>
                  <div class="text-weight-bold">MAC Address</div>
                  <div class="text-grey">{{ this.MAC }}</div>
                  <div class="text-weight-bold q-mt-sm">Jenis Perangkat</div>
                  <div class="text-grey">{{ this.JENIS }}</div>
                </div>
                <div class="q-ml-lg">
                  <div class="text-weight-bold">Status Perangkat</div>
                  <div class="text-grey">
                    <q-badge
                      :color="this.status === '0' ? 'orange' : 'positive'"
                      :label="this.status === '0' ? 'Belum Aktif' : 'Aktif'"
                    />
                  </div>
                  <div class="text-weight-bold q-mt-sm">Tanggal Registrasi</div>
                  <div class="text-grey">
                    {{ this.$parseDate(this.TANGGAL_DAFTAR).fullDate }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- <q-dialog v-model="editDialog">
      <q-card style="width: 900px; max-width: 80vw">
        <q-form @submit="onEdit()" class="q-gutter-md">
          <q-card-section>
            <div class="text-h6 text-indigo">UBAH DATA PERANGKAT</div>
            <div class="text-caption">
              Pastikan melakukan pengecekan data sebelum perubahan
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
                v-model="form.NAMA"
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
                class="text-white col-4 q-pa-sm"
                label="MAC Address"
                dense
              >
                <template v-slot:prepend>
                  <q-icon name="pin" class="q-pr-md" />
                </template>
              </q-input>
              <q-select
                standout="bg-positive text-white"
                v-model="form.JENIS"
                class="text-white col-4 q-pa-sm"
                label="Jenis Perangkat"
                :options="options"
                dense
              >
                <template v-slot:prepend>
                  <q-icon name="storage" class="q-pr-md" />
                </template>
              </q-select>
            </div>
          </q-card-section>

          <q-card-actions align="right" class="bg-grey-3 text-indigo q-py-md">
            <q-btn type="submit" label="Update Data" v-close-popup flat dense />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog> -->

    <q-dialog v-model="dialog">
      <q-card style="width: 900px; max-width: 80vw">
        <q-form @submit="onSubmit()" class="q-gutter-md">
          <q-card-section>
            <div class="text-h6 text-indigo">
              PENDAFTARAN / UBAH PERANGKAT BARU
            </div>
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
                v-model="form.NAMA"
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
                class="text-white col-4 q-pa-sm"
                label="MAC Address"
                dense
              >
                <template v-slot:prepend>
                  <q-icon name="pin" class="q-pr-md" />
                </template>
              </q-input>
              <q-select
                standout="bg-positive text-white"
                v-model="form.JENIS"
                class="text-white col-4 q-pa-sm"
                label="Jenis Perangkat"
                :options="options"
                dense
              >
                <template v-slot:prepend>
                  <q-icon name="storage" class="q-pr-md" />
                </template>
              </q-select>
            </div>
          </q-card-section>

          <q-card-actions align="right" class="bg-grey-3 text-indigo q-py-md">
            <q-btn
              type="submit"
              label="simpan perangkat"
              v-close-popup
              flat
              dense
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="deleteDialog"
      persistent
      transition-show="flip-down"
      transition-hide="flip-up"
    >
      <q-card class="bg-positive text-white">
        <q-bar>
          <div></div>

          <q-space />

          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6">Informasi</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Apakah anda yakin akan menghapus data ini ?, penghapusan data bersifat
          permanen yang berarti data ini tidak akan di simpan lagi di dalam
          database sistem.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            @click="this.deleteData(this.idperangkat)"
            flat
            label="Lanjutkan"
            color="white"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
// import VueQrious from "vue-qrious";

const model = () => {
  return {
    NAMA: null,
    MAC: null,
    JENIS: null,
    STATUS: "0",
  };
};

export default {
  name: "PageIndex",
  components: {
    // VueQrious,
  },
  data() {
    return {
      editMode: false,
      dialog: false,
      idActive: null,
      detailDialog: false,
      editDialog: false,
      deleteDialog: false,
      idperangkat: null,
      nama: null,
      mac: null,
      jenis: null,
      status: null,
      tanggaldaftar: null,
      dataUrl: null,
      filter: "",
      ID: "",
      options: [
        "Penyiram Tanaman",
        "Ketinggian Air",
        "Sensor PH",
        "Sensor EC",
        "Sensor Debit Air",
        "Sensor Arus Listrik",
        "Sensor Suhu",
      ],
      visibles: false,
      fullWidth: false,
      form: model(),
      pagination: {
        sortBy: "desc",
        descending: false,
        rowsPerPage: 10,
      },
      rows: [],
      columns: [
        {
          name: "ID_PERANGKAT",
          required: true,
          label: "ID",
          align: "left",
          field: "ID_PERANGKAT",
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
          name: "JENIS",
          align: "left",
          label: "JENIS",
          field: "JENIS",
        },
        {
          name: "STATUS",
          align: "left",
          label: "STATUS",
          field: "STATUS",
        },
        { name: "action", align: "center", label: "", field: "action" },
      ],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    generateRandomId(length) {
      const randomStr = Math.random().toString(36).substr(2, length);
      return randomStr;
    },
    openDialog(editMode, ID) {
      this.editMode = editMode;
      if (editMode) {
        this.form.ID = ID.ID_PERANGKAT;
        this.form.NAMA = ID.NAMA;
        this.form.MAC = ID.MAC;
        this.form.JENIS = ID.JENIS;
        this.idActive = ID.GUID;
      } else {
        this.form.NAMA = null;
        this.form.MAC = null;
        this.form.JENIS = null;
        this.idActive = null;
      }
      this.dialog = true;
    },
    resetDialog() {
      this.editMode = false;
      this.dialog = false;
    },
    resetForm() {
      this.form.NAMA = null;
      this.form.MAC = null;
      this.form.JENIS = null;
    },
    onSubmit() {
      if (this.editMode) {
        this.$q.loading.show();
        this.$axios
          .put(`perangkat/${this.idActive}`, this.form)
          .finally(() => this.$q.loading.hide())
          .then((response) => {
            if (!this.$parseResponse(response.data)) {
            }
            this.getData();
            this.resetDialog();
            this.resetForm();
          })
          .catch(() => this.$commonErrorNotif());
      } else {
        this.$q.loading.show();
        this.form.ID_PERANGKAT = this.generateRandomId(5);
        this.$axios
          .post("perangkat/create", this.form)
          .finally(() => this.$q.loading.hide())
          .then((response) => {
            if (!this.$parseResponse(response.data)) {
            }
            this.dialog = false;
            this.getData();
          })
          .catch(() => this.$commonErrorNotif());
      }
    },
    getData: async function () {
      this.$q.loading.show();
      await this.$axios
        .get(`/perangkat`)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          console.log(response);
          if (!this.$parseResponse(response.data)) {
            this.rows = response.data.data;
          }
        })
        .catch(() => this.$commonErrorNotif());
    },
    deleteGUID(GUID) {
      this.deleteDialog = true;
      this.idperangkat = GUID;
    },
    deleteData() {
      this.$q.loading.show();
      this.$axios
        .delete(`perangkat/${this.idperangkat}`)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
          }
          this.getData();
        })
        .catch(() => this.$commonErrorNotif());
    },
    onDataUrlChange(dataUrl) {
      this.dataUrl = dataUrl;
    },

    // FUNCTION DATA DAHULU
    // editData(ID) {
    //   this.editDialog = true;
    //   this.ID = ID.ID_PERANGKAT;
    //   this.form.NAMA = ID.NAMA;
    //   this.form.MAC = ID.MAC;
    //   this.form.JENIS = ID.JENIS;
    // },
    // detail(ID) {
    //   console.log(ID);
    //   this.detailDialog = true;
    //   this.idperangkat = ID.ID;
    //   this.NAMA = ID.NAMA;
    //   this.MAC = ID.MAC;
    //   this.JENIS = ID.JENIS;
    //   this.TANGGAL_DAFTAR = ID.CREATED_AT;
    // },
    // generateRandomId(length) {
    //   const randomStr = Math.random().toString(36).substr(2, length);
    //   return randomStr;
    // },
    // onSubmit() {
    //   this.$q.loading.show();
    //   this.form.ID_PERANGKAT = this.generateRandomId(5);
    //   this.$axios
    //     .post("/perangkat/create", this.form)
    //     .finally(() => this.$q.loading.hide())
    //     .then((response) => {
    //       if (!this.$parseResponse(response.data)) {
    //         this.getPerangkat();
    //       }
    //     })
    //     .catch(() => this.$commonErrorNotif());
    // },
    // onEdit() {
    //   this.$q.loading.show();
    //   this.$axios
    //     .put(`perangkat/${this.ID}`, this.form)
    //     .finally(() => this.$q.loading.hide())
    //     .then((response) => {
    //       if (!this.$parseResponse(response.data)) {
    //         this.editDialog = false;
    //         this.getPerangkat();
    //       }
    //     })
    //     .catch(() => this.$commonErrorNotif());
    // },
    // getPerangkat: async function () {
    //   this.$q.loading.show();
    //   await this.$axios
    //     .get("perangkat/")
    //     .finally(() => this.$q.loading.hide())
    //     .then((response) => {
    //       console.log(response);
    //       if (!this.$parseResponse(response.data)) {
    //         this.rows = response.data.data;
    //       }
    //     })
    //     .catch(() => this.$commonErrorNotif());
    // },
    // onDataUrlChange(dataUrl) {
    //   this.dataUrl = dataUrl;
    // },
    // delete(ID) {
    //   this.deleteDialog = true;
    //   this.idperangkat = ID.ID;
    // },
    // deleteData(idperangkat) {
    //   this.$q.loading.show();
    //   this.$axios
    //     .delete(`perangkat/${idperangkat}`)
    //     .finally(() => this.$q.loading.hide())
    //     .then((response) => {
    //       if (!this.$parseResponse(response.data)) {
    //         this.getPerangkat();
    //       }
    //     })
    //     .catch(() => this.$commonErrorNotif());
    // },
  },
};
</script>
