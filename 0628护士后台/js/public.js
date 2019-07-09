
  // 页面 table 最小高度: 
function resizeSets() {
    var $winH = $(window).height();
    if ($winH > $('body').height()) {
      $tableH = $winH - $('.head').height() - $('.footer').height() - 150;
      $('.form-part').css('minHeight', $tableH);
    }
  }
  resizeSets();

  // 改变窗口大小自适应
  $(window).resize(function () {
    resizeSets();
  })

/**
   * 检查输入数据是否为100以内整数：
   * @param Object obj 传入标签
   */
  function checkNum(obj) {
    function changeNum() {
      var fval = $(this).val();
      var reg = /[^0-9]+/;
      $(this).val(fval.replace(reg, ''));
      $(this).attr({
        "max": "100",
        "maxlength": "3"
      });

      // 超出100 默认100，并选中；
      if (parseInt($(this).val()) > 100) {
        $(this).val(100).select();
      }
      if ($(this).val() == '') {
        $(this).val(0).select();
      }
    }
    $(obj).bind("input propertychange", changeNum);
  }


// 监听表格变化改变平台分成：
function listenInputChange(obj) {
  $(obj + ' input').bind("input propertychange", function () {

      // var valuelist = $(this).parents('.add-item-list').find('input').val()
      var valuelist = $(this).parents(obj).find('input');
      var total = 0;
      var totalQz = 0;
      var totalJz = 0;
      var $nurseJz = parseInt($(this).parents(obj).find('.nurse-jz').val()) || 0;
      var $nurseQz = parseInt($(this).parents(obj).find('.nurse-qz').val()) || 0;
      var $itemOther = $(this).parents(obj).find('.item-other input');

      console.log($itemOther);
      $itemOther.each(function () {

          // 分别计算全、兼职的结果值：                     
          if ($(this).val()) {
              total += parseInt($(this).val());
          }
      })

      totalQz = $nurseQz + total;
      totaljz = $nurseJz + total;
      console.log(totalQz);
      $(this).parent().siblings('.item-platform').children('.pf-qz').text(100 - totalQz);
      $(this).parent().siblings('.item-platform').children('.pf-jz').text(100 - totalJz);
  })
}

