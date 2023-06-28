const routes = [
  {
    path: "/",
    component: () => import("layouts/GuestLayout.vue"),
    children: [
      {
        path: "",
        name: "dashboard",
        component: () => import("src/pages/guest/IndexPage.vue"),
      },
      {
        path: "about",
        name: "about",
        component: () => import("src/pages/guest/IndexAbout.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/ProductLayout.vue"),
    children: [
      {
        path: "product",
        name: "product",
        component: () => import("src/pages/guest/IndexProduct.vue"),
      },
      {
        path: "detail",
        name: "detail",
        component: () => import("src/pages/guest/DetailProduct.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/AccessLayout.vue"),
    children: [
      {
        path: "signin",
        name: "signin",
        component: () => import("src/pages/guest/IndexSignin.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/AdminLayout.vue"),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "admin",
        name: "admin",
        component: () => import("src/pages/admin/IndexPage.vue"),
      },
      {
        path: "pengguna",
        name: "pengguna",
        component: () => import("src/pages/admin/Pengguna.vue"),
      },
      {
        path: "perangkat",
        name: "perangkat",
        component: () => import("src/pages/admin/Perangkat.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/UserLayout.vue"),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "user",
        name: "user",
        component: () => import("src/pages/user/IndexPage.vue"),
      },
      {
        path: "daftar-perangkat",
        name: "daftar-perangkat",
        component: () => import("src/pages/user/Perangkat.vue"),
      },
      {
        path: "pelanggan",
        name: "pelanggan",
        component: () => import("src/pages/user/Pelanggan.vue"),
      },
      {
        path: "pemasok",
        name: "pemasok",
        component: () => import("src/pages/user/Pemasok.vue"),
      },
      {
        path: "kategori",
        name: "kategori",
        component: () => import("src/pages/user/Kategori.vue"),
      },
      {
        path: "garansi",
        name: "garansi",
        component: () => import("src/pages/user/Garansi.vue"),
      },
      {
        path: "satuan",
        name: "satuan",
        component: () => import("src/pages/user/Satuan.vue"),
      },
      {
        path: "barang",
        name: "barang",
        component: () => import("src/pages/user/Barang.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
