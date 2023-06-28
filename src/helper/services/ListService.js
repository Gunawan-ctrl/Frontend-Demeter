import { api } from "boot/axios";
import { createToken } from "boot/createToken";
import { LocalStorage } from "quasar";

const dataPengguna = LocalStorage.getItem("data");

const ListService = {
  getListKategori() {
    return api.get(`/kategori/getById/${dataPengguna.user.ID}`);
  },
  getListSatuan() {
    return api.get(`/satuan/getById/${dataPengguna.user.ID}`);
  },
};

export { ListService };
