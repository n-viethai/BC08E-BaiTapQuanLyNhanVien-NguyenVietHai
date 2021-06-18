var Validation = function () {
  this.kiemTraRong = function (value, errorSelector, name) {
    if (value === "") {
      document.querySelector(errorSelector).innerHTML =
        name + " không được bỏ trống!";
      return false;
    }
    document.querySelector(errorSelector).innerHTML = "";
    return true;
  };

  this.kiemTraDoDai = function (value, errorSelector, min, max, name) {
    if (value.length >= min && value.length <= max) {
      document.querySelector(errorSelector).innerHTML = "";
      return true;
    }
    document.querySelector(errorSelector).innerHTML =
      name + ` từ ${min} đến ${max} chữ số!`;
    return false;
  };

  this.kiemTraKyTu = function (value, errorSelector, name) {
    var regexAllLetter =
      /^[a-z A-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/;
    if(value === '') {
      document.querySelector(errorSelector).innerHTML = `
      ${name} không được bỏ trống! </br> Chỉ bao gồm ký tự và không chứa các ký tự đặc biệt!
      `;
      return false;
    }
    if (regexAllLetter.test(value)) {
      document.querySelector(errorSelector).innerHTML = "";
      return true;
    }
    document.querySelector(errorSelector).innerHTML = `
    ${name} chỉ bao gồm ký tự và không chứa các ký tự đặc biệt!
    `;
    return false;
  };

  this.kiemTraSo = function (value, errorSelector,min,max,name,example) {
      var regexAllNumber = /^[0-9]+$/;
      if(value === '') {
        document.querySelector(errorSelector).innerHTML = `
          ${name} không được bỏ trống! <br> Phải từ ${min} đến ${max} chữ số, không chứa ký tự. Ví dụ : ${example}
          `;
          return false;
      }
      if(value.length < min || value.length > max || !regexAllNumber.test(value)) {
          document.querySelector(errorSelector).innerHTML = `
          ${name} phải từ ${min} đến ${max} chữ số. Ví dụ : ${example}
          `;
          return false;
        };
        document.querySelector(errorSelector).innerHTML = '';
        return true;

  }
  this.kiemTraGiatri = function (value,errorSelector,min,max,name) {
   var regexAllNumber = /^[0-9]+$/;
   if(value === '') {
    document.querySelector(errorSelector).innerHTML = `
    ${name} không được bỏ trống! <br> 
    Nhập số có giá trị nằm trong khoảng từ ${min.toLocaleString()} đến ${max.toLocaleString()}
    `;
    return false;
   }
   if(value < min || value > max || !regexAllNumber.test(value)) {
     document.querySelector(errorSelector).innerHTML = `
     Nhập số có giá trị nằm trong khoảng từ ${min.toLocaleString()} đến ${max.toLocaleString()}
     `;
     return false;
   }
   document.querySelector(errorSelector).innerHTML = '';
   return true;
  }
};