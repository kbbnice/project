$(function () {

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




  //-------------------------我是一条正经的分割线----------------------------
  // 渲染页面所有表格的初始模板：
  var tableTitle = {
    1: '项目金额',
    2: '预约券价值',
    3: '交通费',
    4: '特殊时段费',
    5: '耗材包',
    7: '其他费用',
    8: '过岛费',
    9: '快递费',
    10: '超时费',
    11: '静脉采血'
  };


  function addTableItemList(itemTitle) {
    var addPropTableStr = `
          <tr class="add-item-list">
            <td class="item-title">${ itemTitle}</td>
            <td class="item-referee item-other">
                <input type="text">
                <span class="pct">%</span>
            </td>
            <td class="item-nurse">
                <input class="nurse-qz" type="text">
                <span class="pct">%</span>
                /
                <input class="nurse-jz" type="text">
                <span class="pct">%</span>
            </td>
            <td class="item-cons-doc item-other">
                <input type="text">
                <span class="pct">%</span>
            </td>
            <td class="item-ref-doc item-other">
                <input type="text">
                <span class="pct">%</span>
            </td>
            <td class="item-saleman item-other">
                <input type="text">
                <span class="pct">%</span>
            </td>
            <td class="item-org item-other">
                <input type="text">
                <span class="pct">%</span>
            </td>
            <td class="item-platform">
                <span class="pf-qz">30</span>
                <span class="pct">%</span>
                &nbsp;/&nbsp;
                <span class='pf-jz'>30</span>
                <span class="pct">%</span>
            </td>
          </tr>
          `;





    $("#addDepartModel .add-item-details #propTable>tbody").append(addPropTableStr);
  }

  for (item in tableTitle) {
    addTableItemList(tableTitle[item]);
  }

  // 渲染按金额分账的表格：
  function addMoneyItemList() {
    var addMoneyTableStr = `
    <tr class="add-item-list">
    <td class="item-title">分账金额</td>
    <td class="item-referee item-other">
    <input type="text">
    <span class="pct">元</span>
    </td>
    <td class="item-nurse">
    <input class="nurse-qz" type="text">
    <span class="pct">元</span>
    /
    <input class="nurse-jz" type="text">
    <span class="pct">元</span>
    </td>
    <td class="item-cons-doc item-other"><input type="text"><span
    class="pct">元</span></td>
    <td class="item-ref-doc item-other">
    <input type="text">
    <span class="pct">元</span>
    </td>
    <td class="item-saleman item-other">
    <input type="text">
    <span class="pct">元</span>
    </td>
    <td class="item-org item-other">
    <input type="text">
    <span class="pct">元</span>
    </td>
    </tr>
    `;
    $("#addDepartModel .add-item-details #moneyTable>tbody").append(addMoneyTableStr);
  }
  addMoneyItemList();


  // 渲染详情页面

  var itemstest = {
    title: '11',
    referee: '11',
    nurse: '11',
    consDoc: '11',
    refDoc: '11',
    saleman: '11',
    org: '11',
    platform: '11'
  }
  function showDetailItemList(itemTitle, item) {


    var showTableStr = `
    <tr class="show-item-list">
      <td class="itemTitle">${ itemTitle}</td>
      <td class="item-referee">${ item.referee}%</td>
      <td class="item-nurse">${ item.nurse} %&nbsp;/&nbsp; ${item.nurse}%</td>
      <td class="item-cons-doc">${ item.consDoc}%</td>
      <td class="item-ref-doc">${ item.refDoc}%</td>
      <td class="item-saleman">${ item.saleman}%</td>
      <td class="item-org">${ item.org}</td>
      <td class="item-platform">${ item.platform}% &nbsp;/&nbsp; ${item.platform}%</td>
    </tr>

    `;

    $("#showDetail .show-item-details #showTable>tbody").append(showTableStr);
  }
  for (item in tableTitle) {
    showDetailItemList(tableTitle[item], itemstest);
  }
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

  // 加载时就设置弹出层的input value值为零
  function setInputZero() {
    $('#propTable input').attr('value', 0);
    $('#moneyTable input').attr('value', 0);
  }
  setInputZero();



  // --------- 整体页面模块 -----------

  // 页面重置按钮
  $('body').on("click", "#resetBtn", function () {
    $("#modelNum").val('');
    $("#modelName").val('');
    $("#accountType>option").removeAttr('selected');
    $("#accountType>option:first-child").attr('selected', 'selected')
    $("#selectCreatTime").val('');

    // 清空bootstrap默认事件
    return false;
  })

  // 页面查询按钮： 
  $('body').on('click', '#searchBtn', function () {

    var addModelData = {};
    var modelNum = $("#modelNum");  // 模板编号
    var modelName = $('#modelName');    // 模板名称
    var accountType = $('#accountType option:selected').html(); // 分账模式
    var selectCreatTime = $('#selectCreatTime');    // 创建时间

    addModelData = {
      modelNum,
      modelName,
      accountType,
      selectCreatTime
    }

    $.ajax({

      // ajax 请求代码查询： 
      success: function (data) {


      }

      // 渲染页面表格
    })

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

    // 渲染页面表格数据
    addPageTableData(addModelDataResult);

    return false; // 如果查询后不需要保留记录则将本语句注释。
  })

  //-------------------------我是一条正经的分割线------ <新增木块弹出层  之   按比例>------------------------


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


  // 新增模板弹出层默认设置
  addDeptDefautSets('.add-item-list');

  // 清空新增模板弹出层数据（通用）；
  function resetAddDeptModel(obj) {
    $("#enterModelName").val("");
    $("#onProp").prop('checked', 'checked');
    $('#onMoney').removeProp('checked');
    $(obj + ' .add-account-role label input').removeProp('checked');
    $(obj + ' td input').val(0).prop('disabled', true);

    // 如果出bug了 将prop重新添加到下面这行后面就行了
    // $(obj+' td').find('input')

  }

  //------------我是一条正经的分割线------ <新增木块弹出层  之   按比例>-------------



  // 按比例分成中 input 表格百分比输入限制100以内整数：
  checkNum("#addDepartModel #propTable .add-item-list input", 100, 3);

  // 禁止新增模板点击空白处关闭模态框：
  $('#addDepartModel').modal({
    backdrop: 'static',
    show: false
  })

  // 打开新增模板模态框后 
  $('#addDepartModel').on('show.bs.modal', function () {

    // 执行代码：

  })

  // 选择 按比例-金额  切换表格
  function SelectAccountTyle() {

    // 获取分账类型
    var accountType = $('#addDepartModel .radio-inline');
    $('body').on('click', accountType, function () {

      if ($('#onProp').prop('checked')) {
        $('#propTable').removeClass('hide').addClass('show');
        $('#moneyTable').removeClass('show').addClass('hide');
      } else if ($('#onMoney').prop('checked')) {
        $('#moneyTable').removeClass('hide').addClass('show');
        $('#propTable').removeClass('show').addClass('hide');
      } else {
        console.log('蛤!!!!??!!&)&&*))^&?出bug了?????');
      }
    })
  }
  SelectAccountTyle();

  function checkboxChangeEvent() {
    var $accountRole = $('.add-account-role label');


  }

  // 根据分账角色 选择可输入的表格数据 
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
          $(this).find('input').prop('disabled', true).val(0);

          var otherTotal = 0;
          var $nurseJzVal = parseInt($(this).parent().find('.nurse-jz').val()) || 0;
          var $nurseQzVal = parseInt($(this).parent().find('.nurse-qz').val()) || 0;
          var $itemOther = $(this).parent().find('.item-other input');
          // console.log($nurseJzVal);
          $itemOther.each(function () {
            // 计算其他总和                     
            if ($(this).val()) {
              otherTotal += parseInt($(this).val());
            }
          })
          // console.log(otherTotal);
          $(this).parent().find('.pf-qz').html(100 - (otherTotal + $nurseQzVal));
          $(this).parent().find('.pf-jz').html(100 - (otherTotal + $nurseJzVal));
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

      // 如果为空, 则变为零：
      valuelist.each(function () {
        if ($(this).val() === '') {
          $(this).val(0);
        }
      })

      // 护士全职/兼职比例
      var $nurseJzVal = parseInt($(this).parents(obj).find('.nurse-jz').val()) || 0;
      var $nurseQzVal = parseInt($(this).parents(obj).find('.nurse-qz').val()) || 0;
      var $itemOther = $(this).parents(obj).find('.item-other input');

      $itemOther.each(function () {

        // 计算其他总和                     
        if ($(this).val()) {
          otherTotal += parseInt($(this).val());
        }
      })

      // 如果当前总为非全/兼职 的input
      if ($(this).parent().hasClass('item-other')) {
        var thisVal = parseInt($(this).val()) || 0;

        otherTotal -= thisVal;

        // 分别求非this的全/兼职总和
        totalQz = parseInt($nurseQzVal) + otherTotal;
        totalJz = parseInt($nurseJzVal) + otherTotal;

        if (totalQz + thisVal > 100 || totalJz + thisVal > 100) {
          if (totalQz >= totalJz) {
            $(this).val(100 - totalQz).select();
          } else {
            $(this).val(100 - totalJz).select();
          }
          totalQz = (totalQz + thisVal > 100 ? 100 : (totalQz + thisVal));
          totalJz = (totalJz + thisVal > 100 ? 100 : (totalJz + thisVal));
        } else {
          totalQz = totalQz + thisVal;
          totalJz = totalJz + thisVal;
        }

      } else if ($(this).parent().hasClass('item-nurse')) {
        totalQz = otherTotal + $nurseQzVal;
        totalJz = otherTotal + $nurseJzVal;
        //当前为全职
        if ($(this).hasClass('nurse-qz')) {
          // console.log($nurseQzVal);
          if (totalQz > 100) {
            $(this).val(100 - otherTotal);
            totalQz = 100;
          }
        } else {
          if (totalJz > 100) {
            $(this).val(100 - otherTotal);
            totalJz = 100;
          }
        }
      }

      // var intVal = parseInt($(this).val());
      // var intSibVal = parseInt($(this).siblings().val());

      // totalQz = parseInt($(this).parents(obj).find('.nurse-jz').val()) + otherTotal;
      // totalJz = parseInt($(this).parents(obj).find('.nurse-qz').val()) + otherTotal;

      // 平台分成: 
      $(this).parent().siblings('.item-platform').children('.pf-qz').html(100 - totalQz);
      $(this).parent().siblings('.item-platform').children('.pf-jz').html(100 - totalJz);
    })
  }


  // 监听表格变化改变平台分成：
  listenInputChange('#propTable .add-item-list');


  // 点击新增模板保存按钮





  $(document).on('click', '#addDeptSaveBtn', function () {

    //  /-------------------------------------------------------------------------
    //  /-------------------------------------------------------------------------

    //  /-------------------------------------------------------------------------
    //  /-------------------------------------------------------------------------

    // 保存后执行代码
    // some code;
    // setAddDeptItem();      // 调用 setAddDeptItem 函数渲染数据

    // ====================================================================================


    // 各个数字对应的列表:
    // 1: '项目金额',
    // 2: '预约券价值',
    // 3: '交通费',
    // 4: '特殊时段费',
    // 5: '耗材包',
    // 7: '其他费用',
    // 8: '过岛费',
    // 9: '快递费',
    // 10: '超时费',
    // 11: '静脉采血'

    // function addPropData() {

    //   var refereeOrder = {};

    //   // 项目列表
    //   var orderArr = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11];

    //   // 分账角色列表
    //   // var labelItem = ['推荐人','全职护士', '兼职护士','咨询医生', '推荐医生','业务员','机构']
    //   var labelOrder = [1, 2, 3, 4, 5, 6, 7];

    //   // 定义传参对象:
    //   var addData = {};
    //   var dataTr = $('#propTable .add-item-list');
    //   dataTr.each(function () {
    //     for (var i = 0; i < labelOrder.length; i++) {
    //       addData[labelOrder[i]] = {};
    //       for (var j = 0; j < orderArr.length; j++) {
    //         addData[labelOrder[i]][orderArr[j]] = $(this).find('input').eq(i).val();
    //       }
    //     }
    //   })

    //   $.ajax({

    //     // 用addData处理:
    //   })
    // }

    // 金额数据提交:
    function addTableData(obj, callback) {

      var refereeOrder = {};

      // 项目列表
      var orderArr = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11];

      // 分账角色列表
      // var labelItem = ['推荐人','全职护士', '兼职护士','咨询医生', '推荐医生','业务员','机构']
      var labelOrder = [1, 2, 3, 4, 5, 6, 7];

      // 定义传参对象:
      var addData = {};
      // var dataTr = $(obj + ' .add-item-list');
      var dataTr = $('#propTable .add-item-list');
      for (var j = 0; j < labelOrder.length; j++) {
        addData[labelOrder[j]] = {};

        for (var i = 0; i < orderArr.length; i++) {

          addData[labelOrder[j]][orderArr[i]] = dataTr.eq(i).find('input').eq(j).val();
        }
      }
      // dataTr.each(function () {
      //   // for (var i = 0; i < labelOrder.length; i++) {
      //     // addData[labelOrder[i]] = {};
      //     for (var j = 0; j < orderArr.length; j++) {
      //       // var aaa = $(this).find('input').eq(i)
      //       console.log(parseInt($(this).find('input').eq(i).val()));
      //       addData[labelOrder[i]][orderArr[j]] = parseInt($(this).find('input').eq(i).val());
      //     }
      //   }
      // }
      // )

      console.log(addData);
      // console.log(addData);
      callback();

    }

    // 
    // addTableData('#propTable', function () {
    //   console.log(1)
    //   // addData分情况处理:

    //   $.ajax({


    //   })
    // });
    addTableData('#moneyTable', function () {
      // addData分情况处理:

      $.ajax({


      })
    });
    // ====================================================================================

    setAddDeptItem();

    // 完成后清空模态框
    resetAddDeptModel('#addDepartModel');

    // 关闭模态框
    $('#addDepartModel').modal('hide');
  })

  // 关闭新增模板弹出层时清空数据：
  // $('#addDepartModel').on('hidden.bs.modal', function () {
  //   resetAddDeptModel('#addDepartModel');
  // })

  // 添加表格数据： (ajax 需要调用的函数)
  /**
   * 
   * @param {String} obj 获取填入表格数据,传到后端,并返回新数据,渲染到页面
   */
  function setAddDeptItem() {
    // item.title       项目名称
    // item.referee     推荐人
    // item.nurse       护士
    // item.consDoc      咨询医生
    // item.refDoc      推荐医生
    // item.saleman     业务员
    // item.org         机构F
    // item.platform    平台

    // 模拟 传给后端data 假数据:
    var addModalData = {
      title: 'xxxx',
      referee: 'xxxx',
      nurse: 'xxxx',
      consDoc: 'xxxx',
      refDoc: 'xxxx',
      saleman: 'xxxx',
      org: 'xxxx',
      platform: 'xxxx'
    }

    $.ajax({

      // ajax代码:
      data: addModalData

    })


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


    // ajax 请求成功后代码:(放入success)
    // addPageTableData(addModelDataResult);

  }

  //-----------我是一条正经的分割线------ <新增木块弹出层  之   按金额>--------------

  // 按金额分成中 input 表格百分比输入限制10000以内整数：
  /**
   * checkNum(obj, max, maxlength)
   * 10000 
   */
  checkNum("#addDepartModel #moneyTable .add-item-list input", 10000, 5);

  // 设置输入框默认val() 为0;
  $('#moneyTable .add-item-list input').val(0);

  // 计算表格input总金额:
  function countMoneyTotal() {

    // 获取表格每一行
    var $moneyPerItem = $('#moneyTable').find('.add-item-list');

    // 护士全职/兼职值
    var $moneyPerItemQzVal = parseInt($moneyPerItem.find('.nurse-qz').val());
    var $moneyPerItemJzVal = parseInt($moneyPerItem.find('.nurse-jz').val());


    // 除了护士每行总金额
    var $moneyOtherVal = 0;

    // 护士金额对象:
    var nurseType = {};
    // 最后结果的数据
    var moneyArr = [];

    // 每一行总额计算
    $moneyPerItem.each(function () {

      // 除了护士的每个项目
      var $moneyPerItemOther = $(this).find('.item-other');

      // 除了护士的每行总额计算
      $moneyPerItemOther.each(function () {
        $moneyOtherVal += parseInt($(this).find('input').val());
      })

      // 加上护士全职/兼职金额
      $moneyQzVal = $moneyPerItemQzVal + $moneyOtherVal;
      $moneyJzVal = $moneyPerItemJzVal + $moneyOtherVal;

      // 取得金额数据数组
      nurseType = { $moneyQzVal, $moneyJzVal }
      moneyArr.push(nurseType);
    })

  }
  countMoneyTotal();

  $('#moneyTable .add-item-list input').bind("input propertychange", function () {
    countMoneyTotal();
  })


  // -------------------------------超级----华丽丽的分割线------------编辑模块-----------------------------------
  // {
  //   isMoney:1,
  //   name:'',
  //   items:[
  //     {
  //       item:1,
  //       roles:[
  //         {
  //           role:1,
  //           point_servants_proportion:36
  //         }
  //       ]
  //     }
  //   ]
  // }

  // function editTableList() {





  // }

  $('body').on('click', '.editBtn', function () {

    var data = {
      isMoney: 1,
      name: '',
      items: [
        {
          item: 4,
          roles: [
            {
              role: 2,
              point_servants_proportion: 3
            },
            {
              role: 4,
              point_servants_proportion: 3
            },
            {
              role: 5,
              point_servants_proportion: 3
            },
          ]
        },
        {
          item: 3,
          roles: [
            {
              role: 4,
              point_servants_proportion: 3
            },
            {
              role: 2,
              point_servants_proportion: 3
            },
            {
              role: 6,
              point_servants_proportion: 3
            },
          ]
        },
        {
          item: 3,
          roles: [
            {
              role: 1,
              point_servants_proportion: 3
            },
            {
              role: 2,
              point_servants_proportion: 3
            },
            {
              role: 4,
              point_servants_proportion: 3
            },
          ]
        }
      ]
    }
    
    
    
    
    // 根据input是否有数据打开label 和input；
    function openRolesLabel(obj, item) {
      if (item.hasClass('item-referee')) {
        $(obj + ' .checkReferee').prop('checked', 'checked');
        $(obj + ' .add-item-list .item-referee').find('input').removeProp('disabled');
      } else if (item.hasClass('item-nurse')) {
        $(obj + ' .checkNurse').prop('checked', 'checked');
        $(obj + ' .add-item-list .item-nurse').find('input').removeProp('disabled');
      } else if (item.hasClass('item-cons-doc')) {
        $(obj + ' .checkConsDoc').prop('checked', 'checked');
        $(obj + ' .add-item-list .item-cons-doc').find('input').removeProp('disabled');
      } else if (item.hasClass('item-ref-doc')) {
        $(obj + ' .checkRefDoc').prop('checked', 'checked');
        $(obj + ' .add-item-list .item-ref-doc').find('input').removeProp('disabled');
      } else if (item.hasClass('item-saleman')) {
        $(obj + ' .checkSaleman').prop('checked', 'checked');
        $(obj + ' .add-item-list .item-saleman').find('input').removeProp('disabled');
      } else if (item.hasClass('item-org')) {
        $(obj + ' .checkOrg').prop('checked', 'checked');
        $(obj + ' .add-item-list .item-org').find('input').removeProp('disabled');
      }
    }
    
    $('#addDepartModel').modal('show');
    
    var itemArr = [1, 3, 4, 5, 7, 8, 9, 10, 11];
    var roleArr = [1, 2, 6, 3, 7, 4, 5];
    if (data.isMoney == 0) {
      // 展示分账表格：
      $("#onProp").prop('checked', 'checked');
      $('#onMoney').removeProp('checked');
      
      // 判断输入数据渲染表格input：
      data.items.forEach(item => {
        // console.log(item.item);
        itemArr.forEach((arrItem, i) => {
          if (itemArr[i] === item.item) {

            // 得到索引值， 去渲染对应.add-item-list的input.
            var addInput = $('#propTable .add-item-list').eq(i).find('input');

            // console.log(addInput);

            // 判断有哪几个角色并打开label,解禁input,填充数据：
            // console.log(item.roles);
            item.roles.forEach(roles => {

              // console.log(roles);
              roleArr.forEach((roleItem, j) => {

                // 判断角色对应input的位置：
                if (roleArr[j] == roles.role) {

                  // 给input解锁
                  var addInputParent = addInput.eq(j).parent();

                  // 调用打开label解锁 input函数
                  openRolesLabel('#addDepartModel', addInputParent);

                  // 渲染数据
                  addInput.eq(j).val(roles.point_servants_proportion);
                  // console.log(addInput.eq(j));

                }
              })
            })
          }
        })
      })

      // 计算平台总金额：

      // 求和；

      // 渲染平台结果：

      // 全职：
      $('.add-item-list .item-platform .pf-qz').html(function () {
        var pfSbInput = $(this).parent('td').siblings().find('input');
        var qzsum = 0;
        pfSbInput.each(function () {
          if (!$(this).hasClass('nurse-jz')) {
            qzsum += parseInt($(this).val());
          }
        })
        return 100 - qzsum;
      });

      // 兼职：
      $('.add-item-list .item-platform .pf-jz').html(function () {
        var pfSbInput = $(this).parent('td').siblings().find('input');
        var jzsum = 0;
        pfSbInput.each(function () {
          if (!$(this).hasClass('nurse-qz')) {
            jzsum += parseInt($(this).val());
          }
        })
        return 100 - jzsum;
      });
    } 
    
    var data22 = {
      isMoney: 1,
      item: [
        {
          roles: [
            {
              role: 1,
              point_servants_proportion: 3
            },
            {
              role: 3,
              point_servants_proportion: 3
            },
            {
              role: 5,
              point_servants_proportion: 3
            }
          ]
        }
      ]
    }

    if(data22.isMoney == 1){
      // console.log(1111)

      // 按照金额分成
      $("#onMoney").prop('checked', 'checked');
      $('#onProp').removeProp('checked');

      //遍历item的roles:
      data22.item[0].roles.forEach(moneyItem => {
        var addInputMoney = $('#moneyTable .add-item-list').eq(0).find('input');
        // console.log(moneyItem.role);
        roleArr.forEach((element, ii) => {
          if(roleArr[ii] == moneyItem.role){

            // 如果符合匹配input对应disabled关闭
            var addInputMoneyParent = addInputMoney.eq(ii).parent();
            console.log(addInputMoneyParent)

            openRolesLabel('#addDepartModel', addInputMoneyParent);
            addInputMoney.eq(ii).val(moneyItem.point_servants_proportion);
          }
        })
      }) 

      // 
    }




  })




  // -------------------------------超级----华丽丽的分割线------------详情模块-----------------------------------


  //***************************************************************************************
  //                                                                                      *
  //                      **                   **                                         *       
  //                     * o*                 * o*                                        *
  //                      **                   **                                         *
  //                                                                                      *
  //                                 ^                         孜然是猪                    *
  //                                                                                      *
  //                                 v                                                    *
  //                                                                                      *
  //     I have a small nose and bling bling eyes. Look, my eyes is shining!              *
  //                       孜然是一头blingbling 的大蠢猪                                    *
  //***************************************************************************************


  function addSearchItem(item) {


    $.ajax({

      // ajax代码:
      // data: addModalData

    })

    // 往表格里渲染数据： 
    /**
     * 1. 获取所有一列的input ，渲染对应数据：
     * 
     */

  }
  // 点击详情时渲染页面（表格、input选项、操作信息）：
  $("body").on("click", ".detailBtn", function () {

    $.ajax({

      // 其中, 
      /**
       * 1. 按比例/按金额显示, 用 id = DetailTypePct(比例) 或者 id = DetailTypeMoney 的 class = 'hide' 来控制.
       * 2. 详情页打开之前,会默认清空原来的表格数据, 直接按照下方 addSearchItem(item) 函数渲染数据即可.
       * 3. 
       */


    })

    // 渲染前，移除多余表格：
    $("#showDetail .show-item-details .show-item-list").remove();


    // obj.data.roles.each(function(){
    //   // roles[]
    // })
    // {
    //   isMoney:1,
    //   name:'',
    //   items:[
    //     {
    //       item:1,
    //       roles:[
    //         {
    //           role:1,
    //           point_servants_proportion:36
    //         }
    //       ]
    //     }
    //   ]
    // }
    // var datas = {
    //   isMoney: 1,
    //   name: '',
    //   items: [
    //     {
    //       item: 1,
    //       roles: [
    //         {
    //           role: 1,
    //           point_servants_proportion: 36
    //         },
    //         {
    //           role: 2,
    //           point_servants_proportion: 36
    //         },
    //         {
    //           role: 3,
    //           point_servants_proportion: 36
    //         }
    //       ]
    //     },
    //     {
    //       item: 2,
    //       roles: [
    //         {
    //           role: 1,
    //           point_servants_proportion: 36
    //         },
    //         {
    //           role: 2,
    //           point_servants_proportion: 36
    //         },
    //         {
    //           role: 3,
    //           point_servants_proportion: 36
    //         }
    //       ]
    //     },
    //     {
    //       item: 3,
    //       roles: [
    //         {
    //           role: 1,
    //           point_servants_proportion: 36
    //         },
    //         {
    //           role: 2,
    //           point_servants_proportion: 36
    //         },
    //         {
    //           role: 3,
    //           point_servants_proportion: 36
    //         }
    //       ]
    //     },
    //   ]
    // }
    // console.log(datas.items)



    // 渲染详情表格：
    // dataArr.forEach(item => {
    // setaaa('itemTitle');
    // addSearchItem(item);
    // });
    // ----success时，调用部分--- end -----
    // obj.data.roles.forEach(function () {

    //   console.log(1);
    //   // setaaa('itemTitle');


    // })
  })




  // console.log(obj.data);
  // obj.data['roles'].forEach(item => {
  //   // console.log(item);


  //   item.role
  // })

  // 关闭详情框清空: 
  function resetDetailModal() {

    $('#showDetail #DetailTypePct').removeClass('hide');
    $('#showDetail #DetailTypeMoney').addClass('hide');
    $('#showDetail .add-account-role label input').removeProp('checked');

    // 移除表格内容 ，，，


    // 用清空表格内容代替remove**********************
    $('#showDetail .show-item-details table>tbody .add-item-list').remove();

    resetAddDeptModel('#addDepartModel');

  }
  $('#showDetail').on('hidden.bs.modal', function () {

    resetDetailModal();
  })

  // 删除按钮
  $('body').on('click', '.delBtn', function () {
    $(this).parents('tr').remove();
  })



})