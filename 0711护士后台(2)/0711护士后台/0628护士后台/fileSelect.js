/**
 * 
 * @param {String} inputID 选择文件的input元素
 * @param {String} imgID 展示文件的img 元素
 */
function selectFilesKbb(inputID, imgID) {


    function selectFiles() {
      var fileInput = document.getElementById('fileItem');

      // 获取文件对象
      var files = fileInput.files;
      var file = files.item(0);

      // FileReader 构造函数：
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener('loadend', function (e) {

        // 渲染图片src:
        document.getElementById('show').src = e.target.result;
      })
    }

    document.querySelector("#" + inputID).onchange = selectFiles;
  }


