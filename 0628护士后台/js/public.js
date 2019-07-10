

// 页面基本设置

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

//-------------------------我是一条正经的分割线-----------------------------


//   可复用函数:

/**
   * 检查输入数据是否为100以内整数：
   * @param Object obj 传入标签
   */
function checkNum(obj, max, maxlength) {
    function changeNum() {
        var fval = $(this).val();
        var reg = /[^0-9]+/;
        $(this).val(fval.replace(reg, ''));
        $(this).attr({
            "max": max,
            "maxlength": maxlength
        });

        // 超出100 默认100，并选中；
        // if (parseInt($(this).val()) > 100) {
        //     $(this).val(100).select();
        // } else if (parseInt($(this).val()) < 0) {
        //     $(this).val(0).select();
        // }
        // if ($(this).val() == '') {
        //     $(this).val(0).select();
        // }
    }
    $(obj).bind("input propertychange", changeNum);
}


// 

/**
 * 
 * @param {String} obj 需要监听变化的表格,(监听表格变化改变平台分成)
 */
function listenInputChange(obj) {
    $(obj + ' input').bind("input propertychange", function () {

        var valuelist = $(this).parents(obj).find('input');
        var total = 0;
        var totalQz = 0;
        var totalJz = 0;
        var otherTotal = 0;

        // 护士全职/兼职比例
        var $nurseJzVal = parseInt($(this).parents(obj).find('.nurse-jz').val()) || 0;
        var $nurseQzVal = parseInt($(this).parents(obj).find('.nurse-qz').val()) || 0;
        var $itemOther = $(this).parents(obj).find('.item-other input');

        console.log($(this).val());
        $itemOther.each(function () {

            // 计算其他总和                     
            if ($(this).val()) {
                console.log($(this).parent().attr('class'));
                otherTotal += parseInt($(this).val());
            }
        })

        // 如果当前总为非全/兼职 的input
        if ($(this).parent().hasClass('item-other')) {
            otherTotal -= parseInt($(this).val());

            // 分别求非this的全/兼职总和
            totalQz = parseInt($nurseQzVal) + otherTotal;
            totalJz = parseInt($nurseJzVal) + otherTotal;

            if (totalQz + parseInt($(this).val()) > 100 || totalJz + parseInt($(this).val()) > 100) {
                if (totalQz >= totalJz) {
                    $(this).val(100 - totalQz).select();
                } else {
                    $(this).val(100 - totalJz).select();
                }
            }

            // 最终全职/兼职总价
            totalQz = parseInt($nurseQzVal) + otherTotal + parseInt($(this).val());
            totalJz = parseInt($nurseJzVal) + otherTotal + parseInt($(this).val());

        }

        var intVal = parseInt($(this).val());
        // var intSibVal = parseInt($(this).siblings().val());


        // 如果当前在护士框输入
        if ($(this).parent().hasClass('item-nurse')) {

            console.log($(this).siblings('input').val());
            if (intVal + otherTotal > 100) {
                $(this).val(100 - otherTotal).select();
            }
        }

        totalQz = parseInt($(this).parents(obj).find('.nurse-jz').val()) + otherTotal;
        totalJz = parseInt($(this).parents(obj).find('.nurse-qz').val()) + otherTotal;

        // 平台分成: 
        $(this).parent().siblings('.item-platform').children('.pf-qz').html(100 - totalQz);
        $(this).parent().siblings('.item-platform').children('.pf-jz').html(100 - totalJz);
    })
}

// 
/**
 * 
 * @param {String} obj dom 元素对象
 * @param {Number} num 平台初始值,重置平台计算值（通用）
 */
function resetPlatform(obj, num) {
    $(obj).each(function () {
        $(this).find('td:last-child').find('.pf-qz').html(num);
        $(this).find('td:last-child').find('.pf-jz').html(num);
    })
}

// 恢复默认设置
/**
 * 
 * @param {String} obj 需要恢复默认设置的对象,
 */
function addDeptDefautSets(obj) {
    var $input = $(obj + ' td').find('input');
    // 禁用表格所有输入框
    $input.prop('disabled', true);

    // 设置为百分比：
    $(obj + ' td').find('.pct').show();
    $(obj + ' td').find('.yuan').hide();

    // 设置平台初始值
    resetPlatform(obj, 100);
}

// 渲染表格页面数据
/**
     * 
     * @param {Object} data ajax返回的数据, 添加页面表格数据
     */
function addPageTableData(data) {

    // 数据模板
    var dataStr = `
          <tr class="page-table-list">
              <td>${ data.modelNum}</td>
              <td>${ data.modelName}</td>
              <td>${ data.accountType}</td>
              <td>${ data.relatedTimes}</td>
              <td>${ data.selectCreatTime}</td>
              <td class="table-btns">
                  <span class="blue-btn detailBtn" data-toggle="modal" data-target="#showDetail">详情</span>
  
                  <span class="kbb-color-eb"> | </span>
                  <span class="blue-btn editBtn">编辑</span>
  
                  <span class="kbb-color-eb"> | </span>
                  <span class="blue-btn delBtn">删除</span>
              </td>
          </tr> 
        `;

    $('.page-table>tbody').append(dataStr);
}

//-------------------------我是一条正经的分割线-------测试 start -------测试代码为参数示例 请自己修改---------------

// 模拟需要添加到页面表格的数据, 
var addModelDataResult = {
    modelNum: 'xxx',        // 模板编号
    modelName: 'xxx',       // 模板名称
    accountType: 'xxx',       // 分账类型
    relatedTimes: 'xxx',    // 关联次数
    selectCreatTime: 'xxx'  // 创建时间
}
      //-------------------------我是一条正经的分割线-------测试 end ------------------------
