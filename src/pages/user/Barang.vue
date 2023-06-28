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
            @click="fullWidth = true"
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
                :src="`${port}${props.row.IMAGE.IMAGE1}`"
              />
            </q-td>
            <q-td key="IMAGE2" :props="props">
              <q-img
                crossorigin="anonymous"
                class="rounded-borders"
                :ratio="16 / 9"
                style="width: 70px"
                :src="`${port}${props.row.IMAGE.IMAGE2}`"
              />
            </q-td>
            <q-td key="IMAGE3" :props="props">
              <q-img
                crossorigin="anonymous"
                class="rounded-borders"
                :ratio="16 / 9"
                style="width: 70px"
                :src="`${port}${props.row.IMAGE.IMAGE3}`"
              />
            </q-td>
            <q-td key="IMAGE4" :props="props">
              <q-img
                crossorigin="anonymous"
                class="rounded-borders"
                :ratio="16 / 9"
                style="width: 70px"
                :src="`${port}${props.row.IMAGE.IMAGE4}`"
              />
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
                @click="this.editData(props.row)"
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

    <q-dialog v-model="fullWidth">
      <q-card style="width: 900px; max-width: 80vw">
        <q-form @submit="onSubmit()" class="q-gutter-md">
          <q-card-section>
            <div class="text-h6 text-indigo">PENDAFTARAN BARANG BARU</div>
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
                v-model="form.IMAGE1"
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
                v-model="form.IMAGE2"
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
                v-model="form.IMAGE3"
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
                v-model="form.IMAGE4"
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
                v-model="form.JENIS_GARANSI"
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
                v-model="form.GARANSI"
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
                v-model="form.BERAT"
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
                v-model="form.PANJANG"
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
                v-model="form.LEBAR"
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
                v-model="form.TINGGI"
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
            <q-btn type="submit" label="Tambahkan" v-close-popup flat dense />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

    <q-dialog v-model="editDialog">
      <q-card style="width: 900px; max-width: 80vw">
        <q-form @submit="onEdit()" class="q-gutter-md">
          <q-card-section>
            <div class="text-h6 text-indigo">UBAH DATA BARANG BARU</div>
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
                      <q-item-label caption>
                        <q-badge color="positive">
                          {{ scope.opt.ID_SATUAN }}
                        </q-badge>
                      </q-item-label>
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
                v-model="form.IMAGE1"
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
                v-model="form.IMAGE2"
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
                v-model="form.IMAGE3"
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
                v-model="form.IMAGE4"
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
                v-model="form.JENIS_GARANSI"
                class="text-white col-4 q-pa-sm"
                label="Jenis Garansi"
                :options="options.optionsKategori"
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
                v-model="form.GARANSI"
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
                v-model="form.BERAT"
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
                v-model="form.PANJANG"
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
                v-model="form.LEBAR"
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
                v-model="form.TINGGI"
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
            <q-btn type="submit" label="Update Data" v-close-popup flat dense />
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
    IMAGE1: null,
    IMAGE2: null,
    IMAGE3: null,
    IMAGE4: null,
    KATEGORI: null,
    SATUAN: null,
    MODAL: null,
    JUAL: null,
    STOK: null,
    JENIS_PENJUALAN: null,
    JENIS_GARANSI: null,
    GARANSI: null,
    BERAT: null,
    PANJANG: null,
    LEBAR: null,
    TINGGI: null,
    DIKIRIM: null,
    DESKRIPSI: null,
  };
};

export default {
  name: "PageIndex",
  components: {},
  data() {
    return {
      port: "http://192.168.18.36:5034/",
      dataPengguna: this.$q.localStorage.getItem("data"),
      editDialog: false,
      deleteDialog: false,
      optionsJenisPenjualan: ["Eceran", "Grosir"],
      optionsJenisGaransi: ["Garansi Penjual", "Garansi Pengiriman"],
      options: { optionsKategori: [], optionsSatuan: [] },
      ID: "",
      idbarang: null,
      NAMA: null,
      IMAGE1: null,
      IMAGE2: null,
      IMAGE3: null,
      IMAGE4: null,
      KATEGORI: null,
      SATUAN: null,
      MODAL: null,
      JUAL: null,
      STOK: null,
      JENIS_PENJUALAN: null,
      JENIS_GARANSI: null,
      GARANSI: null,
      BERAT: null,
      PANJANG: null,
      LEBAR: null,
      TINGGI: null,
      DIKIRIM: null,
      DESKRIPSI: null,
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
          label: "GAMBAR DEPAN",
          field: "IMAGE1",
        },
        {
          name: "IMAGE2",
          align: "left",
          label: "GAMBAR BELAKANG",
          field: "IMAGE2",
        },
        {
          name: "IMAGE3",
          align: "left",
          label: "GAMBAR KANAN",
          field: "IMAGE3",
        },
        {
          name: "IMAGE4",
          align: "left",
          label: "GAMBAR KIRI",
          field: "IMAGE4",
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
          name: "SATUAN",
          align: "left",
          label: "SATUAN",
          field: "SATUAN",
        },
        {
          name: "JENIS_PENJUALAN",
          align: "left",
          label: "PENJUALAN",
          field: "JENIS_PENJUALAN",
        },
        {
          name: "JENIS_GARANSI",
          align: "left",
          label: "JENIS GARANSI",
          field: "JENIS_GARANSI",
        },
        {
          name: "GARANSI",
          align: "left",
          label: "GARANSI",
          field: "GARANSI",
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
    this.getBarang();
    this.getListKategori();
  },
  methods: {
    editData(ID) {
      this.editDialog = true;
      this.ID = ID.ID_BARANG;
      this.GUID = ID.GUID;
      this.form.NAMA = ID.NAMA;
      this.form.IMAGE1 = ID.IMAGE.IMAGE1;
      this.form.IMAGE2 = ID.IMAGE.IMAGE2;
      this.form.IMAGE3 = ID.IMAGE.IMAGE3;
      this.form.IMAGE4 = ID.IMAGE.IMAGE4;
      this.form.KATEGORI = ID.KATEGORI;
      this.form.SATUAN = ID.SATUAN;
      this.form.MODAL = ID.MODAL;
      this.form.JUAL = ID.JUAL;
      this.form.STOK = ID.STOK;
      this.form.JENIS_PENJUALAN = ID.JENIS_PENJUALAN;
      this.form.JENIS_GARANSI = ID.GARANSI.JENIS;
      this.form.GARANSI = ID.GARANSI.NAMA;
      this.form.BERAT = ID.UKURAN.BERAT;
      this.form.PANJANG = ID.UKURAN.PANJANG;
      this.form.LEBAR = ID.UKURAN.LEBAR;
      this.form.TINGGI = ID.UKURAN.TINGGI;
      this.form.DIKIRIM = ID.DIKIRIM;
      this.form.DESKRIPSI = ID.DESKRIPSI;
    },
    resetDialog() {
      this.form.NAMA = null;
      this.form.IMAGE1 = null;
      this.form.IMAGE2 = null;
      this.form.IMAGE3 = null;
      this.form.IMAGE4 = null;
      this.form.KATEGORI = null;
      this.form.SATUAN = null;
      this.form.MODAL = null;
      this.form.JUAL = null;
      this.form.STOK = null;
      this.form.JENIS_PENJUALAN = null;
      this.form.JENIS_GARANSI = null;
      this.form.GARANSI = null;
      this.form.BERAT = null;
      this.form.PANJANG = null;
      this.form.LEBAR = null;
      this.form.TINGGI = null;
      this.form.DIKIRIM = null;
      this.form.DESKRIPSI = null;
    },
    reset() {
      this.editDialog = false;
      this.editData = false;
    },
    generateRandomId(length) {
      const randomStr = Math.random().toString(36).substr(2, length);
      return randomStr;
    },
    onSubmit() {
      this.$q.loading.show();
      const formData = new FormData();
      formData.append("ID_BARANG", this.generateRandomId(5));
      formData.append("NAMA", this.form.NAMA);
      // formData.append("IMAGE1", this.form.IMAGE1);
      // formData.append("IMAGE2", this.form.IMAGE2);
      // formData.append("IMAGE3", this.form.IMAGE3);
      // formData.append("IMAGE4", this.form.IMAGE4);
      formData.append("IMAGE1", this.form.IMAGE1);
      formData.append("IMAGE2", this.form.IMAGE2);
      formData.append("IMAGE3", this.form.IMAGE3);
      formData.append("IMAGE4", this.form.IMAGE4);
      formData.append(
        "KATEGORI",
        this.form.KATEGORI != null ? this.form.KATEGORI.NAMA : null
      );
      console.log(JSON.parse(JSON.stringify(formData)));
      formData.append("SATUAN", this.form.SATUAN.NAMA);
      formData.append("MODAL", this.form.MODAL);
      formData.append("JUAL", this.form.JUAL);
      formData.append("STOK", this.form.STOK);
      formData.append("JENIS_PENJUALAN", this.form.JENIS_PENJUALAN);
      formData.append("JENIS_GARANSI", this.form.JENIS_GARANSI.NAMA);
      formData.append("GARANSI", this.form.GARANSI);
      formData.append("BERAT", this.form.BERAT);
      formData.append("PANJANG", this.form.PANJANG);
      formData.append("LEBAR", this.form.LEBAR);
      formData.append("TINGGI", this.form.TINGGI);
      formData.append("DIKIRIM", this.form.DIKIRIM);
      formData.append("DESKRIPSI", this.form.DESKRIPSI);
      this.$axios
        .post("produk/create", formData)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          console.log(response);
          if (!this.$parseResponse(response.data)) {
            this.getBarang();
          }
        })
        .catch(() => this.$commonErrorNotif());
    },
    onEdit(GUID) {
      console.log(GUID);
      const formData = new FormData();
      formData.append("ID_BARANG", this.generateRandomId(5));
      formData.append("NAMA", this.form.NAMA);
      formData.append("IMAGE1", this.form.IMAGE1);
      formData.append("IMAGE2", this.form.IMAGE2);
      formData.append("IMAGE3", this.form.IMAGE3);
      formData.append("IMAGE4", this.form.IMAGE4);
      formData.append("KATEGORI", this.form.KATEGORI);
      formData.append("SATUAN", this.form.SATUAN);
      formData.append("MODAL", this.form.MODAL);
      formData.append("JUAL", this.form.JUAL);
      formData.append("STOK", this.form.STOK);
      formData.append("JENIS_PENJUALAN", this.form.JENIS_PENJUALAN);
      formData.append("JENIS_GARANSI", this.form.JENIS_GARANSI);
      formData.append("GARANSI", this.form.GARANSI);
      formData.append("BERAT", this.form.BERAT);
      formData.append("PANJANG", this.form.PANJANG);
      formData.append("LEBAR", this.form.LEBAR);
      formData.append("TINGGI", this.form.TINGGI);
      formData.append("DIKIRIM", this.form.DIKIRIM);
      formData.append("DESKRIPSI", this.form.DESKRIPSI);
      console.log("ini form " + formData);
      this.$q.loading.show();
      this.$axios
        .put(`produk/update/${this.GUID}`, formData)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          console.log(response);
          if (!this.$parseResponse(response.data)) {
            this.editDialog = false;
            this.getBarang();
          }
          this.resetDialog();
        })
        .catch(() => this.$commonErrorNotif());
    },
    getBarang: async function () {
      this.$q.loading.show();
      await this.$axios
        .get(`/produk/`)
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
      this.IDSatuan = GUID;
    },
    deleteData(IDSatuan) {
      this.$q.loading.show();
      this.$axios
        .delete(`produk/${IDSatuan}`)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.getBarang();
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
          console.log(response);
          if (!this.$parseResponse(response.data)) {
            this.options.optionsGaransi = response.data.data;
          }
        })
        .catch(() => this.$commonErrorNotif());
    },
  },
};
</script>
