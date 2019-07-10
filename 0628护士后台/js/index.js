$(function () {

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

        console.log(1)
      }

      // 渲染页面表格
    })


    // 渲染页面表格数据
    addPageTableData(addModelDataResult);

    return false; // 如果查询后不需要保留记录则将本语句注释。
  })

  //-------------------------我是一条正经的分割线------ <新增木块弹出层  之   按比例>------------------------


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
  listenInputChange('#propTable .add-item-list');


  // 点击新增模板保存按钮
  $(document).on('click', '#addDeptSaveBtn', function () {

    // 保存后执行代码
    // some code;
    // setAddDeptItem();      // 调用 setAddDeptItem 函数渲染数据
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

    // ajax 请求成功后代码:(放入success)
    addPageTableData(addModelDataResult);

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

    console.log('护士',$moneyPerItemQzVal,$moneyPerItemJzVal)

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
      nurseType = {$moneyQzVal, $moneyJzVal}
      console.log(nurseType);
      moneyArr.push(nurseType);
    })

    console.log(moneyArr);
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
              <tr>
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
    console.log(1);

    $.ajax({

      // 其中, 
      /**
       * 1. 按比例/按金额显示, 用 id = DetailaccountTypePct(比例) 或者 id = DetailaccountTypeMoney 的 class = 'hide' 来控制.
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
    $("#showDetail .show-item-details table>tbody tr:not(:first-child)").remove();

    // 渲染详情表格：
    dataArr.forEach(item => {

      addSearchItem(item);
    });
    // ----success时，调用部分--- end -----

  })




})