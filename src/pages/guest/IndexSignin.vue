<template>
  <q-page class="q-pa-md row justify-center flex-center" style="height: 100%">
    <div class="row fit">
      <div class="col-5"></div>
      <div class="col">
        <q-card class="q-pa-sm row">
          <q-card class="col-5 q-pa-sm bg-green-13 text-white">
            <q-card-section class="row items-start">
              <img
                src="images/icons/logo_white.png"
                class="q-mr-md"
                style="width: 70px"
              />
            </q-card-section>

            <q-card-section class="q-pt-xl">
              <div class="text-h6 text-weight-bold">
                Layanan manajemen penjualan
              </div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <div class="text-caption">
                Pengelolaan produk yang tepat dapat menunjang peningkatan
                kualitas pelayanan dan penjualan lebih mudah.
              </div>
            </q-card-section>
            <q-card-section class="q-pt-md">
              <div
                class="text-caption rounded-borders q-pa-sm"
                style="background: rgba(0, 0, 0, 0.2)"
              >
                Kami <strong>SERIBU DAUN</strong> hadir mengusung platform
                menajemen penjualan produk, stok gudang sekaligus menjual produk
                terbaik seputar tanaman untuk anda.
              </div>
            </q-card-section>
          </q-card>
          <q-card class="col q-pa-sm">
            <q-card-section>
              <div class="text-h6 text-weight-bold">Sign In</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <div class="text-caption">
                Gunakan data yang sudah di dapatkan sebelumnya untuk dapat masuk
                ke dalam sistem <strong>SERIBU DAUN.</strong>
              </div>
            </q-card-section>

            <q-card-section class="q-pt-sm">
              <q-tabs
                v-model="tab"
                align="left"
                narrow-indicator
                inline-label
                dense
                indicator-color="transparent"
                class="q-mb-lg rounded-borders"
              >
                <q-tab class="text-white bg-green-13 q-mr-xs" name="mails"
                  ><q-btn
                    class="btn-fixed-width"
                    color="white"
                    dense
                    size="sm"
                    flat
                    label="Guest"
                    icon="account_circle"
                /></q-tab>
                <q-tab class="text-white bg-green-13 q-ml-xs" name="alarms">
                  <q-btn
                    class="btn-fixed-width"
                    color="white"
                    dense
                    size="sm"
                    flat
                    label="Administrator"
                    icon="admin_panel_settings"
                /></q-tab>
              </q-tabs>

              <div class="q-gutter-sm">
                <q-card>
                  <q-tab-panels
                    v-model="tab"
                    animated
                    transition-prev="fade"
                    transition-next="fade"
                    class="text-caption"
                  >
                    <q-tab-panel name="mails">
                      <q-form @submit="onSubmitPengguna()">
                        <div class="q-gutter-sm">
                          <q-item-label class="text-weight-bold text-grey-6"
                            >Username</q-item-label
                          >
                          <q-input
                            outlined
                            v-model="form.USERNAME"
                            placeholder="ex. seribudaun"
                            dense
                          />
                          <q-item-label class="text-weight-bold text-grey-6"
                            >Password</q-item-label
                          >
                          <q-input
                            outlined
                            v-model="form.PASSWORD"
                            placeholder="Password"
                            :type="isPwd ? 'password' : 'text'"
                            dense
                          >
                            <template v-slot:append>
                              <q-icon
                                :name="isPwd ? 'visibility_off' : 'visibility'"
                                class="cursor-pointer"
                                @click="isPwd = !isPwd"
                              />
                            </template>
                          </q-input>
                          <q-btn
                            class="text-white q-mt-lg bg-green-13 q-px-xl q-py-sm"
                            size="sm"
                            type="submit"
                            >Sign In</q-btn
                          >
                        </div>
                      </q-form>
                    </q-tab-panel>

                    <q-tab-panel name="alarms">
                      <q-form @submit="onSubmitAdmin()">
                        <div class="q-gutter-sm">
                          <q-item-label class="text-weight-bold text-grey-6"
                            >Username</q-item-label
                          >
                          <q-input
                            outlined
                            v-model="form.USERNAME"
                            placeholder="ex. seribudaun"
                            dense
                          />
                          <q-item-label class="text-weight-bold text-grey-6"
                            >Password</q-item-label
                          >
                          <q-input
                            outlined
                            v-model="form.PASSWORD"
                            placeholder="Password"
                            :type="isPwd ? 'password' : 'text'"
                            dense
                          >
                            <template v-slot:append>
                              <q-icon
                                :name="isPwd ? 'visibility_off' : 'visibility'"
                                class="cursor-pointer"
                                @click="isPwd = !isPwd"
                              />
                            </template>
                          </q-input>
                          <q-btn
                            class="text-white q-mt-lg bg-green-13 q-px-xl q-py-sm"
                            size="sm"
                            type="submit"
                            >Sign In</q-btn
                          >
                        </div>
                      </q-form>
                    </q-tab-panel>
                  </q-tab-panels>
                </q-card>
              </div>
            </q-card-section>
            <q-card-section class="q-pt-sm">
              <div
                class="text-caption rounded-borders q-pa-sm"
                style="background: rgba(0, 0, 0, 0.2)"
              >
                <q-badge color="blue-10">
                  <q-icon name="campaign" color="white" />
                </q-badge>
                Silahkan hubungi developer layanan terhadap data yang digunakan
                untuk mengkases layanan jika terjadi kesalahan.
              </div>
            </q-card-section>
          </q-card>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  name: "LoginPage",
  components: {},
  data() {
    return {
      tab: "mails",
      visible: false,
      form: {
        USERNAME: null,
        PASSWORD: null,
      },
      isPwd: true,
      dense: false,
    };
  },
  methods: {
    onReset() {
      this.form.USERNAME = null;
      this.form.PASSWORD = null;
    },
    onSubmitAdmin() {
      this.$q.loading.show();
      this.$axios
        .post("users/login", {
          USERNAME: this.form.USERNAME,
          PASSWORD: this.form.PASSWORD,
        })
        .finally(() => this.$q.loading.hide())
        .then((res) => {
          if (!this.$parseResponse(res.data)) {
            const data = res.data.data;
            const role = res.data.data.user.ROLE;
            this.$q.localStorage.set("data", data);
            if (role === 0) {
              this.$router.push({ name: "admin" });
            } else {
              this.$q.localStorage.clear();
              this.$errorNotif("Mohon Maaf Halaman Belum Tersedia");
            }
          }
        })
        .catch((err) => this.$errorServer(err));
    },
    onSubmitPengguna() {
      this.$q.loading.show();
      this.$axios
        .post("users/login", {
          USERNAME: this.form.USERNAME,
          PASSWORD: this.form.PASSWORD,
        })
        .finally(() => this.$q.loading.hide())
        .then((res) => {
          if (!this.$parseResponse(res.data)) {
            const data = res.data.data;
            const role = res.data.data.user.ROLE;
            this.$q.localStorage.set("data", data);
            if (role === 1) {
              this.$router.push({ name: "user" });
            } else {
              this.$q.localStorage.clear();
              this.$errorNotif("Mohon Maaf Halaman Belum Tersedia");
            }
          }
        })
        .catch((err) => this.$errorServer(err));
    },
  },
};
</script>
