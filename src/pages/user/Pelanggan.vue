<template>
  <q-page>
    <q-card class="q-pa-md q-ma-md">
      <div class="text-dark row flex flex-center">
        <div class="col">
          <q-breadcrumbs>
            <q-breadcrumbs-el
              class="text-indigo"
              label="Pelanggan"
              icon="person_4"
            />
          </q-breadcrumbs>
        </div>
        <div class="col" align="right">
          <q-btn
            color="primary"
            outline
            size="sm"
            icon="person_add_alt_1"
            label="Pelanggan Baru"
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
              DATA PELANGGAN
              <strong class="text-uppercase"
                >{{ this.dataPengguna.user.TOKO }}.</strong
              >
            </div>
            <p class="text-caption">Konfigurasi data pelanggan toko anda</p>
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
            <q-td key="PROFIL" :props="props">
              <q-avatar size="lg" rounded>
                <img
                  :src="
                    props.row.PROFIL === '-'
                      ? 'images/icons/user.png'
                      : props.row.PROFIL
                  "
                />
              </q-avatar>
            </q-td>
            <q-td key="ID_PELANGGAN" :props="props">
              <q-badge color="positive">{{ props.row.ID_PELANGGAN }}</q-badge>
            </q-td>
            <q-td key="NAMA" :props="props">
              {{ props.row.NAMA }}
            </q-td>
            <q-td key="TELEPON" :props="props">
              {{ props.row.TELEPON }}
            </q-td>
            <q-td key="EMAIL" :props="props">
              {{ props.row.EMAIL }}
            </q-td>
            <q-td key="action" :props="props">
              <q-btn
                round
                flat
                color="indigo"
                @click="detail(props.row)"
                size="sm"
                icon="visibility"
              />
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

    <q-dialog v-model="detailDialog" position="bottom">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section class="items-center no-wrap">
          <div>
            <div class="text-weight-bold">DETAIL DATA PELANGGAN</div>
            <div class="text-grey">{{ this.nama }}</div>
          </div>

          <div class="row q-mt-sm q-gutter-md">
            <div class="col-2">
              <q-avatar size="100px">
                <img
                  :src="
                    this.profil === '-' ? 'images/icons/user.png' : this.profil
                  "
                />
              </q-avatar>
            </div>
            <div class="col q-ml-xl">
              <div class="row">
                <div>
                  <div class="text-weight-bold">Nomor Telepon</div>
                  <div class="text-grey">{{ this.telepon }}</div>
                  <div class="text-weight-bold">Kecamatan</div>
                  <div class="text-grey">{{ this.kecamatan }}</div>
                  <div class="text-weight-bold">Tanggal Registrasi</div>
                  <div class="text-grey">
                    {{ this.$parseDate(this.tanggaldaftar).fullDate }}
                  </div>
                </div>
                <div class="q-ml-lg">
                  <div class="text-weight-bold">Email</div>
                  <div class="text-grey">{{ this.email }}</div>
                  <div class="text-weight-bold">Kabupaten / Kota</div>
                  <div class="text-grey">{{ this.kabupaten }}</div>
                </div>
                <div class="q-ml-lg">
                  <div class="text-weight-bold">Alamat Lengkap</div>
                  <div class="text-grey">{{ this.alamat }}</div>
                  <div class="text-weight-bold">Provinsi</div>
                  <div class="text-grey">{{ this.provinsi }}</div>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dialog">
      <q-card style="width: 900px; max-width: 80vw">
        <q-form @submit="onSubmit()" class="q-gutter-md">
          <q-card-section>
            <div class="text-h6 text-indigo">
              PENDAFTARAN / UBAH PELANGGAN BARU
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
                icon="admin_panel_settings"
              />Data Pokok
            </div>

            <div class="row items-start">
              <q-input
                standout="bg-positive text-white"
                v-model="form.NAMA"
                class="text-white col-4 q-pa-sm"
                label="Nama Lengkap"
                dense
              >
                <template v-slot:prepend>
                  <q-icon name="account_circle" class="q-pr-md" />
                </template>
              </q-input>
              <q-input
                type="number"
                standout="bg-positive text-white"
                v-model="form.TELEPON"
                class="text-white col-4 q-pa-sm"
                label="No. Telepon"
                mask="#############"
                dense
              >
                <template v-slot:prepend>
                  <q-icon name="call" class="q-pr-md" />
                </template>
              </q-input>
              <q-input
                standout="bg-positive text-white"
                v-model="form.EMAIL"
                class="text-white col-4 q-pa-sm"
                label="Email"
                type="email"
                dense
              >
                <template v-slot:prepend>
                  <q-icon name="mail_outline" class="q-pr-md" />
                </template>
              </q-input>
              <q-input
                standout="bg-positive text-white"
                v-model="form.ALAMAT"
                class="text-white col-4 q-pa-sm"
                label="Alamat Lengkap"
                dense
              >
                <template v-slot:prepend>
                  <q-icon name="person_pin" class="q-pr-md" />
                </template>
              </q-input>
              <q-input
                standout="bg-positive text-white"
                v-model="form.KECAMATAN"
                class="text-white col-4 q-pa-sm"
                label="Kecamatan"
                dense
              >
                <template v-slot:prepend>
                  <q-icon name="map" class="q-pr-md" />
                </template>
              </q-input>
              <q-input
                standout="bg-positive text-white"
                v-model="form.KABUPATEN"
                class="text-white col-4 q-pa-sm"
                label="Kabupaten / Kota"
                dense
              >
                <template v-slot:prepend>
                  <q-icon name="map" class="q-pr-md" />
                </template>
              </q-input>
              <q-input
                standout="bg-positive text-white"
                v-model="form.PROVINSI"
                class="text-white col-4 q-pa-sm"
                label="Provinsi"
                dense
              >
                <template v-slot:prepend>
                  <q-icon name="map" class="q-pr-md" />
                </template>
              </q-input>
            </div>
          </q-card-section>

          <q-card-actions align="right" class="bg-grey-3 text-indigo q-py-md">
            <q-btn type="submit" label="Tambahkan" v-close-popup flat dense />
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
            @click="this.deleteData(this.idpelanggan)"
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
    TELEPON: null,
    EMAIL: null,
    ALAMAT: null,
    KECAMATAN: null,
    KABUPATEN: null,
    PROVINSI: null,
    PROFIL: "-",
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
      detailDialog: false,
      deleteDialog: false,
      ID: "",
      idpelanggan: null,
      nama: null,
      email: null,
      telepon: null,
      alamat: null,
      kecamatan: null,
      kabupaten: null,
      provinsi: null,
      profil: null,
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
          name: "PROFIL",
          align: "left",
          label: "",
          field: "PROFIL",
        },
        {
          name: "ID_PELANGGAN",
          required: true,
          label: "ID",
          align: "left",
        },
        {
          name: "NAMA",
          align: "left",
          label: "PELANGGAN",
          field: "NAMA",
        },
        {
          name: "TELEPON",
          align: "left",
          label: "TELEPON",
          field: "TELEPON",
        },
        {
          name: "EMAIL",
          align: "left",
          label: "Email",
          field: "EMAIL",
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
        this.form.ID = ID.ID_KATEGORI;
        this.form.NAMA = ID.NAMA;
        this.form.TELEPON = ID.TELEPON;
        this.form.EMAIL = ID.EMAIL;
        this.form.ALAMAT = ID.ALAMAT;
        this.form.KECAMATAN = ID.KECAMATAN;
        this.form.KABUPATEN = ID.KABUPATEN;
        this.form.PROVINSI = ID.PROVINSI;
        this.form.PROFIL = "-";
        this.idActive = ID.GUID;
      } else {
        this.form.NAMA = null;
        this.form.TELEPON = null;
        this.form.EMAIL = null;
        this.form.ALAMAT = null;
        this.form.KECAMATAN = null;
        this.form.KABUPATEN = null;
        this.form.PROVINSI = null;
        this.form.PROFIL = "-";
        this.idActive = null;
      }
      this.dialog = true;
    },
    resetDialog() {
      this.editMode = false;
      this.dialog = false;
    },
    resetForm() {
      this.form = null;
    },
    onSubmit() {
      if (this.editMode) {
        this.$q.loading.show();
        this.$axios
          .put(`pelanggan/${this.idActive}`, this.form)
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
        this.form.ID_PELANGGAN = this.generateRandomId(5);
        this.$axios
          .post("pelanggan/create", this.form)
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
        .get(`/pelanggan`)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.rows = response.data.data;
          }
        })
        .catch(() => this.$commonErrorNotif());
    },
    detail(ID) {
      this.GUID = ID.GUID;
      this.detailDialog = true;
      this.idpelanggan = ID.ID_PELANGGAN;
      this.nama = ID.NAMA;
      this.profil = ID.PROFIL;
      this.telepon = ID.TELEPON;
      this.kecamatan = ID.KECAMATAN;
      this.tanggaldaftar = ID.CREATED_AT;
      this.email = ID.EMAIL;
      this.kabupaten = ID.KABUPATEN;
      this.alamat = ID.ALAMAT;
      this.provinsi = ID.PROVINSI;
    },
    deleteGUID(GUID) {
      this.deleteDialog = true;
      this.idPelanggan = GUID;
    },
    deleteData() {
      this.$q.loading.show();
      this.$axios
        .delete(`pelanggan/${this.idPelanggan}`)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
          }
          this.getData();
        })
        .catch(() => this.$commonErrorNotif());
    },
  },
};
</script>
