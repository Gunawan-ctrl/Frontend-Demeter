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
              label="Barang"
              icon="shopping_bag"
            />
          </q-breadcrumbs>
        </div>
        <div class="col" align="right">
          <q-btn
            color="primary"
            outline
            size="sm"
            icon="shopping_bag"
            label="Barang Baru"
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
              DATA BARANG
              <strong class="text-uppercase"
                >{{ this.dataPengguna.user.TOKO }}.</strong
              >
            </div>
            <p class="text-caption">Konfigurasi data barang toko anda</p>
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
            <q-td key="ID_BARANG" :props="props">
              <q-badge color="positive">{{ props.row.ID_BARANG }}</q-badge>
            </q-td>
            <q-td key="NAMA" :props="props">
              {{ props.row.NAMA }}
            </q-td>
            <q-td key="IMAGE1" :props="props">
              <q-img
                crossorigin="anonymous"
                class="rounded-borders"
                :ratio="16 / 9"
                style="width: 70px"
                :src="
                  props.row.IMAGE == undefined ||
                  props.row.IMAGE.IMAGE1 == undefined ||
                  props.row.IMAGE.IMAGE1 == null
                    ? 'images/icons/demeter.png'
                    : `${port}${props.row.IMAGE.IMAGE1}`
                "
              />
              <!-- <q-img
                crossorigin="anonymous"
                class="rounded-borders"
                :ratio="16 / 9"
                style="width: 70px"
                :src="
                  this.IMAGE1 === undefined || this.IMAGE1 === '-'
                    ? 'images/icons/user.png'
                    : `${port}${this.IMAGE1}`
                "
              /> -->
            </q-td>
            <q-td key="KATEGORI" :props="props">
              {{ props.row.KATEGORI }}
            </q-td>
            <q-td key="MODAL" :props="props"> Rp. {{ props.row.MODAL }} </q-td>
            <q-td key="JUAL" :props="props"> Rp. {{ props.row.JUAL }} </q-td>
            <q-td key="STOK" :props="props">
              {{ props.row.STOK }}
            </q-td>
            <q-td key="SATUAN" :props="props">
              {{
                props.row.SATUAN === undefined || props.row.SATUAN === null
                  ? "tidak ada"
                  : props.row.SATUAN
              }}
            </q-td>
            <q-td key="JENIS_PENJUALAN" :props="props">
              {{ props.row.JENIS_PENJUALAN }}
            </q-td>
            <q-td key="JENIS_GARANSI" :props="props">
              {{ props.row.GARANSI.JENIS }}
            </q-td>
            <q-td key="GARANSI" :props="props">
              {{ props.row.GARANSI.NAMA }}
            </q-td>
            <q-td key="CREATED_AT" :props="props">
              {{ this.$parseDate(props.row.CREATED_AT).timeStap }}
            </q-td>
            <q-td key="action" :props="props">
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
        <q-card-section class="row">
          <div>
            <div class="text-weight-bold">GAMBAR DEPAN</div>
            <div class="text-grey">Tampak depan</div>
            <div>
              <q-avatar size="100px">
                <img
                  crossorigin="anonymous"
                  :src="
                    this.form.IMAGE.IMAGE1 == undefined ||
                    this.form.IMAGE.IMAGE1 === '-'
                      ? 'images/icons/demeter.png'
                      : `${port}${this.form.IMAGE.IMAGE1}`
                  "
                />
              </q-avatar>
            </div>
          </div>
          <div class="q-ml-lg">
            <div class="text-weight-bold">GAMBAR BELAKANG</div>
            <div class="text-grey">Tampak belakang</div>
            <div>
              <q-avatar size="100px">
                <img
                  crossorigin="anonymous"
                  :src="
                    this.IMAGE2 == undefined || this.IMAGE2 === '-'
                      ? 'images/icons/demeter.png'
                      : `${port}${this.IMAGE2}`
                  "
                />
              </q-avatar>
            </div>
          </div>
          <div class="q-ml-lg">
            <div class="text-weight-bold">GAMBAR SAMPING KANAN</div>
            <div class="text-grey">Tampak samping kanan</div>
            <div>
              <q-avatar size="100px">
                <img
                  crossorigin="anonymous"
                  :src="
                    this.IMAGE3 == undefined || this.IMAGE3 === '-'
                      ? 'images/icons/demeter.png'
                      : `${port}${this.IMAGE3}`
                  "
                />
              </q-avatar>
            </div>
          </div>
          <div class="q-ml-lg">
            <div class="text-weight-bold">GAMBAR SAMPING KIRI</div>
            <div class="text-grey">Tampak samping kiri</div>
            <div>
              <q-avatar size="100px">
                <img
                  crossorigin="anonymous"
                  :src="
                    this.IMAGE4 == undefined || this.IMAGE4 === '-'
                      ? 'images/icons/demeter.png'
                      : `${port}${this.IMAGE4}`
                  "
                />
              </q-avatar>
            </div>
          </div>
        </q-card-section>

        <q-separator />
        <q-card-section class="items-center no-wrap">
          <div class="row">
            <div>
              <div class="text-weight-bold">Nama Barang</div>
              <div class="text-grey">{{ this.form.NAMA }}</div>
              <div class="text-weight-bold">Kategori</div>
              <div class="text-grey">{{ this.form.KATEGORI }}</div>
              <div class="text-weight-bold">Harga Modal</div>
              <div class="text-grey">{{ this.form.MODAL }}</div>
            </div>
            <div class="q-ml-lg">
              <div class="text-weight-bold">Harga Jual</div>
              <div class="text-grey">{{ this.form.JUAL }}</div>
              <div class="text-weight-bold">Stok</div>
              <div class="text-grey">{{ this.form.STOK }}</div>
              <div class="text-weight-bold">Satuan</div>
              <div class="text-grey">{{ this.form.SATUAN }}</div>
            </div>
            <div class="q-ml-lg">
              <div class="text-weight-bold">Penjualan</div>
              <div class="text-grey">{{ this.form.JENIS_PENJUALAN }}</div>
              <div class="text-weight-bold">Jenis Garansi</div>
              <div class="text-grey">{{ this.form.GARANSI.NAMA }}</div>
              <div class="text-weight-bold">Garansi</div>
              <div class="text-grey">{{ this.form.GARANSI.NAMA }}</div>
            </div>
            <div class="q-ml-lg">
              <div class="text-weight-bold">Panjang</div>
              <div class="text-grey">{{ this.form.UKURAN.PANJANG }}</div>
              <div class="text-weight-bold">Lebar</div>
              <div class="text-grey">{{ this.form.UKURAN.LEBAR }}</div>
              <div class="text-weight-bold">Tinggi</div>
              <div class="text-grey">{{ this.form.UKURAN.TINGGI }}</div>
            </div>
            <div class="q-ml-lg">
              <div class="text-weight-bold">Deskripsi</div>
              <div class="text-grey">{{ this.form.DESKRIPSI }}</div>
              <div class="text-weight-bold">Dikirim</div>
              <div class="text-grey">{{ this.form.DIKIRIM }}</div>
              <div class="text-weight-bold">Tanggal Daftar</div>
              <div class="text-grey">
                {{ this.$parseDate(this.form.TANGGAL_DAFTAR).fullDate }}
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
              PENDAFTARAN / UBAH DATA BARANG
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
                label="Nama Barang"
                dense
              >
                <template v-slot:prepend>
                  <q-icon name="shopping_bag" class="q-pr-md"
                /></template>
              </q-input>

              <q-select
                standout="bg-positive text-white"
                v-model="form.KATEGORI"
                class="text-white col-4 q-pa-sm"
                label="Kategori"
                :options="options.optionsKategori"
                option-label="NAMA"
                key="NAMA"
                dense
              >
                <template v-slot:prepend>
                  <q-icon name="ballot" class="q-pr-md" />
                </template>
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps">
                    <q-item-section>
                      <q-item-label>{{ scope.opt.NAMA }}</q-item-label>
                      <q-item-label caption
                        ><q-badge color="positive">{{
                          scope.opt.ID_KATEGORI
                        }}</q-badge></q-item-label
                      >
                    </q-item-section>
                  </q-item>
                </template></q-select
              >
              <q-select
                standout="bg-positive text-white"
                v-model="form.SATUAN"
                class="text-white col-4 q-pa-sm"
                label="Satuan"
                :options="options.optionsSatuan"
                option-label="NAMA"
                key="NAMA"
                dense
              >
                <template v-slot:prepend>
                  <q-icon name="tag" class="q-pr-md" />
                </template>
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps">
                    <q-item-section>
                      <q-item-label>{{ scope.opt.NAMA }}</q-item-label>
                      <q-item-label caption
                        ><q-badge color="positive">{{
                          scope.opt.ID_SATUAN
                        }}</q-badge></q-item-label
                      >
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
              <q-input
                type="number"
                standout="bg-positive text-white"
                v-model="form.MODAL"
                class="text-white col-4 q-pa-sm"
                label="Harga Modal"
                mask="#############"
                dense
              >
                <template v-slot:prepend>
                  <q-icon name="paid" class="q-pr-md" />
                </template>
              </q-input>
              <q-input
                type="number"
                standout="bg-positive text-white"
                v-model="form.JUAL"
                class="text-white col-4 q-pa-sm"
                label="Harga Jual"
                mask="#############"
                dense
              >
                <template v-slot:prepend>
                  <q-icon name="paid" class="q-pr-md" />
                </template>
              </q-input>
              <q-input
                type="number"
                standout="bg-positive text-white"
                v-model="form.STOK"
                class="text-white col-4 q-pa-sm"
                label="Stok Barang"
                mask="#######"
                dense
              >
                <template v-slot:prepend>
                  <q-icon name="money" class="q-pr-md" />
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
              />Upload Foto Barang
            </div>
            <div class="row items-start">
              <q-file
                standout="bg-positive text-white"
                accept=".jpg, image/*"
                class="text-white col-3 q-pa-sm"
                dense
                v-model="form.IMAGE.IMAGE1"
                label="Foto Depan"
              >
                <template v-slot:prepend>
                  <q-icon name="cloud_upload" />
                </template>
              </q-file>
              <q-file
                standout="bg-positive text-white"
                accept=".jpg, image/*"
                class="text-white col-3 q-pa-sm"
                dense
                v-model="form.IMAGE.IMAGE2"
                label="Foto Belakang"
              >
                <template v-slot:prepend>
                  <q-icon name="cloud_upload" />
                </template>
              </q-file>
              <q-file
                standout="bg-positive text-white"
                accept=".jpg, image/*"
                class="text-white col-3 q-pa-sm"
                dense
                v-model="form.IMAGE.IMAGE3"
                label="Foto Kanan"
              >
                <template v-slot:prepend>
                  <q-icon name="cloud_upload" />
                </template>
              </q-file>
              <q-file
                standout="bg-positive text-white"
                accept=".jpg, image/*"
                class="text-white col-3 q-pa-sm"
                dense
                v-model="form.IMAGE.IMAGE4"
                label="Foto Kiri"
              >
                <template v-slot:prepend>
                  <q-icon name="cloud_upload" />
                </template>
              </q-file>
            </div>
            <div class="text-caption q-pa-sm text-weight-bold flex-center">
              <q-avatar
                size="sm"
                color="primary"
                class="q-mr-md"
                text-color="white"
                icon="store"
              />Data Pendukung
            </div>

            <div class="row items-start">
              <q-select
                standout="bg-positive text-white"
                v-model="form.JENIS_PENJUALAN"
                class="text-white col-4 q-pa-sm"
                label="Jenis Penjualan"
                :options="optionsJenisPenjualan"
                dense
              >
                <template v-slot:prepend>
                  <q-icon name="pix" class="q-pr-md" />
                </template>
              </q-select>
              <q-select
                standout="bg-positive text-white"
                v-model="form.GARANSI.JENIS"
                class="text-white col-4 q-pa-sm"
                label="Jenis Garansi"
                :options="options.optionsGaransi"
                option-label="NAMA"
                key="NAMA"
                dense
              >
                <template v-slot:prepend>
                  <q-icon name="safety_check" class="q-pr-md" />
                </template>
              </q-select>
              <q-input
                type="number"
                standout="bg-positive text-white"
                v-model="form.GARANSI.NAMA"
                class="text-white col-4 q-pa-sm"
                label="Masa Garansi"
                dense
              >
                <template v-slot:prepend>
                  <q-icon name="safety_check" class="q-pr-md"
                /></template>
              </q-input>
              <q-input
                type="number"
                standout="bg-positive text-white"
                v-model="form.UKURAN.BERAT"
                class="text-white col-4 q-pa-sm"
                label="Berat"
                mask="####"
                dense
              >
                <template v-slot:prepend>
                  <q-icon name="scale" class="q-pr-md" />
                </template>
                <template v-slot:append
                  ><div class="text-caption">Kg</div>
                </template>
              </q-input>
              <q-input
                type="number"
                standout="bg-positive text-white"
                v-model="form.UKURAN.PANJANG"
                class="text-white col-4 q-pa-sm"
                label="Panjang"
                mask="####"
                dense
              >
                <template v-slot:prepend>
                  <q-icon name="straighten" class="q-pr-md" />
                </template>
                <template v-slot:append
                  ><div class="text-caption">Cm</div>
                </template>
              </q-input>
              <q-input
                type="number"
                standout="bg-positive text-white"
                v-model="form.UKURAN.LEBAR"
                class="text-white col-4 q-pa-sm"
                label="Lebar"
                mask="####"
                dense
              >
                <template v-slot:prepend>
                  <q-icon name="straighten" class="q-pr-md" />
                </template>
                <template v-slot:append
                  ><div class="text-caption">Cm</div>
                </template>
              </q-input>
              <q-input
                type="number"
                standout="bg-positive text-white"
                v-model="form.UKURAN.TINGGI"
                class="text-white col-4 q-pa-sm"
                label="Tinggi"
                mask="####"
                dense
              >
                <template v-slot:prepend>
                  <q-icon name="straighten" class="q-pr-md" />
                </template>
                <template v-slot:append>
                  <div class="text-caption">Cm</div>
                </template>
              </q-input>
              <q-input
                standout="bg-positive text-white"
                v-model="form.DIKIRIM"
                class="text-white col-8 q-pa-sm"
                label="Dikirim dari"
                dense
              >
                <template v-slot:prepend>
                  <q-icon name="map" class="q-pr-md" />
                </template>
              </q-input>
              <q-input
                standout="bg-positive text-white"
                v-model="form.DESKRIPSI"
                class="text-white col-12 q-pa-sm"
                label="Deskripsi produk"
                type="textarea"
                dense
              >
                <template v-slot:prepend>
                  <q-icon name="description" class="q-pr-md" />
                </template>
              </q-input>
            </div>
          </q-card-section>

          <q-card-actions align="right" class="bg-grey-3 text-indigo q-py-md">
            <q-btn type="submit" label="Simpan Data" v-close-popup flat dense />
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
            @click="this.deleteData(this.IDSatuan)"
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
import { ListService } from "../../helper/services/ListService";

const model = () => {
  return {
    NAMA: null,
    IMAGE: {
      IMAGE1: null,
      IMAGE2: null,
      IMAGE3: null,
      IMAGE4: null,
    },
    KATEGORI: null,
    SATUAN: null,
    MODAL: null,
    JUAL: null,
    STOK: null,
    GARANSI: {
      NAMA: null,
      JENIS: null,
    },
    UKURAN: {
      BERAT: null,
      PANJANG: null,
      LEBAR: null,
      TINGGI: null,
      DIKIRIM: null,
    },
    DESKRIPSI: null,
  };
};

export default {
  name: "PageIndex",
  components: {},
  data() {
    return {
      port: "http://192.168.18.36:5034/",
      // port: "http://localhost:5034/",
      form: model(),
      dataPengguna: this.$q.localStorage.getItem("data"),
      editMode: false,
      dialog: false,
      idActive: null,
      detailDialog: false,
      deleteDialog: false,
      optionsJenisPenjualan: ["Eceran", "Grosir"],
      optionsJenisGaransi: ["Garansi Penjual", "Garansi Pengiriman"],
      options: { optionsKategori: [], optionsSatuan: [] },
      // ID: "",
      // idbarang: null,
      // NAMA: null,
      // IMAGE1: null,
      // IMAGE2: null,
      // IMAGE3: null,
      // IMAGE4: null,
      // KATEGORI: null,
      // SATUAN: null,
      // MODAL: null,
      // JUAL: null,
      // STOK: null,
      // JENIS_PENJUALAN: null,
      // JENIS_GARANSI: null,
      // GARANSI: null,
      // BERAT: null,
      // PANJANG: null,
      // LEBAR: null,
      // TINGGI: null,
      // DIKIRIM: null,
      // DESKRIPSI: null,
      // tanggaldaftar: null,

      filter: "",
      visibles: false,
      fullWidth: false,

      pagination: {
        sortBy: "desc",
        descending: false,
        rowsPerPage: 10,
      },
      rows: [],
      columns: [
        {
          name: "ID_BARANG",
          required: true,
          label: "ID",
          align: "left",
          field: "ID_BARANG",
        },
        {
          name: "NAMA",
          align: "left",
          label: "BARANG",
          field: "NAMA",
        },
        {
          name: "IMAGE1",
          align: "left",
          label: "GAMBAR",
          field: "IMAGE1",
        },
        {
          name: "KATEGORI",
          align: "left",
          label: "KATEGORI",
          field: "KATEGORI",
        },
        {
          name: "MODAL",
          align: "left",
          label: "HARGA MODAL",
          field: "MODAL",
        },
        {
          name: "JUAL",
          align: "left",
          label: "HARGA JUAL",
          field: "JUAL",
        },
        {
          name: "STOK",
          align: "left",
          label: "STOK",
          field: "STOK",
        },
        {
          name: "CREATED_AT",
          align: "left",
          label: "Tanggal",
          field: "CREATED_AT",
        },
        { name: "action", align: "center", label: "", field: "action" },
      ],
    };
  },
  created() {
    this.getData();
    this.getListKategori();
  },
  methods: {
    generateRandomId(length) {
      const randomStr = Math.random().toString(36).substr(2, length);
      return randomStr;
    },
    openDialog(editMode, data) {
      this.editMode = editMode;
      this.dialog = true;
      if (editMode) {
        this.form = data;
        this.idActive = data.GUID;

        // this.form.ID = ID.ID_BARANG;
        // this.form.NAMA = ID.NAMA;
        // this.form.IMAGE1 = ID.IMAGE.IMAGE1;
        // this.form.IMAGE2 = ID.IMAGE.IMAGE2;
        // this.form.IMAGE3 = ID.IMAGE.IMAGE3;
        // this.form.IMAGE4 = ID.IMAGE.IMAGE4;
        // this.form.KATEGORI = ID.KATEGORI;
        // this.form.SATUAN = ID.SATUAN;
        // this.form.MODAL = ID.MODAL;
        // this.form.JUAL = ID.JUAL;
        // this.form.STOK = ID.STOK;
        // this.form.JENIS_PENJUALAN = ID.JENIS_PENJUALAN;
        // this.form.JENIS_GARANSI = ID.GARANSI.JENIS;
        // this.form.GARANSI = ID.GARANSI.NAMA;
        // this.form.BERAT = ID.UKURAN.BERAT;
        // this.form.PANJANG = ID.UKURAN.PANJANG;
        // this.form.LEBAR = ID.UKURAN.LEBAR;
        // this.form.TINGGI = ID.UKURAN.TINGGI;
        // this.form.DIKIRIM = ID.DIKIRIM;
        // this.form.DESKRIPSI = ID.DESKRIPSI;
        // this.idActive = ID.GUID;
      } else {
        // console.log("aaa");
        console.log(this.form);
        // this.form = null;
        // this.idActive = null;
        // this.form.NAMA = null;
        // this.form.IMAGE1 = null;
        // this.form.IMAGE2 = null;
        // this.form.IMAGE3 = null;
        // this.form.IMAGE4 = null;
        // this.form.KATEGORI = null;
        // this.form.SATUAN = null;
        // this.form.MODAL = null;
        // this.form.JUAL = null;
        // this.form.STOK = null;
        // this.form.JENIS_PENJUALAN = null;
        // this.form.JENIS_GARANSI = null;
        // this.form.GARANSI = null;
        // this.form.BERAT = null;
        // this.form.PANJANG = null;
        // this.form.LEBAR = null;
        // this.form.TINGGI = null;
        // this.form.DIKIRIM = null;
        // this.form.DESKRIPSI = null;
        // this.idActive = null;
      }
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
        const formData = new FormData();
        formData.append("ID_BARANG", this.generateRandomId(5));
        formData.append("NAMA", this.form.NAMA);
        formData.append("IMAGE1", this.form.IMAGE.IMAGE1);
        formData.append("IMAGE2", this.form.IMAGE.IMAGE2);
        formData.append("IMAGE3", this.form.IMAGE.IMAGE3);
        formData.append("IMAGE4", this.form.IMAGE.IMAGE4);
        formData.append("KATEGORI", this.form.KATEGORI);
        formData.append("SATUAN", this.form.SATUAN);
        formData.append("MODAL", this.form.MODAL);
        formData.append("JUAL", this.form.JUAL);
        formData.append("STOK", this.form.STOK);
        formData.append("JENIS_PENJUALAN", this.form.JENIS_PENJUALAN);
        formData.append("JENIS_GARANSI", this.form.GARANSI.JENIS);
        formData.append("GARANSI", this.form.GARANSI.NAMA);
        formData.append("BERAT", this.form.UKURAN.BERAT);
        formData.append("PANJANG", this.form.UKURAN.PANJANG);
        formData.append("LEBAR", this.form.UKURAN.LEBAR);
        formData.append("TINGGI", this.form.UKURAN.TINGGI);
        formData.append("DIKIRIM", this.form.DIKIRIM);
        formData.append("DESKRIPSI", this.form.DESKRIPSI);
        this.$axios
          .put(`produk/update/${this.idActive}`, formData)
          .finally(() => this.$q.loading.hide())
          .then((response) => {
            console.log(response);
            if (!this.$parseResponse(response.data)) {
            }
            this.getData();
            this.resetDialog();
            this.resetForm();
          })
          .catch(() => this.$commonErrorNotif());
      } else {
        this.$q.loading.show();
        const formData = new FormData();
        formData.append("ID_BARANG", this.generateRandomId(5));
        formData.append("NAMA", this.form.NAMA);
        formData.append("IMAGE1", this.form.IMAGE.IMAGE1);
        formData.append("IMAGE2", this.form.IMAGE.IMAGE2);
        formData.append("IMAGE3", this.form.IMAGE.IMAGE3);
        formData.append("IMAGE4", this.form.IMAGE.IMAGE4);
        formData.append(
          "KATEGORI",
          this.form.KATEGORI != null ? this.form.KATEGORI.NAMA : null
        );
        formData.append("SATUAN", this.form.SATUAN.NAMA);
        formData.append("MODAL", this.form.MODAL);
        formData.append("JUAL", this.form.JUAL);
        formData.append("STOK", this.form.STOK);
        formData.append("JENIS_PENJUALAN", this.form.JENIS_PENJUALAN);
        formData.append("JENIS_GARANSI", this.form.GARANSI.JENIS);
        formData.append("GARANSI", this.form.GARANSI.NAMA);
        formData.append("BERAT", this.form.UKURAN.BERAT);
        formData.append("PANJANG", this.form.UKURAN.PANJANG);
        formData.append("LEBAR", this.form.UKURAN.LEBAR);
        formData.append("TINGGI", this.form.UKURAN.TINGGI);
        formData.append("DIKIRIM", this.form.DIKIRIM);
        formData.append("DESKRIPSI", this.form.DESKRIPSI);
        this.form.ID_BARANG = this.generateRandomId(5);
        this.$axios
          .post("produk/create", formData)
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
        .get(`/produk`)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          console.log(response.data);
          if (!this.$parseResponse(response.data)) {
            this.rows = response.data.data;
          }
        })
        .catch(() => this.$commonErrorNotif());
    },
    getListKategori: async function () {
      this.$q.loading.show();
      await this.$axios
        .get(`/kategori`)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.options.optionsKategori = response.data.data;
          }
        })
        .catch(() => this.$commonErrorNotif());
      this.$q.loading.show();
      await this.$axios
        .get(`/satuan`)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.options.optionsSatuan = response.data.data;
          }
        })
        .catch(() => this.$commonErrorNotif());
      this.$q.loading.show();
      await this.$axios
        .get(`/garansi`)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.options.optionsGaransi = response.data.data;
          }
        })
        .catch(() => this.$commonErrorNotif());
    },
    detail(DATA) {
      this.detailDialog = true;
      this.form = DATA;
      // this.ID_BARANG = ID.ID_BARANG;
      // this.NAMA = ID.NAMA;
      // this.IMAGE1 = ID.IMAGE.IMAGE1;
      // this.IMAGE2 = ID.IMAGE.IMAGE2;
      // this.IMAGE3 = ID.IMAGE.IMAGE3;
      // this.IMAGE4 = ID.IMAGE.IMAGE4;
      // this.KATEGORI = ID.KATEGORI;
      // this.SATUAN = ID.SATUAN;
      // this.MODAL = ID.MODAL;
      // this.JUAL = ID.JUAL;
      // this.STOK = ID.STOK;
      // this.JENIS_PENJUALAN = ID.JENIS_PENJUALAN;
      // this.JENIS_GARANSI = ID.GARANSI.JENIS;
      // this.GARANSI = ID.GARANSI.NAMA;
      // this.BERAT = ID.BERAT;
      // this.PANJANG = ID.UKURAN.PANJANG;
      // this.LEBAR = ID.UKURAN.LEBAR;
      // this.TINGGI = ID.UKURAN.TINGGI;
      // this.DIKIRIM = ID.DIKIRIM;
      // this.DESKRIPSI = ID.DESKRIPSI;
      // this.TANGGAL_DAFTAR = ID.CREATED_AT;

      // this.resetDialog();
      // this.resetForm();
    },
    deleteGUID(GUID) {
      this.deleteDialog = true;
      this.idbarang = GUID;
    },
    deleteData() {
      this.$q.loading.show();
      this.$axios
        .delete(`produk/${this.idbarang}`)
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
