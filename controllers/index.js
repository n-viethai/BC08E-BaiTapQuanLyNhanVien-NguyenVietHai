// lấy danh sách nhân viên từ API
staffListFromApi();
document.querySelector("#btnChinhSua").disabled = true;
function staffListFromApi() {
  var promise = axios({
    url: "http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien",
    method: "GET",
    responseType: "json",
  });
  promise.then(function (result) {
    // console.log(result.data);
    renderStaffTable(result.data);
  });
  promise.catch(function (error) {
    console.log("error", error);
  });
}
// function getDataAxios() {
//   var promise = axios({
//     url: "http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien",
//     method: "GET",
//     responseType: "json",
//   });
//   return promise
//     .then((result) => {
//       console.log(result);
//       return result.data;
//     })
//     .catch((error) => {
//       console.error(error);
//       return Promise.reject(error);
//     });
// }
// console.log(getDataAxios());

// render table từ danh sách nhân viên đã lấy từ API
function renderStaffTable(arrNhanVien) {
  var content = "";
  for (var index = 0; index < arrNhanVien.length; index++) {
    var nv = arrNhanVien[index];
    var nhanVien = new NhanVien();
    nhanVien.maNhanVien = nv.maNhanVien;
    nhanVien.tenNhanVien = nv.tenNhanVien;
    nhanVien.chucVu = nv.chucVu;
    nhanVien.heSoChucVu = nv.heSoChucVu;
    nhanVien.luongCoBan = nv.luongCoBan;
    nhanVien.soGioLamTrongThang = nv.soGioLamTrongThang;
    content += `
        <tr>
            <td>${nhanVien.maNhanVien}</td>
            <td>${nhanVien.tenNhanVien}</td>
            <td>${nhanVien.chucVu}</td>
            <td>${Number(nhanVien.luongCoBan).toLocaleString()}</td>
            <td>${nhanVien.tinhTongLuong().toLocaleString()}</td>
            <td>${nhanVien.soGioLamTrongThang}</td>
            <td>${nhanVien.xepLoaiNhanVien()}</td>
            <td><button class="btn btn-danger" onclick="xoaNhanVien('${
              nhanVien.maNhanVien
            }')">Xóa</button></td>
            <td><button class="btn btn-warning text-white" onclick="chinhSuaNhanVien('${
              nhanVien.maNhanVien
            }')">Chỉnh sửa</button></td>
        </tr>
        `;
  }
  document.querySelector("#staffTable").innerHTML = content;
}

//  thêm nhân viên từ người dùng lên server
document.querySelector("#btnThemNhanVien").onclick = function () {
  var nhanVien = new NhanVien();
  nhanVien.maNhanVien = document.querySelector("#maNhanVien").value;
  nhanVien.tenNhanVien = document.querySelector("#tenNhanVien").value;
  nhanVien.heSoChucVu = document.querySelector("#chucVu").value;
  nhanVien.luongCoBan = document.querySelector("#luongCoBan").value;
  nhanVien.soGioLamTrongThang = document.querySelector(
    "#soGioLamTrongThang"
  ).value;

  var heSoChucVuDuocChon = document.querySelector("#chucVu").options;
  var viTri = heSoChucVuDuocChon.selectedIndex;
  nhanVien.chucVu = heSoChucVuDuocChon[viTri].innerHTML;

  // validations

  var valid = true;
  var kiemTra = new Validation();
  valid &= kiemTra.kiemTraKyTu(
    nhanVien.tenNhanVien,
    "#errorSelector_tenNhanVien",
    "Tên nhân viên"
  );

  valid &= kiemTra.kiemTraSo(
    nhanVien.maNhanVien,
    "#errorSelector_maNhanVien",
    4,
    6,
    "Mã nhân viên",
    "130993"
  );

  valid &=
    kiemTra.kiemTraGiatri(
      nhanVien.luongCoBan,
      "#errorSelector_luongCoBan",
      1000000,
      20000000,
      "Lương cơ bản"
    ) &
    kiemTra.kiemTraGiatri(
      nhanVien.soGioLamTrongThang,
      "#errorSelector_soGioLamTrongThang",
      50,
      120,
      "Số giờ làm"
    );

  if (!valid) {
    return;
  }

  // console.log(arrNhanVienHienTai);

  var promise = axios({
    url: "http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien",
    method: "post",
    data: nhanVien,
  });

  promise.then(function (result) {
    console.log(result.data);
    staffListFromApi();
  });
  promise.catch(function (error) {
    console.log("error", error);
  });
};

// xóa nhân viên (done)
function xoaNhanVien(maNV) {
  var promise = axios({
    url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=${maNV}`,
    method: "DELETE",
  });
  promise.then(function (result) {
    staffListFromApi();
  });
  promise.catch(function (error) {
    console.log("error", error);
  });
}

// chỉnh sửa nhân viên

function chinhSuaNhanVien(maNV) {
  document.querySelector("#maNhanVien").disabled = true;
  document.querySelector("#btnChinhSua").disabled = false;
  document.querySelector("#btnThemNhanVien").disabled = true;
  var promise = axios({
    url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=${maNV}`,
    method: "GET",
  });

  promise.then(function (result) {
    var nhanVien = result.data;
    document.querySelector("#maNhanVien").value = nhanVien.maNhanVien;
    document.querySelector("#tenNhanVien").value = nhanVien.tenNhanVien;
    document.querySelector("#luongCoBan").value = nhanVien.luongCoBan;
    document.querySelector("#soGioLamTrongThang").value =
      nhanVien.soGioLamTrongThang;
    document.querySelector("#chucVu").value = nhanVien.heSoChucVu;
  });

  promise.catch(function (error) {
    console.log(error);
  });
}

// cập nhật thông tin lên server

document.querySelector("#btnChinhSua").onclick = function () {
  var nhanVien = new NhanVien();
  nhanVien.maNhanVien = document.querySelector("#maNhanVien").value;
  nhanVien.tenNhanVien = document.querySelector("#tenNhanVien").value;
  nhanVien.luongCoBan = document.querySelector("#luongCoBan").value;
  nhanVien.soGioLamTrongThang = document.querySelector(
    "#soGioLamTrongThang"
  ).value;
  nhanVien.heSoChucVu = document.querySelector("#chucVu").value;

  var heSoChucVuDuocChon = document.querySelector("#chucVu").options;
  var viTri = heSoChucVuDuocChon.selectedIndex;
  nhanVien.chucVu = heSoChucVuDuocChon[viTri].innerHTML;

  // validation

  var valid = true;
  var kiemTra = new Validation();
  valid &= kiemTra.kiemTraKyTu(
    nhanVien.tenNhanVien,
    "#errorSelector_tenNhanVien",
    "Tên nhân viên"
  );

  valid &= kiemTra.kiemTraSo(
    nhanVien.maNhanVien,
    "#errorSelector_maNhanVien",
    4,
    6,
    "Mã nhân viên",
    "130993"
  );

  valid &=
    kiemTra.kiemTraGiatri(
      nhanVien.luongCoBan,
      "#errorSelector_luongCoBan",
      1000000,
      20000000,
      "Lương cơ bản"
    ) &
    kiemTra.kiemTraGiatri(
      nhanVien.soGioLamTrongThang,
      "#errorSelector_soGioLamTrongThang",
      50,
      120,
      "Số giờ làm"
    );

  if (!valid) {
    return;
  }

  document.querySelector("#maNhanVien").disabled = false;
  document.querySelector("#btnThemNhanVien").disabled = false;
  document.querySelector("#btnChinhSua").disabled = true;
  var isConfirm = confirm(
    "Bạn có chắc chắn muốn thay đổi thông tin nhân viên!"
  );
  if (isConfirm === false) {
    resetInput();
    return;
  }

  // document.querySelector("#maNhanVien").disabled = false;
  // document.querySelector("#btnThemNhanVien").disabled = false;
  // document.querySelector("#btnChinhSua").disabled = false;
  var promise = axios({
    url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=${nhanVien.maNhanVien}`,
    method: "PUT",
    data: nhanVien,
  });

  promise.then(function (result) {
    staffListFromApi();
    resetInput();
  });

  promise.catch(function (error) {
    console.log(error);
  });
};

function resetInput() {
  document.querySelector("#maNhanVien").value = "";
  document.querySelector("#tenNhanVien").value = "";
  document.querySelector("#luongCoBan").value = "";
  document.querySelector("#soGioLamTrongThang").value = "";
  document.querySelector("#chucVu").value = 1;
}
