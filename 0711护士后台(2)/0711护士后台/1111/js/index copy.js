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




  //-------------------------我是一条正经的分割线-----------------------------

  var tableTitle = 


  function addTableItemList(itemTitle){
    var addPropTableStr = `
          <tr class="add-item-list">
            <td class="item-title">${ itemTitle }</td>
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

    // var addMoneyTableStr = `
    //   <tr class="add-item-list">
    //     <td class="item-title">${ itemTitle }</td>
    //     <td class="item-referee item-other">
    //         <input type="text">
    //         <span class="pct">元</span>
    //     </td>
    //     <td class="item-nurse">
    //         <input class="nurse-qz" type="text">
    //         <span class="pct">元</span>
    //         /
    //         <input class="nurse-jz" type="text">
    //         <span class="pct">元</span>
    //     </td>
    //     <td class="item-cons-doc item-other"><input type="text"><span
    //             class="pct">元</span></td>
    //     <td class="item-ref-doc item-other">
    //         <input type="text">
    //         <span class="pct">元</span>
    //     </td>
    //     <td class="item-saleman item-other">
    //         <input type="text">
    //         <span class="pct">元</span>
    //     </td>
    //     <td class="item-org item-other">
    //         <input type="text">
    //         <span class="pct">元</span>
    //     </td>
    //   </tr>
    // `;

    // var showTableStr = `
    // <tr class="add-item-list">
    //   <td class="item-title">${ itemTitle }</td>
    //     <td class="item-referee item-other">
    //         <input type="text">
    //         <span class="pct">%</span>
    //     </td>
    //     <td class="item-nurse">
    //         <input class="nurse-qz" type="text">
    //         <span class="pct">%</span>
    //         /
    //         <input class="nurse-jz" type="text">
    //         <span class="pct">%</span>
    //     </td>
    //     <td class="item-cons-doc item-other"><input type="text"><span
    //             class="pct">%</span></td>
    //     <td class="item-ref-doc item-other">
    //         <input type="text">
    //         <span class="pct">%</span>
    //     </td>
    //     <td class="item-saleman item-other">
    //         <input type="text">
    //         <span class="pct">%</span>
    //     </td>
    //     <td class="item-org item-other">
    //         <input type="text">
    //         <span class="pct">%</span>
    //     </td>
    //     <td class="item-platform">
    //         <span class="pf-qz">30</span>
    //         <span class="pct">%</span>
    //         &nbsp;/&nbsp;
    //         <span class='pf-jz'>30</span>
    //         <span class="pct">%</span>
    //     </td>
    //   </tr>
    
    // `;
       


    $("#addDepartModel .add-item-details #propTable>tbody").append(addPropTableStr);
    // $("#addDepartModel .add-item-details #moneyTable>tbody").append(addMoneyTableStr);
    // $("#showDetail .add-item-details #showTable>tbody").append(showTableStr);
  }


addTableItemList('我是111')
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

    // 保存后执行代码
    // some code;
    // setAddDeptItem();      // 调用 setAddDeptItem 函数渲染数据

    // 
    var addData = [
      {
      // 分账角色
      role: 1,

      // 分账项目
      item:[]
    }
  ];
    var refereeOrder = {};
    var orderNum = 0;
    var refereeData = [];
    $('#propTable .add-item-list .item-referee input').each(function(){
      orderNum++;
      // refereeData.push($(this));
      refereeOrder[orderNum] = $(this);
    });
    // console.log(refereeData);
    console.log(refereeOrder);
    // 获取项目名称：

    $('.add-item-title th').each(function(){

    })
    var itemListData = {
      
    };

    var addSum = 0;
    for(item in addData.item) {
      // console.log(addData.item.item)
      addSum += parseInt(addData.item[item]);

    }
    // console.log(addSum);
    /**
     * 思路： 
     * 1。每个角色是个对象
     * 2. 每个对象有属性items: items items.     
     * 
     */


    setAddDeptItem();

    // 完成后清空模态框
    resetAddDeptModel('#addDepartModel');

    // 关闭模态框
    $('#addDepartModel').modal('hide');
  })

  // 关闭新增模板弹出层时清空数据：
  $('#addDepartModel').on('hidden.bs.modal', function () {
    resetAddDeptModel('#addDepartModel');
  })

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
  //                                                                                      *
  //***************************************************************************************


  function addSearchItem(item) {


    $.ajax({

      // ajax代码:
      // data: addModalData

    })

    var addResultStr = `
              <tr class="add-item-list">
                  <td class="itemTitle">${ item.title} %</td>
                  <td class="item-referee">${ item.referee}%</td>
                  <td class="item-nurse">${ item.nurse} %&nbsp;/&nbsp; ${item.nurse}%</td>
                  <td class="item-cons-doc">${ item.consDoc}%</td>
                  <td class="item-ref-doc">${ item.refDoc}%</td>
                  <td class="item-saleman">${ item.saleman}%</td>
                  <td class="item-org">${ item.org}</td>
                  <td class="item-platform">${ item.platform}% &nbsp;/&nbsp; ${item.platform}%</td>
              </tr>
          `;
    $("#showDetail .show-item-details table>tbody").append(addResultStr);
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

    //*****  模拟ajax数据 start：*****

    var obj = {
      title: 11,
      referee: 11,
      nurse: 11,
      consDoc: 11,
      refDoc: 11,
      saleman: 11,
      org: 11,
      platform: 12
    }
    var obj1 = {
      title: 12,
      referee: 12,
      nurse: 23,
      consDoc: 11,
      refDoc: 11,
      saleman: 12,
      org: 21,
      platform: 11
    }
    // 
    var dataArr = [obj, obj1, obj, obj1];
    //*****  模拟ajax数据 end：*****

    // ----success时，调用部分---start-----

    // 渲染前，移除多余表格：
    $("#showDetail .show-item-details .add-item-list").remove();

    // 渲染详情表格：
    dataArr.forEach(item => {

      addSearchItem(item);
    });
    // ----success时，调用部分--- end -----

  })


  // 关闭详情框清空: 
  function resetDetailModal() {

    $('#showDetail #DetailTypePct').removeClass('hide');
    $('#showDetail #DetailTypeMoney').addClass('hide');
    $('#showDetail .add-account-role label input').removeProp('checked');
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