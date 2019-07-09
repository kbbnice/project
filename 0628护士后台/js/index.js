$(function () {

  // --------- 整体页面模块 -----------

  // 页面重置按钮
  $('body').on("click", "#resetBtn", function () {
    $("#modelNum").val('');
    $("#modelName").val('');
    $("#modelType>option").removeAttr('selected');
    $("#modelType>option:first-child").attr('selected', 'selected')
    $("#selectCreatTime").val('');

    // 清空bootstrap默认事件
    return false;
  })

  // 页面查询按钮： 
  $('body').on('click', '#searchBtn', function () {

    var addModelData = {};
    var modelNum = $("#modelNum");  // 模板编号
    var modelName = $('#modelName');    // 模板名称
    var modelType = $('#modelType option:selected').html(); // 分账模式
    var selectCreatTime = $('#selectCreatTime');    // 创建时间

    addModelData = {
      modelNum,
      modelName,
      modelType,
      selectCreatTime
    }

    $.ajax({

      // ajax 请求代码查询： 
      success: function (data) {

        console.log(1)
      }


    })
    return false; // 如果查询后不需要保留记录则将本语句注释。
  })

  // 重置平台计算值（通用）
  function resetPlatform(num) {
    $('.add-item-list').each(function () {
      $(this).find('td:last-child').find('.pf-qz').html(num);
      $(this).find('td:last-child').find('.pf-jz').html(num);
    })
  }


  // 默认设置： 
  function addDeptDefautSets(obj) {
    var $input = $(obj + ' td').find('input');
    // 禁用表格所有输入框
    $input.prop('disabled', true);

    // 设置为百分比：
    $(obj + ' td').find('.pct').show();
    $(obj + ' td').find('.yuan').hide();

    // 设置平台初始值
    resetPlatform(100);
  }
  addDeptDefautSets('.add-item-list');

  // 清空新增模板弹出层数据（通用）；
  function resetAddDepartModel() {
    $("#enterModelName").val("");
    $("#onProp").prop('checked', 'checked');
    $('#onMonny').removeProp('checked');
    $('.account-role label input').removeProp('checked');
    $(".add-item-list td input").val('');
    $('.add-item-list td').find('input').prop('disabled', true);
  }

  // 表格百分比输入限制100以内整数：
  checkNum("#addDepartModel .add-item-list input");

  // 禁止新增模板点击空白处关闭模态框：
  $('#addDepartModel').modal({
    backdrop: 'static',
    show: false
  })

  // 打开新增模板模态框后 
  $('#addDepartModel').on('show.bs.modal', function () {

    // 执行代码：

  })

  // 根据分账角色 选择可输入的表格数据： 
  function selectFormItem() {

    // 获取分账角色：
    var $accountRole = $('.add-account-role label');
    $accountRole.click(function () {
      var $label = $(this);
      var $index = $label.index() + 1;

      // 操作表格是否禁用
      var $td = $('.add-item-list td:nth-child(' + $index + ')');

      $td.each(function () {

        //未选中角色禁用 input
        if (!$label.children('input').eq(0).prop('checked')) {
          $(this).find('input').prop('disabled', true).val('');
        } else {

          // 打开 input 并置零
          $(this).find('input').removeProp('disabled');
          $(this).find('input').val(0).select();
        }
      })

    })
  }
  selectFormItem();

  // 输入框获取焦点选中
  $('body').on('focus', '.add-item-list input', function () {
    $(this).select();
  })

  // 监听表格变化改变平台分成：

  listenInputChange('.add-item-list');

  // 关闭新增模板弹出层时清空数据：
  $('#addDepartModel').on('hidden.bs.modal', function () {
    resetAddDepartModel();
  })

  // 点击新增模板保存按钮
  $(document).on('click', '#addDeptSaveBtn', function () {

    // 保存后执行代码
    // some code;
    addSearchItem();

    // 完成后清空模态框
    resetAddDepartModel();

    // 关闭模态框
    $('#addDepartModel').modal('hide');
  })


  // ------------详情模块 ---------------

  // 添加表格数据： (ajax 需要调用的函数)
  function addSearchItem(item) {
    // item.title       项目名称
    // item.referee     推荐人
    // item.nurse       护士
    // item.doctor      医生
    // item.saleman     业务员
    // item.org         机构F
    // item.platform    平台

    // 模拟假数据:
    var item = {
      title: 'xxxx',
      referee: 'xxxx',
      nurse: 'xxxx',
      doctor: 'xxxx',
      saleman: 'xxxx',
      org: 'xxxx',
      platform: 'xxxx'
    }

    var itemStr = `
              <tr>
                  <td class="itemTitle">${ item.title} %</td>
                  <td class="item-referee">${ item.referee}%</td>
                  <td class="item-nurse">${ item.nurse} %&nbsp;/&nbsp; ${item.nurse}%</td>
                  <td class="item-doctor">${ item.doctor}%</td>
                  <td class="item-saleman">${ item.saleman}%</td>
                  <td class="item-org">${ item.org}</td>
                  <td class="item-platform">${ item.platform}% &nbsp;/&nbsp; ${item.platform}%</td>
              </tr>
          `;
    $("#showDetail .show-item-details table>tbody").append(itemStr);
  }

  // 点击详情时渲染页面（表格、input选项、操作信息）：
  $("body").on("click", ".detailBtn", function () {
    console.log(1);
    $.ajax({

    })

    //*****  模拟ajax数据 start：*****

    var obj = {
      title: 11,
      referee: 11,
      nurse: 11,
      doctor: 11,
      saleman: 11,
      org: 11,
      platform: 12
    }
    var obj1 = {
      title: 12,
      referee: 12,
      nurse: 23,
      doctor: 12,
      saleman: 12,
      org: 21,
      platform: 11
    }
    // 
    var dataArr = [obj, obj1, obj, obj1];
    //*****  模拟ajax数据 end：*****

    // ----success时，调用start-----
    // 渲染前，移除多余表格：
    $("#showDetail .show-item-details table>tbody tr:not(:first-child)").remove();
    // 渲染详情表格：
    dataArr.forEach(item => {

      addSearchItem(item);
    });
    // ----success时，调用end -----

  })

  // 访问弹出层代码 data-toggle="modal"  data-target="#showDetail"



  // 新增模板-->新增数据：
  // var enterItemStr = `
  //     <tr class="addItemList">
  //         <td class="itemTitle">项目标价</td>
  //         <td class="item-referee"><input type="text"> %</td>
  //         <td class="item-nurse"><input type="text">%&nbsp;/&nbsp;<input type="text">%</td>
  //         <td class="item-doctor"><input type="text">%</td>
  //         <td class="item-saleman"><input type="text">%</td>
  //         <td class="item-org"><input type="text">%</td>
  //         <td class="item-platform"><span>111</span>%&nbsp;/&nbsp;<span>111</span>%</td>
  //     </tr>
  // `;


})