// lấy danh sách nhân viên từ API
staffListFromApi();
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
            <td>${nhanVien.luongCoBan}</td>
            <td>${nhanVien.tinhTongLuong()}</td>
            <td>${nhanVien.soGioLamTrongThang}</td>
            <td>${nhanVien.xepLoaiNhanVien()}</td>
            <td><button class="btn btn-danger" onclick="xoaNhanVien('${
              nhanVien.maNhanVien
            }')">Xóa</button></td>
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
    valid &= kiemTra.kiemTraKyTu(nhanVien.tenNhanVien,'#errorSelector_tenNhanVien','Tên nhân viên');

    valid &= kiemTra.kiemTraSo(nhanVien.maNhanVien,'#errorSelector_maNhanVien',4,6,'Mã nhân viên','130993');

  if(!valid){
    return;
  }

  // console.log(arrNhanVienHienTai);

  // for(var i = 0; i < arrNhanVienHienTai.length; i++){
  //   var arrNV = arrNhanVienHienTai[i];
  //   if(arrNV.maNhanVien === nhanVien.maNhanVien) {
  //     alert('Mã nhân viên đã tồn tại!');

  //     return;
  //   }
  // }

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

// function kiemTraMaNhanVien (arr) {
//   for( var index = 0; index < arr.length; index++) {
//     var NV = arr[index];

//     if()
//   }
// }
