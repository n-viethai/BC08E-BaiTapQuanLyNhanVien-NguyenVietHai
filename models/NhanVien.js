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
    if (this.soGioLamTrongThang <= 80) {
      return "nhân viên yếu";
    } else if (this.soGioLamTrongThang > 80 && this.soGioLamTrongThang <= 100) {
      return "nhân viên kém";
    } else if (this.soGioLamTrongThang > 100 && this.soGioLamTrongThang <= 120) {
      return "nhân viên khá";
    } else if (this.soGioLamTrongThang > 120 && this.soGioLamTrongThang <= 150) {
      return "nhân viên giỏi";
    } else if (this.soGioLamTrongThang > 150) {
      return "nhân viên xuất sắc";
    } else {
      return "không đủ điều kiện xếp loại nhân viên";
    }
  };
};