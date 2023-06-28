<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-positive">
      <q-toolbar class="q-pt-sm">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-space />

        <div class="row q-gutter-md">
          <q-btn dense round flat icon="notifications">
            <q-badge color="amber" floating rounded transparent> 6 </q-badge>
            <q-menu>
              <q-list style="min-width: 100px">
                <messages></messages>
                <q-card class="text-center no-shadow no-border">
                  <q-btn
                    label="View All"
                    style="max-width: 120px !important"
                    flat
                    dense
                    class="text-positive"
                  ></q-btn>
                </q-card>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn
            flat
            size="md"
            icon="account_circle"
            :label="this.dataUser.user.TOKO"
          >
            <q-menu transition-show="jump-down" transition-hide="jump-up">
              <q-list style="min-width: 100px">
                <q-item clickable v-ripple>
                  <q-item-section side>
                    <q-avatar
                      rounded
                      size="48px"
                      icon="account_circle"
                      class="text-white"
                      color="indigo"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ this.dataUser.user.NAMA }}</q-item-label>
                    <q-item-label caption
                      >be
                      {{
                        this.dataUser.user.ROLE === 0 ? "admin" : "user"
                      }}</q-item-label
                    >
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label caption>12 Mei 2023</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Profile</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Setting</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable @click="logout()">
                  <q-item-section>Logout</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above>
      <q-card
        class="my-card q-ma-sm flex text-white text-subtitle2"
        style="
          height: 130px;
          background: linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.5),
              rgba(0, 0, 0, 0.5)
            ),
            url('images/banner/vegetable.jpg');
          background-repeat: no-repeat;
          background-size: cover;
        "
      >
        <q-item>
          <q-item-section avatar>
            <q-avatar size="70px" class="overlapping">
              <img src="images/icons/demeter.png" style="width: 70px" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ this.dataUser.user.NAMA }}</q-item-label>
            <q-badge color="white" class="q-mt-xs">
              <q-item-label caption class="text-positive">{{
                this.dataUser.user.TOKO
              }}</q-item-label>
            </q-badge>
          </q-item-section>
        </q-item>
      </q-card>

      <q-card class="my-card q-mx-sm q-mt-md" style="height: auto">
        <q-list>
          <q-item
            active-class="tab-active"
            exact
            class="navigation-item text-positive"
            clickable
            :to="{ name: 'user' }"
            v-ripple
          >
            <q-item-section avatar>
              <q-icon name="space_dashboard" />
            </q-item-section>
            <q-item-section> Dashboard </q-item-section>
          </q-item>

          <q-separator />

          <!-- <q-item
            active-class="tab-active"
            exact
            class="navigation-item text-positive"
            clickable
            :to="{ name: 'perangkat' }"
            v-ripple
          >
            <q-item-section avatar>
              <q-icon name="settings_suggest" />
            </q-item-section>
            <q-item-section> Perangkat </q-item-section>
          </q-item> -->

          <!-- <q-item
            active-class="tab-active"
            exact
            class="navigation-item text-positive"
            clickable
            :to="{ name: 'pengguna' }"
            v-ripple
          >
            <q-item-section avatar>
              <q-icon name="supervised_user_circle" />
            </q-item-section>
            <q-item-section> Pengguna </q-item-section>
          </q-item> -->

          <q-item
            active-class="tab-active"
            class="navigation-item text-positive"
            exact
            clickable
            :to="{ name: 'pelanggan' }"
            v-ripple
          >
            <q-item-section avatar>
              <q-icon name="person_4" />
            </q-item-section>
            <q-item-section> Pelanggan </q-item-section>
          </q-item>

          <q-item
            active-class="tab-active"
            class="navigation-item text-positive"
            exact
            clickable
            :to="{ name: 'pemasok' }"
            v-ripple
          >
            <q-item-section avatar>
              <q-icon name="local_shipping" />
            </q-item-section>
            <q-item-section> Pemasok </q-item-section>
          </q-item>

          <q-expansion-item
            class="navigation-item text-positive"
            icon="receipt_long"
            label="Produk"
          >
            <q-item
              active-class="tab-active"
              class="navigation-item text-positive"
              exact
              clickable
              :to="{ name: 'barang' }"
              v-ripple
            >
              <q-item-section avatar>
                <q-icon name="shopping_bag" />
              </q-item-section>
              <q-item-section> Barang </q-item-section>
            </q-item>
            <q-item
              active-class="tab-active"
              class="navigation-item text-positive"
              exact
              clickable
              :to="{ name: 'kategori' }"
              v-ripple
            >
              <q-item-section avatar>
                <q-icon name="ballot" />
              </q-item-section>
              <q-item-section> Kategori </q-item-section>
            </q-item>
            <q-item
              active-class="tab-active"
              class="navigation-item text-positive"
              exact
              clickable
              :to="{ name: 'garansi' }"
              v-ripple
            >
              <q-item-section avatar>
                <q-icon name="fa-solid fa-sun" />
              </q-item-section>
              <q-item-section> Garansi </q-item-section>
            </q-item>
            <q-item
              active-class="tab-active"
              class="navigation-item text-positive"
              exact
              clickable
              :to="{ name: 'satuan' }"
              v-ripple
            >
              <q-item-section avatar>
                <q-icon name="tag" />
              </q-item-section>
              <q-item-section> Satuan </q-item-section>
            </q-item>
          </q-expansion-item>

          <q-separator />

          <q-expansion-item
            class="navigation-item text-positive"
            icon="settings"
            label="Konfigurasi"
          >
            <q-item
              active-class="tab-active"
              class="navigation-item text-positive"
              exact
              clickable
              :to="{ name: 'daftar-perangkat' }"
              v-ripple
            >
              <q-item-section avatar>
                <q-icon name="settings_suggest" />
              </q-item-section>
              <q-item-section> Perangkat </q-item-section>
            </q-item>
          </q-expansion-item>
        </q-list>
      </q-card>

      <q-card
        class="my-card q-ma-sm q-mt-md flex text-positive text-subtitle2"
        style="
          height: 70px;
          background-repeat: no-repeat;
          background-size: cover;
        "
      >
        <q-item>
          <q-item-section avatar>
            <img src="images/icons/demeter.png" style="width: 30px" />
          </q-item-section>

          <q-item-section>
            <q-item-label>DEMETER</q-item-label>
            <q-item-label caption class="text-positive"
              >© Copyright 2023</q-item-label
            >
          </q-item-section>
        </q-item>
      </q-card>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
// import Messages from "./Messages.vue";

export default {
  name: "MainLayout",
  components: {
    // Messages
  },
  data() {
    return {
      leftDrawerOpen: false,
      dataUser: this.$q.localStorage.getItem("data"),
    };
  },
  created() {},
  methods: {
    logout() {
      this.$q.localStorage.clear();
      this.$router.push({ name: "signin" });
    },
  },
};
</script>
