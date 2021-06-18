var NhanVien = function() {
  this.maNhanVien = "";
  this.tenNhanVien = "";
  this.heSoChucVu = "";
  this.chucVu = "";
  this.luongCoBan = "";
  this.soGioLamTrongThang = "";
  this.tinhTongLuong = function () {
    return this.heSoChucVu * this.luongCoBan;
  };
  this.xepLoaiNhanVien = function () {
    if (this.soGioLamTrongThang > 120) {
      return "Nhân viên xuất sắc";
    } else if (this.soGioLamTrongThang > 100) {
      return "Nhân viên giỏi";
    } else if (this.soGioLamTrongThang > 80) {
      return "Nhân viên khá";
    } else if (this.soGioLamTrongThang > 50) {
      return "Nhân viên trung bình";
    } else {
      return "không đủ điều kiện xếp loại nhân viên";
    }
  };
};