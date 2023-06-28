<template>
  <q-page>
    <q-card class="q-pa-md q-ma-md">
      <div class="text-dark row flex flex-center">
        <div class="col">
          <q-breadcrumbs>
            <q-breadcrumbs-el
              class="text-indigo"
              label="Produk"
              icon="receipt_long"
            />
            <q-breadcrumbs-el
              class="text-grey-6"
              label="Garansi"
              icon="fa-solid fa-sun"
            />
          </q-breadcrumbs>
        </div>
        <div class="col" align="right">
          <q-btn
            color="primary"
            outline
            size="sm"
            icon="ballot"
            label="Garansi Baru"
            @click="openDialog(false, null)"
          />
        </div>
      </div>
    </q-card>

    <q-card class="q-ma-md">
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
              DATA GARANSI
              <strong class="text-uppercase"
                >{{ this.dataPengguna.user.TOKO }}.</strong
              >
            </div>
            <p class="text-caption">
              Konfigurasi data garansi produk toko anda
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
            <q-td key="ID_GARANSI" :props="props">
              <q-badge color="positive">{{ props.row.ID_GARANSI }}</q-badge>
            </q-td>
            <q-td key="NAMA" :props="props">
              {{ props.row.NAMA }}
            </q-td>
            <q-td key="WARRANTY_DAY" :props="props">
              {{ props.row.WARRANTY_DAY }}
            </q-td>
            <q-td key="CREATED_AT" :props="props">
              {{ this.$parseDate(props.row.CREATED_AT).timeStap }}
            </q-td>
            <q-td key="action" :props="props">
              <q-btn
                round
                flat
                color="indigo"
                @click="openDialog(true, props.row)"
                size="sm"
                icon="edit"
              />
              <q-btn
                round
                flat
                @click="deleteGUID(props.row.GUID)"
                color="indigo"
                size="sm"
                icon="delete"
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card>

    <q-dialog v-model="dialog">
      <q-card style="width: 500px; max-width: 80vw">
        <q-form @submit="onSubmit()" class="q-gutter-md">
          <q-card-section>
            <div class="text-h6 text-indigo">INPUT / EDIT DATA GARANSI</div>
            <div class="text-caption">
              Pastikan melakukan pengecekan data sebelum mendaftarkan
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="row items-start q-gutter-sm">
              <q-input
                standout="bg-positive text-white"
                v-model="form.NAMA"
                class="text-white"
                label="Nama Garansi"
                dense
              >
                <template v-slot:prepend>
                  <q-icon name="fa-solid fa-sun" class="q-pr-md" />
                </template>
              </q-input>
              <q-input
                type="number"
                standout="bg-positive text-white"
                v-model="form.WARRANTY_DAY"
                class="text-white"
                label="JUMLAH HARI"
                dense
              >
                <template v-slot:prepend>
                  <q-icon name="fa-regular fa-calendar-days" class="q-pr-md" />
                </template>
              </q-input>
            </div>
          </q-card-section>

          <q-card-actions align="right" class="bg-grey-3 text-indigo q-py-md">
            <q-btn type="submit" label="Simpan" v-close-popup flat dense />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

    <!-- <q-dialog v-model="editDialog">
      <q-card style="width: 500px; max-width: 80vw">
        <q-form @submit="onEdit()" class="q-gutter-md">
          <q-card-section>
            <div class="text-h6 text-indigo">UBAH DATA GARANSI</div>
            <div class="text-caption">
              Pastikan melakukan pengecekan data sebelum perubahan
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input
              standout="bg-positive text-white"
              v-model="form.NAMA"
              class="text-white"
              label="Nama Garansi"
              dense
            >
              <template v-slot:prepend>
                <q-icon name="ballot" class="q-pr-md" />
              </template>
            </q-input>
            <q-input
              standout="bg-positive text-white"
              v-model="form.WARRANTY_DAY"
              class="text-white"
              label="JUMLAH HARI"
              dense
            >
              <template v-slot:prepend>
                <q-icon name="ballot" class="q-pr-md" />
              </template>
            </q-input>
          </q-card-section>

          <q-card-actions align="right" class="bg-grey-3 text-indigo q-py-md">
            <q-btn type="submit" label="Update Data" v-close-popup flat dense />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog> -->

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
            @click="this.deleteData(this.idGaransi)"
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
const model = () => {
  return {
    NAMA: null,
    WARRANTY_DAY: null,
  };
};

export default {
  name: "PageIndex",
  components: {},
  data() {
    return {
      dataPengguna: this.$q.localStorage.getItem("data"),
      editMode: false,
      dialog: false,
      idActive: null,
      editDialog: false,
      deleteDialog: false,
      ID: "",
      idGaransi: null,
      nama: null,
      warranty_day: null,
      tanggaldaftar: null,
      filter: "",
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
          name: "ID_GARANSI",
          required: true,
          label: "ID",
          align: "left",
          field: "ID_GARANSI",
        },
        {
          name: "NAMA",
          align: "left",
          label: "GARANSI",
          field: "NAMA",
        },
        {
          name: "WARRANTY_DAY",
          align: "left",
          label: "JUMLAH HARI",
          field: "WARRANTY_DAY",
        },
        {
          name: "CREATED_AT",
          align: "left",
          label: "TGL. DAFTAR",
          field: "CREATED_AT",
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
        this.form.ID = ID.ID_GARANSI;
        this.form.NAMA = ID.NAMA;
        this.form.WARRANTY_DAY = ID.WARRANTY_DAY;
        this.idActive = ID.GUID;
      } else {
        this.form.NAMA = null;
        this.form.WARRANTY_DAY = null;
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
      this.form.WARRANTY_DAY = null;
    },
    onSubmit() {
      if (this.editMode) {
        this.$q.loading.show();
        this.$axios
          .put(`garansi/${this.idActive}`, this.form)
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
        this.form.ID_GARANSI = this.generateRandomId(5);
        this.$axios
          .post("garansi/create", this.form)
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
        .get(`/garansi`)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.rows = response.data.data;
          }
        })
        .catch(() => this.$commonErrorNotif());
    },

    deleteGUID(GUID) {
      this.deleteDialog = true;
      this.idDelete = GUID;
    },
    deleteData(GUID) {
      console.log(GUID);
      this.$q.loading.show();
      this.$axios
        .delete(`garansi/${this.idDelete}`)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
          }
          this.getData();
        })
        .catch(() => this.$commonErrorNotif());
    },
    // editData(ID) {
    //   this.editDialog = true;
    //   this.form.ID = ID.ID_GARANSI;
    //   this.GUID = ID.GUID;
    //   this.form.NAMA = ID.NAMA;
    //   this.form.WARRANTY_DAY = ID.WARRANTY_DAY;
    // },
    // generateRandomId(length) {
    //   const randomStr = Math.random().toString(36).substr(2, length);
    //   return randomStr;
    // },
    // onSubmit() {
    //   this.$q.loading.show();
    //   this.form.ID_PENGGUNA = this.dataPengguna.user.ID;
    //   this.form.ID_GARANSI = this.generateRandomId(5);
    //   this.$axios
    //     .post("garansi/create", this.form)
    //     .finally(() => this.$q.loading.hide())
    //     .then((response) => {
    //       if (!this.$parseResponse(response.data)) {
    //         this.getGaransi();
    //       }
    //     })
    //     .catch(() => this.$commonErrorNotif());
    // },
    // onEdit(GUID) {
    //   console.log(this.form);
    //   this.$q.loading.show();
    //   this.$axios
    //     .put(`garansi/update/${this.GUID}`, this.form)
    //     .finally(() => this.$q.loading.hide())
    //     .then((response) => {
    //       console.log(response);
    //       if (!this.$parseResponse(response.data)) {
    //         this.editDialog = false;
    //         this.getGaransi();
    //       }
    //     })
    //     .catch(() => this.$commonErrorNotif());
    // },
    // getGaransi: async function () {
    //   // this.$q.loading.show();
    //   await this.$axios
    //     .get(`/garansi`)
    //     // .finally(() => this.$q.loading.hide())
    //     .then((response) => {
    //       console.log(response);
    //       if (!this.$parseResponse(response.data)) {
    //         this.rows = response.data.data;
    //       }
    //     })
    //     .catch(() => this.$commonErrorNotif());
    // },
    // deleteGUID(GUID) {
    //   this.deleteDialog = true;
    //   this.idGaransi = GUID;
    // },
    // deleteData(idGaransi) {
    //   this.$q.loading.show();
    //   this.$axios
    //     .delete(`garansi/${idGaransi}`)
    //     .finally(() => this.$q.loading.hide())
    //     .then((response) => {
    //       console.log(response);
    //       if (!this.$parseResponse(response.data)) {
    //         this.getGaransi();
    //       }
    //     })
    //     .catch(() => this.$commonErrorNotif());
    // },
  },
};
</script>
