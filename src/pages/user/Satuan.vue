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
            <q-breadcrumbs-el class="text-grey-6" label="Satuan" icon="tag" />
          </q-breadcrumbs>
        </div>
        <div class="col" align="right">
          <q-btn
            color="primary"
            outline
            size="sm"
            icon="tag"
            label="Satuan Baru"
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
        row-key="nama"
        :filter="filter"
        :pagination="pagination"
      >
        <template v-slot:top>
          <div class="col">
            <div class="col q-table__title">
              DATA SATUAN PRODUK
              <strong class="text-uppercase"
                >{{ this.dataPengguna.user.TOKO }}.</strong
              >
            </div>
            <p class="text-caption">Konfigurasi data satuan produk toko anda</p>
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
            <q-td key="ID_SATUAN" :props="props">
              <q-badge color="positive">{{ props.row.ID_SATUAN }}</q-badge>
            </q-td>
            <q-td key="NAMA" :props="props">
              {{ props.row.NAMA }}
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
            <div class="text-h6 text-indigo">
              INPUT / EDIT DATA SATUAN PRODUK
            </div>
            <div class="text-caption">
              Pastikan melakukan pengecekan data sebelum mendaftarkan
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input
              standout="bg-positive text-white"
              v-model="form.NAMA"
              class="text-white"
              label="Nama Satuan"
              dense
            >
              <template v-slot:prepend>
                <q-icon name="tag" class="q-pr-md" />
              </template>
            </q-input>
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
            <div class="text-h6 text-indigo">UBAH DATA SATUAN PRODUK</div>
            <div class="text-caption">
              Pastikan melakukan pengecekan data sebelum perubahan
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input
              standout="bg-positive text-white"
              v-model="form.NAMA"
              class="text-white"
              label="Nama Satuan"
              dense
            >
              <template v-slot:prepend>
                <q-icon name="tag" class="q-pr-md" />
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
          Apakah anda yakin akan menghapus data ini? penghapusan data bersifat
          permanen yang berarti data ini tidak akan di simpan lagi di dalam
          database sistem.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            @click="this.deleteData(this.idsatuan)"
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
      deleteDialog: false,
      ID: "",
      idsatuan: null,
      nama: null,
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
          name: "ID_SATUAN",
          required: true,
          label: "ID",
          align: "left",
          field: "ID_SATUAN",
        },
        {
          name: "NAMA",
          align: "left",
          label: "SATUAN",
          field: "NAMA",
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
        this.form.ID = ID.ID_SATUAN;
        this.form.NAMA = ID.NAMA;
        this.idActive = ID.GUID;
      } else {
        this.form.NAMA = null;
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
    },
    onSubmit() {
      if (this.editMode) {
        this.$q.loading.show();
        this.$axios
          .put(`satuan/${this.idActive}`, this.form)
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
        this.form.ID_SATUAN = this.generateRandomId(5);
        this.$axios
          .post("satuan/create", this.form)
          .finally(() => this.$q.loading.hide())
          .then((response) => {
            console.log(response);
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
        .get(`/satuan`)
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
      this.idDelete = GUID;
    },
    deleteData(GUID) {
      console.log(GUID);
      this.$q.loading.show();
      this.$axios
        .delete(`satuan/${this.idDelete}`)
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
    //   this.form.ID = ID.ID_SATUAN;
    //   this.GUID = ID.GUID;
    //   this.form.NAMA = ID.NAMA;
    // },
    // generateRandomId(length) {
    //   const randomStr = Math.random().toString(36).substr(2, length);
    //   return randomStr;
    // },
    // onSubmit() {
    //   this.$q.loading.show();
    //   this.form.ID_PENGGUNA = this.dataPengguna.user.ID;
    //   this.form.ID_SATUAN = this.generateRandomId(5);
    //   this.$axios
    //     .post("satuan/create", this.form)
    //     .finally(() => this.$q.loading.hide())
    //     .then((response) => {
    //       if (!this.$parseResponse(response.data)) {
    //         this.getSatuan();
    //       }
    //     })
    //     .catch(() => this.$commonErrorNotif());
    // },
    // onEdit() {
    //   this.$q.loading.show();
    //   this.$axios
    //     .put(`satuan/update/${this.GUID}`, this.form)
    //     .finally(() => this.$q.loading.hide())
    //     .then((response) => {
    //       if (!this.$parseResponse(response.data)) {
    //         this.editDialog = false;
    //         this.getSatuan();
    //       }
    //     })
    //     .catch(() => this.$commonErrorNotif());
    // },
    // getSatuan: async function () {
    //   this.$q.loading.show();
    //   await this.$axios
    //     .get(`/satuan`)
    //     .finally(() => this.$q.loading.hide())
    //     .then((response) => {
    //       if (!this.$parseResponse(response.data)) {
    //         this.rows = response.data.data;
    //       }
    //     })
    //     .catch(() => this.$commonErrorNotif());
    // },
    // deleteGUID(GUID) {
    //   this.deleteDialog = true;
    //   this.idsatuan = GUID;
    // },
    // deleteData(idsatuan) {
    //   this.$q.loading.show();
    //   this.$axios
    //     .delete(`satuan/${idsatuan}`)
    //     .finally(() => this.$q.loading.hide())
    //     .then((response) => {
    //       if (!this.$parseResponse(response.data)) {
    //         this.getSatuan();
    //       }
    //     })
    //     .catch(() => this.$commonErrorNotif());
    // },
  },
};
</script>

<style lang="sass" scoped>
.example-item
  height: 290px
  width: 290px
</style>
