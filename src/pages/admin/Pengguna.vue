<template>
  <q-page>
    <q-card class="q-pa-md q-ma-md">
      <div class="text-dark row flex flex-center">
        <div class="col">
          <q-breadcrumbs>
            <q-breadcrumbs-el
              class="text-indigo"
              label="Pengguna"
              icon="supervised_user_circle"
            />
          </q-breadcrumbs>
        </div>
        <div class="col" align="right">
          <q-btn
            color="primary"
            outline
            size="sm"
            icon="person_add_alt_1"
            label="Pengguna Baru"
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
              DATA PENGGUNA <strong>DEMETER.</strong>
            </div>
            <p class="text-caption">Konfigurasi data pengguna layanan</p>
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
            <q-td key="TOKO" :props="props">
              <q-badge color="positive"> {{ props.row.TOKO }} </q-badge>
            </q-td>
            <q-td key="LOGO_TOKO" :props="props">
              <q-avatar size="lg" rounded>
                <img
                  :src="
                    props.row.LOGO_TOKO === '-'
                      ? 'images/icons/storefront.png'
                      : props.row.LOGO_TOKO
                  "
                />
              </q-avatar>
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
        <q-linear-progress :value="0.5" color="green" />

        <q-card-section class="items-center no-wrap">
          <div>
            <div class="text-weight-bold">DETAIL DATA PENGGUNA</div>
            <div class="text-grey">{{ this.NAMA }}</div>
          </div>

          <div class="row q-mt-sm q-gutter-md">
            <div class="col-2">
              <q-card flat>
                <img
                  :src="
                    this.LOGO_TOKO === '-' || this.LOGO_TOKO === undefined
                      ? 'images/icons/storefront.png'
                      : this.LOGO_TOKO
                  "
                />
              </q-card>
              <div class="q-mt-sm text-weight-bold">
                <q-badge color="positive">{{ this.TOKO }}</q-badge>
              </div>
              <div class="text-caption" style="font-size: 9px">
                {{ this.ALAMAT_TOKO }}
              </div>
            </div>
            <div class="col q-ml-xl">
              <div class="row">
                <div>
                  <div class="text-weight-bold">Nomor Telepon</div>
                  <div class="text-grey">{{ this.TELEPON }}</div>
                  <div class="text-weight-bold">Kecamatan</div>
                  <div class="text-grey">{{ this.KECAMATAN }}</div>
                  <div class="text-weight-bold">Tanggal Registrasi</div>
                  <div class="text-grey">
                    {{ this.$parseDate(this.TANGGAL_DAFTAR).fullDate }}
                  </div>
                </div>
                <div class="q-ml-lg">
                  <div class="text-weight-bold">Email</div>
                  <div class="text-grey">{{ this.EMAIL }}</div>
                  <div class="text-weight-bold">Kabupaten / Kota</div>
                  <div class="text-grey">{{ this.KABUPATEN }}</div>
                </div>
                <div class="q-ml-lg">
                  <div class="text-weight-bold">Alamat Lengkap</div>
                  <div class="text-grey">{{ this.ALAMAT }}</div>
                  <div class="text-weight-bold">Provinsi</div>
                  <div class="text-grey">{{ this.PROVINSI }}</div>
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
            <div class="text-h6 text-indigo">PENDAFTARAN PENGGUNA BARU</div>
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

            <div class="text-caption q-pa-sm text-weight-bold flex-center">
              <q-avatar
                size="sm"
                color="primary"
                class="q-mr-md"
                text-color="white"
                icon="store"
              />Data Toko
            </div>

            <div class="row items-start">
              <q-input
                standout="bg-positive text-white"
                v-model="form.TOKO"
                class="text-white col-4 q-pa-sm"
                label="Nama Toko"
                dense
              >
                <template v-slot:prepend>
                  <q-icon name="storefront" class="q-pr-md" />
                </template>
              </q-input>
              <q-input
                standout="bg-positive text-white"
                v-model="form.ALAMAT_TOKO"
                class="text-white col-4 q-pa-sm"
                label="Alamat Toko"
                dense
              >
                <template v-slot:prepend>
                  <q-icon name="map" class="q-pr-md" />
                </template>
              </q-input>
            </div>

            <div class="text-caption q-pa-sm text-weight-bold flex-center">
              <q-avatar
                size="sm"
                color="primary"
                text-color="white"
                class="q-mr-md"
                icon="verified_user"
              />Data Akun
            </div>

            <div class="row items-start">
              <q-input
                standout="bg-positive text-white"
                v-model="form.USERNAME"
                class="text-white col-4 q-pa-sm"
                label="Username"
                dense
              >
                <template v-slot:prepend>
                  <q-icon name="account_circle" class="q-pr-md" />
                </template>
              </q-input>
              <div v-if="editMode">
                <q-input
                  :disable="true"
                  standout="bg-positive text-white"
                  v-model="form.PASSWORD"
                  class="text-white col-4 q-pa-sm"
                  label="Password"
                  :type="isPwd ? 'password' : 'text'"
                  dense
                >
                  <template v-slot:prepend>
                    <q-icon name="fingerprint" class="q-pr-md" />
                  </template>
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
              </div>
              <div v-else>
                <q-input
                  standout="bg-positive text-white"
                  v-model="form.PASSWORD"
                  class="text-white col-4 q-pa-sm"
                  label="Password"
                  :type="isPwd ? 'password' : 'text'"
                  dense
                >
                  <template v-slot:prepend>
                    <q-icon name="fingerprint" class="q-pr-md" />
                  </template>
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
              </div>
            </div>
          </q-card-section>

          <q-card-actions align="right" class="bg-grey-3 text-indigo q-py-md">
            <q-btn
              type="submit"
              label="Daftar Sekarang"
              v-close-popup
              flat
              dense
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

    <!-- <q-dialog v-model="editDialog">
      <q-card style="width: 900px; max-width: 80vw">
        <q-form @submit="onEdit()" class="q-gutter-md">
          <q-card-section>
            <div class="text-h6 text-indigo">UBAH DATA PENGGUNA</div>
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

            <div class="text-caption q-pa-sm text-weight-bold flex-center">
              <q-avatar
                size="sm"
                color="primary"
                class="q-mr-md"
                text-color="white"
                icon="store"
              />Data Toko
            </div>

            <div class="row items-start">
              <q-input
                standout="bg-positive text-white"
                v-model="form.TOKO"
                class="text-white col-4 q-pa-sm"
                label="Nama Toko"
                dense
              >
                <template v-slot:prepend>
                  <q-icon name="storefront" class="q-pr-md" />
                </template>
              </q-input>
              <q-input
                standout="bg-positive text-white"
                v-model="form.ALAMAT_TOKO"
                class="text-white col-4 q-pa-sm"
                label="Alamat Toko"
                dense
              >
                <template v-slot:prepend>
                  <q-icon name="map" class="q-pr-md" />
                </template>
              </q-input>
            </div>
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
            @click="this.deleteData(this.idpengguna)"
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
    TOKO: null,
    ALAMAT_TOKO: null,
    LOGO_TOKO: "-",
    ROLE: 1,
    USERNAME: null,
    PASSWORD: null,
  };
};

export default {
  name: "PageIndex",
  components: {},
  data() {
    return {
      editMode: false,
      dialog: false,
      idActive: null,
      detailDialog: false,
      deleteDialog: false,
      ID: "",
      idpengguna: null,
      filter: "",
      isPwd: true,
      visibles: false,
      form: model(),
      pagination: {
        sortBy: "desc",
        descending: false,
        rowsPerPage: 10,
      },
      rows: [],
      columns: [
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
          label: "TOKO",
          field: "TOKO",
        },
        {
          name: "LOGO_TOKO",
          align: "left",
          label: "LOGO",
          field: "LOGO_TOKO",
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
        this.GUID = ID.GUID;
        this.form.ID = ID.ID;
        this.form.NAMA = ID.NAMA;
        this.form.TELEPON = ID.TELEPON;
        this.form.EMAIL = ID.EMAIL;
        this.form.ALAMAT = ID.ALAMAT;
        this.form.KECAMATAN = ID.KECAMATAN;
        this.form.KABUPATEN = ID.KABUPATEN;
        this.form.PROVINSI = ID.PROVINSI;
        this.form.TOKO = ID.TOKO;
        this.form.ALAMAT_TOKO = ID.ALAMAT_TOKO;
        this.form.LOGO_TOKO = "-";
        this.form.USERNAME = ID.USERNAME;
        this.form.PASSWORD = ID.PASSWORD;
        this.idActive = ID.GUID;
      } else {
        this.form.NAMA = null;
        this.form.TELEPON = null;
        this.form.EMAIL = null;
        this.form.ALAMAT = null;
        this.form.KECAMATAN = null;
        this.form.KABUPATEN = null;
        this.form.PROVINSI = null;
        this.form.TOKO = null;
        this.form.ALAMAT_TOKO = null;
        this.form.LOGO_TOKO = "-";
        this.form.USERNAME = null;
        this.form.PASSWORD = null;
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
          .put(`users/${this.idActive}`, this.form)
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
        this.form.ID = this.generateRandomId(5);
        this.$axios
          .post("users/create", this.form)
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
        .get(`/users`)
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
      this.idpengguna = GUID;
    },
    deleteData() {
      this.$q.loading.show();
      this.$axios
        .delete(`users/${this.idpengguna}`)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
          }
          this.getData();
        })
        .catch(() => this.$commonErrorNotif());
    },
    detail(ID) {
      console.log(ID);
      this.detailDialog = true;
      this.idpengguna = ID.ID;
      this.NAMA = ID.NAMA;
      this.TOKO = ID.TOKO;
      this.TELEPON = ID.TELEPON;
      this.KECAMATAN = ID.KECAMATAN;
      this.NAMA = ID.NAMA;
      this.TANGGAL_DAFTAR = ID.CREATED_AT;
      this.EMAIL = ID.EMAIL;
      this.KABUPATEN = ID.KABUPATEN;
      this.ALAMAT = ID.ALAMAT;
      this.PROVINSI = ID.PROVINSI;
    },

    // FUNCTION DATA DULU
    // editData(ID) {
    //   console.log(ID);
    //   this.editDialog = true;
    //   this.ID = ID.ID;
    //   this.GUID = ID.GUID;
    //   this.form.NAMA = ID.NAMA;
    //   this.form.TELEPON = ID.TELEPON;
    //   this.form.EMAIL = ID.EMAIL;
    //   this.form.ALAMAT = ID.ALAMAT;
    //   this.form.KECAMATAN = ID.KECAMATAN;
    //   this.form.KABUPATEN = ID.KABUPATEN;
    //   this.form.PROVINSI = ID.PROVINSI;
    //   this.form.TOKO = ID.TOKO;
    //   this.form.ALAMAT_TOKO = ID.ALAMAT_TOKO;
    //   this.form.LOGO_TOKO = "-";
    //   this.form.USERNAME = ID.USERNAME;
    //   this.form.PASSWORD = ID.PASSWORD;
    // },
    // detail(ID) {
    //   console.log(ID);
    //   this.detailDialog = true;
    //   this.idpengguna = ID.ID;
    //   this.NAMA = ID.NAMA;
    //   this.TOKO = ID.TOKO;
    //   this.TELEPON = ID.TELEPON;
    //   this.KECAMATAN = ID.KECAMATAN;
    //   this.NAMA = ID.NAMA;
    //   this.TANGGAL_DAFTAR = ID.CREATED_AT;
    //   this.EMAIL = ID.EMAIL;
    //   this.KABUPATEN = ID.KABUPATEN;
    //   this.ALAMAT = ID.ALAMAT;
    //   this.PROVINSI = ID.PROVINSI;
    // },
    // generateRandomId(length) {
    //   const randomStr = Math.random().toString(36).substr(2, length);
    //   return randomStr;
    // },
    // onSubmit() {
    //   this.$q.loading.show();
    //   this.form.ID = this.generateRandomId(5);
    //   this.$axios
    //     .post("users/create", this.form)
    //     .finally(() => this.$q.loading.hide())
    //     .then((response) => {
    //       if (!this.$parseResponse(response.data)) {
    //         this.getPengguna();
    //       }
    //     })
    //     .catch(() => this.$commonErrorNotif());
    // },
    // onEdit(GUID) {
    //   console.log(this.GUID);
    //   this.$q.loading.show();
    //   this.$axios
    //     .put(`users/${this.GUID}`, this.form)
    //     .finally(() => this.$q.loading.hide())
    //     .then((res) => {
    //       console.log(res);
    //       if (!this.$parseResponse(res.data)) {
    //         this.editDialog = false;
    //         this.getPengguna();
    //       }
    //     })
    //     .catch(() => this.$commonErrorNotif());
    // },
    // getPengguna: async function () {
    //   this.$q.loading.show();
    //   await this.$axios
    //     .get("/users")
    //     .finally(() => this.$q.loading.hide())
    //     .then((response) => {
    //       console.log(response);
    //       if (!this.$parseResponse(response.data)) {
    //         this.rows = response.data.data;
    //       }
    //     })
    //     .catch(() => this.$commonErrorNotif());
    // },
    // deleteGUID(GUID) {
    //   console.log(GUID);
    //   this.deleteDialog = true;
    //   this.idpengguna = GUID;
    // },
    // deleteData(idpengguna) {
    //   this.$q.loading.show();
    //   this.$axios
    //     .delete(`users/${idpengguna}`)
    //     .finally(() => this.$q.loading.hide())
    //     .then((response) => {
    //       if (!this.$parseResponse(response.data)) {
    //         this.getPengguna();
    //       }
    //     })
    //     .catch(() => this.$commonErrorNotif());
    // },
  },
};
</script>
